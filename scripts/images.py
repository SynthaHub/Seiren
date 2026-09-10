"""Regenerate the responsive variants in public/placeholders.

Run after replacing any source photograph:

    python scripts/images.py path/to/new-hero.jpg heroAdvisory

or with no arguments to rebuild every slot from the largest variant on disk.

WHY THIS EXISTS. The slots are rendered at wildly different sizes — the hero
fills half a desktop viewport, the three Insights thumbnails display at 112 to
128 CSS pixels. Serving one large file to all of them meant a phone downloaded
roughly 600KB to paint three postage stamps. Sizing each slot to its real
rendered width took the image payload from 2010KB to 774KB, and the hero a
phone actually fetches from 454KB to 63KB.

The widths below MUST stay in step with `placeholders.ts` — that file's
`widths` array is what builds the srcset, and a width here without a matching
entry there is a 404 for some viewport. If a slot's column width changes in the
layout, update `sizes` there as well, or the browser will keep over-fetching.
"""

from __future__ import annotations
import sys, os
from PIL import Image

# slot -> (file stem, [rendered widths, ascending])
# Second width is the retina pair of the first.
PLAN: dict[str, tuple[str, list[int]]] = {
    "heroAdvisory":      ("hero-advisory",      [700, 1400]),
    "teamWorkshop":      ("team-workshop",      [600, 1200]),
    "workspacePortrait": ("workspace-portrait", [420, 840]),
    "nairobiExterior":   ("nairobi-exterior",   [440, 880]),
    "advisorySession":   ("advisory-session",   [160, 320]),
    "officeDesk":        ("office-desk",        [160, 320]),
    "workingDocuments":  ("working-documents",  [160, 320]),
}

OUT = "public/placeholders"
QUALITY = 78  # visually indistinguishable at these sizes; 90 roughly doubles the bytes


def build(stem: str, widths: list[int], source: str) -> None:
    im = Image.open(source).convert("RGB")
    ow, oh = im.size
    for w in widths:
        w = min(w, ow)
        h = round(oh * w / ow)
        path = f"{OUT}/{stem}-{w}.jpg"
        im.resize((w, h), Image.LANCZOS).save(
            path, "JPEG", quality=QUALITY, optimize=True, progressive=True
        )
        print(f"  {path}  {w}x{h}  {os.path.getsize(path) // 1024}KB")


def main() -> int:
    if len(sys.argv) == 3:
        source, slot = sys.argv[1], sys.argv[2]
        if slot not in PLAN:
            print(f"unknown slot {slot!r}; expected one of {', '.join(PLAN)}")
            return 1
        stem, widths = PLAN[slot]
        build(stem, widths, source)
        print(f"\nNow update `intrinsic` and `alt` for {slot} in placeholders.ts.")
        return 0

    for stem, widths in PLAN.values():
        largest = f"{OUT}/{stem}-{widths[-1]}.jpg"
        if not os.path.exists(largest):
            print(f"  skip {stem}: {largest} missing")
            continue
        build(stem, widths, largest)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
