---
topic: Backtracking
pattern: [Permutation search, Bitmask DP]
source: LeetCode 3149
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Find the Minimum Cost Array Permutation

> [!TIP]
> **🧠 Memory hook**
> A round table: you can always start the seating at guest 0.
> **Mantra: perm[0] = 0, PRUNE (or bitmask DP), SMALLEST FIRST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=9) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Permutation of 0..n−1 minimising Σ|perm[i] − nums[perm[(i+1)%n]]|, lexicographically smallest.

## Key insight
The score is cyclic, so perm[0] = 0. Backtracking with a cost bound (C++) or bitmask DP + greedy reconstruction.

## Approach 1: Pruned backtracking
```java
// Approach 1 (from the C++): fix perm[0] = 0 (cyclic cost), DFS in increasing order, prune when sum >= best
private void solve(int[] nums, boolean[] used, int[] perm, int len, int sum) {
    if (sum >= minSum) return;
    if (len == n) {
        sum += Math.abs(perm[n - 1] - nums[perm[0]]);
        if (sum < minSum) { minSum = sum; result = perm.clone(); }
        return;
    }
    for (int i = 0; i < n; i++) {
        if (used[i]) continue;
        used[i] = true;
        perm[len] = i;
        solve(nums, used, perm, len + 1, sum + Math.abs(perm[len - 1] - nums[i]));
        used[i] = false;
    }
}

// Backtracking entry point
public int[] findPermutationBacktrack(int[] nums) {
    n = nums.length;
    minSum = Integer.MAX_VALUE;
    int[] perm = new int[n];
    boolean[] used = new boolean[n];
    used[0] = true;
    solve(nums, used, perm, 1, 0);
    return result;
}
```

## Approach 2: Bitmask DP
```java
// Approach 2: bitmask DP, dp[mask][last] = min cost to finish from here (back to 0 at the end); rebuild greedily
public int[] findPermutation(int[] nums) {
    int n = nums.length, full = (1 << n) - 1;
    int[][] dp = new int[1 << n][n];
    for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE / 2);
    for (int last = 0; last < n; last++) dp[full][last] = Math.abs(last - nums[0]);
    for (int mask = full - 1; mask >= 1; mask--) {
        if ((mask & 1) == 0) continue;
        for (int last = 0; last < n; last++) {
            if ((mask >> last & 1) == 0) continue;
            for (int nx = 0; nx < n; nx++)
                if ((mask >> nx & 1) == 0) dp[mask][last] = Math.min(dp[mask][last], Math.abs(last - nums[nx]) + dp[mask | 1 << nx][nx]);
        }
    }
    int[] perm = new int[n];
    int mask = 1, last = 0;
    for (int p = 1; p < n; p++)
        for (int nx = 0; nx < n; nx++)
            if ((mask >> nx & 1) == 0 && Math.abs(last - nums[nx]) + dp[mask | 1 << nx][nx] == dp[mask][last]) {
                perm[p] = nx;
                mask |= 1 << nx;
                last = nx;
                break;
            }
    return perm;
}
```

| Approach | Time | Space |
|---|---|---|
| Pruned backtracking | O(n!) worst | O(n) |
| Bitmask DP | O(2^n · n²) | O(2^n · n) |

> [!WARNING]
> **Java gotcha**
> Both approaches match a full enumeration for n ≤ 7. The C++ file had no Java version.

## Recall before you reveal
<details><summary>Why can the rebuild be greedy?</summary>

dp gives the optimal cost to finish; pick the smallest next index that preserves it.

</details>

