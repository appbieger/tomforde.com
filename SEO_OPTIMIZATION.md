# SEO-Optimierung

## Übersicht

Deine Website ist jetzt vollständig für Suchmaschinen optimiert mit:
- ✅ Meta-Tags (Title, Description, Keywords)
- ✅ Open Graph für Social Media (Facebook, LinkedIn)
- ✅ Twitter Cards für Twitter/X
- ✅ Strukturierte Daten (JSON-LD) für Rich Snippets
- ✅ Robots.txt für Crawler-Kontrolle
- ✅ Sitemap.xml (automatisch generiert)
- ✅ Canonical URLs
- ✅ Mobile-optimierte Meta-Tags

---

## 📊 Implementierte Features

### 1. **Meta-Tags**

#### Primary Meta Tags
```html
<title>Seitentitel – Stephan Tomforde</title>
<meta name="title" content="...">
<meta name="description" content="...">
<meta name="author" content="Stephan Tomforde">
<meta name="robots" content="index, follow">
<meta name="language" content="German">
```

#### Canonical URL
```html
<link rel="canonical" href="https://tomforde.com/page-url/">
```
Verhindert Duplicate Content Probleme.

---

### 2. **Open Graph (Facebook, LinkedIn)**

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://tomforde.com/">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://tomforde.com/images/...">
<meta property="og:site_name" content="Stephan Tomforde">
<meta property="og:locale" content="de_DE">
```

**Effekt:**
- Schöne Preview-Cards wenn Links auf Facebook/LinkedIn geteilt werden
- Bild wird automatisch angezeigt
- Titel und Beschreibung optimal formatiert

---

### 3. **Twitter Cards**

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://tomforde.com/">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://tomforde.com/images/...">
```

**Effekt:**
- Große Bild-Karten auf Twitter/X
- Professionelle Darstellung
- Höhere Click-Through-Rate

---

### 4. **Strukturierte Daten (JSON-LD)**

Implementiert für:
- **WebSite** (Startseite)
- **BlogPosting** (Blog-Posts)
- **CreativeWork** (Projekte)
- **Person** (Über dich)

**Beispiel:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Stephan Tomforde",
  "jobTitle": "Techniker & AI enthusiast ",
  "url": "https://tomforde.com"
}
```

**Effekt:**
- Google Rich Snippets
- Knowledge Graph Einträge
- Bessere Darstellung in Suchergebnissen
- Featured Snippets möglich

---

### 5. **Robots.txt**

**Datei:** `/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://tomforde.com/sitemap.xml
```

**Zweck:**
- Erlaubt allen Suchmaschinen das Crawlen
- Verlinkt zur Sitemap
- Schließt Admin-Bereiche aus

---

### 6. **Sitemap.xml**

**Automatisch generiert** durch `jekyll-sitemap` Plugin

**URL:** https://tomforde.com/sitemap.xml

**Enthält:**
- Alle Seiten
- Alle Projekte
- Alle Blog-Posts
- Letzte Änderungsdaten
- Prioritäten

**Zweck:**
- Hilft Google beim Indexieren
- Zeigt Struktur der Website
- Beschleunigt Indexierung neuer Inhalte

---

## 🔍 SEO-Best-Practices

### Title-Tags
```
Format: Seitentitel – Stephan Tomforde
Länge: 50-60 Zeichen
```

**Beispiele:**
- ✅ "STELLA Haus mit Seele – Stephan Tomforde"
- ✅ "Projekte – Stephan Tomforde"
- ❌ "STELLA" (zu kurz, kein Branding)
- ❌ "STELLA Haus mit Seele und System - Ein modernes Bauhaus-Design Projekt..." (zu lang)

---

### Meta-Descriptions
```
Länge: 150-160 Zeichen
Stil: Aktiv, einladend, mit Call-to-Action
```

**Beispiele:**
- ✅ "Entdecke STELLA – ein modernes Haus, das Klarheit, Design und Technik mit der Natur vereint. Vom Abriss bis zum Rohbau dokumentiert."
- ❌ "Haus" (zu kurz, nicht beschreibend)

---

### Bilder SEO

#### Alt-Tags
```html
<img src="stella.jpg" alt="STELLA Hausentwurf 2024 - Bauhaus Design">
```

**Best Practices:**
- ✅ Beschreibend und präzise
- ✅ Keywords natürlich einbinden
- ✅ Kontext beachten
- ❌ Keyword-Stuffing vermeiden

#### Dateinamen
```
✅ STELLA_Hausentwurf_2024.jpg
❌ IMG_1234.jpg
❌ bild.jpg
```

---

## 📱 Social Media Optimierung

### Facebook/LinkedIn Share Image
**Empfohlene Größe:** 1200x630px  
**Format:** JPG oder PNG  
**Dateigröße:** < 300 KB

**Aktuell:** `/images/01.jpg`

### Twitter Card Image
**Empfohlene Größe:** 1200x675px  
**Format:** JPG oder PNG  
**Dateigröße:** < 300 KB

---

## 🎯 Google Search Console Setup

### 1. Property hinzufügen
1. Gehe zu: https://search.google.com/search-console
2. Klicke auf "Property hinzufügen"
3. Wähle "URL-Präfix"
4. Gebe ein: `https://tomforde.com`

### 2. Inhaberschaft bestätigen

**Methode A: HTML-Datei** (empfohlen)
1. Lade die Bestätigungsdatei herunter
2. Speichere sie in `/Users/yaron/tomforde.com/site/`
3. Commit & Push
4. Klicke auf "Bestätigen"

