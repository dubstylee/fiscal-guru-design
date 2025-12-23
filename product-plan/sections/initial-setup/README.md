# Initial Setup

## Overview

A multi-step wizard for first-time users to configure their Fiscal Guru instance. Users configure database, identity provider, and analytics integrations with guidance and warnings about requirements. After completion, users are redirected to the Dashboard to begin using the application.

## User Flows

- Navigate through multi-step wizard (Database → Identity Provider → Analytics → Review)
- Configure database integration (required, with warning banner)
- Optionally configure identity provider integration (can skip)
- Optionally configure analytics integration (can skip)
- Review configured integrations summary
- Complete setup and redirect to Dashboard
- Skip optional steps and proceed to next step or completion
- See warning if attempting to complete without database configured

## Design Decisions

- Multi-step wizard with progress indicator
- Standalone page (not inside app shell)
- Warning banner for required database step
- Clear/Skip options for optional steps
- Summary step shows all configured integrations
- Success message before redirect

## Data Used

**Entities:**
- SetupState
- DatabaseConfig
- IdentityProviderConfig
- AnalyticsConfig
- SetupSummary

**From global model:**
- None (setup-specific entities)

## Visual Reference

See screenshots for the target UI design.

## Components Provided

- `InitialSetup` — Main wizard component
- `StepIndicator` — Progress indicator component
- `DatabaseStep` — Database configuration step
- `IdentityProviderStep` — Identity provider configuration step
- `AnalyticsStep` — Analytics configuration step
- `SummaryStep` — Final review step
- `WarningDialog` — Warning dialog for database requirement

## Callback Props

| Callback | Description |
|----------|-------------|
| `onNext` | Called when user clicks "Next" button |
| `onBack` | Called when user clicks "Back" button |
| `onSkip` | Called when user skips an optional step |
| `onUpdateDatabase` | Called when user updates database configuration |
| `onUpdateIdentityProvider` | Called when user updates identity provider configuration |
| `onUpdateAnalytics` | Called when user updates analytics configuration |
| `onTestDatabase` | Called when user tests database connection |
| `onComplete` | Called when user completes setup |

