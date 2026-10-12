---
topic: Geometry and Randomness
pattern: [Slopes as keys, Hash map]
source: LeetCode 149
difficulty: Hard
companies: [Google, LinkedIn, Apple]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Max Points on a Line

> [!TIP]
> **🧠 Memory hook**
> Anchor each point and count the others by **reduced (dx, dy)**. Same key = same line through the anchor.
> **Mantra: FOR i: map[(dx/g, dy/g) with sign fixed]++ · best = max + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=0) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Given distinct points, return the maximum number that lie on one straight line.

## Key insight
Two points on a line through the anchor have proportional (dx, dy). Dividing by the gcd and fixing the sign gives one exact key per direction, avoiding floating point slopes. Pairs j > i are enough: the best line is found from its first point.

## Approach: Anchor + slope map
```java
// Anchor each point and group the others by their reduced direction
public int maxPoints(int[][] points) {
    int n = points.length, best = Math.min(n, 1);
    for (int i = 0; i < n; i++) {
        Map<String, Integer> slopes = new HashMap<>();
        for (int j = i + 1; j < n; j++) {
            int dx = points[j][0] - points[i][0], dy = points[j][1] - points[i][1];
            int g = gcd(Math.abs(dx), Math.abs(dy));
            dx /= g;
            dy /= g;
            if (dx < 0 || (dx == 0 && dy < 0)) {
                dx = -dx;
                dy = -dy;
            }
            int c = slopes.merge(dx + "/" + dy, 1, Integer::sum);
            best = Math.max(best, c + 1);
        }
    }
    return best;
}

// Euclid's algorithm
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

| Approach | Time | Space |
|---|---|---|
| Anchor + slope map | O(n² log C) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why not a double slope?</summary>

Rounding can merge or split slopes; vertical lines divide by zero.

</details>


<details><summary>Why fix the sign?</summary>

(1, 2) and (−1, −2) are the same direction.

</details>


## Connected
- [Count Number of Trapezoids II](Count%20Number%20of%20Trapezoids%20II.md)
- [Erect the Fence](Erect%20the%20Fence.md)
