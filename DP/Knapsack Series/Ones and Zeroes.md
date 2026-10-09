---
topic: Knapsack Series
pattern: [0-1 knapsack, Two capacities]
source: LeetCode 474
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Ones and Zeroes

> [!TIP]
> **🧠 Memory hook**
> A bag with **two pockets**: one for zeros (m), one for ones (n).
> **Mantra: dp[i][j] = max(dp[i][j], dp[i − zeros][j − ones] + 1), BOTH DOWNWARD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=12) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Return the size of the largest subset of binary strings with at most m zeros and n ones in total.

## Key insight
0-1 knapsack where each string has a 2-D weight (zeros, ones) and value 1. The table is 2-D; both capacities are scanned downward so a string is used once.

## Approach: 2-D capacity row
```java
// 0-1 knapsack with two capacities, both scanned downward
public int findMaxForm(String[] strs, int m, int n) {
    int[][] dp = new int[m + 1][n + 1];
    for (String s : strs) {
        int zeros = 0, ones = 0;
        for (char c : s.toCharArray()) if (c == '0') zeros++; else ones++;
        for (int i = m; i >= zeros; i--)
            for (int j = n; j >= ones; j--) dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
    }
    return dp[m][n];
}
```

| Approach | Time | Space |
|---|---|---|
| 2-D capacity row | O(L · m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why both loops downward?</summary>

Each string may only be counted once.

</details>


<details><summary>Value of every item?</summary>

1, because we maximise the number of strings.

</details>


## Connected
- [0-1 Knapsack](0-1%20Knapsack.md)
- [Profitable Schemes](Profitable%20Schemes.md)
