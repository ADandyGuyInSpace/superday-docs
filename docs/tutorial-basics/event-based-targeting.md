---
sidebar_position: 1
---

# Event-based targeting

![PostHog Surveys](/img/posthog-surveys.png)

Show surveys to users based on **what they actually do** in your product.

## The idea behind event-based targeting

Most survey tools let you target users by who they are. PostHog lets you target users by what they do. This is a subtle but important distinction.

When you target by events, you're catching users at the exact moment they've done something meaningful. They just abandoned checkout. They just used a feature for the third time. They just hit an error. The context is fresh, and their feedback will be specific.

Compare that to sending a survey to "all users who signed up in the last 30 days." Sure, you'll get responses, but they'll be vague recollections rather than in-the-moment reactions.

## Capturing the events you need

Before you can target users by behavior, you need to be tracking that behavior. If you're already using PostHog for product analytics, you probably have most of what you need. If not, here's how to capture events that work well for survey targeting.

The basics look like this:

```javascript
// Track when someone views your pricing page
posthog.capture('pricing_page_viewed', {
  referrer: document.referrer,
  time_on_page: timeSpentOnPage
});

// Track checkout abandonment
posthog.capture('checkout_abandoned', {
  cart_value: 149.99,
  items_count: 3,
  step: 'payment'
});

// Track feature usage
posthog.capture('feature_used', {
  feature_name: 'export_to_csv',
  usage_count: 3
});
```

The properties you attach to events matter. They let you create more specific targeting rules later. If you track `checkout_abandoned` without the cart value, you can't later target only high-value cart abandoners.

## Setting up event-based surveys in PostHog

Once your events are flowing into PostHog, you can create surveys that trigger based on them. Head to Surveys in your PostHog dashboard and create a new survey.

In the targeting section, you'll see options for display conditions. Select "Event" and choose the event you want to trigger the survey. For a checkout abandonment survey, you'd select your `checkout_abandoned` event.

You can add property filters too. If you only want to survey users who abandoned carts worth more than $100:

```
Event: checkout_abandoned
Property: cart_value > 100
```

The survey will now only appear to users who fire that specific event with that property value.

## Building behavioral cohorts for complex targeting

Sometimes you want to target users based on patterns of behavior, not just single events. This is where behavioral cohorts come in.

Let's say you want to survey users who have viewed your pricing page three or more times. This suggests they're seriously considering your product but haven't converted yet. Perfect candidates for a "what's holding you back?" survey.

In PostHog, go to Cohorts and create a new cohort. Select "Behavioral cohort" and configure it like this:

```
Users who have performed event: pricing_page_viewed
Count: greater than or equal to 3
Time window: last 30 days
```

Save the cohort with a descriptive name like `pricing_page_repeat_visitors`. Now you can use this cohort in your survey targeting.

Back in your survey settings, instead of targeting a single event, you target cohort membership:

```
Cohort: pricing_page_repeat_visitors
```

The survey will appear to anyone who matches the cohort criteria.

## A realistic example: the hesitant buyer

Let's walk through a complete example. You run a SaaS product and you've noticed users who view the pricing page multiple times but don't convert. You want to understand what's stopping them.

First, make sure you're tracking pricing page views:

```javascript
// In your pricing page component
useEffect(() => {
  posthog.capture('pricing_page_viewed', {
    plan_shown: 'all',
    source: new URLSearchParams(window.location.search).get('ref') || 'direct'
  });
}, []);
```

Next, create a behavioral cohort in PostHog:

```
Name: Pricing page 3+ views no purchase
Criteria:
  - Performed event: pricing_page_viewed (3+ times in last 14 days)
  - AND did NOT perform event: subscription_started (in last 14 days)
```

Now create your survey targeting this cohort. The survey question might be: "You've checked out our pricing a few times. What questions do you have that we haven't answered?"

This is targeted, contextual, and catches users at a moment when they're actively evaluating your product.

## Using feature flags with behavioral targeting

PostHog's feature flags can work alongside surveys for more sophisticated targeting. You might want to show a survey only to users who have a specific feature flag enabled, or you might want to use feature flags to control survey rollout.

The interesting pattern here is using behavioral cohorts as feature flag conditions. You can create a feature flag that's enabled for users in your `pricing_page_repeat_visitors` cohort, then check that flag in your code to trigger custom survey logic.

