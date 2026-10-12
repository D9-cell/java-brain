---
topic: Digits and Powers
pattern: [Sum identity, Counting]
source: LeetCode 2965
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Find Missing and Repeated Values

> [!TIP]
> **🧠 Memory hook**
> Two unknowns, two equations: **sum gives a − b**, **sum of squares gives a² − b²**, so a + b = (a² − b²)/(a − b).
> **Mantra: d = sum − S · q = sq − Q · a = (q/d + d)/2 · b = (q/d − d)/2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=20) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
An n × n grid holds 1..n² except one value a appears twice and one value b is missing. Return [a, b].

## Key insight
Compared with 1..n², the grid has an extra a and lacks b: sum − expected = a − b and sumsq − expected = a² − b² = (a − b)(a + b). Solve for a and b. The counting array is the simpler O(n²) space alternative.

## Approach 1: Two equations
```java
// Uses sum and sum of squares: a - b and a² - b² give both numbers
public int[] findMissingAndRepeatedValues(int[][] grid) {
    int n = grid.length;
    long N = (long) n * n, sum = 0, sq = 0;
    for (int[] row : grid)
        for (int v : row) {
            sum += v;
            sq += (long) v * v;
        }
    long diff = sum - N * (N + 1) / 2;
    long sqDiff = sq - N * (N + 1) * (2 * N + 1) / 6;
    long plus = sqDiff / diff;
    int a = (int) ((plus + diff) / 2), b = (int) ((plus - diff) / 2);
    return new int[]{a, b};
}
```

## Approach 2: Count array
```java
// Counting array: the value seen twice and the value never seen
public int[] findMissingAndRepeatedCount(int[][] grid) {
    int n = grid.length;
    int[] cnt = new int[n * n + 1];
    for (int[] row : grid)
        for (int v : row) cnt[v]++;
    int a = 0, b = 0;
    for (int v = 1; v <= n * n; v++) {
        if (cnt[v] == 2) a = v;
        if (cnt[v] == 0) b = v;
    }
    return new int[]{a, b};
}
```

| Approach | Time | Space |
|---|---|---|
| Two equations | O(n²) | O(1) |
| Count array | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why longs?</summary>

Sum of squares up to n² = 2500 reaches about 5·10⁹.

</details>


<details><summary>Can a − b be 0?</summary>

No, a and b are different.

</details>


## Connected
- [Missing Number](Missing%20Number.md)
