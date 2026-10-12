---
topic: Formulas and Observations
pattern: [Chebyshev distance]
source: LeetCode 2849
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Determine if a Cell Is Reachable at a Given Time

> [!TIP]
> **🧠 Memory hook**
> 8-direction moves reach (fx, fy) in **max(dx, dy)** seconds and extra seconds can be wasted. Only trap: **same cell with t = 1**.
> **Mantra: same cell → t != 1 · ELSE max(dx, dy) ≤ t**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=17) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Each second you must move to one of the 8 neighbouring cells. Return true if you can be at (fx, fy) after exactly t seconds starting from (sx, sy).

## Key insight
Diagonal steps cover both axes, so the shortest time is the Chebyshev distance. Spare time can be burnt by zig-zagging without changing the arrival, except that from the start cell you cannot leave and return in exactly one second.

## Approach: Distance check
```java
// Diagonal moves make the distance max(dx, dy); extra time can be wasted, except t = 1 on the start cell
public boolean isReachableAtTime(int sx, int sy, int fx, int fy, int t) {
    int dx = Math.abs(sx - fx), dy = Math.abs(sy - fy);
    if (dx == 0 && dy == 0) return t != 1;
    return Math.max(dx, dy) <= t;
}
```

| Approach | Time | Space |
|---|---|---|
| Distance check | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why can extra time always be wasted?</summary>

Swap one direct step for two steps through a neighbour, or bounce at the target.

</details>


<details><summary>Why is t = 1 special?</summary>

Leaving and coming back needs 2 seconds.

</details>


## Connected
- [Minimum Time Visiting All Points](Minimum%20Time%20Visiting%20All%20Points.md)
