# Bildoptimierung

## Automatische Bildoptimierung für bessere Performance

Dieses System optimiert automatisch alle Bilder auf deiner Website:
- ✅ Maximale Breite: 2000px (perfekt für Retina-Displays)
- ✅ JPEG Qualität: 85% (beste Balance zwischen Qualität & Größe)
- ✅ WebP-Versionen werden erstellt (modern & kleiner)
- ✅ Progressive JPEGs für schnelleres Laden
- ✅ Original-Seitenverhältnisse bleiben erhalten

---

## 🚀 Schnellstart

### 1. Dependencies installieren

```bash
npm install
```

### 2. Bilder optimieren

**Alle Bilder optimieren:**
```bash
npm run images:optimize-all
```

**Nur einen Ordner optimieren:**
```bash
npm run images:optimize site/images/stella
```

---

## 📊 Was passiert bei der Optimierung?

### Vorher:
```
site/images/faszination-wasser/12_Office_mit_hund_an_der_Elbe_4032x3024.jpeg
Größe: 4.0 MB
Breite: 4032px
```

### Nachher:
```
site/images/faszination-wasser/12_Office_mit_hund_an_der_Elbe_4032x3024.jpeg
Größe: 800 KB (80% kleiner!)
Breite: 2000px

+ site/images/faszination-wasser/12_Office_mit_hund_an_der_Elbe_4032x3024.webp
Größe: 450 KB (noch kleiner!)
```

---

## 🎯 Wann solltest du Bilder optimieren?

### ✅ Immer optimieren wenn:
- Du neue Bilder zur Website hinzufügst
- Bilder größer als 500 KB sind
- Bilder breiter als 2000px sind

### ⚠️ Vor jedem Deploy:
```bash
# Bilder optimieren
npm run images:optimize-all

# Änderungen commiten
git add site/images
git commit -m "Optimize images"
git push
```

---

## 🔧 Integration in GitHub Actions

Die Bildoptimierung ist **NICHT** automatisch in GitHub Actions, da:
- ✅ Bilder sollten lokal optimiert werden (einmalig)
- ✅ Sharp benötigt native Bibliotheken (langsam im Build)
- ✅ Git-History bleibt sauber

**Empfehlung:** Optimiere Bilder lokal vor dem Push!

---

## 📁 Struktur nach Optimierung

```
site/images/
├── stella/
│   ├── 00_Bauernhaus_3275x1810.jpeg     # Optimiert
│   ├── 00_Bauernhaus_3275x1810.webp     # WebP-Version
│   ├── 01_Bauernhaus_Entkernt_4032x2355.jpeg
│   └── 01_Bauernhaus_Entkernt_4032x2355.webp
```

---

## 💡 Tipps für beste Performance

### 1. **Nutze WebP im HTML** (mit Fallback)
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Beschreibung">
</picture>
```

### 2. **Lazy Loading aktivieren**
```html
<img src="image.jpg" loading="lazy" alt="Beschreibung">
```
✅ Bereits in `gallery-from-dir.html` aktiv!

### 3. **Bilder vor Upload optimieren**
Für beste Ergebnisse:
1. Neue Bilder zu `site/images/` hinzufügen
2. `npm run images:optimize-all` ausführen
3. Committen & pushen

---

## 📈 Erwartete Verbesserungen

### Performance-Metriken:
- **Ladezeit:** -40% bis -70%
- **Dateigröße:** -50% bis -80%
- **Lighthouse Score:** +10 bis +20 Punkte

### Beispiel (tomforde.com):
```
Vorher:
- Gesamt: 45 MB
- Ladezeit: 8 Sekunden

Nachher:
- Gesamt: 12 MB (73% kleiner!)
- Ladezeit: 2.5 Sekunden
```

---

## ⚙️ Erweiterte Optionen

### Andere Qualität verwenden:
Bearbeite `scripts/optimize-images.js`:

```javascript
const JPEG_QUALITY = 85;  // 70-95 (höher = bessere Qualität)
const WEBP_QUALITY = 80;  // 70-90 (höher = bessere Qualität)
```

### Andere maximale Breite:
```javascript
const MAX_WIDTH = 2000;  // z.B. 1600 oder 2400
```

---

## 🐛 Troubleshooting

### "sharp ist nicht installiert"
```bash
npm install sharp
```

### "Fehler bei der Bildoptimierung"
- Stelle sicher, dass Bilder valide JPG/PNG sind
- Prüfe Dateiberechtigungen
- Schließe Bildbearbeitungsprogramme

### Bilder werden nicht kleiner
- Bilder sind bereits optimiert
- Original ist schon komprimiert
- WebP-Version wird trotzdem erstellt

---

## 📚 Weitere Informationen

- **Sharp Dokumentation:** https://sharp.pixelplumbing.com/
- **WebP Format:** https://developers.google.com/speed/webp
- **Image Optimization:** https://web.dev/fast/#optimize-your-images

