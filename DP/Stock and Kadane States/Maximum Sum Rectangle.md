---
topic: Stock and Kadane States
pattern: [2-D Kadane, Squash rows]
source: GfG
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Sum Rectangle

> [!TIP]
> **🧠 Memory hook**
> Fix a **band of rows**, add each column inside it, and the rectangle problem becomes Kadane on one array.
> **Mantra: FOR top, bottom: col[c] += m[bottom][c]; best = max(best, KADANE(col))**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=10) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Return the maximum sum of any submatrix of an R × C matrix.

## Key insight
Every rectangle is a row band [top, bottom] and a column range. For a fixed band, the column sums turn it into a 1-D array where the best column range is a maximum subarray.

## Approach: 2-D Kadane
```java
// Fix the top and bottom rows, squash the columns into one array, run Kadane
public int maximumSumRectangle(int[][] m) {
    int rows = m.length, cols = m[0].length, best = Integer.MIN_VALUE;
    for (int top = 0; top < rows; top++) {
        int[] col = new int[cols];
        for (int bottom = top; bottom < rows; bottom++) {
            for (int c = 0; c < cols; c++) col[c] += m[bottom][c];
            best = Math.max(best, kadane(col));
        }
    }
    return best;
}

// Largest subarray sum (non-empty)
private int kadane(int[] a) {
    int cur = a[0], best = a[0];
    for (int i = 1; i < a.length; i++) { cur = Math.max(a[i], cur + a[i]); best = Math.max(best, cur); }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| 2-D Kadane | O(R² · C) | O(C) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Which dimension to loop twice?</summary>

The smaller one, to get O(min² · max).

</details>


<details><summary>All negative matrix?</summary>

Kadane must allow a single element, not an empty subarray.

</details>


## Connected
- [Max Sum of Rectangle No Larger Than K](Max%20Sum%20of%20Rectangle%20No%20Larger%20Than%20K.md)
- Maximum Subarray
