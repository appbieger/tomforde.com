# Bild-Dimensions-Skript

## Übersicht

Dieses Skript fügt automatisch Bild-Dimensionen zu Dateinamen hinzu, damit die Galerie-Komponente die korrekten Größen für PhotoSwipe verwenden kann.

## Installation

Zuerst die benötigten npm-Pakete installieren:

```bash
npm install
```

## Verwendung

### Alle Bilder im Standard-Verzeichnis verarbeiten

```bash
npm run images:add-dimensions
```

Verarbeitet alle Bilder in `site/images/`

### Spezifisches Verzeichnis verarbeiten

```bash
npm run images:stella
```

Verarbeitet nur Bilder in `site/images/stella/`

### Beliebiges Verzeichnis verarbeiten

```bash
node scripts/add-image-dimensions.js site/images/mein-ordner
```

## Wie es funktioniert

### 1. Dateinamen-Format

Das Skript benennt Bilddateien um, um Dimensionen einzufügen:

**Vorher:**
```
Bauernhaus.jpeg
Rohbau_01.jpeg
```

**Nachher:**
```
Bauernhaus_1920x1080.jpeg
Rohbau_01_3024x4032.jpeg
```

### 2. Gallery-Template

Das `gallery-from-dir.html` Template extrahiert die Dimensionen automatisch:

```liquid
{% include gallery-from-dir.html dir='images/stella' gallery_id='stella' %}
```

### 3. HTML-Ausgabe

Erzeugt korrektes HTML mit PhotoSwipe-Attributen:

```html
<a href="/images/stella/Bauernhaus_1920x1080.jpeg" 
   data-pswp-width="1920" 
   data-pswp-height="1080">
  <img src="/images/stella/Bauernhaus_1920x1080.jpeg" 
       alt="Bauernhaus" 
       loading="lazy">
</a>
```

## Vorteile

- ✅ **Automatisch:** Keine manuellen Dimensionsangaben nötig
- ✅ **Korrekte Aspect Ratios:** PhotoSwipe zeigt Bilder in der richtigen Größe
- ✅ **Bessere UX:** Keine Layout-Shifts beim Öffnen der Lightbox
- ✅ **Wiederverwendbar:** Funktioniert für alle Galerie-Verzeichnisse

## Workflow

1. **Bilder hinzufügen:**
   Neue Bilder in ein Verzeichnis kopieren (z.B. `site/images/projekt-xy/`)

2. **Dimensionen hinzufügen:**
   ```bash
   node scripts/add-image-dimensions.js site/images/projekt-xy
   ```

3. **Beschreibungen hinzufügen (optional):**
   Öffne `site/_data/gallery_captions.yml` und füge Einträge hinzu:
   ```yaml
   projekt-xy:
     "foto": "Eine aussagekräftige Beschreibung des Bildes."
     "bild": "Eine weitere tolle Beschreibung."
   ```
   
   **Wichtig:** Der Key ist der Dateiname **ohne Dimensionen und ohne Dateiendung**:
   - Bilddatei: `foto_1920x1080.jpeg`
   - YAML-Key: `"foto"`

4. **Galerie einbinden:**
   ```markdown
   ## Galerie
   {% include gallery-from-dir.html dir='images/projekt-xy' gallery_id='projekt-xy' %}
   ```

5. Fertig! 🎉

## Hinweise

- Das Skript überspringt Dateien, die bereits Dimensionen im Namen haben
- Unterstützte Formate: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Verarbeitet Verzeichnisse rekursiv (inkl. Unterordner)
- Original-Dateien werden umbenannt (kein Backup)

## Fehlerbehebung

Falls das Skript nicht funktioniert:

1. Prüfen ob `image-size` installiert ist:
   ```bash
   npm list image-size
   ```

2. Node.js Version prüfen (mind. v14 erforderlich):
   ```bash
   node --version
   ```

3. Skript direkt ausführen für Debug-Ausgabe:
   ```bash
   node scripts/add-image-dimensions.js site/images/stella
   ```

