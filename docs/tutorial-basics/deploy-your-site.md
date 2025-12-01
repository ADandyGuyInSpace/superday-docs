---
sidebar_position: 5
---

# Feature Flag Integration

Coordinate surveys with **feature flag rollouts** to gather targeted feedback.

## Why Feature Flag Integration?

Feature flags and surveys work together to:

- **Gather feedback on new features** from users who have access
- **A/B test survey variations** alongside feature experiments
- **Control survey visibility** with the same precision as feature rollouts
- **Correlate feedback** with feature flag variants

## Linking Surveys to Feature Flags

<!-- TODO: Add step-by-step instructions for linking surveys to feature flags -->

### Step 1: Create or Identify Your Feature Flag

Ensure you have a feature flag set up for the feature you want feedback on:

```javascript
// Check if user has access to the feature
if (posthog.isFeatureEnabled('new-checkout-flow')) {
  // Show new checkout experience
  showNewCheckout();
}
```

### Step 2: Configure Survey Display Conditions

In your survey settings, add a feature flag condition:

<!-- TODO: Add screenshot of feature flag condition UI -->

### Step 3: Target Specific Variants

For multivariate flags, you can target specific variants:

```
Show survey when:
  - Feature flag: new-checkout-flow
  - Variant: control OR variant-a
```

## Common Integration Patterns

### New Feature Feedback

```
Feature Flag: new-dashboard
Survey Target: Users with flag enabled
Question: "How useful is the new dashboard?"
```

### A/B Test Feedback

```
Feature Flag: pricing-page-test
Survey Target: Variant B only
Question: "Was the pricing information clear?"
```

### Gradual Rollout Feedback

```
Feature Flag: ai-assistant (10% rollout)
Survey Target: Users with flag enabled
Question: "How helpful was the AI assistant?"
```

## Timing Considerations

| Scenario | When to Survey |
|----------|----------------|
| New feature launch | After first interaction with feature |
| A/B test | After completing the tested flow |
| Bug fix validation | After using the fixed functionality |
| Gradual rollout | Periodically during rollout phases |

## Best Practices

:::tip Segment by Variant

When running A/B tests, create separate surveys for each variant to compare feedback directly.

:::

:::caution Flag Dependencies

Ensure your feature flag is stable before linking surveys. Changing flag logic mid-survey can skew results.

:::

:::tip Use Flag Payloads

Feature flag payloads can include survey configuration, allowing dynamic survey customization per variant.

```javascript
const flagPayload = posthog.getFeatureFlagPayload('new-feature');
if (flagPayload?.showSurvey) {
  // Trigger survey with custom questions from payload
}
```

:::

## Next Steps

Congratulations! You've learned the core targeting methods. Continue to [Advanced Strategies](./congratulations.md) to see how to combine these techniques.
