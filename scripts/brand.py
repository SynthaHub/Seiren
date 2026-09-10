"""Turn the supplied brand artwork into the web assets the site serves.

    python scripts/brand.py

Reads originals from `brand/`, writes to `public/brand/`. Re-run after the
client supplies new artwork. Nothing in `public/brand/` should be hand-edited.

This script does NOT touch the favicons. The client supplied real icon artwork
(`brand/favicon_light.svg`, `brand/icon_192.png`, `brand/icon_512.png`), which
is copied to `public/` as-is and is better than anything generated from a raster
mark. An earlier version of this script produced them; it would now overwrite
the client's own files.

WHICH ARTWORK THE SITE USES, AND WHY

The client supplied fourteen files: a standalone mark, a standalone wordmark,
and horizontal and stacked lockups, each in primary, reversed and mono cuts.
The site chrome uses the HORIZONTAL lockup — mark and wordmark side by side.
The stacked cuts are close to square (ratio 0.92) and would either tower over a
72px header bar or shrink the name to nothing; the horizontal cut is 2.98:1 and
sits in that bar at a readable size. The stacked files are kept in `brand/` and
are a one-line swap here if the client prefers them.

    light grounds   lockup_horizontal_primary.png    navy, gold rule, green PARTNERS
    navy grounds    lockup_horizontal_reversed.png   white, gold rule, gold PARTNERS

THE REVERSED FILE KEEPS ITS NAVY GROUND, DELIBERATELY. It is opaque navy to the
canvas edge, and that navy is #1B2A4A — byte-identical to `--seiran-navy`, the
colour of every `.on-navy` band. So it composites invisibly, and its edges stay
antialiased against the exact colour they will sit on, which is better than any
alpha key could manage on multi-coloured artwork. Keying it out would also be
guesswork: you cannot uniquely recover colour and alpha from a flattened pixel
when the art is white AND gold. If the navy token ever changes, this file must
be re-exported against the new colour or a seam will appear.

NEITHER FILE IS TRIMMED. Both share a 2000x672 canvas, so leaving them uncropped
is what guarantees the two variants occupy the same box and swap without shifting
a pixel. Trimming the transparent one to its artwork bounds would break that.
"""

from __future__ import annotations
import os
from PIL import Image

SRC, OUT = "brand", "public/brand"
NAVY, WHITE = (27, 42, 74), (255, 255, 255)
ALPHA_FLOOR = 24  # below this is compression noise, not artwork


def emit(im: Image.Image, stem: str, widths: list[int]) -> None:
    os.makedirs(OUT, exist_ok=True)
    for w in widths:
        h = round(im.size[1] * w / im.size[0])
        p = f"{OUT}/{stem}-{w}.png"
        im.resize((w, h), Image.LANCZOS).save(p, optimize=True)
        print(f"  {p}  {w}x{h}  {os.path.getsize(p) // 1024}KB")


def trim(im: Image.Image) -> Image.Image:
    mask = im.split()[-1].point(lambda p: 255 if p > ALPHA_FLOOR else 0)
    box = mask.getbbox()
    return im.crop(box) if box else im


def main() -> int:
    light = Image.open(f"{SRC}/lockup_horizontal_primary.png").convert("RGBA")
    navy = Image.open(f"{SRC}/lockup_horizontal_reversed.png").convert("RGBA")

    assert light.size == navy.size, (
        f"lockup canvases differ ({light.size} vs {navy.size}). They must match, "
        "or the light and reversed variants will shift when they swap."
    )

    emit(light, "lockup", [320, 640])
    emit(navy, "lockup-reversed", [320, 640])

    mark = trim(Image.open(f"{SRC}/mark_mono.png").convert("RGBA"))
    emit(mark, "mark", [128, 512])

    ratio = light.size[0] / light.size[1]
    print(f"\n  lockup aspect ratio {ratio:.4f} ({light.size[0]} x {light.size[1]})")
    print("  keep this in sync with RATIO in src/app/layout/Wordmark.tsx")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
