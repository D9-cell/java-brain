---
topic: Strings and Subsequences
pattern: [Contiguous match, One row backwards]
source: LeetCode 718
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Length of Repeated Subarray

> [!TIP]
> **🧠 Memory hook**
> Common substring on arrays; one row is enough if you **scan j backwards**.
> **Mantra: dp[j] = a[i−1] == b[j−1] ? dp[j−1] + 1 : 0 (j DOWN)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=3) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return the maximum length of a subarray that appears in both arrays.

## Key insight
Same recurrence as Longest Common Substring. Each cell only needs the diagonal from the previous row, so a single row works when j goes from right to left.

## Approach: One row
```java
// One row of common-suffix lengths, j scanned backwards so dp[j - 1] is still the previous row
public int findLength(int[] a, int[] b) {
    int[] dp = new int[b.length + 1];
    int best = 0;
    for (int i = 1; i <= a.length; i++)
        for (int j = b.length; j >= 1; j--) {
            dp[j] = a[i - 1] == b[j - 1] ? dp[j - 1] + 1 : 0;
            best = Math.max(best, dp[j]);
        }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| One row | O(m · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why backwards?</summary>

dp[j − 1] must still be the previous row.

</details>


<details><summary>Binary-search alternative?</summary>

Search the length and check with rolling hashes.

</details>


## Connected
- [Longest Common Substring](Longest%20Common%20Substring.md)
