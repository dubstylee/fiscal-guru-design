# Application Shell

## Overview

The Fiscal Guru application shell provides a persistent sidebar navigation pattern with a clean, professional layout optimized for financial data management. The shell uses the slate/amber/stone color palette with Inter typography for a modern, trustworthy aesthetic.

## Navigation Structure

- Dashboard & Overview → Home/default view
- Company Management → Companies section
- Accounts & Invoices → Accounts section
- Payment Tracking → Payments section
- Insights & Planning → Insights section
- Settings → App configuration (below divider)

## User Menu

The user menu appears at the bottom of the sidebar, below the Settings link. It includes:
- User avatar (or initials fallback)
- User name
- Logout button

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

## Components Provided

- `AppShell` — Main layout wrapper with sidebar and content area
- `MainNav` — Navigation component with main items and Settings
- `UserMenu` — User menu with avatar and logout

## Props

### AppShell

- `navigationItems` — Array of navigation items with label, href, icon, and isActive
- `user` — User object with name, email (optional), and avatarUrl (optional)
- `onNavigate` — Callback when user clicks a navigation item
- `onLogout` — Callback when user clicks logout

