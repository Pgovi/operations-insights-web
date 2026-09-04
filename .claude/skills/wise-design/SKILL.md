---
name: wise-design
description: Apply the Wise-inspired design system (vivid lime accent, pale sage canvas, near-black warm ink, heavy 900-weight display sans, 24px rounded cards). Use when building or restyling UI for this site, or when the user asks for the Wise look, Wise UI, or a friendly fintech aesthetic. Full token spec in DESIGN.md alongside this file.
---

# Wise-inspired design system

Sourced from [awesome-design-md](https://github.com/voltagent/awesome-design-md)
(`design-md/wise/DESIGN.md`). The complete spec — every token, component and
example — is in `DESIGN.md` next to this file. Read it when you need a component
definition; the summary below is enough for most work.

## The idea in one line

A calm Scandinavian fintech magazine, not a bank: generous whitespace, large
rounded white cards on a pale sage ground, one vivid lime accent reserved for
actions, and an unusually heavy display sans carrying every headline.

## Colour tokens

| Token | Hex | Use |
|---|---|---|
| `primary` | `#9fe870` | CTA pills and brand accent. **Actions only** — never body text. |
| `on-primary` | `#0e0f0c` | Text on lime. Never white on lime. |
| `primary-active` | `#cdffad` | Hover/active lift on lime |
| `primary-pale` | `#e2f6d5` | Tinted feature cards, positive badges |
| `ink` | `#0e0f0c` | Headings, dark bands, footer ground |
| `ink-deep` | `#163300` | Deep forest green, secondary dark surfaces |
| `body` | `#454745` | Body copy |
| `mute` | `#868685` | Captions, meta |
| `canvas` | `#ffffff` | Cards |
| `canvas-soft` | `#e8ebe6` | Page ground, hero bands, secondary buttons |
| `positive` / `warning` / `negative` | `#2ead4b` / `#ffd11a` / `#d03238` | Semantic only — separate from the accent |
| `accent-orange` / `accent-cyan` | `#ffc091` / `#38c8ff` | Sparingly, for illustration variety |

## Type

`Wise Sans` is proprietary; the spec's own fallback is **Inter**, so use Inter.

- **Display** — Inter **900**, tight leading (~0.85), negative tracking. Sizes
  40 / 64 / 96 / 126px. This heaviness *is* the brand; do not soften it.
- **Sub-display** — Inter 600 at 24–32px.
- **Body** — Inter 400 at 16px/24px; 20px for lede.
- **Caption** — 12–14px.

## Shape and space

- Cards and buttons: **24px radius** (`rounded.xl`) — the signature. Never sharp corners.
- Icon buttons and badges: full pill.
- Spacing scale: 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48px.

## Component shorthand

- **Primary button** — lime fill, ink text, 24px radius, `12px 24px` padding.
- **Secondary button** — `canvas-soft` fill, ink text, same shape.
- **Tertiary button** — white fill, 1px ink border.
- **Card** — white on the sage ground, 24px radius, 24px padding. Tinted variants
  use `canvas-soft` or `primary-pale`; the dark variant is `ink` ground with
  **lime** text.
- **Input** — white, 1px ink border, 12px radius.
- **Footer** — `ink` ground, `canvas-soft` text.

## Rules that keep it looking like Wise

1. **One accent, for actions only.** Lime marks what you can click. Using it for
   body text or decoration breaks the system.
2. **Ink is warm, not blue-black.** `#0e0f0c` carries an olive cast — don't
   substitute a neutral grey-black.
3. **Ground is sage, cards are white.** Inverting that flattens the whole page.
4. **Let the display weight do the work.** Restraint everywhere else: few borders,
   soft or no shadows, no gradients.
5. **No sharp corners** on any UI element.
