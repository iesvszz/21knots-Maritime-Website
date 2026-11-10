# 21 Knots website: security audit

Date: 10 November 2026 · Scope: the redesigned site (`index.html`), its deployment files (`vercel.json`, `.htaccess`), and how it will be hosted.

## Summary

The site is a static single-page site with no login, no database and no server code, so its attack surface is small. The audit found **3 issues in the page code and 6 gaps in hosting configuration**. All of them are fixed in this release. Three items need action from 21 Knots when the site goes live (section 4).

| Area | Finding | Risk | Status |
|---|---|---|---|
| Page code | Text inserted into the page without escaping in 3 places (form confirmation, animated headings, hover labels) | Medium (cross-site scripting through form input) | Fixed |
| Page code | Malformed web address (`#%`) crashed the page router | Low | Fixed |
| Page code | External links did not block referrer leakage | Low | Fixed (`noopener noreferrer`, referrer policy) |
| Contact form | No spam protection | Medium | Fixed (hidden honeypot field, minimum fill time, one message per 30 s) |
| Contact form | No input length limits or control-character stripping | Low | Fixed (limits on every field; line breaks removed from name and subject) |
| Contact form | Form endpoint could be plain http, sent cookies, could hang | Low | Fixed (https only, no cookies, 15 s timeout) |
| Hosting | No Content-Security-Policy | High | Fixed (strict CSP in `vercel.json` and `.htaccess`) |
| Hosting | No HSTS, clickjacking or MIME-sniffing protection | Medium | Fixed (HSTS, `X-Frame-Options: DENY`, `nosniff`) |
| Hosting | No permissions or cross-origin policies | Low | Fixed (`Permissions-Policy`, `COOP`, `CORP`) |
| Hosting | Old WordPress endpoints (`/wp-login.php`, `/xmlrpc.php`, `/wp-admin/`) still probed by bots | Medium | Fixed (retired with 410 / redirect) |
| Hosting | Directory listing and hidden/backup files reachable on Apache | Low | Fixed (`Options -Indexes`, deny rule) |
| Hosting | No security contact for researchers | Low | Fixed (`/.well-known/security.txt`) |

## 1. Page code

- **Output escaping.** Every piece of content written into the page now passes through an HTML-escaping function. The form confirmation previously echoed the visitor's name and email unescaped. Routing only renders pages from a fixed list, so a crafted address cannot inject content.
- **No dangerous APIs.** No `eval`, `new Function` or `document.write`. No third-party scripts are loaded at all; the only outside resource is the Google Fonts stylesheet.
- **No secrets in the code.** No API keys, tokens or passwords. The form endpoint is a public URL by design.
- **Images.** Logos, portraits and the team photo are embedded as data URIs, so no external image hosts are trusted.

## 2. Contact form

- Hidden honeypot field: bots that fill it are silently ignored.
- Messages sent within 2.5 seconds of opening the page are rejected; one message per 30 seconds per visitor.
- Length limits: name 80, email 120, phone 20, subject 120, message 180 characters. Control characters are removed.
- When `window.SITE_FORM_ENDPOINT` is set, data is sent only over https, without cookies, with a 15-second timeout. Without an endpoint, nothing leaves the browser: the visitor's own email app sends the message.
- **Server side (your form service) must still** validate input, rate-limit by IP, and never echo input back unescaped. Client-side checks only stop casual abuse.

## 3. Hosting headers

Set in both `vercel.json` (Vercel) and `.htaccess` (Apache). They were tested by loading the site under the policy with no violations.

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self';
  form-action 'self'; object-src 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

`'unsafe-inline'` is needed because the site ships as one self-contained file. When it is split into separate `.js` files (or ported to Next.js), replace it with nonces or hashes.

## 4. Action needed from 21 Knots

1. **Form endpoint:** when you connect a form service, add its domain to `connect-src` in the CSP, for example `connect-src 'self' https://formspree.io`.
2. **HSTS preload:** only keep `preload` if every subdomain of 21-knots.com serves https. Otherwise remove the word `preload`.
3. **security.txt:** confirm `info@21-knots.com` is the right address for security reports and renew the `Expires` date yearly.
4. **Retire WordPress fully** after launch: remove the old install, database and admin accounts from the server, and change any shared hosting passwords.
5. **Self-host the font (optional, privacy):** serving DM Sans from your own domain removes the only third-party request and lets you drop the Google domains from the CSP.

## 5. Re-test checklist

- [ ] https://securityheaders.com shows grade A or A+
- [ ] https://observatory.mozilla.org passes
- [ ] Contact form: honeypot, fast-submit and 30-second limits behave as above
- [ ] `/wp-login.php` and `/xmlrpc.php` return 410
- [ ] `/.well-known/security.txt` is reachable
