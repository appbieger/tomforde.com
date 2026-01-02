# Feature Verification Test Plan
## Security Headers Implementation - Manual Testing Checklist

**Test Date:** _____________
**Tested By:** _____________
**Environment:** Production / Staging / Local
**Browser:** _____________
**Browser Version:** _____________

---

## Pre-Test Setup

### 1. Deploy the Site
- [ ] Build Jekyll site: `bundle exec jekyll build`
- [ ] Serve locally: `bundle exec jekyll serve` OR deploy to GitHub Pages
- [ ] Open browser DevTools (F12)
- [ ] Navigate to Console tab to monitor CSP violations

### 2. Verify Security Headers Are Present
- [ ] Open any page on the site
- [ ] View page source (Ctrl+U / Cmd+U)
- [ ] Verify the following meta tags are present in `<head>`:
  - [ ] `<meta http-equiv="Content-Security-Policy" content="...">`
  - [ ] `<meta name="referrer" content="strict-origin-when-cross-origin">`
  - [ ] `<meta http-equiv="Permissions-Policy" content="...">`

### 3. Baseline Console Check
- [ ] Open browser console
- [ ] Refresh the page
- [ ] **VERIFY:** No CSP violation errors appear (look for messages starting with "Refused to...")

---

## Test 1: Google Fonts Loading

**CSP Directives Tested:**
- `style-src 'self' 'unsafe-inline' fonts.googleapis.com unpkg.com`
- `font-src 'self' fonts.gstatic.com`

### Test Steps:
1. [ ] Open any page on the site (home page recommended)
2. [ ] **VISUAL CHECK:** Verify text is rendered in the correct "Inter" font family (not default system font)
3. [ ] **DevTools Check:**
   - [ ] Open Network tab in DevTools
   - [ ] Filter by "Font" type
   - [ ] Refresh the page
   - [ ] **VERIFY:** Fonts from `fonts.gstatic.com` load successfully (Status: 200)
4. [ ] **Console Check:** No CSP violations related to fonts
5. [ ] **Elements Check:**
   - [ ] Inspect any text element
   - [ ] Computed styles should show `font-family: Inter, ...`

**Expected Result:** ✅ Google Fonts load correctly, text displays in Inter font family

**Status:** [ ] PASS  [ ] FAIL
**Notes:** _______________________________________________

---

## Test 2: PhotoSwipe Lightbox Functionality

**CSP Directives Tested:**
- `script-src 'self' 'unsafe-inline' unpkg.com ...`
- `style-src 'self' 'unsafe-inline' fonts.googleapis.com unpkg.com`

### Test Steps:
1. [ ] Navigate to any page with a gallery or images (check portfolio/project pages)
2. [ ] **VISUAL CHECK:** Images should be displayed on the page
3. [ ] **DevTools Check:**
   - [ ] Open Network tab
   - [ ] Filter by "JS" and "CSS"
   - [ ] Refresh the page
   - [ ] **VERIFY:** PhotoSwipe files load from `unpkg.com`:
     - [ ] `photoswipe@5/dist/photoswipe-lightbox.esm.min.js` (Status: 200)
     - [ ] `photoswipe@5/dist/photoswipe.esm.min.js` (Status: 200)
     - [ ] `photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.esm.js` (Status: 200)
     - [ ] `photoswipe@5/dist/photoswipe.css` (Status: 200)
     - [ ] `photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css` (Status: 200)
4. [ ] **FUNCTIONALITY CHECK:**
   - [ ] Click on any image in a gallery
   - [ ] **VERIFY:** PhotoSwipe lightbox opens (full-screen overlay)
   - [ ] **VERIFY:** Can navigate between images (left/right arrows or swipe)
   - [ ] **VERIFY:** Can zoom images (if zoom enabled)
   - [ ] **VERIFY:** Can close lightbox (X button or ESC key)
   - [ ] **VERIFY:** Image captions display (if present)
