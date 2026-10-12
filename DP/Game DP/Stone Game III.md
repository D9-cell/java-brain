---
topic: Game DP
pattern: [Take from the front, Lead]
source: LeetCode 1406
difficulty: Hard
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Stone Game III

> [!TIP]
> **🧠 Memory hook**
> Take 1, 2 or 3 stones from the front. The lead from here is the **best of three prefix gains minus the opponent's lead**.
> **Mantra: dp[i] = max over k = 1..3 of (sum of k stones − dp[i+k])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=4) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Stones in a row with values (possibly negative). Each turn take 1 to 3 stones from the front. Return "Alice", "Bob" or "Tie".

## Key insight
dp[i] is the mover's best lead when stones i.. remain. Compare the sign of dp[0] at the end.

## Approach: 1-D lead DP
```java
// dp[i] = best lead (mover minus opponent) from stones i.. when taking 1, 2 or 3 stones
public String stoneGameIII(int[] stoneValue) {
    int n = stoneValue.length;
    int[] dp = new int[n + 1];
    for (int i = n - 1; i >= 0; i--) {
        int take = 0, best = Integer.MIN_VALUE;
        for (int k = 0; k < 3 && i + k < n; k++) {
            take += stoneValue[i + k];
            best = Math.max(best, take - dp[i + k + 1]);
        }
        dp[i] = best;
    }
    return dp[0] > 0 ? "Alice" : dp[0] < 0 ? "Bob" : "Tie";
}
```

| Approach | Time | Space |
|---|---|---|
| 1-D lead DP | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an explicit two-player minimax on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why track a lead?</summary>

It handles negative stones and ties with a single number.

</details>


<details><summary>Base?</summary>

dp[n] = 0 with no stones left.

</details>


## Connected
- [Stone Game II](Stone%20Game%20II.md)
- [Stone Game VIII](Stone%20Game%20VIII.md)
