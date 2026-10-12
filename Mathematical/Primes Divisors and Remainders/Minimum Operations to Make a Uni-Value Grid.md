---
topic: Primes Divisors and Remainders
pattern: [Residue check, Median]
source: LeetCode 2033
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Minimum Operations to Make a Uni-Value Grid

> [!TIP]
> **🧠 Memory hook**
> Steps of x keep **v mod x**, so all cells must share a remainder. Then the **median** minimises total distance.
> **Mantra: any v % x ≠ r → −1 · sort · Σ |v − median| / x**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=15) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
In one operation add or subtract x from one grid cell. Return the minimum operations to make all cells equal, or -1.

## Key insight
If two cells differ in remainder mod x they can never meet. Otherwise the target is some value in the same class, and the sum of |v − t| is minimised at the median (moving t toward more points never hurts).

## Approach: Remainder check + median
```java
// All values must share one remainder mod x; then move everything to the median
public int minOperations(int[][] grid, int x) {
    int m = grid.length, n = grid[0].length;
    int[] a = new int[m * n];
    int k = 0, r = grid[0][0] % x;
    for (int[] row : grid)
        for (int v : row) {
            if (v % x != r) return -1;
            a[k++] = v;
        }
    Arrays.sort(a);
    int median = a[a.length / 2], ops = 0;
    for (int v : a) ops += Math.abs(v - median) / x;
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Remainder check + median | O(mn log mn) | O(mn) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the median and not the mean?</summary>

Absolute distances are minimised at the median.

</details>


<details><summary>Faster?</summary>

Quickselect finds the median in O(mn).

</details>


## Connected
- [Smallest Missing Non-negative Integer After Operations](Smallest%20Missing%20Non-negative%20Integer%20After%20Operations.md)
- [Minimum Operations to Make Array Equal](../Formulas%20and%20Observations/Minimum%20Operations%20to%20Make%20Array%20Equal.md)
