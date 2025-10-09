# Resource Library Requirements

## Content Types
- Policies (PDF)
- Training Videos (MP4, streaming via CDN)
- Checklists (Excel)
- Templates (Word)
- Images (PNG/SVG)

## Metadata Fields
- Title, Description (max 140 chars), Department, Tags (multi-select), Last Updated, Owner, File Size.
- Security classification (Internal, Confidential).

## Filtering & Sorting
- Filter chips for Department, File Type, Updated timeframe.
- Sort by Name, Recently Added, Most Viewed.

## Display
- Cards show file icon 48px, title, metadata line, and quick actions (Download, Share, Open).
- Provide bulk selection via checkboxes for batch download or share.

## Dependencies
- Integrates with document API; use pre-signed URLs for downloads.
- Uses `react-query` for caching resource data with stale time 5 minutes.

