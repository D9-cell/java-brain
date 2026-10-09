---
topic: Stairs and Robbers
pattern: [Sliding window sum, Delay and forget]
source: LeetCode 2327
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Number of People Aware of a Secret

> [!TIP]
> **🧠 Memory hook**
> A person shares the secret from day `learned + delay` until the day before `learned + forget`.
> **Mantra: new[day] = Σ new[j] for j in (day − forget, day − delay]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=18) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
On day 1 one person knows a secret. Everyone shares it with a new person each day, starting `delay` days after learning it and stopping `forget` days after learning it (they forget). How many people know it at the end of day n?

## Key insight
Count the people who learn it on each day. People who learned on day j share on days j + delay … j + forget − 1, so the new learners on day i are the sum over that window. A running sum keeps it O(n).

## Approach 1: Window sums
```java
// new[i] = people who learn it on day i = sum of new[j] over the days j when they can share (i - forget < j <= i - delay)
public int peopleAwareOfSecret(int n, int delay, int forget) {
    long[] fresh = new long[n + 1];
    fresh[1] = 1;
    for (int day = 2; day <= n; day++) {
        long sum = 0;
        for (int j = Math.max(1, day - forget + 1); j <= day - delay; j++) sum += fresh[j];
        fresh[day] = sum % MOD;
    }
    long total = 0;
    for (int j = Math.max(1, n - forget + 1); j <= n; j++) total += fresh[j];
    return (int) (total % MOD);
}
```

## Approach 2: Running sum
```java
// Sliding window of the number of sharers, O(n)
public int peopleAwareOfSecretWindow(int n, int delay, int forget) {
    long[] fresh = new long[n + 1];
    fresh[1] = 1;
    long sharing = 0;
    for (int day = 2; day <= n; day++) {
        if (day - delay >= 1) sharing = (sharing + fresh[day - delay]) % MOD;
        if (day - forget >= 1) sharing = (sharing - fresh[day - forget] + MOD) % MOD;
        fresh[day] = sharing;
    }
    long total = 0;
    for (int j = Math.max(1, n - forget + 1); j <= n; j++) total += fresh[j];
    return (int) (total % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| Window sums | O(n · forget) | O(n) |
| Running sum | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a person-by-person simulation. Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Who knows the secret on day n?</summary>

Everyone who learned it in the last `forget` days.

</details>


## Connected
- [Number of Dice Rolls With Target Sum](Number%20of%20Dice%20Rolls%20With%20Target%20Sum.md)
