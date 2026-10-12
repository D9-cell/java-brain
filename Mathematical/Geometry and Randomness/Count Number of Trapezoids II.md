---
topic: Geometry and Randomness
pattern: [Slopes as keys, Midpoints]
source: LeetCode 3625
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Number of Trapezoids II

> [!TIP]
> **🧠 Memory hook**
> Count pairs of **parallel segments on different lines**. A **parallelogram** is counted twice; find it once by its diagonals sharing a **midpoint**.
> **Mantra: (pairs same slope − same line) − (pairs same midpoint − same midpoint and slope)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=3) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Given points, count the convex quadrilaterals with at least one pair of parallel sides formed by four distinct points.

## Key insight
Each segment is keyed by its reduced slope, its line (slope plus intercept term dy·x − dx·y) and its midpoint (x1 + x2, y1 + y2). Parallel non-collinear pairs give every trapezoid once and every parallelogram twice. Two segments with the same midpoint that are not on one line are the diagonals of exactly one parallelogram, so subtract those.

## Approach: Four hash maps
```java
// Parallel segment pairs on different lines, minus parallelograms (counted twice) found by shared midpoints
public int countTrapezoids(int[][] points) {
    int n = points.length;
    Map<Long, Integer> bySlope = new HashMap<>(), byLine = new HashMap<>();
    Map<Long, Integer> byMid = new HashMap<>(), byMidSlope = new HashMap<>();
    long parallel = 0, sameLine = 0, sharedMid = 0, sharedMidLine = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            int dx = points[j][0] - points[i][0], dy = points[j][1] - points[i][1];
            int g = gcd(Math.abs(dx), Math.abs(dy));
            dx /= g;
            dy /= g;
            if (dx < 0 || (dx == 0 && dy < 0)) {
                dx = -dx;
                dy = -dy;
            }
            long slope = (dx + 2000L) * 4001 + (dy + 2000);
            long c = (long) dy * points[i][0] - (long) dx * points[i][1];
            long line = slope * 20_000_001L + c + 10_000_000;
            long mid = (points[i][0] + points[j][0] + 2000L) * 4001 + (points[i][1] + points[j][1] + 2000);
            long midSlope = mid * 16_008_001L + slope;
            parallel += bySlope.merge(slope, 1, Integer::sum) - 1;
            sameLine += byLine.merge(line, 1, Integer::sum) - 1;
            sharedMid += byMid.merge(mid, 1, Integer::sum) - 1;
            sharedMidLine += byMidSlope.merge(midSlope, 1, Integer::sum) - 1;
        }
    return (int) ((parallel - sameLine) - (sharedMid - sharedMidLine));
}

// Euclid's algorithm
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

| Approach | Time | Space |
|---|---|---|
| Four hash maps | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute force over every 4-point subset on random small grids.

## Recall before you reveal
<details><summary>Why subtract same-line pairs?</summary>

Collinear segments are parallel but form no quadrilateral.

</details>


<details><summary>Why do shared midpoints mean a parallelogram?</summary>

A quadrilateral whose diagonals bisect each other is a parallelogram.

</details>


## Connected
- [Count Number of Trapezoids I](Count%20Number%20of%20Trapezoids%20I.md)
- [Max Points on a Line](Max%20Points%20on%20a%20Line.md)
