---
topic: Strings and Subsequences
pattern: [LCS-shaped grid, Non-empty choice]
source: LeetCode 1458
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Max Dot Product of Two Subsequences

> [!TIP]
> **🧠 Memory hook**
> LCS where every pair you take **scores a·b**, and you must take at least one pair.
> **Mantra: dp = max(pair, pair + ↖, ↑, ←)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=7) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return the maximum dot product between non-empty subsequences of nums1 and nums2 of the same length.

## Key insight
dp[i][j] is the best for the prefixes. Pairing the last elements gives pair alone (start fresh) or pair + diagonal (extend). Skipping one side gives up or left. Starting with −∞ forces at least one pair, which matters when every product is negative.

## Approach: Grid
```java
// dp[i][j] = best for prefixes; pairing a[i-1]·b[j-1] may start fresh or extend a positive dp[i-1][j-1]
public int maxDotProduct(int[] a, int[] b) {
    int m = a.length, n = b.length;
    int[][] dp = new int[m + 1][n + 1];
    for (int[] row : dp) Arrays.fill(row, Integer.MIN_VALUE / 2);
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            int pair = a[i - 1] * b[j - 1];
            dp[i][j] = Math.max(Math.max(pair, pair + dp[i - 1][j - 1]), Math.max(dp[i - 1][j], dp[i][j - 1]));
        }
    return dp[m][n];
}
```

| Approach | Time | Space |
|---|---|---|
| Grid | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why "pair alone"?</summary>

The diagonal may be negative; starting fresh can be better.

</details>


<details><summary>All products negative?</summary>

The answer is the least negative single pair, not 0.

</details>


## Connected
- [Longest Common Subsequence](Longest%20Common%20Subsequence.md)
- [Maximum Product Subarray](../Stock%20and%20Kadane%20States/Maximum%20Product%20Subarray.md)
