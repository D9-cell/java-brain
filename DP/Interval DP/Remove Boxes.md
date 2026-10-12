---
topic: Interval DP
pattern: [Merge with an equal partner, 3-D memo]
source: LeetCode 546
difficulty: Hard
companies: [Tencent]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Remove Boxes

> [!TIP]
> **🧠 Memory hook**
> Add a third dimension: **k extra boxes equal to boxes[l]** already glued to the left of the range.
> **Mantra: dp[l][r][k] = max(remove the run now, or clear a gap and merge with a later equal box)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=7) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
Removing k contiguous equal boxes scores k². Return the maximum score for removing all boxes.

## Key insight
Without the extra count, the left part cannot know how many equal boxes will join it later. State (l, r, k) says: boxes l..r, with k more boxes equal to boxes[l] attached on the left. Either remove the run now for (k + 1)², or pick a later equal box m, clear the gap l+1..m−1 first, and carry on from m with k + 1.

## Approach: 3-D memo
```java
// dp[l][r][k] = best points for boxes l..r when k extra boxes equal to boxes[l] are stuck to its left
public int removeBoxes(int[] boxes) {
    int n = boxes.length;
    return solve(boxes, 0, n - 1, 0, new int[n][n][n]);
}

// Remove the run at l now (k + 1 boxes), or keep it and merge with a later equal box m after clearing the gap
private int solve(int[] b, int l, int r, int k, int[][][] memo) {
    if (l > r) return 0;
    if (memo[l][r][k] != 0) return memo[l][r][k];
    while (l + 1 <= r && b[l + 1] == b[l]) {
        l++;
        k++;
    }
    int best = (k + 1) * (k + 1) + solve(b, l + 1, r, 0, memo);
    for (int m = l + 1; m <= r; m++)
        if (b[m] == b[l]) best = Math.max(best, solve(b, l + 1, m - 1, 0, memo) + solve(b, m, r, k + 1, memo));
    return memo[l][r][k] = best;
}
```

| Approach | Time | Space |
|---|---|---|
| 3-D memo | O(n⁴) | O(n³) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why the third dimension?</summary>

Merging boxes later changes the score of the group, so the group size must be in the state.

</details>


<details><summary>Why shrink l while equal?</summary>

It folds adjacent equal boxes into k without extra branching.

</details>


## Connected
- [Burst Balloons](Burst%20Balloons.md)
- [Strange Printer](Strange%20Printer.md)
