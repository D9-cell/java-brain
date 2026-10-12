---
topic: Simulation and Encoding
pattern: [Column scan]
source: LeetCode 944
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Delete Columns to Make Sorted

> [!TIP]
> **🧠 Memory hook**
> A column must be deleted if it **goes down** anywhere. Count those columns.
> **Mantra: FOR col: any strs[r][c] < strs[r−1][c] → del++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=14) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Equal-length strings form a grid. Return the number of columns that are not sorted top to bottom.

## Key insight
Columns are independent here, so each is checked on its own.

## Approach: Scan columns
```java
// Count columns that go down somewhere
public int minDeletionSize(String[] strs) {
    int del = 0;
    for (int c = 0; c < strs[0].length(); c++)
        for (int r = 1; r < strs.length; r++)
            if (strs[r].charAt(c) < strs[r - 1].charAt(c)) {
                del++;
                break;
            }
    return del;
}
```

| Approach | Time | Space |
|---|---|---|
| Scan columns | O(n · m) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why break early?</summary>

One drop is enough to delete the column.

</details>


<details><summary>Part II difference?</summary>

Rows must be sorted lexicographically, so columns interact.

</details>


## Connected
- [Delete Columns to Make Sorted II](Delete%20Columns%20to%20Make%20Sorted%20II.md)
