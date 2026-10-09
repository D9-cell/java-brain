---
topic: Jumps and Reach
pattern: [DAG by height, Memo DFS]
source: LeetCode 1340
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Jump Game V

> [!TIP]
> **🧠 Memory hook**
> You can only jump **downhill**, so heights give a natural order: no cycles.
> **Mantra: best(i) = 1 + max best(j); SCAN EACH SIDE UNTIL A BAR IS ≥ arr[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=2) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
From index i you may jump to j with |i − j| ≤ d if arr[j] < arr[i] and every bar strictly between them is lower than arr[i]. Start anywhere; return the maximum number of indexes you can visit.

## Key insight
Jumps always go to a lower bar, so the jump graph is a DAG and memoised DFS is safe. On each side scan outward until you leave the distance or meet a bar that is not lower (it blocks everything behind it). Equivalently, process bars from lowest to highest.

## Approach 1: Memo DFS
```java
// Memo DFS: best(i) = 1 + max best(j) over legal jumps, scanning each side until a bar is too tall
public int maxJumps(int[] arr, int d) {
    int[] memo = new int[arr.length];
    int best = 0;
    for (int i = 0; i < arr.length; i++) best = Math.max(best, visit(arr, d, i, memo));
    return best;
}

// Longest chain of jumps starting at i
private int visit(int[] a, int d, int i, int[] memo) {
    if (memo[i] > 0) return memo[i];
    int res = 1;
    for (int dir = -1; dir <= 1; dir += 2)
        for (int j = i + dir; j >= 0 && j < a.length && Math.abs(j - i) <= d && a[j] < a[i]; j += dir)
            res = Math.max(res, 1 + visit(a, d, j, memo));
    return memo[i] = res;
}
```

## Approach 2: Sorted by height
```java
// Bottom-up: process bars from lowest to highest so every target is already final
public int maxJumpsSorted(int[] arr, int d) {
    int n = arr.length;
    Integer[] order = new Integer[n];
    for (int i = 0; i < n; i++) order[i] = i;
    Arrays.sort(order, (x, y) -> arr[x] - arr[y]);
    int[] dp = new int[n];
    int best = 0;
    for (int i : order) {
        dp[i] = 1;
        for (int dir = -1; dir <= 1; dir += 2)
            for (int j = i + dir; j >= 0 && j < n && Math.abs(j - i) <= d && arr[j] < arr[i]; j += dir)
                dp[i] = Math.max(dp[i], 1 + dp[j]);
        best = Math.max(best, dp[i]);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Memo DFS | O(n · d) | O(n) |
| Sorted by height | O(n log n + n · d) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can you stop scanning at the first tall bar?</summary>

It blocks the jump to it and every jump past it.

</details>


<details><summary>Why is there no cycle?</summary>

Every jump strictly decreases the height.

</details>


## Connected
- Longest Increasing Path in a Matrix
- [Jump Game VI](Jump%20Game%20VI.md)
