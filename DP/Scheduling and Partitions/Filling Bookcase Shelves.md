---
topic: Scheduling and Partitions
pattern: [Bounded last block, Prefix DP]
source: LeetCode 1105
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Filling Bookcase Shelves

> [!TIP]
> **🧠 Memory hook**
> The last shelf holds books j..i−1 **as long as the width fits**; its height is the tallest of them.
> **Mantra: dp[i] = min over valid j of dp[j] + max height of books j..i−1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Scheduling%20and%20Partitions/Scheduling%20and%20Partitions%20Animations.html#p=1) · **Pattern hub:** [Scheduling and Partitions - Pattern Map](Scheduling%20and%20Partitions%20-%20Pattern%20Map.md)

## Problem
Place books in the given order on shelves of width shelfWidth. Return the minimum total height of the bookcase.

## Key insight
Walk j backwards from i adding thicknesses and stop when the shelf overflows, tracking the tallest book.

## Approach: Prefix DP
```java
// dp[i] = least total height shelving the first i books in order; the last shelf holds books j..i-1 while they fit
public int minHeightShelves(int[][] books, int shelfWidth) {
    int n = books.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        int width = 0, height = 0;
        dp[i] = Integer.MAX_VALUE;
        for (int j = i; j >= 1; j--) {
            width += books[j - 1][0];
            if (width > shelfWidth) break;
            height = Math.max(height, books[j - 1][1]);
            dp[i] = Math.min(dp[i], dp[j - 1] + height);
        }
    }
    return dp[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix DP | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why break on overflow?</summary>

Adding more books on the left only makes the shelf wider.

</details>


<details><summary>Why not sort books?</summary>

The order is fixed by the statement.

</details>


## Connected
- [Partition Array for Maximum Sum](Partition%20Array%20for%20Maximum%20Sum.md)
- [Word Break](../Palindromes%20and%20Word%20Splits/Word%20Break.md)
