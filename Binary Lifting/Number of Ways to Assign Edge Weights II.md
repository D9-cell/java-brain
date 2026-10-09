---
topic: Binary Lifting
pattern: [Binary lifting, LCA, Parity counting]
source: LeetCode 3559
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, binary-lifting]
---
# Number of Ways to Assign Edge Weights II

> [!TIP]
> **🧠 Memory hook**
> Two climbers on different branches. The lower one takes the **express elevator** to the same floor. Then both take the biggest jumps that keep them apart. They end up one floor below their meeting point.
> **Mantra: LEVEL UP, JUMP WHILE DIFFERENT, PARENT IS LCA**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Binary%20Lifting/Binary%20Lifting%20Animations.html#p=1) · **Pattern hub:** [Binary Lifting - Pattern Map](Binary%20Lifting%20-%20Pattern%20Map.md)

## Problem
A tree with nodes 1..n is given. For each query (u, v), count the ways to set every edge on the u–v path to weight 1 or 2 so the path sum is **odd**, modulo 1e9+7.

## Key insight
- Path length `d = depth[u] + depth[v] − 2·depth[lca]`.
- Only parity matters. Choose d−1 edges freely; the last one is forced to fix the parity → **2^(d−1)** (0 if d = 0).
- So the real work is **LCA per query** → binary lifting.

## Approach: BFS depth + lifting LCA
Phase 1: lift the deeper node by the depth difference (read its bits).
Phase 2: for j from high to low, jump both if `up[u][j] != up[v][j]`.
The LCA is `up[u][0]`.

```java
// BFS from the root fills parent and depth (iterative, so deep trees do not overflow the stack)
void bfs(List<List<Integer>> adj) {
    boolean[] seen = new boolean[n];
    ArrayDeque<Integer> q = new ArrayDeque<>();
    q.offer(0);
    seen[0] = true;
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : adj.get(u)) {
            if (seen[v]) continue;
            seen[v] = true;
            up[v][0] = u;
            depth[v] = depth[u] + 1;
            q.offer(v);
        }
    }
}

// Lifts the deeper node to equal depth, then lifts both while their ancestors differ
int lca(int u, int v) {
    if (depth[u] < depth[v]) { int t = u; u = v; v = t; }
    int k = depth[u] - depth[v];
    for (int j = 0; j < log; j++) if ((k & (1 << j)) != 0) u = up[u][j];
    if (u == v) return u;
    for (int j = log - 1; j >= 0; j--) {
        if (up[u][j] != up[v][j]) { u = up[u][j]; v = up[v][j]; }
    }
    return up[u][0];
}

// Path length d has 2^(d-1) weight assignments with odd sum
public int[] assignEdgeWeights(int[][] edges, int[][] queries) {
    n = edges.length + 1;
    log = 32 - Integer.numberOfLeadingZeros(n);
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) {
        adj.get(e[0] - 1).add(e[1] - 1);
        adj.get(e[1] - 1).add(e[0] - 1);
    }
    up = new int[n][log];
    for (int[] row : up) Arrays.fill(row, -1);
    depth = new int[n];
    bfs(adj);
    for (int j = 1; j < log; j++)
        for (int v = 0; v < n; v++)
            if (up[v][j - 1] != -1) up[v][j] = up[up[v][j - 1]][j - 1];

    long[] pow2 = new long[n + 1];
    pow2[0] = 1;
    for (int i = 1; i <= n; i++) pow2[i] = pow2[i - 1] * 2 % MOD;

    int[] res = new int[queries.length];
    for (int i = 0; i < queries.length; i++) {
        int u = queries[i][0] - 1, v = queries[i][1] - 1;
        int d = depth[u] + depth[v] - 2 * depth[lca(u, v)];
        res[i] = d == 0 ? 0 : (int) pow2[d - 1];
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS depth + lifting LCA | O((n + q) log n) | O(n log n) |

> [!WARNING]
> **Java gotcha**
> The C++ uses a recursive DFS. In Java a path-shaped tree with 1e5 nodes throws StackOverflowError, so this version fills parent/depth with an iterative BFS.

## Recall before you reveal
<details><summary>Why only jump when ancestors differ?</summary>

Equal ancestors mean we would reach or overshoot the LCA. Jumping only while they differ stops exactly one level below it.

</details>


<details><summary>What if u == v after phase 1?</summary>

One was an ancestor of the other. Return it directly.

</details>


<details><summary>Why 2^(d−1)?</summary>

The first d−1 edges are free choices. The last edge has exactly one value that makes the sum odd.

</details>


<details><summary>Precompute what for fast answers?</summary>

`pow2[i] = 2^i mod M` up to n.

</details>


## Connected
- Table basics: [Kth Ancestor of a Tree Node](Kth%20Ancestor%20of%20a%20Tree%20Node.md)
- Same stay-below-then-+1 trick: [Path Existence Queries in a Graph II](Path%20Existence%20Queries%20in%20a%20Graph%20II.md)
