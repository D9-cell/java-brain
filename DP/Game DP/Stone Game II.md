---
topic: Game DP
pattern: [Take from the front, Own total]
source: LeetCode 1140
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Stone Game II

> [!TIP]
> **🧠 Memory hook**
> The state is **(start, M)**: the mover can take 1..2M piles and M becomes max(M, taken).
> **Mantra: dp[i][M] = max over X ≤ 2M of suffix[i] − dp[i+X][max(M, X)]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=5) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Piles in a row. On a turn a player takes the first X piles with 1 ≤ X ≤ 2M, then M = max(M, X); M starts at 1. Return the most stones Alice can collect.

## Key insight
Whatever the mover leaves, the opponent gets dp[i+X][..] out of the remaining suffix. So the mover keeps suffix[i] minus that. If 2M covers everything left, take it all.

## Approach: 2-D DP over (i, M)
```java
// dp[i][M] = most stones the mover collects from piles i.. when allowed to take 1..2M piles; the rest goes to the opponent
public int stoneGameII(int[] piles) {
    int n = piles.length;
    int[] suffix = new int[n + 1];
    for (int i = n - 1; i >= 0; i--) suffix[i] = suffix[i + 1] + piles[i];
    int[][] dp = new int[n + 1][n + 1];
    for (int i = n - 1; i >= 0; i--)
        for (int M = 1; M <= n; M++) {
            if (i + 2 * M >= n) {
                dp[i][M] = suffix[i];
                continue;
            }
            int best = 0;
            for (int X = 1; X <= 2 * M; X++) best = Math.max(best, suffix[i] - dp[i + X][Math.max(M, X)]);
            dp[i][M] = best;
        }
    return dp[0][1];
}
```

| Approach | Time | Space |
|---|---|---|
| 2-D DP over (i, M) | O(n³) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against an explicit two-player minimax on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is M at most n?</summary>

More than n piles can never be taken.

</details>


<details><summary>Why suffix sums?</summary>

The total that remains is needed to turn the opponent's take into ours.

</details>


## Connected
- [Stone Game III](Stone%20Game%20III.md)
- [Predict the Winner](Predict%20the%20Winner.md)
