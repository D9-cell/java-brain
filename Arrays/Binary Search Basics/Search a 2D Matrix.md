---
topic: Binary Search Basics
pattern: [Exact match, Index mapping]
source: LeetCode 74
difficulty: Medium
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Search a 2D Matrix

> [!TIP]
> **🧠 Memory hook**
> Rows are sorted and each row starts after the previous ends, so treat the matrix as **one sorted list**: index k → (k / n, k % n).
> **Mantra: lo = 0, hi = m·n − 1 · v = matrix[mid / n][mid % n]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=10) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
Each row is sorted and each row's first value exceeds the last value of the previous row. Return whether target is in the matrix.

## Key insight
A single binary search over m·n positions is O(log(mn)). For matrices sorted only per row and column, use the staircase walk instead.

## Approach: Flattened search
```java
// Rows chained end to end form one sorted list; index k is row k / n, column k % n
public boolean searchMatrix(int[][] matrix, int target) {
    int m = matrix.length, n = matrix[0].length, lo = 0, hi = m * n - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2, v = matrix[mid / n][mid % n];
        if (v == target) return true;
        if (v < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Flattened search | O(log(m·n)) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Index to cell?</summary>

row = k / n, col = k % n.

</details>


<details><summary>Search a 2D Matrix II?</summary>

Start top-right and step left or down.

</details>


## Connected
- [Binary Search](Binary%20Search.md)
- [The K Weakest Rows in a Matrix](The%20K%20Weakest%20Rows%20in%20a%20Matrix.md)
