---
topic: Binary Lifting
pattern: [Binary lifting, Bit decomposition]
source: LeetCode 1483
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, binary-lifting]
---
# Kth Ancestor of a Tree Node

> [!TIP]
> **🧠 Memory hook**
> An **elevator with express buttons** +1, +2, +4, +8 floors. To go up 5: press +4 then +1.
> **Mantra: DOUBLE THE JUMP, READ THE BITS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Binary%20Lifting/Binary%20Lifting%20Animations.html#p=0) · **Pattern hub:** [Binary Lifting - Pattern Map](Binary%20Lifting%20-%20Pattern%20Map.md)

## Problem
A tree of `n` nodes is given as `parent[]` (root has -1). Answer many `getKthAncestor(node, k)` queries, returning -1 if it does not exist.

## Key insight
Walking up k parents is O(k), which is too slow for many queries. Precompute `up[v][j]` = the 2^j-th ancestor. Every k is a sum of powers of two (its binary form), so take one jump per set bit.

## Approach: Binary lifting table
1. Column 0 = parent.
2. Column j = jump 2^(j-1) twice.
3. Query: for each set bit j of k, `node = up[node][j]`.

```java
// Binary lifting table: up[v][j] = 2^j-th ancestor of v
static class TreeAncestor {
    private final int[][] up;
    private final int log;

    // Fills column 0 with parents, then each column doubles the previous jump
    TreeAncestor(int n, int[] parent) {
        log = 32 - Integer.numberOfLeadingZeros(n);
        up = new int[n][log];
        for (int[] row : up) Arrays.fill(row, -1);
        for (int v = 0; v < n; v++) up[v][0] = parent[v];
        for (int j = 1; j < log; j++)
            for (int v = 0; v < n; v++)
                if (up[v][j - 1] != -1) up[v][j] = up[up[v][j - 1]][j - 1];
    }

    // Breaks k into powers of two and takes one jump per set bit
    int getKthAncestor(int node, int k) {
        for (int j = 0; j < log && node != -1; j++)
            if ((k & (1 << j)) != 0) node = up[node][j];
        return (k >> log) > 0 ? -1 : node;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Binary lifting table | build O(n log n), query O(log n) | O(n log n) |

> [!WARNING]
> **Java gotcha**
> Compute LOG with `32 - Integer.numberOfLeadingZeros(n)`. `(int)(Math.log(n)/Math.log(2))` can give 2.9999 → 2 for exact powers of two.

## Recall before you reveal
<details><summary>What does `up[v][j]` store?</summary>

The 2^j-th ancestor of v, or -1.

</details>


<details><summary>Write the recurrence from memory.</summary>

`up[v][j] = up[ up[v][j-1] ][j-1]` (guard against -1).

</details>


<details><summary>Loop order when building: j outside or v outside? Why?</summary>

j outside: column j needs the WHOLE column j-1 first.

</details>


<details><summary>Query for k = 13: which jumps?</summary>

13 = 1101₂ → jumps of 8, 4 and 1.

</details>


## Connected
- Uses this table + LCA: [Number of Ways to Assign Edge Weights II](Number%20of%20Ways%20to%20Assign%20Edge%20Weights%20II.md)
- Same jump table on an array: [Path Existence Queries in a Graph II](Path%20Existence%20Queries%20in%20a%20Graph%20II.md)
