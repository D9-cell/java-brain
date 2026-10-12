---
topic: Difference Arrays
pattern: [Common rectangle]
source: LeetCode 598
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Range Addition II

> [!TIP]
> **🧠 Memory hook**
> Every operation covers the **top-left corner**, so the maximum is in the **smallest a × smallest b** rectangle.
> **Mantra: m = min a · n = min b · RETURN m · n**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=1) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Each operation [a, b] adds 1 to every cell (x, y) with x < a and y < b. Count the cells holding the maximum value.

## Key insight
All rectangles share the corner, so their intersection is the min-by-min rectangle, which received every operation. With no operations the whole grid ties at 0.

## Approach: Min dimensions
```java
// Every operation covers the top-left corner; the maximum lies in the smallest common rectangle
public int maxCount(int m, int n, int[][] ops) {
    for (int[] op : ops) {
        m = Math.min(m, op[0]);
        n = Math.min(n, op[1]);
    }
    return m * n;
}
```

| Approach | Time | Space |
|---|---|---|
| Min dimensions | O(k) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>No operations?</summary>

Every cell is 0, so m · n.

</details>


<details><summary>Why no difference array?</summary>

All rectangles are anchored at the same corner.

</details>


## Connected
- [Increment Submatrices by One](Increment%20Submatrices%20by%20One.md)
