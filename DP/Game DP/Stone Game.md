---
topic: Game DP
pattern: [Parity argument, Lead from the ends]
source: LeetCode 877
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Stone Game

> [!TIP]
> **🧠 Memory hook**
> With an **even number of piles and an odd total**, Alice can lock in all even-indexed or all odd-indexed piles. She picks the larger group.
> **Mantra: RETURN true**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=1) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Alice and Bob take piles from either end; the number of piles is even and the total is odd. Alice starts. Return true if Alice wins.

## Key insight
Alice can take every even-indexed pile (or every odd-indexed one) by always choosing the end that has the right parity. One group sums higher because the total is odd, so she always wins. The lead DP gives the same answer and works without the parity guarantee.

## Approach 1: Math: always true
```java
// With an even number of piles Alice can always take all the even-indexed or all the odd-indexed piles, so she cannot lose
public boolean stoneGame(int[] piles) {
    return true;
}
```

## Approach 2: Lead DP
```java
// dp[i][j] = best lead (mover minus opponent) on piles i..j; the DP confirms the claim above
public boolean stoneGameDp(int[] piles) {
    int n = piles.length;
    int[][] dp = new int[n][n];
    for (int i = 0; i < n; i++) dp[i][i] = piles[i];
    for (int len = 2; len <= n; len++)
        for (int i = 0; i + len <= n; i++) {
            int j = i + len - 1;
            dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
        }
    return dp[0][n - 1] > 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Math: always true | O(1) | O(1) |
| Lead DP | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> The shortcut relies on the statement's guarantees: an even pile count and an odd total.

## Recall before you reveal
<details><summary>What if the total could be even?</summary>

Then a tie is possible and the DP must be used.

</details>


<details><summary>Why does Alice control parity?</summary>

After her pick the remaining ends have the same parity, so Bob always exposes the other parity.

</details>


## Connected
- [Predict the Winner](Predict%20the%20Winner.md)
