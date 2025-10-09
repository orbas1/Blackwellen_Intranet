# Home Page Organisation

## Structural Blueprint
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ HP-NAV-001 72px height (transparent until scroll)                           │
├──────────────────────────────────────────────────────────────────────────────┤
│ HERO ROW (HP-HERO-001)                                                      │
│ ┌───────────────┬──────────────────────────────────────────────────────────┐ │
│ │ Text Stack    │ Illustration HP-HERO-005 (640x480 svg)                    │ │
│ │ HP-HERO-002   │                                                          │ │
│ │ HP-HERO-003   │                                                          │ │
│ │ CTA Buttons   │                                                          │ │
│ └───────────────┴──────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ Metrics Strip (HP-SEC-006) — 4 cards HP-CARD-007a…d                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Solutions Overview (HP-SEC-010) — 3 column feature blocks                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Customer Logos Grid (HP-SEC-011) — 12 logos 120x48                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Testimonial Carousel (HP-WID-013)                                           │
├──────────────────────────────────────────────────────────────────────────────┤
│ Resource CTA Banner (HP-SEC-014)                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ Footer (HP-FTR-015)                                                         │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Component Directory

| Code | Location | Dimensions | Styling & Assets | Notes |
|------|----------|------------|------------------|-------|
| `HP-NAV-001` | Fixed top, spans 12 columns | 72px height desktop, 64px tablet, 56px mobile | Glassmorphism background `rgba(9,16,28,0.7)` when scrolled, blur 18px; menu items 18px/600, spacing 96px; CTA button `HP-NAV-004` uses copper gradient. | Uses `framer-motion` to slide in at 120ms; includes login button linking to app. |
| `HP-HERO-002` | Left column columns 1-6 | Max width 560px | Heading 48px/700, color `#FFFFFF`; underline accent `#1F8A70` 8px height. | Text: "Operational intelligence for healthcare networks." |
| `HP-HERO-003` | Under headline | 20px/400, color `rgba(255,255,255,0.84)`, max width 480px, 24px bottom margin | Provides 2-sentence value proposition; includes inline link styled as underlined copper. |
| `HP-HERO-004` | CTA group | Primary button 56px height, gradient (#1F8A70→#27C3A6); secondary ghost button 56px height with 2px border `#FFFFFF` 60% opacity. | Buttons animate ripple using `framer-motion`. |
| `HP-HERO-005` | Right column columns 7-12 | 640x480 vector from repo `blackwellen/illustrations/ui-kit/operations-dashboard.svg` tinted #1F8A70 @24% overlay. | Slight parallax (moves 16px on scroll) using `react-scroll-parallax`. |
| `HP-CARD-007a…d` | Metrics strip | Cards 288x220, 24px gap | Background `#102A43`, radius 24px, inner shadow `inset 0 1px 0 rgba(255,255,255,0.08)`; icon circle 64px tinted copper. | Stats: Network Uptime 99.98%, Credential Compliance 96%, Average Onboarding 12 days, Satisfaction 4.8/5. |
| `HP-SEC-010` | Feature blocks | Each column 360x320 | Alternating background (#FFFFFF / #F7F9FC), icons 80px line art; text 24px heading, 18px body. | Blocks: Workflow Automation, Compliance Insights, Provider Experience. |
| `HP-SEC-011` | Logo grid | 4 columns × 3 rows, logos 120x48 w/ 40px padding | Background `#0B1D3A`; logos in monochrome white at 70% opacity, lighten to 100% on hover. | Logos stored in `/assets/media/logos/*.svg`. |
| `HP-WID-013` | Testimonial carousel | 960x320 container | Card 720x240 with gradient border (#1F8A70), quote text 22px, avatar 64px. | Carousel uses `swiper@9`, autoplay 6s, includes logos of speakers. |
| `HP-SEC-014` | CTA banner above footer | 1120x200 | Background gradient (#102A43→#1F8A70), text 32px/600; includes download badge icons for App Store/Play Store (white). | Encourages trial signup; uses subtle 4px animated underline. |
| `HP-FTR-015` | Footer | 320px tall | Four-column layout: Links, Resources, Company, Newsletter. Background `#071223`, text `rgba(255,255,255,0.72)`. | Newsletter form uses inline input (320px width) + button `HP-BTN-016`. |

## Spacing & Alignment
- Maintain 120px top/bottom padding for hero on desktop, compress to 72px on tablet, 48px on mobile.
- Section dividers use 1px line `rgba(255,255,255,0.08)` for dark sections or `#D6DEEB` for light sections.
- Content centered within 1120px container; outer margins 160px on XL, 120px on LG, 80px on MD, 24px on mobile.

## Imagery Guidance
- Hero illustration uses layered shapes referencing provider dashboards; ensure accessible alt text: "Analytics dashboard interface".
- Customer logos should be vector; convert PNG uploads to monochrome SVG to keep crisp on retina displays.
- Testimonial headshots stored in `/assets/media/customers/` at 320x320, displayed as 64px circles with copper border 2px.
