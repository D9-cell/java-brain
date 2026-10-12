---
topic: Prefix Variants
pattern: [2-D prefix]
source: LeetCode 1292
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Side Length of a Square with Sum Less than or Equal to Threshold

> [!TIP]
> **🧠 Memory hook**
> Build the **2-D prefix** while scanning. The best side only grows, so at each bottom-right corner just test **side + 1**.
> **Mantra: pre[i][j] · square sum of k at (i, j) ≤ threshold → side = k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=3) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
Return the maximum side length of a square submatrix with sum ≤ threshold.

## Key insight
Testing only side + 1 works because values are non-negative: if no square of size k fits anywhere so far, a bigger one cannot either. Binary search on the side is the alternative.

## Approach: 2-D prefix + growing side
```java
// 2-D prefix sums; the best side only grows, so test side + 1 at each bottom-right corner
public int maxSideLength(int[][] mat, int threshold) {
    int m = mat.length, n = mat[0].length, side = 0;
    int[][] pre = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            pre[i][j] = mat[i - 1][j - 1] + pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1];
            int k = side + 1;
            if (i >= k && j >= k && pre[i][j] - pre[i - k][j] - pre[i][j - k] + pre[i - k][j - k] <= threshold) side = k;
        }
    return side;
}
```

| Approach | Time | Space |
|---|---|---|
| 2-D prefix + growing side | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why only side + 1?</summary>

Larger squares contain smaller ones with sums at least as big.

</details>


<details><summary>Rectangle sum formula?</summary>

pre[i][j] − pre[i−k][j] − pre[i][j−k] + pre[i−k][j−k].

</details>


## Connected
- [Maximal Square](../../DP/Grid%20Shapes%20and%20Colorings/Maximal%20Square.md)
- [Equal Sum Grid Partition I](Equal%20Sum%20Grid%20Partition%20I.md)
