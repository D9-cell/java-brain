---
topic: Stairs and Robbers
pattern: [Try every first piece, Math shortcut]
source: LeetCode 343
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Integer Break

> [!TIP]
> **🧠 Memory hook**
> Break n into pieces; for each piece either **stop splitting it** or use its own best split.
> **Mantra: dp[i] = max over j of j · max(i − j, dp[i − j])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=7) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Break n into at least two positive integers to maximise their product.

## Key insight
Choose the first piece j; the remaining i − j can stay whole or be broken further, whichever is larger. Mathematically the optimum uses as many 3s as possible, with 2s to fix a remainder of 1.

## Approach 1: DP
```java
// best(n) = max over the first piece j of j * max(n - j, best(n - j))
public int integerBreak(int n) {
    int[] dp = new int[n + 1];
    dp[1] = 1;
    for (int i = 2; i <= n; i++) for (int j = 1; j < i; j++) dp[i] = Math.max(dp[i], j * Math.max(i - j, dp[i - j]));
    return dp[n];
}
```

## Approach 2: Math
```java
// Math: use as many 3s as possible, avoid a leftover 1 by using two 2s
public int integerBreakMath(int n) {
    if (n <= 3) return n - 1;
    int threes = n / 3, rem = n % 3;
    if (rem == 0) return (int) Math.pow(3, threes);
    if (rem == 1) return (int) Math.pow(3, threes - 1) * 4;
    return (int) Math.pow(3, threes) * 2;
}
```

| Approach | Time | Space |
|---|---|---|
| DP | O(n²) | O(n) |
| Math | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why 3s?</summary>

3 · 3 > 2 · 2 · 2 is false but 3 is the most efficient piece: 3^(1/3) is the largest per unit.

</details>


<details><summary>Why `max(i − j, dp[i − j])`?</summary>

The remainder may be left as one piece.

</details>


## Connected
- [Perfect Squares](Perfect%20Squares.md)
