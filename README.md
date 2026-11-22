# Emmanuel Adarighofua — CV site (Abasthan copy)

This is a **copy** of the CV/portfolio static site, prepared for deployment on Abasthan.

The original deployment is **not modified** by this copy:

- Netlify: https://emmanuel-adarighofua-cv.netlify.app
- Vercel: https://emmanuel-cv-alpha.vercel.app

## What is different from the source `cv-site`

- `.env.local` (contained a Vercel OIDC token) and `.vercel/` were **excluded**.
- Canonical / Open Graph / JSON-LD URLs now point to the Netlify original.
- The in-page Share action uses `location.origin`, so sharing from this copy shares this copy's URL.

## Files

Static, no build step. Publish directory: `./`

- `index.html` — entire site (inline CSS/JS)
- `sw.js` — service worker (relative cache paths, works on any origin)
- `manifest.webmanifest`, `icons/`, `og.png`, `qr-contact.svg`
- `contact.vcf`, `Emmanuel-Adarighofua-CV.pdf`

## Sanity check

```bash
node check.cjs
```

