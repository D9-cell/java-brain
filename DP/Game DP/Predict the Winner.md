---
topic: Game DP
pattern: [Lead from the ends, Interval DP]
source: LeetCode 486
difficulty: Medium
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Predict the Winner

> [!TIP]
> **🧠 Memory hook**
> Track the **lead** (mover minus opponent). Taking an end gains it and gives the opponent the lead on what is left.
> **Mantra: dp[i][j] = max(a[i] − dp[i+1][j], a[j] − dp[i][j−1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=0) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Two players alternately take a number from either end of nums. Player 1 starts. Return true if player 1 can win (a tie counts as a win).

## Key insight
dp[i][j] is the best lead of the player to move on nums[i..j]. A move takes an end and then the opponent plays the same game on the rest, so their lead is subtracted. Player 1 wins iff dp[0][n−1] ≥ 0. One rolling array is enough.

## Approach: Lead DP
```java
// dp[j] = best lead of the mover on the window ending at j; the window shrinks as i grows
public boolean predictTheWinner(int[] nums) {
    int n = nums.length;
    int[] dp = nums.clone();
    for (int i = n - 2; i >= 0; i--)
        for (int j = i + 1; j < n; j++) dp[j] = Math.max(nums[i] - dp[j], nums[j] - dp[j - 1]);
    return dp[n - 1] >= 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Lead DP | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an explicit two-player minimax on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why subtract dp of the rest?</summary>

The opponent is the mover there, so their lead counts against us.

</details>


<details><summary>Why ≥ 0?</summary>

A tied total goes to player 1 in this problem.

</details>


## Connected
- [Stone Game](Stone%20Game.md)
- [Stone Game VII](Stone%20Game%20VII.md)
- [Optimal Strategy For A Game](Optimal%20Strategy%20For%20A%20Game.md)
