# Application Shell Specification

## Overview
The Fiscal Guru application shell provides a persistent sidebar navigation pattern with a clean, professional layout optimized for financial data management. The shell uses the slate/amber/stone color palette with Inter typography for a modern, trustworthy aesthetic.

## Navigation Structure
- Dashboard & Overview → Home/default view (财 icon)
- Company Management → Companies section (Building2 icon)
- Accounts & Invoices → Accounts section (CreditCard icon)
- Payment Tracking → Payments section (Receipt icon)
- Insights & Planning → Insights section (BarChart3 icon)
- Settings → App configuration (Settings icon, below divider)

## User Menu
The user menu appears at the bottom of the sidebar, below the Settings link. It includes:
- User avatar (or initials fallback)
- User name
- Logout button (accessed via dropdown or direct click)

## Layout Pattern
**Sidebar Navigation:**
- Fixed sidebar on the left (280px width on desktop)
- Logo/brand "Fiscal Guru" at the top
- Main navigation items in the middle section
- Settings link below a divider
- User menu anchored at the bottom
- Content area fills remaining space on the right

## Responsive Behavior
- **Desktop (1024px+):** Full sidebar visible, content area beside it
- **Tablet (768px-1023px):** Full sidebar visible, slightly narrower content area
- **Mobile (<768px):** Sidebar collapses into hamburger menu icon (top-left), opens as full-screen overlay when tapped, closes when nav item selected

## Design Notes
- Active navigation item highlighted with slate-600 background and slate-900 text (dark mode: slate-700 bg, slate-50 text)
- Hover states use slate-100 background (dark mode: slate-800)
- Amber accent used for subtle highlights and success states
- Stone neutral palette for backgrounds and borders
- All navigation items include lucide-react icons for visual clarity
- Smooth transitions (200ms) for hover and active states
- Light/dark mode support throughout with appropriate contrast ratios
