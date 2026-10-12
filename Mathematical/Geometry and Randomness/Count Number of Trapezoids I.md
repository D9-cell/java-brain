---
topic: Geometry and Randomness
pattern: [Group by row, Running sum]
source: LeetCode 3623
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Number of Trapezoids I

> [!TIP]
> **🧠 Memory hook**
> Horizontal sides come from **two points on the same row**: C(c, 2) per row. Any two rows pair up: Σ segs(row) · segs(earlier rows).
> **Mantra: segs = C(c, 2) · result += segs · before · before += segs**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=2) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Count the trapezoids with at least one pair of horizontal sides formed by four distinct points, mod 1e9+7.

## Key insight
A horizontal trapezoid takes one segment from one row and one from another row. Summing products over pairs of rows with a running total avoids the quadratic pair loop.

## Approach: Rows + running sum
```java
// Horizontal sides come from two points on one row; pair rows with a running sum
public int countTrapezoids(int[][] points) {
    long MOD = 1_000_000_007;
    Map<Integer, Long> rows = new HashMap<>();
    for (int[] p : points) rows.merge(p[1], 1L, Long::sum);
    long result = 0, before = 0;
    for (long c : rows.values()) {
        long segs = c * (c - 1) / 2 % MOD;
        result = (result + segs * before) % MOD;
        before = (before + segs) % MOD;
    }
    return (int) result;
}
```

| Approach | Time | Space |
|---|---|---|
| Rows + running sum | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is any pair of segments on two rows a trapezoid?</summary>

Two horizontal segments on different lines are parallel sides of a convex quadrilateral.

</details>


<details><summary>Why the running sum?</summary>

Σ_{i<j} a_i a_j in one pass.

</details>


## Connected
- [Count Number of Trapezoids II](Count%20Number%20of%20Trapezoids%20II.md)
