---
topic: Stairs and Robbers
pattern: [Last-step argument, Three rolling variables]
source: LeetCode 1137
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# N-th Tribonacci Number

> [!TIP]
> **🧠 Memory hook**
> Fibonacci that **remembers three terms** instead of two.
> **Mantra: T(n) = T(n−1) + T(n−2) + T(n−3)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=2) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
T(0) = 0, T(1) = T(2) = 1 and T(n) = T(n−1) + T(n−2) + T(n−3). Return T(n).

## Key insight
Same pattern as Fibonacci with a window of three values.

## Approach 1: Three variables
```java
// T(n) = T(n-1) + T(n-2) + T(n-3) kept in three variables
public int tribonacci(int n) {
    if (n == 0) return 0;
    if (n < 3) return 1;
    int a = 0, b = 1, c = 1;
    for (int i = 3; i <= n; i++) { int d = a + b + c; a = b; b = c; c = d; }
    return c;
}
```

## Approach 2: Top-down memo
```java
// Top-down recursion with memo
public int tribonacciMemo(int n) { return go(n, new int[Math.max(3, n + 1)]); }

// Cached recursion
private int go(int n, int[] memo) {
    if (n == 0) return 0;
    if (n < 3) return 1;
    if (memo[n] != 0) return memo[n];
    return memo[n] = go(n - 1, memo) + go(n - 2, memo) + go(n - 3, memo);
}
```

| Approach | Time | Space |
|---|---|---|
| Three variables | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>What changes with a longer window?</summary>

Only the number of rolling variables.

</details>


## Connected
- [Fibonacci Number](Fibonacci%20Number.md)