5. [ ] **Console Check:** No CSP violations or JavaScript errors

**Expected Result:** ✅ PhotoSwipe lightbox works correctly, all interactions functional

**Status:** [ ] PASS  [ ] FAIL
**Notes:** _______________________________________________

---

## Test 3: Google Analytics Tracking

**CSP Directives Tested:**
- `script-src 'self' 'unsafe-inline' unpkg.com www.googletagmanager.com www.google-analytics.com ...`
- `connect-src 'self' www.google-analytics.com formspree.io`
- `img-src 'self' data: https:`

### Test Steps:
1. [ ] Open any page on the site
2. [ ] **DevTools Check:**
   - [ ] Open Network tab
   - [ ] Filter by "JS"
   - [ ] Refresh the page
   - [ ] **VERIFY:** Google Analytics script loads:
     - [ ] Request to `www.googletagmanager.com/gtag/js?id=...` (Status: 200)
3. [ ] **Console Check:**
   - [ ] Open Console tab
   - [ ] Type `window.dataLayer` and press Enter
   - [ ] **VERIFY:** Returns an array (not undefined)
   - [ ] Type `gtag` and press Enter
   - [ ] **VERIFY:** Returns a function (not undefined)
4. [ ] **Analytics Tracking Check:**
   - [ ] Open Network tab
   - [ ] Filter by "XHR" or "Fetch" or "Other"
   - [ ] Navigate to a different page on the site
   - [ ] **VERIFY:** Analytics beacon requests to `www.google-analytics.com/...` appear
5. [ ] **Console Check:** No CSP violations related to Google Analytics
6. [ ] **Privacy Check (DSGVO):**
   - [ ] Check console for any errors related to cookie consent
   - [ ] Verify IP anonymization is configured (check script in source)

**Expected Result:** ✅ Google Analytics loads and tracks page views correctly

**Status:** [ ] PASS  [ ] FAIL
**Notes:** _______________________________________________

---

## Test 4: Contact Form Submission to Formspree

**CSP Directives Tested:**
- `connect-src 'self' www.google-analytics.com formspree.io`
- ~~`form-action 'self' formspree.io`~~ (Note: form-action removed from CSP, using connect-src)

### Test Steps:
1. [ ] Navigate to the Contact page (`/contact/`)
2. [ ] **VISUAL CHECK:** Contact form displays correctly
3. [ ] **Form Submission Check:**
   - [ ] Fill out all form fields:
     - [ ] Name: "Test User"
     - [ ] Email: "test@example.com"
     - [ ] Message: "This is a test message for CSP verification"
   - [ ] Open Network tab in DevTools
   - [ ] Click the submit button
   - [ ] **VERIFY:** Form submits to `formspree.io/f/...` (check Network tab)
   - [ ] **VERIFY:** Formspree responds (check response status)
4. [ ] **Success Handling Check:**
   - [ ] **VERIFY:** After submission, one of these occurs:
     - [ ] Success message displays on the page
     - [ ] OR page redirects to success confirmation
5. [ ] **Console Check:** No CSP violations during form submission
6. [ ] **Email Check (if possible):**
   - [ ] Check the configured email address
   - [ ] **VERIFY:** Test message was received

**Expected Result:** ✅ Contact form submits successfully to Formspree

**Status:** [ ] PASS  [ ] FAIL
**Notes:** _______________________________________________

---

## Test 5: Social Share Buttons

**CSP Directives Tested:**
- `script-src 'self' 'unsafe-inline' ...` (for inline onclick handlers)

### Test Steps:
1. [ ] Navigate to any blog post or article page
2. [ ] **VISUAL CHECK:** Social share buttons are visible
3. [ ] Scroll to the social share section (usually near the bottom of the post)
4. [ ] **VERIFY:** Share buttons are present for:
   - [ ] X (Twitter)
   - [ ] Facebook
   - [ ] Pinterest
   - [ ] LinkedIn
