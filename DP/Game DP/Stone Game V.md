---
topic: Game DP
pattern: [Split the row, Interval DP]
source: LeetCode 1563
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Stone Game V

> [!TIP]
> **🧠 Memory hook**
> Alice splits, Bob throws the **larger** half; Alice keeps the smaller half's sum and continues on it.
> **Mantra: dp[l][r] = max over k of min-half sum + dp[that half] (tie: either)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=8) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Alice splits a row of stones into two non-empty parts. Bob discards the part with the larger sum (Alice chooses on a tie) and Alice scores the sum of the remaining part. The game continues on that part. Return Alice's maximum score.

## Key insight
For each split k, the smaller side survives. If the sides are equal Alice picks the better continuation. dp[l][r] is the best over splits; a row of one stone scores 0.

## Approach: Interval DP
```java
// dp[l][r] = Alice's best score on row l..r; Bob discards the larger half, and Alice picks on a tie
public int stoneGameV(int[] stoneValue) {
    int n = stoneValue.length;
    int[] pre = new int[n + 1];
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + stoneValue[i];
    int[][] dp = new int[n][n];
    for (int len = 2; len <= n; len++)
        for (int l = 0; l + len <= n; l++) {
            int r = l + len - 1, best = 0;
            for (int k = l; k < r; k++) {
                int left = pre[k + 1] - pre[l], right = pre[r + 1] - pre[k + 1];
                if (left < right) best = Math.max(best, left + dp[l][k]);
                else if (left > right) best = Math.max(best, right + dp[k + 1][r]);
                else best = Math.max(best, left + Math.max(dp[l][k], dp[k + 1][r]));
            }
            dp[l][r] = best;
        }
    return dp[0][n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Interval DP | O(n³) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against an explicit two-player minimax on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why no minimising player?</summary>

Bob's choice is forced by the rule, only ties give Alice a choice.

</details>


<details><summary>Optimise?</summary>

Monotonic split points bring it to O(n²) or O(n log n).

</details>


## Connected
- [Burst Balloons](../Interval%20DP/Burst%20Balloons.md)
- [Stone Game VII](Stone%20Game%20VII.md)
