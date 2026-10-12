---
topic: Geometry and Randomness
pattern: [Probability DP, Sliding window]
source: LeetCode 837
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# New 21 Game

> [!TIP]
> **🧠 Memory hook**
> dp[i] = chance to ever reach total i = **(sum of dp over the last maxPts totals still drawing) / maxPts**. Keep that sum as a window.
> **Mantra: dp[i] = window / maxPts · i < k → window += dp[i] · ELSE result += dp[i] · drop dp[i − maxPts]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=12) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Alice starts at 0 and draws uniform integers in [1, maxPts] while her total is below k. Return the probability that her final total is at most n.

## Key insight
Total i is reached from any j in [i − maxPts, i − 1] with j < k (she only draws below k). The window holds exactly those dp values. Totals ≥ k are final, so add them to the answer when ≤ n. If n ≥ k − 1 + maxPts every ending is ≤ n.

## Approach: Window DP
```java
// dp[i] = chance to ever stand on i; a sliding window holds the sum of the last maxPts drawable totals
public double new21Game(int n, int k, int maxPts) {
    if (k == 0 || n >= k - 1 + maxPts) return 1.0;
    double[] dp = new double[n + 1];
    dp[0] = 1;
    double window = 1, result = 0;
    for (int i = 1; i <= n; i++) {
        dp[i] = window / maxPts;
        if (i < k) window += dp[i];
        else result += dp[i];
        if (i - maxPts >= 0 && i - maxPts < k) window -= dp[i - maxPts];
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window DP | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why only j < k in the window?</summary>

At k or above she stops drawing.

</details>


<details><summary>Shortcut for k = 0?</summary>

She never draws, total 0 ≤ n, probability 1.

</details>


## Connected
- [Generate Random Point in a Circle](Generate%20Random%20Point%20in%20a%20Circle.md)
- [Knight Dialer](../../DP/Counting%20Walks%20and%20Moves/Knight%20Dialer.md)
