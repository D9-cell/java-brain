---
topic: Binary Search Basics
pattern: [Binary search per row, Sort]
source: LeetCode 1337
difficulty: Easy
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# The K Weakest Rows in a Matrix

> [!TIP]
> **🧠 Memory hook**
> Soldiers (1s) come first in a row, so the **first 0** gives the count. Sort rows by **(count, index)**.
> **Mantra: count = first 0 index · sort (count, row) · take k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=11) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
Rows of a binary matrix have all 1s before 0s. Return the indexes of the k weakest rows (fewest soldiers, ties by smaller index).

## Key insight
Each row is a sorted 1…10…0 sequence, so the boundary is found in O(log n). A heap of size k also works.

## Approach: Count + sort
```java
// Soldiers come first in each row, so binary search the first 0; sort rows by (count, index)
public int[] kWeakestRows(int[][] mat, int k) {
    int m = mat.length;
    int[][] rows = new int[m][];
    for (int i = 0; i < m; i++) rows[i] = new int[]{soldiers(mat[i]), i};
    Arrays.sort(rows, (a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
    int[] out = new int[k];
    for (int i = 0; i < k; i++) out[i] = rows[i][1];
    return out;
}

// Index of the first 0, which equals the number of 1s
int soldiers(int[] row) {
    int lo = 0, hi = row.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (row[mid] == 1) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Count + sort | O(m log n + m log m) | O(m) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why binary search the row?</summary>

The 1s are all in front.

</details>


<details><summary>Heap alternative?</summary>

Max-heap of size k on (count, index).

</details>


## Connected
- [Search a 2D Matrix](Search%20a%202D%20Matrix.md)