5. [ ] **Functionality Check - Test each button:**

   **X (Twitter) Share:**
   - [ ] Click the X/Twitter share button
   - [ ] **VERIFY:** A popup window opens (not blocked)
   - [ ] **VERIFY:** X share dialog loads with the post title and URL
   - [ ] Close the popup

   **Facebook Share:**
   - [ ] Click the Facebook share button
   - [ ] **VERIFY:** A popup window opens
   - [ ] **VERIFY:** Facebook share dialog loads with the post URL
   - [ ] Close the popup

   **Pinterest Share:**
   - [ ] Click the Pinterest share button
   - [ ] **VERIFY:** A popup window opens
   - [ ] **VERIFY:** Pinterest pin dialog loads with the post image and URL
   - [ ] Close the popup

   **LinkedIn Share:**
   - [ ] Click the LinkedIn share button
   - [ ] **VERIFY:** A popup window opens
   - [ ] **VERIFY:** LinkedIn share dialog loads with the post title and URL
   - [ ] Close the popup

6. [ ] **Console Check:** No CSP violations when clicking share buttons
7. [ ] **Icons Check:**
   - [ ] **VERIFY:** Social media icons display correctly (from Ionicons)
   - [ ] Check Network tab: Ionicons CSS loaded from `unpkg.com` (Status: 200)

**Expected Result:** ✅ All social share buttons work correctly and open share dialogs

**Status:** [ ] PASS  [ ] FAIL
**Notes:** _______________________________________________

---

## Test 6: Ionicons Display

**CSP Directives Tested:**
- `style-src 'self' 'unsafe-inline' fonts.googleapis.com unpkg.com`
- `font-src 'self' fonts.gstatic.com`

### Test Steps:
1. [ ] Navigate to the home page
2. [ ] **VISUAL CHECK:** Icons throughout the site display correctly:
   - [ ] Social media icons in footer
   - [ ] Navigation icons (if any)
   - [ ] Share button icons
   - [ ] "Back to top" arrow icon
3. [ ] **DevTools Check:**
   - [ ] Open Network tab
   - [ ] Filter by "CSS"
   - [ ] Refresh the page
   - [ ] **VERIFY:** Ionicons CSS loads from `unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css` (Status: 200)
4. [ ] **Console Check:** No CSP violations related to Ionicons

**Expected Result:** ✅ Icons display correctly throughout the site

**Status:** [ ] PASS  [ ] FAIL
**Notes:** _______________________________________________

---

## Test 7: Disqus Comments (Optional)

**CSP Directives Tested:**
- `script-src 'self' 'unsafe-inline' ... *.disqus.com`

**Note:** Disqus comments may be disabled on the site. Only test if enabled.

### Test Steps:
1. [ ] Navigate to a blog post page
2. [ ] Scroll to the bottom of the post
3. [ ] **CHECK:** Is Disqus comment section present?
   - [ ] YES - Continue with tests below
   - [ ] NO - Mark as "N/A - Disqus disabled"

**If Disqus is enabled:**
4. [ ] **VISUAL CHECK:** Disqus comment section displays
5. [ ] **Lazy Loading Check:**
   - [ ] Scroll near the comment section (within ~150px)
   - [ ] **VERIFY:** Disqus iframe loads dynamically
6. [ ] **DevTools Check:**
   - [ ] Open Network tab
   - [ ] **VERIFY:** Requests to `*.disqus.com` load successfully
7. [ ] **Console Check:** No CSP violations related to Disqus
8. [ ] **Functionality Check:**
   - [ ] **VERIFY:** Can view existing comments (if any)
   - [ ] **VERIFY:** Comment form appears
   - [ ] **VERIFY:** Can interact with Disqus (login prompt appears if not logged in)

**Expected Result:** ✅ Disqus comments load and function correctly (if enabled)

**Status:** [ ] PASS  [ ] FAIL  [ ] N/A
**Notes:** _______________________________________________

---

## Test 8: General CSP Compliance

### Console Violations Check
After completing all tests above, perform a final comprehensive check:

