---
topic: Stairs and Robbers
pattern: [Take or skip, Break the circle]
source: LeetCode 213
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# House Robber II

> [!TIP]
> **🧠 Memory hook**
> In a circle the first and last houses touch: **solve two lines**, one without the first, one without the last.
> **Mantra: MAX(line[0..n−2], line[1..n−1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=5) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Same as House Robber, but the houses form a circle.

## Key insight
Either the first house is not robbed (solve houses 1..n−1) or the last house is not robbed (solve 0..n−2). The better of the two lines is the answer; a single house is a special case.

## Approach 1: Two linear runs
```java
// Circle: the first and last houses are neighbours, so solve the line without the last house and the line without the first, take the better
public int rob(int[] nums) {
    int n = nums.length;
    if (n == 1) return nums[0];
    return Math.max(line(nums, 0, n - 2), line(nums, 1, n - 1));
}

// House Robber on nums[lo..hi]
private int line(int[] a, int lo, int hi) {
    int skip = 0, take = 0;
    for (int i = lo; i <= hi; i++) { int nt = skip + a[i]; skip = Math.max(skip, take); take = nt; }
    return Math.max(skip, take);
}
```

## Approach 2: Memo with a first-house flag
```java
// Memoised recursion that remembers whether the first house was robbed
public int robMemo(int[] nums) {
    int n = nums.length;
    if (n == 1) return nums[0];
    int[][] memo = new int[n][2];
    for (int[] row : memo) Arrays.fill(row, -1);
    return go(nums, 0, 0, memo);
}

// Best from house i on, given whether house 0 was robbed
private int go(int[] a, int i, int firstRobbed, int[][] memo) {
    int n = a.length;
    if (i >= n) return 0;
    if (i == n - 1 && firstRobbed == 1) return 0;
    if (memo[i][firstRobbed] != -1) return memo[i][firstRobbed];
    int res = go(a, i + 1, firstRobbed, memo);
    if (i == 0) res = Math.max(res, a[0] + go(a, 2, 1, memo));
    else res = Math.max(res, a[i] + go(a, i + 2, firstRobbed, memo));
    return memo[i][firstRobbed] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Two linear runs | O(n) | O(1) |
| Memo with a first-house flag | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why not three cases?</summary>

The two lines already cover "neither end robbed".

</details>


## Connected
- [House Robber](House%20Robber.md)
