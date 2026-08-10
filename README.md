# tomforde.com

Persönliche Website von Stephan Tomforde - Technik, Design und KI.

## 🚀 Live-Website

Die Website wird automatisch über GitHub Pages bereitgestellt:
**https://appbieger.github.io/tomforde.com**

## 🛠️ Lokale Entwicklung

### Voraussetzungen

- Ruby 3.1+
- Node.js 18+
- Bundler

### Installation

```bash
# Node-Dependencies installieren
npm install

# Ruby-Dependencies installieren
cd site
bundle install
```

### Entwicklungsserver starten

```bash
npm run live
```

Die Website ist dann unter `http://localhost:6060` erreichbar.

## 📸 Bilder-Workflow

### Dimensionen zu Bildern hinzufügen

Vor dem Deployment sollten Bilddimensionen in die Dateinamen eingefügt werden:

```bash
# Alle Bilder verarbeiten
npm run images:add-dimensions

# Nur spezifisches Verzeichnis
npm run images:stella
```

Dies fügt Dimensionen zu Dateinamen hinzu (z.B. `bild_1920x1080.jpeg`), damit PhotoSwipe die korrekten Aspect Ratios anzeigt.

### Galerie-Beschreibungen

Beschreibungen für Galerie-Bilder werden in `site/_data/gallery_captions.yml` gepflegt:

```yaml
galerie-name:
  "dateiname": "Beschreibung des Bildes..."
```

## 📝 Inhalte bearbeiten

- **Projekte**: `site/collections/_projects/`
- **Seiten**: `site/collections/_pages/`
- **Blog-Posts**: `site/collections/_posts/`

## 🔧 Technologie-Stack

- **Static Site Generator**: Jekyll
- **UI Components**: Bookshop
- **Styling**: SCSS
- **Lightbox**: PhotoSwipe 5
- **Deployment**: GitHub Actions → GitHub Pages

## 📦 Deployment

Jeder Push auf `main` triggert automatisch ein Deployment über GitHub Actions.

Der Workflow baut die Website mit Jekyll und deployed sie auf GitHub Pages.

## 📄 Lizenz

MIT License - siehe LICENSE Datei

GO
