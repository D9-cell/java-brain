---
topic: Intervals and Scheduling
pattern: [Sort by end, Stab intervals]
source: LeetCode 452
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Number of Arrows to Burst Balloons

> [!TIP]
> **🧠 Memory hook**
> Shoot at the **earliest ending balloon**; it pops everything that already started.
> **Mantra: SHOOT AT THE FIRST END, SKIP EVERYTHING IT HITS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=1) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Balloons are horizontal intervals; an arrow at x bursts every balloon with start ≤ x ≤ end. Return the minimum arrows.

## Key insight
Sort by end. Shoot at the end of the first balloon; every following balloon that starts at or before that point is burst too. The next balloon not burst needs a new arrow at its end.

## Approach 1: Sort by end
```java
// Sort by end; shoot at the end of the first balloon, which also bursts every balloon that starts before it
public int findMinArrowShots(int[][] points) {
    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
    int arrows = 0;
    long shot = Long.MIN_VALUE;
    for (int[] p : points) {
        if (p[0] > shot) { arrows++; shot = p[1]; }
    }
    return arrows;
}
```

## Approach 2: Sort by start, shrink the overlap
```java
// Sort by start and keep shrinking the common overlap window
public int findMinArrowShotsByStart(int[][] points) {
    Arrays.sort(points, (a, b) -> Integer.compare(a[0], b[0]));
    int arrows = 1, end = points[0][1];
    for (int i = 1; i < points.length; i++) {
        if (points[i][0] <= end) end = Math.min(end, points[i][1]);
        else { arrows++; end = points[i][1]; }
    }
    return arrows;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort by end | O(n log n) | O(1) |
| Sort by start, shrink the overlap | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Use `Integer.compare`, values can be near ±2³¹ and `a - b` overflows. Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Difference to Non-overlapping Intervals?</summary>

Here touching intervals share an arrow (`<=`), so the comparison is `start > shot`.

</details>


## Connected
- [Non-overlapping Intervals](Non-overlapping%20Intervals.md)
