---
topic: Geometry and Randomness
pattern: [Clamp]
source: LeetCode 1401
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Circle and Rectangle Overlapping

> [!TIP]
> **🧠 Memory hook**
> **Clamp** the centre into the rectangle to get its closest point. Overlap iff that point is within the radius.
> **Mantra: cx = clamp(xC, x1, x2), cy = clamp(yC, y1, y2) · (cx−xC)² + (cy−yC)² ≤ r²**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=4) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Return true if a circle (radius, xCenter, yCenter) and an axis-aligned rectangle (x1, y1, x2, y2) share any point.

## Key insight
The closest rectangle point to the centre is found per axis independently. Comparing squared distances keeps everything in integers.

## Approach: Clamp
```java
// Clamp the centre into the rectangle to get its closest point, then compare distances
public boolean checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {
    int cx = Math.max(x1, Math.min(xCenter, x2));
    int cy = Math.max(y1, Math.min(yCenter, y2));
    int dx = cx - xCenter, dy = cy - yCenter;
    return dx * dx + dy * dy <= radius * radius;
}
```

| Approach | Time | Space |
|---|---|---|
| Clamp | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>What if the centre is inside?</summary>

Clamping returns the centre itself, distance 0.

</details>


<details><summary>Why squared?</summary>

No square root, no rounding.

</details>


## Connected
- [Find the Largest Area of Square Inside Two Rectangles](Find%20the%20Largest%20Area%20of%20Square%20Inside%20Two%20Rectangles.md)
