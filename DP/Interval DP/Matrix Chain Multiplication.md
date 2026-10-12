---
topic: Interval DP
pattern: [Split point, Interval by length]
source: GfG Matrix Chain Multiplication
difficulty: Hard
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Matrix Chain Multiplication

> [!TIP]
> **🧠 Memory hook**
> The **last multiplication** splits the chain into two independent chains.
> **Mantra: dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + arr[i−1]·arr[k]·arr[j]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=0) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
Matrix t has size arr[t−1] × arr[t]. Return the minimum number of scalar multiplications to multiply the whole chain.

## Key insight
Whatever the order, the final multiplication joins a left chain (i..k) and a right chain (k+1..j) and costs arr[i−1]·arr[k]·arr[j]. Each side is the same problem on a shorter range, so try every k and keep the minimum.

## Approach 1: Top-down memo
```java
// Top-down: cheapest way to multiply matrices i..j where matrix t is arr[t - 1] x arr[t]
public int mcmMemo(int[] arr) {
    int n = arr.length;
    int[][] memo = new int[n][n];
    return solve(arr, 1, n - 1, memo);
}

// Tries every split k; the final product costs arr[i - 1] * arr[k] * arr[j]
private int solve(int[] arr, int i, int j, int[][] memo) {
    if (i >= j) return 0;
    if (memo[i][j] != 0) return memo[i][j];
    int best = Integer.MAX_VALUE;
    for (int k = i; k < j; k++)
        best = Math.min(best, solve(arr, i, k, memo) + solve(arr, k + 1, j, memo) + arr[i - 1] * arr[k] * arr[j]);
    return memo[i][j] = best;
}
```

## Approach 2: Bottom-up by length
```java
// Bottom-up by chain length
public int mcmBottomUp(int[] arr) {
    int n = arr.length;
    int[][] dp = new int[n][n];
    for (int len = 2; len < n; len++)
        for (int i = 1; i + len - 1 < n; i++) {
            int j = i + len - 1;
            dp[i][j] = Integer.MAX_VALUE;
            for (int k = i; k < j; k++) dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j]);
        }
    return dp[1][n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Top-down memo | O(n³) | O(n²) |
| Bottom-up by length | O(n³) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why length order?</summary>

dp[i][k] and dp[k+1][j] are shorter, so they are ready.

</details>


<details><summary>Why n³?</summary>

n² intervals times n split points.

</details>


## Connected
- [Brackets in Matrix Chain Multiplication](Brackets%20in%20Matrix%20Chain%20Multiplication.md)
- [Burst Balloons](Burst%20Balloons.md)
- [Minimum Score Triangulation of Polygon](Minimum%20Score%20Triangulation%20of%20Polygon.md)
