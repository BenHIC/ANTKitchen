#!/usr/bin/env python3
"""
Batch resize and convert images to multiple sizes and WebP.
Saves output to assets/img/optimized with filenames: name-<width>.jpg and name-<width>.webp

Usage: python3 tools/convert_images.py
"""
import os
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / 'assets' / 'img'
OUT_DIR = SRC_DIR / 'optimized'
OUT_DIR.mkdir(parents=True, exist_ok=True)

# sizes (widths) to generate
SIZES = [320, 640, 1200, 1800]

SKIP_NAMES = {'ANTLogo.svg', 'ANTLogo.jpg'}

def process_image(p: Path):
    name = p.stem
    ext = p.suffix.lower()
    if p.name in SKIP_NAMES:
        return
    try:
        img = Image.open(p)
    except Exception as e:
        print(f"Skipping {p.name}: cannot open ({e})")
        return

    for w in SIZES:
        # compute height preserving aspect
        ratio = w / img.width
        h = int(img.height * ratio)
        resized = img.resize((w, h), Image.LANCZOS)
        out_jpg = OUT_DIR / f"{name}-{w}.jpg"
        out_webp = OUT_DIR / f"{name}-{w}.webp"
        try:
            # convert to RGB if needed
            if resized.mode in ("RGBA", "P"):
                bg = Image.new("RGB", resized.size, (255,255,255))
                bg.paste(resized, mask=resized.split()[3] if resized.mode=="RGBA" else None)
                rgb = bg
            else:
                rgb = resized.convert('RGB')
            rgb.save(out_jpg, format='JPEG', quality=82, optimize=True)
            rgb.save(out_webp, format='WEBP', quality=80, method=6)
            print(f"Created: {out_jpg.name}, {out_webp.name}")
        except Exception as e:
            print(f"Failed to save {name}-{w}: {e}")

def main():
    files = [p for p in SRC_DIR.iterdir() if p.is_file() and p.suffix.lower() in ('.jpg','.jpeg','.png')]
    if not files:
        print("No source images found in assets/img")
        return
    for p in files:
        process_image(p)

if __name__ == '__main__':
    main()
