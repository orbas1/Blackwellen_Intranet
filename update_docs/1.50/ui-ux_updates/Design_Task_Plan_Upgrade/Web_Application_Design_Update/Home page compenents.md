# Home Page Component Map

| Section | Components (Code) | Description |
|---------|-------------------|-------------|
| Navigation | `HP-NAV-001`, `HP-NAV-004`, `HP-DRO-005` | Transparent nav that becomes glassmorphic after 16px scroll; includes CTA button and dropdown for Solutions. |
| Hero | `HP-HERO-002`, `HP-HERO-003`, `HP-HERO-004`, `HP-HERO-005` | Left text stack with 48px headline, supporting copy, CTA pair; right illustration 640x480 with parallax. |
| Metrics Strip | `HP-CARD-007a`, `HP-CARD-007b`, `HP-CARD-007c`, `HP-CARD-007d` | Four KPI capsules using copper icons and animated counters. |
| Solutions Overview | `HP-SEC-010a-c` | Three feature blocks each with icon (80px), title 24px, body 18px, "Explore" link. |
| Customer Logos | `HP-SEC-011`, logos `HP-LOGO-012a-l` | Grid of 12 logos with hover lighten effect; logos sourced from `/assets/media/logos/`. |
| Testimonials | `HP-WID-013`, `HP-CARD-013a-c` | Carousel of 3 quote cards with avatars (64px) and company logos (48px). |
| Resource CTA | `HP-SEC-014`, `HP-BTN-016a-b` | Gradient banner encouraging download of whitepaper/app, includes store badges. |
| Footer | `HP-FTR-015`, `HP-LNK-015a-d`, `HP-FRM-015e` | Four-column layout with newsletter form, social icons 24px. |

## Interaction Notes
- `HP-HERO-004` CTA primary triggers smooth scroll to product section using `react-scroll`. Secondary opens modal `HP-MOD-017` (video overview, 960x540).
- Metrics counters animate from 0 using `framer-motion` `useSpring` when `IntersectionObserver` indicates 40% visibility.
- `HP-WID-013` carousel loops with `swiper@9` (coverflow effect), includes keyboard navigation and ARIA live region updates.
- Footer newsletter form `HP-FRM-015e` validates email with regex, displays inline error (#D95050) and success toast `HP-TOAST-018`.

## Imagery Placement
- Hero illustration stored at `/assets/media/illustrations/operations-dashboard.svg`; ensure retina optimized.
- Workflow background texture `HP-TEX-010` (subtle grid) applied at 12% opacity behind Solutions section.
- Testimonial avatars in `/assets/media/customers/` sized 320x320, auto-cropped to 64px with copper border.
