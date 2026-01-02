# Security Headers Implementation

This document describes the security headers implemented for this Jekyll site and provides guidance for maintaining and modifying the security configuration.

## Overview

This site implements HTTP security headers via HTML meta tags to protect against common web vulnerabilities including:

- **Cross-Site Scripting (XSS)** - via Content Security Policy (CSP)
- **Clickjacking** - via frame-ancestors directive
- **Information Leakage** - via Referrer Policy
- **Unwanted Browser Features** - via Permissions Policy

## Why Meta Tags?

GitHub Pages does not support custom HTTP response headers. To implement security headers on GitHub Pages, we use HTML `<meta>` tags as an alternative. While not as comprehensive as HTTP headers, meta tags provide significant protection for content-based security policies.

### GitHub Pages Limitations

The following security headers **cannot** be implemented via meta tags:
- `X-Content-Type-Options` - Requires HTTP header
- `X-Frame-Options` - Requires HTTP header (frame-ancestors in CSP is partial alternative)
- `Strict-Transport-Security (HSTS)` - Automatically provided by GitHub Pages for HTTPS

**Note:** The `frame-ancestors` directive in CSP may not be fully honored in meta tags by all browsers. It works best as an HTTP header, but is included for defense-in-depth.

## Implemented Security Headers

### 1. Content-Security-Policy (CSP)

CSP controls which resources (scripts, styles, images, etc.) can be loaded and executed on your site. This is the primary defense against XSS attacks.

**Current Policy:**
```
default-src 'self';
script-src 'self' 'unsafe-inline' unpkg.com www.googletagmanager.com www.google-analytics.com *.disqus.com;
style-src 'self' 'unsafe-inline' fonts.googleapis.com unpkg.com;
font-src 'self' fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' www.google-analytics.com formspree.io;
frame-ancestors 'self'
```

**Directive Breakdown:**

| Directive | Value | Purpose |
|-----------|-------|---------|
| `default-src` | `'self'` | Default policy: only same-origin resources |
| `script-src` | `'self' 'unsafe-inline' unpkg.com ...` | JavaScript sources (includes Google Analytics, Disqus) |
| `style-src` | `'self' 'unsafe-inline' fonts.googleapis.com unpkg.com` | CSS sources (includes Google Fonts) |
| `font-src` | `'self' fonts.gstatic.com` | Font file sources |
| `img-src` | `'self' data: https:` | Image sources (allows all HTTPS images) |
| `connect-src` | `'self' www.google-analytics.com formspree.io` | AJAX/fetch/WebSocket destinations |
| `frame-ancestors` | `'self'` | Clickjacking protection (may not work in meta tag) |

**Security Notes:**
- `'unsafe-inline'` is used for scripts and styles because Jekyll generates inline CSS and JavaScript. In a stricter implementation, this should be replaced with nonces or hashes.
- `https:` in `img-src` allows any HTTPS image source. This is permissive but necessary for user-generated content and external images.

### 2. Referrer-Policy

Controls how much referrer information is sent when users navigate away from your site.

**Current Policy:** `strict-origin-when-cross-origin`

**What it means:**
- Same-origin requests: Send full URL as referrer
- Cross-origin HTTPS→HTTPS: Send only origin (not full path)
- Cross-origin HTTPS→HTTP: Send no referrer
- Provides privacy while maintaining functionality for analytics

**Alternative Options:**
- `no-referrer` - Maximum privacy, but may break some analytics
- `origin` - Always send only the origin
- `no-referrer-when-downgrade` - Browser default, less private

### 3. Permissions-Policy

Disables browser features that the site doesn't need, reducing attack surface.

**Disabled Features:**
- `camera` - No webcam access
- `microphone` - No microphone access
- `geolocation` - No location access
- `payment` - No Payment Request API
- `usb` - No USB device access
- `interest-cohort` - Disables FLoC tracking (privacy)
- `magnetometer`, `gyroscope`, `accelerometer` - No sensor access
- `ambient-light-sensor` - No light sensor
- `autoplay` - Prevents autoplay media
- `display-capture` - No screen capture

These restrictions apply to all origins, preventing malicious scripts from accessing these features even if injected.

## Configuration System

Security headers are configured through two files:

### 1. `/site/_data/security.yml`

This YAML data file contains all security configuration. **Modify this file to change security policies.**

```yaml
enabled:
  content_security_policy: true
  referrer_policy: true
  permissions_policy: true

csp:
  script_src:
    - "'self'"
    - "'unsafe-inline'"
    - "unpkg.com"
    - "www.googletagmanager.com"
    # ... more sources
```

### 2. `/site/_includes/security-headers.html`

This Liquid template generates the HTML meta tags from the configuration. **You typically don't need to modify this file** unless adding new CSP directives or security headers.

## How to Add New External Resources

When you need to load resources from a new external domain, follow these steps:

### Step 1: Identify the Resource Type

Determine what type of resource you're adding:
- **JavaScript** → `script-src`
- **CSS** → `style-src`
- **Fonts** → `font-src`
- **Images** → `img-src` (HTTPS images already allowed)
- **AJAX/API calls** → `connect-src`
- **Embedded iframes** → Add `frame-src` directive

### Step 2: Update `security.yml`

Edit `/site/_data/security.yml` and add the domain to the appropriate CSP directive:

```yaml
csp:
  script_src:
    - "'self'"
    - "'unsafe-inline'"
    - "unpkg.com"
    - "example.com"  # ← Add your new domain here
```

### Step 3: Document the Resource

Add an entry to the `external_resources` section for future reference:

```yaml
external_resources:
  - domain: "example.com"
    usage: "Example JavaScript library"
    required_for: "Feature X functionality"
```

