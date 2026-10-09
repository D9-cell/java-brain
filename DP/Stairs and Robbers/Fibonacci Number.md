---
topic: Stairs and Robbers
pattern: [Last-step argument, Rolling variables]
source: LeetCode 509
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Fibonacci Number

> [!TIP]
> **🧠 Memory hook**
> The first DP: every number is the **sum of the two before it**.
> **Mantra: f(n) = f(n−1) + f(n−2); KEEP TWO VARIABLES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=0) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Return the n-th Fibonacci number.

## Key insight
Plain recursion repeats work exponentially. Caching each result (top-down) or building the values from 0 upwards (bottom-up) makes it O(n); two variables are enough for O(1) space. Fast doubling reaches O(log n).

## Approach 1: Bottom-up, two variables
```java
// Bottom-up with two variables
public int fib(int n) {
    if (n < 2) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
    return b;
}
```

## Approach 2: Top-down memo
```java
// Top-down recursion with a memo table
public int fibMemo(int n) { return memo(n, new int[Math.max(2, n + 1)]); }

// Returns f(n), caching results
private int memo(int n, int[] cache) {
    if (n < 2) return n;
    if (cache[n] != 0) return cache[n];
    return cache[n] = memo(n - 1, cache) + memo(n - 2, cache);
}
```

## Approach 3: Fast doubling
```java
// Fast doubling: F(2k) = F(k) * (2F(k+1) - F(k)), F(2k+1) = F(k)^2 + F(k+1)^2
public long fibFastDoubling(int n) { return doubling(n)[0]; }

// Returns {F(n), F(n+1)}
private long[] doubling(int n) {
    if (n == 0) return new long[]{0, 1};
    long[] h = doubling(n / 2);
    long a = h[0], b = h[1], c = a * (2 * b - a), d = a * a + b * b;
    return n % 2 == 0 ? new long[]{c, d} : new long[]{d, c + d};
}
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up, two variables | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |
| Fast doubling | O(log n) | O(log n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why is naive recursion exponential?</summary>

f(n−2) is recomputed inside f(n−1) and again directly: the call tree doubles.

</details>


<details><summary>Why does the table hold only two values?</summary>

f(n) never looks further back than f(n−2).

</details>


## Connected
- [Climbing Stairs](Climbing%20Stairs.md)
- [N-th Tribonacci Number](N-th%20Tribonacci%20Number.md)
