#!/usr/bin/env node

/**
 * Script to optimize images for web
 * - Resize images to max 2000px width
 * - Generate WebP versions
 * - Compress JPEG/PNG with quality 85%
 * - Preserve aspect ratios
 *
 * Usage: node scripts/optimize-images.js [directory]
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Import sharp
let sharp;

async function loadSharp() {
  try {
    // Try CommonJS require first
    sharp = require('sharp');
  } catch (error) {
    try {
      // Fallback to dynamic import
      const module = await import('sharp');
      sharp = module.default;
    } catch (importError) {
      console.error('❌ Fehler: sharp ist nicht installiert.');
      console.error('Bitte installieren mit: npm install sharp');
      process.exit(1);
    }
  }
}

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Max width for web images (2000px is good for retina displays)
const MAX_WIDTH = 2000;

// JPEG quality (85 is a good balance between quality and file size)
const JPEG_QUALITY = 85;

// WebP quality (80 is recommended for web)
const WEBP_QUALITY = 80;

// Stats
let stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  optimizedSize: 0,
};

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file size
 */
async function getFileSize(filePath) {
  try {
    const stats = await stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

/**
 * Check if file should be optimized
 */
function shouldOptimize(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

/**
 * Optimize a single image
 */
async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath, ext);
  const dir = path.dirname(filePath);

  try {
    // Get original file size
    const originalSize = await getFileSize(filePath);
    stats.originalSize += originalSize;

    // Load image
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Check if image needs resizing
    const needsResize = metadata.width > MAX_WIDTH;

    if (!needsResize && originalSize < 500000) {
      // Skip small images that don't need resizing
      console.log(
        `⊘ Übersprungen (bereits optimiert): ${path.basename(filePath)} (${formatBytes(originalSize)})`
      );
      stats.skipped++;
      stats.optimizedSize += originalSize;
      return;
    }

    // Create optimized version with auto-rotation based on EXIF
    let optimizedImage = sharp(filePath).rotate(); // Automatically rotates image based on EXIF Orientation tag

    // Resize if needed
    if (needsResize) {
      optimizedImage = optimizedImage.resize(MAX_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Optimize based on format
    if (ext === '.png') {
      optimizedImage = optimizedImage.png({
        quality: JPEG_QUALITY,
        compressionLevel: 9,
      });
    } else {
      optimizedImage = optimizedImage.jpeg({
        quality: JPEG_QUALITY,
        progressive: true,
        mozjpeg: true,
      });
    }

    // Save optimized version (overwrite original)
    await optimizedImage.toFile(filePath + '.tmp');

    // Get optimized file size
    const optimizedSize = await getFileSize(filePath + '.tmp');

    // Only replace if smaller
    if (optimizedSize < originalSize) {
      fs.renameSync(filePath + '.tmp', filePath);
      stats.optimizedSize += optimizedSize;

      const saved = originalSize - optimizedSize;
      const percent = Math.round((saved / originalSize) * 100);

      console.log(`✓ Optimiert: ${path.basename(filePath)}`);
      console.log(
        `  ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${percent}% kleiner)`
      );
    } else {
      // Keep original if optimization didn't help
      fs.unlinkSync(filePath + '.tmp');
      stats.optimizedSize += originalSize;
      console.log(`⊘ Behalten: ${path.basename(filePath)} (Optimierung hat nicht geholfen)`);
      stats.skipped++;
      return;
    }

    // Create WebP version with correct orientation
    const webpPath = path.join(dir, basename + '.webp');

    await sharp(filePath)
      .rotate() // Apply EXIF rotation
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);

    const webpSize = await getFileSize(webpPath);
    console.log(`  + WebP erstellt: ${formatBytes(webpSize)}`);

    stats.processed++;
  } catch (error) {
    console.error(`✗ Fehler bei ${path.basename(filePath)}:`, error.message);
    stats.errors++;
  }
}

/**
 * Process all images in a directory recursively
 */
async function processDirectory(dirPath) {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Skip certain directories
        if (entry.name === 'node_modules' || entry.name === '.git') {
          continue;
        }
        // Recursively process subdirectories
        await processDirectory(fullPath);
      } else if (entry.isFile() && shouldOptimize(entry.name)) {
        await optimizeImage(fullPath);
      }
    }
  } catch (error) {
    console.error(`✗ Fehler beim Verarbeiten von ${dirPath}:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  await loadSharp();

  const targetDir = process.argv[2] || 'site/images';
  const fullPath = path.resolve(process.cwd(), targetDir);

  console.log('🖼️  Bild-Optimierungs-Tool');
  console.log('═'.repeat(70));
  console.log(`Verzeichnis: ${fullPath}`);
  console.log(`Max. Breite: ${MAX_WIDTH}px`);
  console.log(`JPEG Qualität: ${JPEG_QUALITY}%`);
  console.log(`WebP Qualität: ${WEBP_QUALITY}%`);
  console.log('═'.repeat(70));
  console.log();

  // Check if path exists and determine if it's a file or directory
  try {
    const pathStats = await stat(fullPath);
    const startTime = Date.now();

    if (pathStats.isDirectory()) {
      // Process all images in directory
      await processDirectory(fullPath);
    } else if (pathStats.isFile() && shouldOptimize(fullPath)) {
      // Process single image file
      await optimizeImage(fullPath);
    } else {
      console.error(`✗ Fehler: ${fullPath} ist keine unterstützte Bilddatei`);
      process.exit(1);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // Print summary
    console.log();
    console.log('═'.repeat(70));
    console.log('📊 Zusammenfassung:');
    console.log(`   Optimiert: ${stats.processed} Bilder`);
    console.log(`   Übersprungen: ${stats.skipped} Bilder`);
    console.log(`   Fehler: ${stats.errors} Bilder`);
    console.log();
    console.log(`   Vorher: ${formatBytes(stats.originalSize)}`);
    console.log(`   Nachher: ${formatBytes(stats.optimizedSize)}`);

    if (stats.originalSize > 0) {
      const saved = stats.originalSize - stats.optimizedSize;
      const percent = Math.round((saved / stats.originalSize) * 100);
      console.log(`   Gespart: ${formatBytes(saved)} (${percent}%)`);
    }

    console.log();
    console.log(`   Dauer: ${duration}s`);
    console.log('═'.repeat(70));
    console.log('✓ Fertig!');
  } catch (error) {
    console.error(`✗ Fehler: ${error.message}`);
    process.exit(1);
  }
}

// Run main function
main().catch((error) => {
  console.error('✗ Unerwarteter Fehler:', error);
  process.exit(1);
});
