---
topic: Search on the Answer Distances and K-th Values
pattern: [Bisection on reals]
source: LeetCode 3453
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Separate Squares I

> [!TIP]
> **🧠 Memory hook**
> Area below a horizontal line grows with y. **Bisect y** until the area below is half the total; keep the lowest such y.
> **Mantra: 100 iterations: areaBelow(mid)·2 ≥ total → hi = mid · ELSE lo = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=13) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
Squares [x, y, side] may overlap (overlaps count multiple times). Return the minimum y of a horizontal line with equal total area above and below.

## Key insight
Each square contributes side · clamp(y − bottom, 0, side). Real-valued answers need a fixed number of iterations instead of lo < hi.

## Approach: Bisection
```java
// Area below the line y grows with y; bisect until it reaches half the total
public double separateSquares(int[][] squares) {
    double total = 0, lo = Double.MAX_VALUE, hi = 0;
    for (int[] s : squares) {
        total += (double) s[2] * s[2];
        lo = Math.min(lo, s[1]);
        hi = Math.max(hi, s[1] + s[2]);
    }
    for (int it = 0; it < 100; it++) {
        double mid = (lo + hi) / 2;
        if (areaBelow(squares, mid) * 2 >= total) hi = mid;
        else lo = mid;
    }
    return hi;
}

// Total square area under the horizontal line y
double areaBelow(int[][] squares, double y) {
    double a = 0;
    for (int[] s : squares) a += s[2] * Math.max(0, Math.min(s[2], y - s[1]));
    return a;
}
```

| Approach | Time | Space |
|---|---|---|
| Bisection | O(100 · n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked by verifying the returned line splits the area in half and that a slightly lower line does not.

## Recall before you reveal
<details><summary>Why 100 iterations?</summary>

It shrinks the range far below the 10⁻⁵ tolerance.

</details>


<details><summary>Why the lowest y?</summary>

The area can stay at half over a gap between squares.

</details>


## Connected
- [Minimum Cost to Make Array Equal](../Search%20on%20the%20Answer%20Rates%20and%20Capacities/Minimum%20Cost%20to%20Make%20Array%20Equal.md)
