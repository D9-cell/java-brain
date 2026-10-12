---
topic: Game DP
pattern: [Own total, Interval DP]
source: GfG Optimal Strategy For A Game
difficulty: Medium
companies: [Amazon, Google, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Optimal Strategy For A Game

> [!TIP]
> **🧠 Memory hook**
> Take an end, then the opponent takes the **best** end of what is left, which leaves us the worse option.
> **Mantra: dp[i][j] = max(a[i] + min(dp[i+2][j], dp[i+1][j−1]), a[j] + min(dp[i+1][j−1], dp[i][j−2]))**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=2) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Coins in a row, two players take from either end alternately. Return the maximum amount the first player can collect.

## Key insight
After we take a[i], the opponent chooses between taking a[i+1] (we continue on i+2..j) and a[j] (we continue on i+1..j−1). They choose to leave us the smaller value, so we add the min of the two.

## Approach: Own-total DP
```java
// dp[i][j] = most the mover can collect from coins i..j when the opponent also plays perfectly
public int maxAmount(int[] coins) {
    int n = coins.length;
    int[][] dp = new int[n + 2][n + 2];
    for (int len = 1; len <= n; len++)
        for (int i = 0; i + len <= n; i++) {
            int j = i + len - 1;
            int takeLeft = coins[i] + Math.min(i + 2 <= j ? dp[i + 2][j] : 0, i + 1 <= j - 1 ? dp[i + 1][j - 1] : 0);
            int takeRight = coins[j] + Math.min(i + 1 <= j - 1 ? dp[i + 1][j - 1] : 0, i <= j - 2 ? dp[i][j - 2] : 0);
            dp[i][j] = Math.max(takeLeft, takeRight);
        }
    return dp[0][n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Own-total DP | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against an explicit two-player minimax on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why min?</summary>

The opponent plays perfectly, so we get the worse of the two leftovers.

</details>


<details><summary>Same as lead DP?</summary>

Yes; total = (sum + lead) / 2.

</details>


## Connected
- [Predict the Winner](Predict%20the%20Winner.md)
- [Stone Game VII](Stone%20Game%20VII.md)