1. [ ] Open Console tab in DevTools
2. [ ] Scroll through all console messages
3. [ ] **VERIFY:** No messages starting with:
   - [ ] "Refused to load the script..."
   - [ ] "Refused to load the stylesheet..."
   - [ ] "Refused to load the font..."
   - [ ] "Refused to load the image..."
   - [ ] "Refused to connect to..."
   - [ ] "Refused to execute inline script..."

### Browser Compatibility Check
Repeat critical tests in different browsers:

- [ ] **Chrome/Chromium** (Version: _____)
  - Google Fonts: [ ] PASS [ ] FAIL
  - PhotoSwipe: [ ] PASS [ ] FAIL
  - Analytics: [ ] PASS [ ] FAIL
  - Contact Form: [ ] PASS [ ] FAIL
  - Share Buttons: [ ] PASS [ ] FAIL

- [ ] **Firefox** (Version: _____)
  - Google Fonts: [ ] PASS [ ] FAIL
  - PhotoSwipe: [ ] PASS [ ] FAIL
  - Analytics: [ ] PASS [ ] FAIL
  - Contact Form: [ ] PASS [ ] FAIL
  - Share Buttons: [ ] PASS [ ] FAIL

- [ ] **Safari** (Version: _____)
  - Google Fonts: [ ] PASS [ ] FAIL
  - PhotoSwipe: [ ] PASS [ ] FAIL
  - Analytics: [ ] PASS [ ] FAIL
  - Contact Form: [ ] PASS [ ] FAIL
  - Share Buttons: [ ] PASS [ ] FAIL

---

## Final Acceptance Criteria

All of the following must be true for the implementation to be considered successful:

- [ ] Content-Security-Policy meta tag is present in all pages
- [ ] Referrer-Policy meta tag is present in all pages
- [ ] Permissions-Policy meta tag is present in all pages
- [ ] Google Fonts load correctly on all pages
- [ ] PhotoSwipe lightbox opens and functions correctly
- [ ] Google Analytics loads and tracks page views
- [ ] Contact form submits successfully to Formspree
- [ ] All social share buttons work correctly
- [ ] Ionicons display correctly throughout the site
- [ ] Disqus comments work (if enabled) or N/A
- [ ] **No CSP violation errors appear in browser console**
- [ ] All features work across Chrome, Firefox, and Safari

---

## Test Results Summary

**Overall Status:** [ ] ✅ ALL TESTS PASSED  [ ] ❌ FAILURES DETECTED

**Total Tests:** _____
**Passed:** _____
**Failed:** _____
**N/A:** _____

**Critical Issues Found:**
_____________________________________________
_____________________________________________
_____________________________________________

**Recommendations:**
_____________________________________________
_____________________________________________
_____________________________________________

**Sign-off:**

Tester Name: _____________________
Signature: _____________________
Date: _____________________

---

## Troubleshooting Guide

### If CSP Violations Are Detected:

1. **Identify the violation:**
   - Read the console error message carefully
   - Note which directive is being violated (script-src, style-src, etc.)
   - Note the domain or resource being blocked

2. **Check the CSP configuration:**
   - Open `site/_data/security.yml`
   - Locate the relevant CSP directive
   - Verify the domain is in the allowed list

3. **Add missing domain:**
   - Add the domain to the appropriate array in `security.yml`
   - Rebuild and test again

### Common Issues:

**Issue: Inline scripts blocked**
- Solution: Ensure 'unsafe-inline' is in script-src (already configured)

**Issue: External resource blocked**
- Solution: Add the domain to the appropriate CSP directive in security.yml

**Issue: Form submission fails**
- Solution: Verify formspree.io is in connect-src (already configured)

**Issue: PhotoSwipe doesn't open**
- Solution: Check console for errors, verify unpkg.com is in script-src and style-src

---

**Document Version:** 1.0
**Created:** 2026-01-02
**Last Updated:** 2026-01-02