```javascript
// Check if user matches behavioral targeting
const shouldShowSurvey = posthog.isFeatureEnabled('pricing_hesitation_survey');

if (shouldShowSurvey) {
  // Show your custom survey UI or trigger PostHog's survey
  posthog.capture('survey_eligible', { survey_id: 'pricing_hesitation' });
}
```

## React hooks for feature flag checks

If you're building a React application, PostHog provides hooks that make feature flag checks cleaner. The `useFeatureFlagEnabled` hook is the simplest way to check a single flag:

```javascript
import { useFeatureFlagEnabled } from 'posthog-js/react';

function PricingPage() {
  const showFeedbackPrompt = useFeatureFlagEnabled('pricing_feedback_survey');
  
  return (
    <div>
      <PricingTable />
      {showFeedbackPrompt && (
        <FeedbackPrompt 
          question="What would help you make a decision?" 
        />
      )}
    </div>
  );
}
```

For checking multiple flags at once, use `useActiveFeatureFlags`:

```javascript
import { useActiveFeatureFlags } from 'posthog-js/react';

function Dashboard() {
  const activeFlags = useActiveFeatureFlags();
  
  // Check which surveys this user is eligible for
  const eligibleSurveys = {
    onboarding: activeFlags?.includes('onboarding_survey'),
    nps: activeFlags?.includes('nps_survey_q4'),
    feature_feedback: activeFlags?.includes('new_feature_feedback')
  };
  
  return (
    <div>
      <DashboardContent />
      {eligibleSurveys.onboarding && <OnboardingSurvey />}
      {eligibleSurveys.nps && <NPSSurvey />}
    </div>
  );
}
```

These hooks automatically re-render your component when flag values change, which matters for the async scenarios we'll cover next.

## The async problem with behavioral targeting

Here's where things get tricky. Behavioral targeting relies on PostHog knowing about the user's recent actions. But there's a gap between when a user does something and when PostHog's servers process that event and update cohort membership.

If a user views your pricing page for the third time, they won't instantly be added to your `pricing_page_repeat_visitors` cohort. There's processing time involved. This means your feature flag check might return `false` even though the user technically qualifies.

This is especially noticeable in single-page applications where users might trigger qualifying events and then immediately navigate to a page where you're checking flag status.

## Reloading feature flags after user actions

The solution is to manually reload feature flags after significant user actions. PostHog's SDK provides a `reloadFeatureFlags` method for exactly this purpose:

```javascript
// User just completed their third pricing page view
posthog.capture('pricing_page_viewed');

// Force a refresh of feature flags
posthog.reloadFeatureFlags();
```

In React, you can access this through the PostHog provider:

```javascript
import { usePostHog } from 'posthog-js/react';

function PricingPage() {
  const posthog = usePostHog();
  const [viewCount, setViewCount] = useState(0);
  
  useEffect(() => {
    // Track the page view
    posthog.capture('pricing_page_viewed');
    setViewCount(prev => prev + 1);
    
    // If this might be a qualifying view, reload flags
    if (viewCount >= 2) {
      posthog.reloadFeatureFlags();
    }
  }, []);
  
  // ... rest of component
}
```

The `reloadFeatureFlags` call is asynchronous. You can pass a callback if you need to know when it completes:

```javascript
posthog.reloadFeatureFlags(() => {
  // Flags are now refreshed
  const isEligible = posthog.isFeatureEnabled('pricing_feedback_survey');
  if (isEligible) {
    showSurveyModal();
  }
});
```

## Handling the timing gap gracefully

Even with flag reloading, there's still a timing gap. The event needs to be processed server-side before the cohort membership updates. For real-time behavioral targeting, you have a few options.

One approach is client-side tracking combined with server-side cohorts. Track the behavior locally and use it for immediate decisions, while letting the cohort handle longer-term targeting:

```javascript
function usePricingPageTracking() {
  const posthog = usePostHog();
  const [localViewCount, setLocalViewCount] = useState(() => {
    return parseInt(localStorage.getItem('pricing_views') || '0');
  });
  
  const trackView = useCallback(() => {
    const newCount = localViewCount + 1;
    setLocalViewCount(newCount);
    localStorage.setItem('pricing_views', newCount.toString());
    
    posthog.capture('pricing_page_viewed');
    
    // Reload flags in case server-side cohort has updated
    posthog.reloadFeatureFlags();
  }, [localViewCount, posthog]);
  
  // Use local count for immediate decisions
  const shouldShowSurvey = localViewCount >= 3;
  
  return { trackView, shouldShowSurvey, viewCount: localViewCount };
}
```

