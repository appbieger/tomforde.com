#!/usr/bin/env node

/**
 * Script to add image dimensions to filenames
 * Usage: node scripts/add-image-dimensions.js [directory]
 * 
 * Renames image files to include dimensions: filename_WIDTHxHEIGHT.ext
 * Example: Bauernhaus.jpeg -> Bauernhaus_1920x1080.jpeg
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Dynamically import image-size as it's an ES module
let sizeOf;

async function loadImageSize() {
  const module = await import('image-size');
  sizeOf = module.default;
}

const readdir = promisify(fs.readdir);
const rename = promisify(fs.rename);
const stat = promisify(fs.stat);

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

/**
 * Check if filename already contains dimensions
 */
function hasDimensions(filename) {
  return /_\d+x\d+\.\w+$/.test(filename);
}

/**
 * Extract dimensions from filename if present
 */
function extractDimensions(filename) {
  const match = filename.match(/_(\d+)x(\d+)\.\w+$/);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10)
    };
  }
  return null;
}

/**
 * Process a single image file
 */
async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const basename = path.basename(filePath, ext);
  
  // Skip if already has dimensions
  if (hasDimensions(filePath)) {
    console.log(`✓ Übersprungen (hat bereits Dimensionen): ${path.basename(filePath)}`);
    return;
  }
  
  try {
    // Get image dimensions
    const dimensions = sizeOf(filePath);
    const { width, height } = dimensions;
    
    // Create new filename with dimensions
    const newBasename = `${basename}_${width}x${height}${ext}`;
    const newFilePath = path.join(dir, newBasename);
    
    // Rename file
    await rename(filePath, newFilePath);
    console.log(`✓ Umbenannt: ${path.basename(filePath)} → ${newBasename}`);
    
  } catch (error) {
    console.error(`✗ Fehler bei ${path.basename(filePath)}:`, error.message);
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
        // Recursively process subdirectories
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          await processImage(fullPath);
        }
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
  await loadImageSize();
  
  const targetDir = process.argv[2] || 'site/images';
  const fullPath = path.resolve(process.cwd(), targetDir);
  
  console.log('🖼️  Bild-Dimensions-Processor');
  console.log('═'.repeat(50));
  console.log(`Verzeichnis: ${fullPath}\n`);
  
  // Check if directory exists
  try {
    const stats = await stat(fullPath);
    if (!stats.isDirectory()) {
      console.error(`✗ Fehler: ${fullPath} ist kein Verzeichnis`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`✗ Fehler: Verzeichnis ${fullPath} nicht gefunden`);
    process.exit(1);
  }
  
  // Process all images
  await processDirectory(fullPath);
  
  console.log('\n' + '═'.repeat(50));
  console.log('✓ Fertig!');
}

// Run main function
main().catch(error => {
  console.error('✗ Unerwarteter Fehler:', error);
  process.exit(1);
});


