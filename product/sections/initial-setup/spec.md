# Initial Setup Specification

## Overview

A multi-step wizard for first-time users to configure their Fiscal Guru instance. Users configure database, identity provider, and analytics integrations with guidance and warnings about requirements. After completion, users are redirected to the Dashboard to begin using the application.

## User Flows

- Navigate through multi-step wizard (Database → Identity Provider → Analytics)
- Configure database integration (with warning that app is non-functional without it)
- Optionally configure identity provider integration
- Optionally configure analytics integration
- Review configured integrations summary
- Complete setup and redirect to Dashboard
- Skip optional steps and proceed to next step or completion
- See warning if attempting to complete without database configured

## UI Requirements

- Multi-step wizard interface with step indicators showing progress (e.g., "Step 1 of 3")
- Each step displays integration configuration form for that type
- Step 1 (Database): Form with warning banner explaining database is required for functionality
- Step 2 (Identity Provider): Optional step with "Skip" option
- Step 3 (Analytics): Optional step with "Skip" option
- Final step shows summary of configured integrations
- "Next" and "Back" buttons for navigation
- "Skip" button on optional steps
- Warning dialog if user tries to complete setup without database configured
- Success message upon completion before redirect

## Configuration

- shell: false
