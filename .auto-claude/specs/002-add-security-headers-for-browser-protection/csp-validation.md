# CSP Policy Validation

## Content Security Policy Directives

```
default-src 'self';
script-src 'self' 'unsafe-inline' unpkg.com www.googletagmanager.com www.google-analytics.com *.disqus.com;
style-src 'self' 'unsafe-inline' fonts.googleapis.com unpkg.com;
font-src 'self' fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' www.google-analytics.com formspree.io;
frame-ancestors 'self'
```

---

## Resource Validation Against CSP

### 1. Stylesheets (style-src)

| Resource | Domain | Allowed? | Directive Match |
|----------|--------|----------|-----------------|
| `/assets/main.css` | self | ✅ Yes | 'self' |
| `https://fonts.googleapis.com/css2?family=Inter:...` | fonts.googleapis.com | ✅ Yes | fonts.googleapis.com |
| `https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css` | unpkg.com | ✅ Yes | unpkg.com |
| `https://unpkg.com/photoswipe@5/dist/photoswipe.css` | unpkg.com | ✅ Yes | unpkg.com |
| `https://unpkg.com/photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css` | unpkg.com | ✅ Yes | unpkg.com |
| Inline styles (if any) | inline | ✅ Yes | 'unsafe-inline' |

**Result: ✅ All stylesheets allowed**

---

### 2. Fonts (font-src)

| Resource | Domain | Allowed? | Directive Match |
|----------|--------|----------|-----------------|
| Google Fonts files (woff2, woff, ttf) | fonts.gstatic.com | ✅ Yes | fonts.gstatic.com |
| Local fonts (if any) | self | ✅ Yes | 'self' |

**Result: ✅ All fonts allowed**

---

### 3. Scripts (script-src)

Based on common Jekyll site patterns and the external resources documented:

| Resource | Domain | Allowed? | Directive Match |
|----------|--------|----------|-----------------|
| `/js/*.js` (local scripts) | self | ✅ Yes | 'self' |
| `https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js` | unpkg.com | ✅ Yes | unpkg.com |
| `https://unpkg.com/photoswipe@5/dist/photoswipe.umd.min.js` | unpkg.com | ✅ Yes | unpkg.com |
| `https://unpkg.com/photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.umd.min.js` | unpkg.com | ✅ Yes | unpkg.com |
| Google Analytics (gtag.js) | www.googletagmanager.com | ✅ Yes | www.googletagmanager.com |
| Google Analytics (analytics.js) | www.google-analytics.com | ✅ Yes | www.google-analytics.com |
| Disqus embed script | *.disqus.com | ✅ Yes | *.disqus.com |
| Inline scripts (GA initialization, PhotoSwipe init) | inline | ✅ Yes | 'unsafe-inline' |

**Result: ✅ All scripts allowed**

---

### 4. Images (img-src)

| Resource | Domain | Allowed? | Directive Match |
|----------|--------|----------|-----------------|
| `/images/*` (local images) | self | ✅ Yes | 'self' |
| `/favicon.ico` | self | ✅ Yes | 'self' |
| Data URIs (e.g., data:image/svg+xml) | data: | ✅ Yes | data: |
| External images via HTTPS | any HTTPS domain | ✅ Yes | https: |
| Google Analytics tracking pixel | www.google-analytics.com | ✅ Yes | https: |

**Result: ✅ All images allowed**

---

### 5. Connect (connect-src)

XHR, Fetch, WebSocket, EventSource connections:

| Resource | Domain | Allowed? | Directive Match |
|----------|--------|----------|-----------------|
| API calls to same origin | self | ✅ Yes | 'self' |
| Google Analytics beacons | www.google-analytics.com | ✅ Yes | www.google-analytics.com |
| Formspree form submission | formspree.io | ✅ Yes | formspree.io |

**Result: ✅ All connections allowed**

---

### 6. Frame Ancestors (frame-ancestors)

| Scenario | Allowed? | Result |
|----------|----------|--------|
| Embedding site in iframe on same domain | ✅ Yes | 'self' allows same-origin framing |
| Embedding site in iframe on external domain | ❌ No | Clickjacking protection active |

**Result: ✅ Clickjacking protection enabled**

⚠️ **Note:** `frame-ancestors` in meta tags may not be supported by all browsers. This directive is most effective when set via HTTP headers.

---

## Potential CSP Violations to Watch For

### Low Risk

1. **Disqus Third-Party Resources**
   - Disqus may load additional resources from other domains
   - Monitor console for violations if using Disqus
   - May need to add additional domains like `c.disqus.com`, `disquscdn.com`

### Medium Risk

2. **Google Analytics Tag Manager**
   - GTM may trigger other tags/pixels
   - Monitor if using GTM for additional integrations
   - May need `img-src` additions for third-party pixels

3. **Inline Event Handlers**
   - `onclick`, `onerror`, etc. are blocked even with 'unsafe-inline'
   - Use addEventListener instead
   - Verify no inline event handlers in HTML

### No Risk (Already Handled)

4. **'unsafe-inline' Required**
   - PhotoSwipe requires inline script initialization
   - Google Analytics uses inline gtag() initialization
   - Already allowed via 'unsafe-inline' in script-src

5. **'unsafe-inline' for Styles**
   - Some components may use inline styles
   - Already allowed via 'unsafe-inline' in style-src

---

## Testing Checklist

When site is built and served, test in browser console:

### Chrome DevTools
```
1. Open DevTools (F12)
2. Go to Console tab
3. Filter for "Content Security Policy"
4. Look for red CSP violation errors
5. Test each feature:
   - Load homepage
   - Navigate to different pages
   - Open image lightbox (PhotoSwipe)
   - Submit contact form
   - Check if Disqus loads (if enabled)
```

### Firefox DevTools
```
1. Open DevTools (F12)
2. Go to Console tab
3. Look for CSP warnings/errors (orange/red)
4. Repeat feature tests
```

### Expected Console Output
- ✅ No CSP violation errors
- ✅ Resources load successfully
- ✅ All JavaScript executes normally
- ✅ Forms submit correctly

---

## Recommendations

### If CSP Violations Occur:

1. **Identify the Blocked Resource**
   - Check console error message for domain
   - Note the directive that blocked it (script-src, style-src, etc.)

2. **Verify the Resource is Legitimate**
   - Confirm it's needed for site functionality
   - Check if it's a third-party sub-resource

3. **Update Configuration**
   ```yaml
   # Add to site/_data/security.yml under appropriate directive
   csp:
     script_src:
       - "new-domain.com"  # Add new domain
   ```

4. **Rebuild and Retest**

### Security Best Practices:

- ✅ Use `'strict-dynamic'` if migrating to CSP Level 3 (future enhancement)
- ✅ Avoid `'unsafe-eval'` - not currently needed
- ✅ Monitor CSP reports (requires report-uri or report-to - not available in meta tags)
- ✅ Regularly audit external dependencies

---

## Conclusion

**Status: ✅ CSP Policy Validated**

All currently identified external resources are covered by the CSP policy:
- ✅ Google Fonts (CSS and font files)
- ✅ unpkg.com (Ionicons, PhotoSwipe)
- ✅ Google Analytics (scripts and beacons)
- ✅ Formspree (form submission endpoint)
- ✅ Disqus (comment platform)

**No CSP violations are expected for standard site functionality.**

Manual browser testing is still required to confirm no violations occur in practice.
