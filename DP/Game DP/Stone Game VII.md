---
topic: Game DP
pattern: [Lead from the ends, Prefix sums]
source: LeetCode 1690
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Stone Game VII

> [!TIP]
> **🧠 Memory hook**
> Removing an end **scores the sum of what remains**, so the gain is a range sum.
> **Mantra: dp[i][j] = max(sum(i+1..j) − dp[i+1][j], sum(i..j−1) − dp[i][j−1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=3) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Players alternately remove the leftmost or rightmost stone and score the sum of the remaining stones. Alice wants to maximise and Bob to minimise the score difference. Return Alice's best lead.

## Key insight
The same lead recurrence as Predict the Winner, with the gain being the sum of the other stones, read from a prefix sum array.

## Approach: Lead DP + prefix sums
```java
// dp[i][j] = best lead on stones i..j; removing an end scores the sum of the remaining stones
public int stoneGameVII(int[] stones) {
    int n = stones.length;
    int[] pre = new int[n + 1];
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + stones[i];
    int[][] dp = new int[n][n];
    for (int len = 2; len <= n; len++)
        for (int i = 0; i + len <= n; i++) {
            int j = i + len - 1;
            dp[i][j] = Math.max(pre[j + 1] - pre[i + 1] - dp[i + 1][j], pre[j] - pre[i] - dp[i][j - 1]);
        }
    return dp[0][n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Lead DP + prefix sums | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against an explicit two-player minimax on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why prefix sums?</summary>

Each gain is a range sum, needed in O(1).

</details>


<details><summary>Why a lead and not a score?</summary>

Only the difference matters, which is one number per state.

</details>


## Connected
- [Predict the Winner](Predict%20the%20Winner.md)
- [Stone Game](Stone%20Game.md)
