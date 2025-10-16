# 🚀 GitHub Pages Deployment

## Setup abgeschlossen! ✅

Die Website ist jetzt für GitHub Pages konfiguriert.

## 📋 Nächste Schritte

### 1. Repository auf GitHub pushen

```bash
# Status prüfen
git status

# Alle Änderungen hinzufügen
git add .

# Commit erstellen
git commit -m "Setup GitHub Pages deployment"

# Auf GitHub pushen
git push origin main
```

**Hinweis:** Falls dein Hauptbranch `master` heißt, verwende:
```bash
git push origin master
```

### 2. GitHub Pages in den Repository-Einstellungen aktivieren

1. Gehe zu **https://github.com/appbieger/tomforde.com**
2. Klicke auf **Settings** (Einstellungen)
3. Scrolle zu **Pages** (in der linken Seitenleiste)
4. Unter **Source** wähle:
   - **Source**: GitHub Actions
5. Speichern

### 3. GitHub Actions Workflow starten

Nach dem Push wird automatisch der GitHub Actions Workflow gestartet:

1. Gehe zu **Actions** Tab im Repository
2. Du siehst den Workflow "Deploy Jekyll site to GitHub Pages"
3. Warte, bis er grün wird (✓)

### 4. Website aufrufen

Nach erfolgreichem Deployment ist die Website erreichbar unter:

**https://appbieger.github.io/tomforde.com**

## 🔧 Was wurde eingerichtet?

### Dateien erstellt/angepasst:

1. **`.github/workflows/jekyll-gh-pages.yml`**
   - GitHub Actions Workflow für automatisches Deployment
   - Baut Jekyll-Site und deployed auf GitHub Pages
   - Läuft bei jedem Push auf `main`/`master`

2. **`site/_config.yml`**
   - `url` und `baseurl` für GitHub Pages gesetzt
   - Title angepasst

3. **`.gitignore`**
   - Build-Verzeichnisse und temporäre Dateien ignoriert

4. **`README.md`**
   - Dokumentation für das Projekt

5. **Git Remote**
   - Auf `https://github.com/appbieger/tomforde.com.git` gesetzt

## ⚙️ Workflow-Details

Der Workflow macht folgendes:

1. **Checkout** - Code auschecken
2. **Setup Ruby** - Ruby 3.1 installieren
3. **Setup Node** - Node.js 18 installieren
4. **Install Dependencies** - npm & bundle install
5. **Add Image Dimensions** - Bilddimensionen zu Dateinamen hinzufügen
6. **Build Jekyll** - Website bauen mit korrektem baseurl
7. **Deploy** - Auf GitHub Pages deployen

## 🐛 Troubleshooting

### Workflow schlägt fehl?

Prüfe in **Actions** Tab die Logs.

Häufige Fehler:
- Ruby/Node Version nicht kompatibel
- Dependencies fehlen in Gemfile/package.json
- Permissions nicht richtig gesetzt

### Website nicht erreichbar?

1. Prüfe ob GitHub Pages aktiviert ist (Settings → Pages)
2. Warte 2-3 Minuten nach Deployment
3. Prüfe ob Source auf "GitHub Actions" gesetzt ist

### Styling funktioniert nicht?

Prüfe ob `baseurl` in `_config.yml` korrekt ist:
```yaml
baseurl: "/tomforde.com"
```

## 📝 Lokale Entwicklung

Für lokale Entwicklung kannst du weiterhin nutzen:

```bash
npm run live
```

Die Website ist dann unter `http://localhost:6060` ohne baseurl erreichbar.

## 🔄 Updates deployen

Nach Änderungen einfach committen und pushen:

```bash
git add .
git commit -m "Deine Änderung"
git push
```

Das Deployment läuft automatisch! 🎉

