---
topic: Stairs and Robbers
pattern: [Copy-paste blocks, Try every block start]
source: LeetCode 651
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# 4 Keys Keyboard

> [!TIP]
> **🧠 Memory hook**
> Typing is slow; the winning pattern is **select all, copy, then paste many times**.
> **Mantra: dp[i] = max(dp[i−1] + 1, dp[j−2] · (i − j + 1))**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=10) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
With n presses of: A (type A), Ctrl-A (select all), Ctrl-C (copy), Ctrl-V (paste), what is the maximum number of A's on the screen?

## Key insight
Either type one more `A`, or spend 2 presses at step j−2 on Ctrl-A, Ctrl-C and then paste for the remaining `i − j + 1` presses, multiplying the screen content by that factor.

## Approach 1: Bottom-up
```java
// dp[i] = max(dp[i-1] + 1, dp[j-2] * (i - j + 1)): either type an 'A', or at step j-2 do Ctrl-A, Ctrl-C and paste the rest i - j + 1 times
public int maxA(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + 1;
        for (int j = 2; j < i; j++) dp[i] = Math.max(dp[i], dp[j - 2] * (i - j + 1));
    }
    return dp[n];
}
```

## Approach 2: Top-down memo
```java
// Top-down: f(k) = best with k presses; the last useful block is select-all, copy, then pastes
public int maxAMemo(int n) { return go(n, new int[n + 1]); }

// Best number of A's with k presses
private int go(int k, int[] memo) {
    if (k <= 6) return k;
    if (memo[k] != 0) return memo[k];
    int best = k;
    for (int pastes = 1; pastes <= k - 3; pastes++) best = Math.max(best, go(k - 2 - pastes, memo) * (pastes + 1));
    return memo[k] = best;
}
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up | O(n²) | O(n) |
| Top-down memo | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a search over (screen, buffer, selection) states. Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why multiply by `i − j + 1`?</summary>

Two presses (Ctrl-A, Ctrl-C) are spent on setup, the other `i − j` presses are pastes, and each paste adds one more copy: the content becomes `i − j + 1` times larger.

</details>


## Connected
- [2 Keys Keyboard](2%20Keys%20Keyboard.md)
