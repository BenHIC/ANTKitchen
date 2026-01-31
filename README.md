# ANTKitchen — One-page bakery site

Overview
--------
This is a simple, static, single-page website for ANTKitchen built with plain HTML, CSS (Bootstrap) and vanilla JavaScript. It includes bilingual support (Chinese/English), responsive images, and basic contact form behavior (demo only).

Project structure
-----------------
- assets/css/styles.css — main stylesheet
- assets/js/script.js — modular front-end logic (i18n, UI helpers, form handler)
- assets/img — source images
- assets/img/optimized — generated multi-size JPG and WebP images
- index.html — single-page site
- tools/convert_images.py — Python script to generate JPG/WebP variants

Run locally
-----------
Preview the site with a simple static server from the project root:
```bash
cd /Users/Desktop/Web
python3 -m http.server 8000
# then open http://localhost:8000
```

Regenerating optimized images
-----------------------------
The project comes with `tools/convert_images.py` which uses Pillow to create multiple JPG and WebP variants in `assets/img/optimized`.

1) Install Pillow (if necessary):
```bash
python3 -m pip install --user --upgrade Pillow
```

2) Run the conversion script:
```bash
python3 tools/convert_images.py
```

Alternative: if you prefer `cwebp` (from Homebrew), you can convert existing JPGs with:
```bash
# brew install webp
cwebp -q 80 input.jpg -o output.webp
```

Notes for engineers
-------------------
- Translations are in `assets/js/script.js` (TRANSLATIONS object). The runtime applies translations to elements with `data-i18n` attributes.
- Product images use `<picture>` with WebP `<source>` and JPG fallback; optimized images are in `assets/img/optimized`.
- The contact form is a demo (no backend). Form submission is handled in the browser and shows an alert.