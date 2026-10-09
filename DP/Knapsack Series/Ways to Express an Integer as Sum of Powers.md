---
topic: Knapsack Series
pattern: [0-1 knapsack counting, Items are powers]
source: LeetCode 2787
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Ways to Express an Integer as Sum of Powers

> [!TIP]
> **🧠 Memory hook**
> The items are **1^x, 2^x, 3^x, …**, each usable once: count subsets that hit n.
> **Mantra: FOR EACH b^x ≤ n: ways[s] += ways[s − b^x], s DOWN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=17) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Count the sets of distinct positive integers [n1, n2, …] with n1^x + n2^x + … = n, modulo 1e9+7.

## Key insight
Distinct integers means each power is used at most once: 0-1 counting knapsack with capacity n.

## Approach: Counting row
```java
// 0-1 knapsack counting over the items 1^x, 2^x, ... <= n
public int numberOfWays(int n, int x) {
    long[] ways = new long[n + 1];
    ways[0] = 1;
    for (int b = 1; Math.pow(b, x) <= n; b++) {
        int p = (int) Math.pow(b, x);
        for (int s = n; s >= p; s--) ways[s] = (ways[s] + ways[s - p]) % MOD;
    }
    return (int) ways[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Counting row | O(n · n^(1/x)) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why downward?</summary>

Distinctness: each base once.

</details>


<details><summary>How many items?</summary>

About n^(1/x).

</details>


## Connected
- [Count Subsets with Sum](Count%20Subsets%20with%20Sum.md)
- [Perfect Squares](../Stairs%20and%20Robbers/Perfect%20Squares.md)
