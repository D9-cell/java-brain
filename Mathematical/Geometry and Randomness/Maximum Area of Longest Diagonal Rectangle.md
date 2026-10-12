---
topic: Geometry and Randomness
pattern: [Squared distance]
source: LeetCode 3000
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Maximum Area of Longest Diagonal Rectangle

> [!TIP]
> **🧠 Memory hook**
> Compare **squared diagonals** (l² + w²), no sqrt. On a tie keep the **larger area**.
> **Mantra: diag = l² + w² · bigger diag OR (same diag AND bigger area) → keep**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=7) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
For each rectangle [length, width], find the one with the longest diagonal; if several tie, the one with the largest area. Return that area.

## Key insight
sqrt is monotonic, so squared values order the same way and stay exact integers.

## Approach: One pass
```java
// Compare squared diagonals (no sqrt needed), break ties by area
public int areaOfMaxDiagonal(int[][] dimensions) {
    int bestDiag = 0, bestArea = 0;
    for (int[] d : dimensions) {
        int diag = d[0] * d[0] + d[1] * d[1], area = d[0] * d[1];
        if (diag > bestDiag || (diag == bestDiag && area > bestArea)) {
            bestDiag = diag;
            bestArea = area;
        }
    }
    return bestArea;
}
```

| Approach | Time | Space |
|---|---|---|
| One pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why avoid sqrt?</summary>

Doubles could make two equal diagonals compare unequal.

</details>


<details><summary>Example tie?</summary>

[3,4] and [4,3] both have diagonal 5 and area 12.

</details>


## Connected
- [Find the Largest Area of Square Inside Two Rectangles](Find%20the%20Largest%20Area%20of%20Square%20Inside%20Two%20Rectangles.md)
