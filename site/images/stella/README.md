# Stella Galerie

## Bildbeschreibungen

Die Beschreibungen für die Stella-Galerie werden in `site/_data/gallery_captions.yml` gespeichert.

### Beispiel-Struktur:

```yaml
stella:
  "00_Bauernhaus": "Das alte Bauernhaus der Großeltern..."
  "01_Bauernhaus Entkernt": "Das entkernte Bauernhaus..."
```

### Format:

- Der Key ist der **Dateiname ohne Dimensionen und ohne Dateiendung**
  - Bild: `00_Bauernhaus_3275x1810.jpeg`
  - Key: `"00_Bauernhaus"`

- Der Value ist die vollständige Beschreibung als Text

### Workflow:

1. **Bilder hinzufügen:**
   ```bash
   cp meine-bilder/*.jpeg images/stella/
   ```

2. **Dimensionen hinzufügen:**
   ```bash
   npm run images:stella
   ```

3. **Beschreibungen hinzufügen:**
   Öffne `site/_data/gallery_captions.yml` und füge für jedes Bild einen Eintrag hinzu:
   ```yaml
   stella:
     "mein_bild": "Eine tolle Beschreibung des Bildes."
   ```

4. **Fertig!** Die Galerie zeigt automatisch die Beschreibungen in PhotoSwipe an.

### Verwendung der Beschreibungen:

- **Alt-Text** (Barrierefreiheit): Wird aus dem Dateinamen generiert
- **PhotoSwipe Caption**: Wird aus `gallery_captions.yml` gelesen

### Fallback:

Falls keine Beschreibung in der YAML-Datei existiert, wird der Dateiname als Caption verwendet.