Another approach is to add a delay before checking flag status:

```javascript
posthog.capture('checkout_abandoned');

// Give the event time to process
setTimeout(() => {
  posthog.reloadFeatureFlags(() => {
    if (posthog.isFeatureEnabled('abandonment_survey')) {
      showAbandonmentSurvey();
    }
  });
}, 2000); // 2 second delay
```

This isn't elegant, but it's pragmatic. The delay gives PostHog's servers time to process the event and update cohort membership.

## Another example: onboarding completion

Let's look at another common scenario. You want to survey users who have completed your onboarding flow. Onboarding typically involves multiple steps, so you need to track each one:

```javascript
// Track each onboarding step
function OnboardingFlow() {
  const posthog = usePostHog();
  
  const completeStep = (stepName) => {
    posthog.capture('onboarding_step_completed', {
      step: stepName,
      timestamp: new Date().toISOString()
    });
  };
  
  const completeOnboarding = () => {
    posthog.capture('onboarding_completed', {
      total_time_minutes: calculateOnboardingTime(),
      steps_completed: completedSteps.length
    });
    
    // Reload flags to check for onboarding survey eligibility
    posthog.reloadFeatureFlags();
  };
  
  // ... onboarding UI
}
```

Your cohort definition might look like:

```
Name: Completed onboarding recently
Criteria:
  - Performed event: onboarding_completed (in last 7 days)
  - AND did NOT perform event: onboarding_survey_completed (ever)
```

The second condition prevents surveying users who've already responded. This is important for avoiding survey fatigue.

## Cart abandonment targeting

Cart abandonment is a classic use case for event-based surveys. The tricky part is defining what counts as "abandonment." A user adding items to cart and then leaving isn't necessarily abandonment if they come back five minutes later.

Here's one approach:

```javascript
// Track cart additions
posthog.capture('cart_item_added', {
  product_id: item.id,
  product_name: item.name,
  price: item.price,
  cart_total: calculateCartTotal()
});

// Track when user starts checkout
posthog.capture('checkout_started', {
  cart_total: calculateCartTotal(),
  items_count: cart.items.length
});

// Track successful purchase
posthog.capture('purchase_completed', {
  order_id: order.id,
  order_total: order.total
});
```

For the abandonment cohort, you'd define:

```
Name: Cart abandoners high value
Criteria:
  - Performed event: checkout_started (in last 24 hours)
  - AND Property: cart_total > 100
  - AND did NOT perform event: purchase_completed (in last 24 hours)
```

The 24-hour window gives users time to complete their purchase before you survey them. You don't want to ask "why didn't you buy?" to someone who's still in the middle of buying.

## Common gotchas

A few things to watch out for when implementing event-based targeting.

Event names matter more than you think. If you rename an event, your cohorts and survey targeting will break. Establish naming conventions early and stick to them.

Property types can cause issues. If you sometimes send `cart_value` as a string and sometimes as a number, your property filters might not work as expected. Be consistent with types.

Cohort updates aren't instant. As mentioned, there's processing time. For time-sensitive targeting, consider combining client-side logic with server-side cohorts.

Test with real user flows. It's easy to test that a survey appears when you manually fire an event. It's harder to test that it appears at the right moment in a real user journey. Do end-to-end testing.

Don't over-target. The more conditions you add, the smaller your eligible audience becomes. Start broad and narrow down based on response quality, not the other way around.

## Debugging targeting issues

When your survey isn't appearing to users you expect, here's how to debug:

First, verify the event is being captured. Check PostHog's Events tab and filter by the event name. Make sure the properties look correct.

Second, check cohort membership. Go to the cohort definition and look at the user count. If it's zero or very low, your criteria might be too restrictive.

Third, test feature flag evaluation. Use PostHog's feature flag debugger to see why a specific user is or isn't getting a flag. This shows you exactly which conditions are passing or failing.

Fourth, check timing. If you're reloading flags after events, add some logging to confirm the reload is happening and completing before you check flag status.

```javascript
posthog.reloadFeatureFlags(() => {
  console.log('Flags reloaded');
  console.log('Survey flag:', posthog.isFeatureEnabled('my_survey'));
});
```

## Next steps

Event-based targeting is the foundation for contextual surveys. Once you're comfortable with it, you can combine events with [Property-Based Targeting](./create-a-document.md) for even more precise audience selection.

The key insight is that the best time to ask users something is right after they've done something relevant. Event-based targeting makes that possible at scale.