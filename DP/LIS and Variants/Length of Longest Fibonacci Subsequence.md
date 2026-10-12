---
topic: LIS and Variants
pattern: [Pair state, Value index map]
source: LeetCode 873
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Length of Longest Fibonacci Subsequence

> [!TIP]
> **🧠 Memory hook**
> The last **two values** decide the chain. The one before them is **arr[k] − arr[j]**, a lookup.
> **Mantra: dp[j][k] = dp[i][j] + 1 WHERE arr[i] = arr[k] − arr[j]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=17) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Given a strictly increasing array, return the length of the longest Fibonacci-like subsequence (at least 3 terms), or 0.

## Key insight
dp[j][k] is the longest chain ending with arr[j], arr[k]. The earlier term must equal arr[k] − arr[j] and sit before j.

## Approach: Pair DP + map
```java
// dp[j][k] = longest Fibonacci-like chain ending with arr[j], arr[k]; the earlier term is arr[k] - arr[j]
public int lenLongestFibSubseq(int[] arr) {
    int n = arr.length, ans = 0;
    Map<Integer, Integer> index = new HashMap<>();
    for (int i = 0; i < n; i++) index.put(arr[i], i);
    int[][] dp = new int[n][n];
    for (int k = 0; k < n; k++)
        for (int j = 0; j < k; j++) {
            Integer i = index.get(arr[k] - arr[j]);
            if (i != null && i < j) {
                dp[j][k] = (dp[i][j] > 0 ? dp[i][j] : 2) + 1;
                ans = Math.max(ans, dp[j][k]);
            }
        }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Pair DP + map | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why need i < j?</summary>

The extra term must come earlier in the array.

</details>


<details><summary>Why start from 2?</summary>

Any valid triple has length 3.

</details>


## Connected
- [Longest Arithmetic Subsequence](Longest%20Arithmetic%20Subsequence.md)
