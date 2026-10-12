---
topic: Geometry and Randomness
pattern: [Cross product]
source: LeetCode 812
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Largest Triangle Area

> [!TIP]
> **🧠 Memory hook**
> Area of a triangle is **|cross(AB, AC)| / 2** (the shoelace formula). Try every triple.
> **Mantra: max over i<j<k of |(b−a) × (c−a)| / 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=6) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Given points on a plane, return the area of the largest triangle formed by any three of them.

## Key insight
n ≤ 50, so all triples (about 20 000) are cheap. The cross product gives twice the signed area.

## Approach: All triples
```java
// Shoelace formula over every triple of points
public double largestTriangleArea(int[][] points) {
    int n = points.length;
    double best = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            for (int k = j + 1; k < n; k++) {
                int[] a = points[i], b = points[j], c = points[k];
                double area = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) / 2.0;
                best = Math.max(best, area);
            }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| All triples | O(n³) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Faster?</summary>

The best triangle uses hull vertices, so hull + rotating calipers is O(n²) or better.

</details>


<details><summary>Why abs?</summary>

The sign only tells the orientation.

</details>


## Connected
- [Erect the Fence](Erect%20the%20Fence.md)
