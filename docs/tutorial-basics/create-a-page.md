---
sidebar_position: 1
---

# Event-Based Targeting

Target users with surveys based on **specific actions they've performed** in your product.

## Why Event-Based Targeting?

Event-based targeting is the most intuitive way to show surveys at the right moment. You can:

- Show a survey **immediately after** a user completes an action
- Target users who have performed an action **within a time window**
- Combine multiple events for **complex targeting logic**

## Setting Up Event-Based Surveys

<!-- TODO: Add step-by-step instructions for creating an event-based survey -->

### Step 1: Create a New Survey

Navigate to Surveys in your PostHog dashboard and click "New survey".

```javascript
// Example: Track the event you want to target
posthog.capture('checkout_completed', {
  order_value: 99.99,
  items_count: 3
});
```

### Step 2: Configure Display Conditions

In the survey settings, select "Display conditions" and choose "Event-based".

<!-- TODO: Add screenshot of the display conditions UI -->

### Step 3: Select Your Target Event

Choose the event that should trigger the survey display.

## Common Use Cases

| Use Case | Target Event | Survey Question |
|----------|--------------|-----------------|
| Checkout feedback | `checkout_completed` | "How was your checkout experience?" |
| Feature adoption | `feature_first_used` | "What made you try this feature?" |
| Abandonment | `cart_abandoned` | "What prevented you from completing your purchase?" |

## Best Practices

:::tip Timing Matters

Consider adding a delay between the event and survey display. Showing a survey immediately might interrupt the user's flow.

:::

:::caution Event Volume

Be mindful of high-frequency events. Targeting events that fire thousands of times per day could overwhelm users with surveys.

:::

## Next Steps

Learn about [Property-Based Targeting](./create-a-document.md) to further refine who sees your surveys.
