---
topic: Bitmask Digit and Tree DP
pattern: [Mask of used elements, Pairing]
source: LeetCode 1799
difficulty: Hard
companies: [Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximize Score After N Operations

> [!TIP]
> **🧠 Memory hook**
> The mask says which elements are used; its **popcount tells the operation number**.
> **Mantra: dp[mask | i | j] = dp[mask] + op · gcd(a[i], a[j]), op = popcount / 2 + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Bitmask%20Digit%20and%20Tree%20DP/Bitmask%20Digit%20and%20Tree%20DP%20Animations.html#p=0) · **Pattern hub:** [Bitmask Digit and Tree DP - Pattern Map](Bitmask%20Digit%20and%20Tree%20DP%20-%20Pattern%20Map.md)

## Problem
nums has 2n integers. In operation i (1-indexed) remove two elements x, y and score i · gcd(x, y). Return the maximum total score.

## Key insight
dp[mask] is the best score after removing the elements in mask (an even count). The next operation number follows from the popcount, so no extra dimension is needed. Precompute the gcd table once.

## Approach: Forward mask DP
```java
// dp[mask] = best score after pairing off the elements in mask; the next operation number is popcount / 2 + 1
public int maxScore(int[] nums) {
    int n = nums.length;
    int[][] g = new int[n][n];
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) g[i][j] = gcd(nums[i], nums[j]);
    int[] dp = new int[1 << n];
    java.util.Arrays.fill(dp, -1);
    dp[0] = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        if (dp[mask] < 0) continue;
        int op = Integer.bitCount(mask) / 2 + 1;
        for (int i = 0; i < n; i++) {
            if ((mask >> i & 1) == 1) continue;
            for (int j = i + 1; j < n; j++) {
                if ((mask >> j & 1) == 1) continue;
                int next = mask | (1 << i) | (1 << j);
                dp[next] = Math.max(dp[next], dp[mask] + op * g[i][j]);
            }
        }
    }
    return dp[(1 << n) - 1];
}

// Greatest common divisor
private int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

| Approach | Time | Space |
|---|---|---|
| Forward mask DP | O(2ᵐ · m²) | O(2ᵐ) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does popcount give the operation number?</summary>

Each operation removes exactly two elements.

</details>


<details><summary>Why a gcd table?</summary>

The same gcds are needed across many masks.

</details>


## Connected
- [Smallest Sufficient Team](Smallest%20Sufficient%20Team.md)
- [Find the Shortest Superstring](Find%20the%20Shortest%20Superstring.md)
