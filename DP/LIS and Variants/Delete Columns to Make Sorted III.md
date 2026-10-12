---
topic: LIS and Variants
pattern: [LIS over columns, Chain DP]
source: LeetCode 960
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Delete Columns to Make Sorted III

> [!TIP]
> **🧠 Memory hook**
> Treat each **column as one element**; column i may precede j only if it is ≤ in **every row**.
> **Mantra: KEEP LONGEST CHAIN OF COLUMNS; DELETE THE REST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=9) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Given equal-length strings, delete the fewest columns so that every string is non-decreasing. Return that count.

## Key insight
Keeping a set of columns is valid exactly when every kept pair (i < j) satisfies s[i] ≤ s[j] in every row. That is a longest chain in a partial order, so dp[j] = 1 + max dp[i] over compatible earlier columns.

## Approach: LIS over columns
```java
// LIS over columns: column j may follow column i when every row has s[i] <= s[j]
public int minDeletionSize(String[] strs) {
    int cols = strs[0].length(), best = 1;
    int[] dp = new int[cols];
    for (int j = 0; j < cols; j++) {
        dp[j] = 1;
        for (int i = 0; i < j; i++) if (before(strs, i, j)) dp[j] = Math.max(dp[j], dp[i] + 1);
        best = Math.max(best, dp[j]);
    }
    return cols - best;
}

// Whether column i is at most column j in every row
private boolean before(String[] strs, int i, int j) {
    for (String s : strs) if (s.charAt(i) > s.charAt(j)) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| LIS over columns | O(cols² · rows) | O(cols) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Is checking neighbours only enough?</summary>

Row order is transitive, so yes along the chain.

</details>


<details><summary>Answer?</summary>

cols − longest chain.

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
