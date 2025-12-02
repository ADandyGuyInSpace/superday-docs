---
sidebar_position: 2
---

# Property-Based Targeting

Target users with surveys based on **their attributes and characteristics**.

## Why Property-Based Targeting?

Property-based targeting lets you show surveys to specific user segments:

- **User properties** - Target by plan type, signup date, company size
- **Event properties** - Target based on properties from past events
- **Person properties** - Target using enriched user data

## Setting Up Property-Based Surveys

<!-- TODO: Add step-by-step instructions for creating a property-based survey -->

### Step 1: Identify Your Target Properties

First, ensure you're capturing the properties you want to target:

```javascript
// Set user properties
posthog.identify('user_123', {
  plan: 'enterprise',
  company_size: 'large',
  signup_date: '2024-01-15'
});

// Or capture with event properties
posthog.capture('page_viewed', {
  page_type: 'pricing',
  referrer: 'google'
});
```

### Step 2: Configure Property Conditions

In your survey's display conditions, add property filters:

<!-- TODO: Add screenshot of property filter UI -->

### Step 3: Define Your Targeting Logic

Combine multiple properties with AND/OR logic for precise targeting.

## Common Property Targeting Patterns

| Target Segment | Property Filter | Use Case |
|----------------|-----------------|----------|
| Enterprise users | `plan = 'enterprise'` | Premium feature feedback |
| New users | `signup_date > 7 days ago` | Onboarding experience |
| Power users | `events_count > 100` | Advanced feature requests |
| Specific industry | `industry = 'healthcare'` | Industry-specific feedback |

## Combining with Events

Property targeting becomes powerful when combined with event targeting:

```
Show survey when:
  - Event: checkout_completed
  - AND Property: plan = 'free'
  - AND Property: cart_value > 50
```

This targets free users who just completed a high-value checkout—perfect for upgrade prompts.

## Best Practices

:::tip Keep Properties Updated

Ensure your user properties are current. Stale data leads to poorly targeted surveys.

:::

:::caution Property Availability

Properties must exist on the user before they can be targeted. Plan your data collection strategy accordingly.

:::

## Next Steps

Learn about [Cohort-Based Targeting](./cohort-based-targeting.mdx) to target pre-defined user groups.