**Methode B: Meta-Tag**
1. Kopiere das Meta-Tag
2. Füge es in `site/_includes/head.html` ein
3. Commit & Push
4. Klicke auf "Bestätigen"

### 3. Sitemap einreichen
1. Gehe zu "Sitemaps"
2. Gebe ein: `sitemap.xml`
3. Klicke auf "Senden"

---

## 🚀 Performance-Monitoring

### Google PageSpeed Insights
**URL:** https://pagespeed.web.dev/

**Teste:**
```
https://tomforde.com
https://tomforde.com/project/stella
```

**Ziele:**
- ✅ Mobile Score: > 90
- ✅ Desktop Score: > 95
- ✅ Core Web Vitals: Alle grün

---

### Lighthouse (Chrome DevTools)

1. Öffne Chrome DevTools (F12)
2. Tab "Lighthouse"
3. Wähle "Desktop" oder "Mobile"
4. Klicke auf "Analyze page load"

**Kategorien:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

---

## 📈 SEO-Checkliste für neue Inhalte

### Neues Projekt/Blog-Post hinzufügen:

```yaml
---
title: "Dein Projekttitel"  # 50-60 Zeichen
subtitle: "Kurze Beschreibung"
description: "Längere Beschreibung für Meta-Tag (150-160 Zeichen)"
image: '/images/projekt/hauptbild.jpg'  # 1200x630px
tags: [design, technik, ki]  # Relevante Keywords
date: 2025-10-17
---
```

**Checklist:**
- [ ] Title ist prägnant und enthält Keywords
- [ ] Description ist einladend und informativ
- [ ] Image ist optimiert (< 200 KB)
- [ ] Tags sind relevant
- [ ] Alt-Texte für alle Bilder
- [ ] Links zu anderen Projekten/Posts
- [ ] Headings (H2, H3) strukturiert

---

## 🔧 Erweiterte Konfiguration

### Social Media Handles hinzufügen

Bearbeite `/site/_data/author.yml`:

```yaml
name: Stephan Tomforde
email: stephan@tomforde.com
twitter: DeinTwitterHandle   # Ohne @
github: DeinGitHubUsername
linkedin: DeinLinkedInUsername
```

**Effekt:**
- Twitter Card zeigt: "by @DeinTwitterHandle"
- Strukturierte Daten verlinken Social Profiles
- Bessere Autor-Attribution

---

## 📊 Monitoring & Analytics

### Google Analytics 4
✅ Bereits eingerichtet: `G-05SK2CNMCN`

**Wichtige Metriken:**
- Organische Suchanfragen
- Top-Keywords
- Beliebteste Seiten
- Absprungrate
- Verweildauer

### Google Search Console
**Nach 1-2 Wochen verfügbar:**
- Impressionen
- Klicks
- Click-Through-Rate (CTR)
- Durchschnittliche Position
- Top-Suchanfragen

---

## 🎯 SEO-Ziele & KPIs

### Kurzfristig (1-3 Monate)
- [ ] Google indexiert alle Seiten
- [ ] Sitemap in Search Console
- [ ] Core Web Vitals alle grün
- [ ] Lighthouse SEO Score > 95

### Mittelfristig (3-6 Monate)
- [ ] Top 10 für "Stephan Tomforde"
- [ ] Top 20 für Projekt-Keywords
- [ ] 100+ organische Besucher/Monat
- [ ] Featured Snippets für Projekte

### Langfristig (6-12 Monate)
- [ ] Top 5 für Haupt-Keywords
- [ ] 500+ organische Besucher/Monat
- [ ] Backlinks von relevanten Seiten
- [ ] Knowledge Graph Eintrag

---

## 🛠️ Tools & Ressourcen

### Kostenlose SEO-Tools:
- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com
- **PageSpeed Insights:** https://pagespeed.web.dev
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Structured Data Testing Tool:** https://validator.schema.org

### Browser-Erweiterungen:
- **SEO Meta in 1 Click**
- **Facebook Pixel Helper**
- **Twitter Card Validator**

### Testing:
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

---

## ✅ Was du jetzt tun solltest:

1. **Google Search Console einrichten** (siehe oben)
2. **Social Media Sharing testen:**
   - Teile einen Link auf Facebook
   - Teile einen Link auf Twitter/X
   - Prüfe Preview-Cards
3. **Lighthouse-Test durchführen**
4. **Erste Inhalte optimieren:**
   - Projekt-Beschreibungen erweitern
   - Alt-Texte für Bilder prüfen
   - Interne Verlinkungen hinzufügen

---

## 📚 Weitere Optimierungen (optional)

### Content-SEO:
- [ ] Blog-Posts zu deinen Projekten schreiben
- [ ] FAQ-Sektion hinzufügen
- [ ] Ausführlichere Projekt-Beschreibungen
- [ ] Case Studies erstellen

### Technisches SEO:
- [ ] HTTPS (bereits aktiv ✓)
- [ ] Mobile-Friendly (bereits optimiert ✓)
- [ ] Page Speed (bereits optimiert ✓)
- [ ] Strukturierte Daten erweitern

### Local SEO:
- [ ] Google My Business Profil
- [ ] Lokale Keywords ("Brest", "Norddeutschland")
- [ ] NAP (Name, Address, Phone) konsistent

---

**Viel Erfolg mit deiner SEO-optimierten Website!** 🚀

