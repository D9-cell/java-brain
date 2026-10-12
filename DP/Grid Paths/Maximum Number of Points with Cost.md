---
topic: Grid Paths
pattern: [Row by row, Left and right sweeps]
source: LeetCode 1937
difficulty: Medium
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Number of Points with Cost

> [!TIP]
> **🧠 Memory hook**
> The penalty is the distance, so the best previous cell is found with **two linear sweeps** that lose 1 per step.
> **Mantra: left[j] = max(prev[j], left[j−1] − 1); right the same backwards**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Paths/Grid%20Paths%20Animations.html#p=6) · **Pattern hub:** [Grid Paths - Pattern Map](Grid%20Paths%20-%20Pattern%20Map.md)

## Problem
Pick one cell per row; you gain its value but lose the horizontal distance between consecutive picks. Return the maximum score.

## Key insight
cur[j] = points[i][j] + max over k of (prev[k] − |j − k|). Split the absolute value at j: the left sweep carries the best from columns ≤ j and decays by 1 per step; the right sweep does the same from the other side.

## Approach: Two sweeps
```java
// Per row, a left sweep and a right sweep give max(prev[k] - |j - k|) for every column j
public long maxPoints(int[][] points) {
    int n = points[0].length;
    long[] prev = new long[n];
    for (int j = 0; j < n; j++) prev[j] = points[0][j];
    for (int i = 1; i < points.length; i++) {
        long[] left = new long[n], right = new long[n], cur = new long[n];
        left[0] = prev[0];
        for (int j = 1; j < n; j++) left[j] = Math.max(prev[j], left[j - 1] - 1);
        right[n - 1] = prev[n - 1];
        for (int j = n - 2; j >= 0; j--) right[j] = Math.max(prev[j], right[j + 1] - 1);
        for (int j = 0; j < n; j++) cur[j] = points[i][j] + Math.max(left[j], right[j]);
        prev = cur;
    }
    long ans = 0;
    for (long v : prev) ans = Math.max(ans, v);
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Two sweeps | O(m · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Return long; with 10⁵ rows of 10⁵ the total overflows int.

## Recall before you reveal
<details><summary>Why not O(m · n²)?</summary>

The inner max over k is replaced by the decaying sweeps.

</details>


<details><summary>Why long?</summary>

Sums reach about 10⁵ · 10⁵.

</details>


## Connected
- [Minimum Falling Path Sum II](Minimum%20Falling%20Path%20Sum%20II.md)
- [Jump Game VI](../Jumps%20and%20Reach/Jump%20Game%20VI.md)