### Step 4: Test Locally

1. Build the site: `cd site && bundle exec jekyll build`
2. Serve locally: `bundle exec jekyll serve`
3. Open browser DevTools Console (F12)
4. Check for CSP violation errors
5. Verify the new resource loads correctly

### Step 5: Monitor in Production

After deploying:
- Check browser console for CSP violations
- Verify functionality works as expected
- Use [SecurityHeaders.com](https://securityheaders.com) to validate headers

## Testing Security Headers

### Local Testing

```bash
# Build the site
cd site && bundle exec jekyll build

# Check generated HTML for meta tags
cat site/_site/index.html | grep -A 20 "Security Headers"

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000 and check DevTools Console
```

### Browser DevTools

1. Open DevTools (F12)
2. **Console Tab**: Check for CSP violation errors
3. **Network Tab**: Verify external resources load
4. **Security Tab**: View active security policies
5. **Application Tab**: Check for blocked resources

### Online Security Scanners

After deploying to production:
- [SecurityHeaders.com](https://securityheaders.com) - Comprehensive header analysis
- [Mozilla Observatory](https://observatory.mozilla.org) - Security assessment
- [CSP Evaluator](https://csp-evaluator.withgoogle.com) - CSP validation

## Troubleshooting

### Resource Blocked by CSP

**Symptom:** Browser console shows CSP violation errors like:
```
Refused to load script from 'https://example.com/script.js' because it violates the Content-Security-Policy directive: "script-src 'self' ..."
```

**Solution:**
1. Identify the blocked domain and resource type
2. Add the domain to the appropriate directive in `security.yml`
3. Rebuild and test

### Inline Scripts/Styles Blocked

**Symptom:** Inline `<script>` or `<style>` tags are blocked

**Current Solution:** `'unsafe-inline'` is enabled for backward compatibility

**Better Solution (Future):**
- Use CSP nonces: `<script nonce="random-value">`
- Or use CSP hashes for specific inline blocks
- Requires Jekyll plugin development

### Feature Not Working After Adding Headers

**Debugging Steps:**
1. Check browser console for CSP violations
2. Verify the resource domain is in the correct CSP directive
3. Confirm `security.yml` syntax is valid YAML
4. Test with security headers temporarily disabled:
   ```yaml
   enabled:
     content_security_policy: false
   ```
5. If it works with CSP disabled, the issue is CSP configuration

### Google Analytics Not Tracking

**Required Domains:**
```yaml
script_src:
  - "www.googletagmanager.com"
  - "www.google-analytics.com"
connect_src:
  - "www.google-analytics.com"
img_src:
  - "https:"  # For analytics beacons
```

### Formspree Contact Form Failing

**Required Domain:**
```yaml
connect_src:
  - "formspree.io"
```

## Security Best Practices

### Do's ✅

- **Do** keep `security.yml` up to date with all external resources
- **Do** test locally before deploying CSP changes
- **Do** monitor browser console for violations in production
- **Do** use HTTPS for all external resources
- **Do** document why each external domain is needed
- **Do** regularly review and remove unused external domains
- **Do** keep the CSP as strict as possible

### Don'ts ❌

- **Don't** use `'unsafe-eval'` unless absolutely necessary
- **Don't** add wildcard domains like `https:` for scripts (too permissive)
- **Don't** disable CSP entirely in production
- **Don't** add domains without understanding what they do
- **Don't** forget to test after making changes
- **Don't** use HTTP resources (only HTTPS)

## Current External Resources

The following external domains are currently whitelisted:

| Domain | Purpose | CSP Directives |
|--------|---------|----------------|
| `fonts.googleapis.com` | Google Fonts CSS | `style-src` |
| `fonts.gstatic.com` | Google Fonts files | `font-src` |
| `unpkg.com` | Ionicons, PhotoSwipe CDN | `script-src`, `style-src` |
| `www.googletagmanager.com` | Google Tag Manager | `script-src` |
| `www.google-analytics.com` | Google Analytics | `script-src`, `connect-src` |
| `formspree.io` | Contact form backend | `connect-src` |
| `*.disqus.com` | Disqus comments (optional) | `script-src` |

## Disabling Security Headers

To temporarily disable security headers (for debugging only):

Edit `/site/_data/security.yml`:
```yaml
enabled:
  content_security_policy: false  # Disable CSP
  referrer_policy: false         # Disable referrer policy
  permissions_policy: false      # Disable permissions policy
```

**⚠️ WARNING:** Never deploy to production with security headers disabled.

## Future Improvements

Potential enhancements for stricter security:

1. **CSP Nonces** - Replace `'unsafe-inline'` with nonces for inline scripts/styles
2. **Subresource Integrity (SRI)** - Add integrity hashes for CDN resources
3. **Report-URI** - Set up CSP violation reporting endpoint
4. **Strict CSP** - Migrate to nonce-based or hash-based CSP
5. **HTTP Headers** - Migrate to a host that supports custom HTTP headers

## References

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN: Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
- [MDN: Permissions-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)
- [OWASP: Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [CSP Evaluator by Google](https://csp-evaluator.withgoogle.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Support

If you encounter security-related issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review browser console for specific error messages
3. Verify `security.yml` configuration
4. Test with a minimal CSP to isolate the issue
5. Consult the [References](#references) for CSP syntax and best practices

---

**Last Updated:** 2026-01-02
**Spec:** 002-add-security-headers-for-browser-protection
**Configuration Files:**
- `/site/_data/security.yml` - Security configuration
- `/site/_includes/security-headers.html` - Meta tag template
- `/site/_includes/head.html` - Integration point
