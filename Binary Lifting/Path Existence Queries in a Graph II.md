---
topic: Binary Lifting
pattern: [Binary lifting, Sorting + greedy, Binary search]
source: LeetCode 3534
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, binary-lifting]
---
# Path Existence Queries in a Graph II

> [!TIP]
> **🧠 Memory hook**
> Stepping stones sorted along a river. Always leap to the **farthest** stone in reach. Then build express leaps (2, 4, 8 stones) and count hops like reading bits.
> **Mantra: SORT, FARTHEST HOP, LIFT BELOW TARGET, +1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Binary%20Lifting/Binary%20Lifting%20Animations.html#p=2) · **Pattern hub:** [Binary Lifting - Pattern Map](Binary%20Lifting%20-%20Pattern%20Map.md)

## Problem
Nodes i, j are connected if `|nums[i] − nums[j]| ≤ maxDiff`. For each query (u, v), return the minimum number of edges between them, or -1.

## Key insight
After sorting by value, the best single hop from position i goes to the **farthest** position j with `vals[j] ≤ vals[i] + maxDiff`. Hopping farther never hurts, so greedy works. Many queries → precompute `jump[i][j]` for 2^j greedy hops.

## Approach: Sort + greedy jump table
For a query with sorted positions a < b, lift from high j to low while `jump[cur][j] < b`, adding 2^j each time. Then one more hop must reach b, otherwise return -1.

```java
// Last index in sorted vals whose value is <= target
static int lastAtMost(int[] vals, int target) {
    int l = 0, r = vals.length - 1, res = 0;
    while (l <= r) {
        int mid = (l + r) >>> 1;
        if (vals[mid] <= target) { res = mid; l = mid + 1; } else r = mid - 1;
    }
    return res;
}

// Sort values; jump[i][j] = farthest sorted index reachable from i in 2^j hops; count hops greedily
public int[] pathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries) {
    Integer[] order = new Integer[n];
    for (int i = 0; i < n; i++) order[i] = i;
    Arrays.sort(order, (a, b) -> Integer.compare(nums[a], nums[b]));
    int[] vals = new int[n], pos = new int[n];
    for (int i = 0; i < n; i++) { vals[i] = nums[order[i]]; pos[order[i]] = i; }

    int log = 32 - Integer.numberOfLeadingZeros(n);
    int[][] jump = new int[n][log];
    for (int i = 0; i < n; i++) jump[i][0] = lastAtMost(vals, vals[i] + maxDiff);
    for (int j = 1; j < log; j++)
        for (int i = 0; i < n; i++) jump[i][j] = jump[jump[i][j - 1]][j - 1];

    int[] res = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        int a = pos[queries[q][0]], b = pos[queries[q][1]];
        if (a == b) { res[q] = 0; continue; }
        if (a > b) { int t = a; a = b; b = t; }
        int cur = a, hops = 0;
        for (int j = log - 1; j >= 0; j--) {
            if (jump[cur][j] < b) { cur = jump[cur][j]; hops += 1 << j; }
        }
        res[q] = jump[cur][0] >= b ? hops + 1 : -1;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + greedy jump table | O((n + q) log n) | O(n log n) |

## Recall before you reveal
<details><summary>Why is "farthest reachable" the right one-hop target?</summary>

Values are sorted, so a farther start covers a superset of the next reach. Greedy is safe.

</details>


<details><summary>Why stop BELOW b and add 1 at the end?</summary>

This finds the maximum hops that do not reach b. If one more hop reaches b, that is the minimum; if not, b is unreachable.

</details>


<details><summary>How do you translate original nodes to sorted positions?</summary>

Sort the indices by value, then `pos[order[i]] = i`.

</details>


<details><summary>Answer when u == v?</summary>

0.

</details>


## Connected
- Same table idea on a tree: [Kth Ancestor of a Tree Node](Kth%20Ancestor%20of%20a%20Tree%20Node.md)
- Same stay-below trick for LCA: [Number of Ways to Assign Edge Weights II](Number%20of%20Ways%20to%20Assign%20Edge%20Weights%20II.md)
