# 21 Knots website

Redesigned website for [21 Knots](https://21-knots.com), a design, engineering and consulting firm for the maritime and oil & gas industry.

57 pages (home, about, 3 service areas, 16 services, 25 sub-services, projects, careers, contact, policies) in one self-contained, dependency-free `index.html`. Original WordPress URLs are preserved.

## Structure

| Path | What it is |
|---|---|
| `index.html` | The built site. Deploy this. |
| `src/` | Source, split by concern: styles (`01-head.html`), page shell, `CONTENT` data, line art, globe land data, page views, motion + router |
| `assets/` | Logo, ship, team and leadership images as base64 data URIs, inlined at build time |
| `build.sh` | Rebuilds `index.html` from `src/` and `assets/` |
| `vercel.json`, `.htaccess` | Redirects, SPA fallback and security headers for Vercel or Apache |
| `sitemap.xml`, `robots.txt`, `.well-known/security.txt` | SEO and security files |
| `docs/` | URL migration audit, security audit, website guide (PDF) |
| `guide/` | Source of the website guide |

## Editing content

All text, offices, people and projects live in the `CONTENT` object in `src/03-content.js`. Edit it, then run:

```sh
sh build.sh
```

## Deploying

1. Add `<script>window.SITE_ROUTER = "path"</script>` before the site scripts so pages use `/design-services/` instead of `#design-services`.
2. Deploy the repository root (Vercel picks up `vercel.json`; on Apache, `.htaccess` applies).
3. To send contact form messages, set `window.SITE_FORM_ENDPOINT` to an https form service and add its domain to `connect-src` in the Content-Security-Policy.
4. Submit `https://21-knots.com/sitemap.xml` in Google Search Console.

See `docs/MIGRATION-AND-AUDIT.md` and `docs/SECURITY-AUDIT.md` for details and open items.
