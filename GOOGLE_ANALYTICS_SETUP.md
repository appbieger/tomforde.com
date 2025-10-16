# Google Analytics 4 Setup

## So aktivierst du Google Analytics auf deiner Website:

### 1. Google Analytics Property erstellen

1. **Gehe zu:** [Google Analytics](https://analytics.google.com/)
2. **Klicke auf:** "Verwaltung" (Zahnrad unten links)
3. **Klicke auf:** "+ Property erstellen"
4. **Fülle aus:**
   - Property-Name: `tomforde.com`
   - Zeitzone: `Deutschland`
   - Währung: `Euro`
5. **Klicke auf:** "Weiter" und folge den Anweisungen
6. **Wähle:** "Web" als Plattform
7. **Gib ein:** 
   - Website-URL: `https://tomforde.com`
   - Stream-Name: `tomforde.com`

### 2. Measurement ID kopieren

Nach der Erstellung siehst du deine **Measurement ID** im Format: `G-XXXXXXXXXX`

**Beispiel:** `G-ABC123DEF4`

### 3. ID in die Website eintragen

Öffne die Datei:
```
site/_data/general_settings.yml
```

Ändere die Zeile:
```yaml
google-analytics: # G-XXXXXXXXXX
```

Zu:
```yaml
google-analytics: G-ABC123DEF4
```
(ersetze `G-ABC123DEF4` mit deiner echten ID)

### 4. Änderungen deployen

```bash
git add site/_data/general_settings.yml
git commit -m "Add Google Analytics Tracking ID"
git push
```

Nach ca. 2 Minuten ist Google Analytics aktiv!

---

## Analytics Dashboard aufrufen

Nach 24-48 Stunden siehst du die ersten Daten in deinem Google Analytics Dashboard:
- **URL:** https://analytics.google.com
- **Berichte** → **Echtzeit**: Zeigt aktuelle Besucher
- **Berichte** → **Engagement**: Zeigt Seitenaufrufe

---

## DSGVO-Konformität

✅ **IP-Anonymisierung** ist aktiviert  
✅ **Opt-Out Funktion** ist implementiert  
✅ **Datenschutzerklärung** ist aktualisiert  
✅ **Cookie-Laufzeit** auf 2 Jahre begrenzt

Besucher können Google Analytics deaktivieren über:
- Browser-Plugin: https://tools.google.com/dlpage/gaoptout
- JavaScript-Funktion: `gaOptout()` (kann auf Datenschutz-Seite verlinkt werden)

---

## Troubleshooting

### Analytics zeigt keine Daten?

1. **Warte 24-48 Stunden** - Daten brauchen Zeit
2. **Prüfe die ID** in `general_settings.yml`
3. **Prüfe im Browser:**
   - Öffne DevTools (F12)
   - Tab "Netzwerk"
   - Lade die Seite neu
   - Suche nach `google-analytics.com` oder `googletagmanager.com`
   - Wenn zu sehen → Tracking funktioniert!

### Echtzeit zeigt keine Besucher?

- Öffne `tomforde.com` in einem **Inkognito-Fenster**
- Warte 10-30 Sekunden
- Aktualisiere das Analytics Dashboard

---

## Nützliche Links

- **Google Analytics Dashboard:** https://analytics.google.com
- **GA4 Dokumentation:** https://support.google.com/analytics/answer/9304153
- **Browser Opt-Out Plugin:** https://tools.google.com/dlpage/gaoptout

