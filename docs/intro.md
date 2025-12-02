---
sidebar_position: 1
---

import DocBanner from '@site/src/components/DocBanner';

# From noise to signal: why targeted PostHog surveys win

<DocBanner
  eta="15-20 minutes"
  overview="Learn to create targeted surveys that reach the right users at the right time"
  techStack={['PostHog', 'JavaScript SDK', 'Surveys']}
  prerequisites={[
    { text: 'PostHog account with Surveys add-on enabled' },
    { text: 'Basic familiarity with PostHog event tracking' },
    { text: 'PostHog SDK installed in your application', link: 'https://posthog.com/docs/surveys/installation?tab=Web' },
  ]}
/>

Surveys are only as good as the people you send them to.

Most teams know they should talk to users. Fewer teams are intentional about *which* users they talk to, and *when*. The result is familiar: low response rates, vague feedback, and dashboards full of numbers that don't actually change what you ship.

Targeted surveys fix that.

The point isn't "more feedback." It's more **relevant** feedback that directly supports the decisions you're trying to make about product, pricing, messaging, or UX. Instead of blasting a generic form to your entire list, you use your product data to reach very specific groups of people at exactly the right moment. 

## What you'll learn

In this tutorial, you'll learn how to use PostHog Surveys with display conditions tied to:

- **Events** – Show surveys after specific user actions  
- **Properties** – Target users based on their attributes  
- **Cohorts** – Survey groups of users with shared characteristics  
- **Feature flags** – Coordinate surveys with feature rollouts  

The goal is to help you move from "send a link to everyone" to "ask a precise question to the exact users who can answer it."

:::tip Start with events

If you're new to targeted surveys, begin with event-based targeting. It's the most intuitive way to show surveys at the right moment in your user's journey.

:::