---
sidebar_position: 1
---

# Combining Multiple Conditions

Create **complex targeting logic** by combining events, properties, cohorts, and feature flags.

## Why Combine Conditions?

Single conditions are powerful, but combining them lets you:

- **Increase precision** - Target exactly the right users
- **Reduce noise** - Avoid surveying users who aren't relevant
- **Create context** - Understand the full user journey

## AND vs OR Logic

PostHog supports both AND and OR logic for combining conditions:

### AND Logic (All conditions must match)

```
Show survey when:
  - Event: checkout_completed ✓
  - AND Property: order_value > 100 ✓
  - AND Cohort: first_time_buyer ✓
  
Result: Survey shown only if ALL conditions are true
```

### OR Logic (Any condition can match)

```
Show survey when:
  - Event: checkout_abandoned
  - OR Event: cart_cleared
  - OR Property: session_duration < 30s
  
Result: Survey shown if ANY condition is true
```

## Complex Targeting Examples

### Example 1: High-Value Checkout Abandonment

<!-- TODO: Add detailed implementation steps -->

```
Target users who:
  - Performed event: add_to_cart
  - AND Property: cart_value > $200
  - AND did NOT perform: checkout_completed (within 1 hour)
  - AND are in cohort: returning_customers
  
Survey: "What prevented you from completing your purchase today?"
```

### Example 2: Feature Adoption Follow-up

```
Target users who:
  - Have feature flag: new_analytics_dashboard enabled
  - AND performed event: dashboard_viewed (3+ times)
  - AND Property: account_type = 'business'
  - AND NOT in cohort: already_surveyed_this_month
  
Survey: "How is the new analytics dashboard helping your workflow?"
```

### Example 3: Onboarding Completion

```
Target users who:
  - Are in cohort: signed_up_last_7_days
  - AND performed ALL events:
    - profile_completed
    - first_project_created
    - team_member_invited
  - AND Property: plan != 'free'
  
Survey: "How was your onboarding experience?"
```

## Condition Priority

When combining conditions, consider the order of evaluation:

| Priority | Condition Type | Evaluation |
|----------|---------------|------------|
| 1 | Feature Flags | Checked first (fastest) |
| 2 | User Properties | Checked second |
| 3 | Cohort Membership | Checked third |
| 4 | Event Conditions | Checked last (requires event) |

## Best Practices

:::tip Start Broad, Then Narrow

Begin with fewer conditions and add more as you understand your targeting needs. Over-targeting can result in too few survey responses.

:::

:::caution Avoid Conflicting Conditions

Ensure your AND conditions don't create impossible scenarios:

```
❌ Bad: plan = 'free' AND plan = 'enterprise'
✓ Good: plan = 'free' OR plan = 'enterprise'
```

:::

:::tip Test Your Targeting

Use PostHog's preview feature to estimate how many users match your conditions before launching the survey.

:::

## Debugging Complex Conditions

If your survey isn't showing to expected users:

1. **Check each condition individually** - Verify each condition matches some users
2. **Review condition logic** - Ensure AND/OR is correct
3. **Check timing** - Event conditions require the event to fire
4. **Verify data** - Ensure properties and cohorts are populated

## Next Steps

Learn about [Survey Timing & Frequency](./translate-your-site.md) to optimize when and how often surveys appear.
