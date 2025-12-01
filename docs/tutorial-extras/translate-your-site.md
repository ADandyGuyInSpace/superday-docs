---
sidebar_position: 2
---

# Survey Timing & Frequency

Optimize **when and how often** surveys appear to maximize response rates without annoying users.

## Why Timing Matters

Poor timing leads to:
- **Low response rates** - Users ignore surveys shown at wrong moments
- **Survey fatigue** - Too many surveys drive users away
- **Biased responses** - Timing can influence how users respond

## Display Timing Options

### Immediate Display

Show the survey as soon as conditions are met:

```javascript
// Survey appears immediately after event
posthog.capture('checkout_completed');
// → Survey displays right away
```

**Best for:** Quick feedback on just-completed actions

### Delayed Display

Add a delay before showing the survey:

<!-- TODO: Add configuration example for delayed display -->

```
Display settings:
  - Trigger: checkout_completed event
  - Delay: 5 seconds after trigger
```

**Best for:** Allowing users to see results before asking for feedback

### Page-Based Timing

Show surveys on specific pages:

```
Display settings:
  - URL contains: /thank-you
  - OR URL matches: /order/*/confirmation
```

**Best for:** Contextual feedback at specific points in the journey

## Frequency Controls

### Per-User Limits

Control how often individual users see surveys:

| Setting | Description | Use Case |
|---------|-------------|----------|
| Once ever | User sees survey only once | One-time feedback |
| Once per session | Once per browser session | Session-based feedback |
| Once per day | Maximum once every 24 hours | Regular check-ins |
| Once per week | Maximum once every 7 days | Periodic feedback |
| Once per month | Maximum once every 30 days | Long-term tracking |

### Global Survey Limits

Prevent survey overload across all your surveys:

<!-- TODO: Add configuration example for global limits -->

```
Global settings:
  - Maximum surveys per user per day: 1
  - Minimum time between any surveys: 24 hours
```

## Timing Strategies by Use Case

### Checkout Abandonment

```
Timing strategy:
  - Trigger: cart_abandoned event
  - Delay: 30 seconds (give user chance to return)
  - Frequency: Once per week
  - Don't show if: checkout_completed within 1 hour
```

### Onboarding Feedback

```
Timing strategy:
  - Trigger: onboarding_completed event
  - Delay: Immediate
  - Frequency: Once ever
  - Show on: Next page load after completion
```

### Feature Feedback

```
Timing strategy:
  - Trigger: feature_used event (3rd time)
  - Delay: 10 seconds
  - Frequency: Once per month
  - Don't show if: Already rated this feature
```

### NPS Surveys

```
Timing strategy:
  - Trigger: 30 days after signup
  - Delay: Show on next session start
  - Frequency: Once per quarter
  - Don't show if: Active support ticket
```

## Advanced Timing Techniques

### Session-Aware Timing

Consider the user's session state:

```
Show survey when:
  - Session duration > 5 minutes
  - AND pages_viewed > 3
  - AND NOT first_session
```

### Exit Intent

Trigger surveys when users are about to leave:

<!-- TODO: Add exit intent implementation example -->

```javascript
// Detect exit intent
document.addEventListener('mouseleave', (e) => {
  if (e.clientY < 0) {
    // User moving toward browser controls
    posthog.capture('exit_intent_detected');
  }
});
```

### Time-of-Day Targeting

Consider when users are most receptive:

```
Show survey when:
  - Local time: 9am - 5pm (business hours)
  - Day: Monday - Friday
  - NOT during: Known high-traffic periods
```

## Best Practices

:::tip Respect User Time

The best survey is one that feels helpful, not intrusive. Time your surveys to moments when users have mental bandwidth to respond thoughtfully.

:::

:::caution Avoid Critical Moments

Never show surveys during:
- Payment processing
- Form submissions
- Error states
- First-time user onboarding (unless specifically about onboarding)

:::

:::tip A/B Test Timing

Use PostHog experiments to test different timing strategies and measure impact on response rates.

:::

## Measuring Timing Effectiveness

Track these metrics to optimize timing:

| Metric | Target | Indicates |
|--------|--------|-----------|
| Response rate | > 10% | Good timing |
| Dismissal rate | < 50% | Not intrusive |
| Completion rate | > 70% | Right moment |
| Time to respond | < 30s | User engaged |

## Next Steps

You've completed the advanced strategies! Return to the [Introduction](../intro.md) to review all targeting methods, or explore the [PostHog Surveys Documentation](https://posthog.com/docs/surveys) for more details.
