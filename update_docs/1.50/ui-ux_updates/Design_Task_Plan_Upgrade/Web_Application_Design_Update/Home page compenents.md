# Home Page Component Map

| Section | Components |
|---------|------------|
| Hero | Navigation bar (transparent until scroll), Hero text block, CTA button pair, Illustration container |
| Metrics Strip | KPI capsule cards (4), auto slider for smaller viewports |
| Departments Overview | Card grid (component `c-card--link`), icons, learn more link |
| Workflow Spotlight | Timeline component (vertical steps), supporting image frame |
| Testimonials | Carousel slider (3 slides), quote card, dot pagination |
| Resources CTA | Banner card with gradient, button, download icon |
| Footer | Footer columns (link list), contact info, social icon buttons |

## Interaction Notes
- Hero CTA scrolls to Dashboard preview anchor.
- Metrics auto-animates numbers using Intersection Observer.
- Carousel uses swipe gestures on mobile (framer-motion `drag='x'`).

