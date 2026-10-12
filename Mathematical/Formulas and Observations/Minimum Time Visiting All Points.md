---
topic: Formulas and Observations
pattern: [Chebyshev distance]
source: LeetCode 1266
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Minimum Time Visiting All Points

> [!TIP]
> **🧠 Memory hook**
> Each leg costs **max(dx, dy)**: go diagonal until one axis matches, then straight.
> **Mantra: Σ max(|dx|, |dy|)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=18) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Visit the points in the given order, moving one unit horizontally, vertically or diagonally per second. Return the minimum time.

## Key insight
The order is fixed, so the total is the sum of leg times, and each leg is the Chebyshev distance between its endpoints.

## Approach: Sum of legs
```java
// Between consecutive points the time is max(dx, dy) since a diagonal step covers both
public int minTimeToVisitAllPoints(int[][] points) {
    int time = 0;
    for (int i = 1; i < points.length; i++) {
        int dx = Math.abs(points[i][0] - points[i - 1][0]);
        int dy = Math.abs(points[i][1] - points[i - 1][1]);
        time += Math.max(dx, dy);
    }
    return time;
}
```

| Approach | Time | Space |
|---|---|---|
| Sum of legs | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why max and not dx + dy?</summary>

A diagonal step reduces both differences at once.

</details>


<details><summary>When is it dx + dy?</summary>

With only 4-direction moves (Manhattan distance).

</details>


## Connected
- [Determine if a Cell Is Reachable at a Given Time](Determine%20if%20a%20Cell%20Is%20Reachable%20at%20a%20Given%20Time.md)
- [Angle Between Hands of a Clock](Angle%20Between%20Hands%20of%20a%20Clock.md)
