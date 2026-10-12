---
topic: Geometry and Randomness
pattern: [Box overlap]
source: LeetCode 3047
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Find the Largest Area of Square Inside Two Rectangles

> [!TIP]
> **🧠 Memory hook**
> Overlap of two boxes is **min of right edges − max of left edges** per axis. The square side is the **smaller** of the two.
> **Mantra: w = min(tr) − max(bl) on x · h on y · side = max(min(w, h))**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=5) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Given n rectangles, return the largest area of a square that fits inside the intersection of at least two of them (0 if none).

## Key insight
Try every pair. A negative width or height means no overlap, which min(w, h) ≤ 0 already handles because side starts at 0. Square the side as a long.

## Approach: All pairs
```java
// Every pair's overlap is a rectangle; its shorter side bounds the square
public long largestSquareArea(int[][] bottomLeft, int[][] topRight) {
    int n = bottomLeft.length;
    long side = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            int w = Math.min(topRight[i][0], topRight[j][0]) - Math.max(bottomLeft[i][0], bottomLeft[j][0]);
            int h = Math.min(topRight[i][1], topRight[j][1]) - Math.max(bottomLeft[i][1], bottomLeft[j][1]);
            side = Math.max(side, Math.min(w, h));
        }
    return side * side;
}
```

| Approach | Time | Space |
|---|---|---|
| All pairs | O(n²) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why min(w, h)?</summary>

A square must fit both dimensions.

</details>


<details><summary>Why long?</summary>

Sides up to 10⁷ squared overflow an int.

</details>


## Connected
- [Circle and Rectangle Overlapping](Circle%20and%20Rectangle%20Overlapping.md)
- [Maximum Area of Longest Diagonal Rectangle](Maximum%20Area%20of%20Longest%20Diagonal%20Rectangle.md)
