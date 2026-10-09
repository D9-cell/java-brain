---
topic: Trees and Advanced Graphs
pattern: [Subtree xor, Euler times]
source: LeetCode 2322
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Minimum Score After Removals on a Tree

> [!TIP]
> **🧠 Memory hook**
> Cutting two edges makes three pieces; each piece's xor follows from subtree xors and an ancestor test.
> **Mantra: TRY EVERY PAIR OF NODES; xor FROM ANCESTOR RELATION**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=10) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Remove two edges, splitting the tree into three components. The score is (largest xor of node values) − (smallest xor). Return the minimum score.

## Key insight
Precompute each subtree's xor and Euler entry/exit times. Each non-root node stands for the edge to its parent, so try every pair of nodes. If one is an ancestor of the other the three parts are (inner, outer minus inner, rest); otherwise (u, v, rest).

## Approach: Subtree xors + ancestor test
```java
// Subtree xors plus entry/exit times: for each pair of non-root nodes the three parts' xors follow from ancestor tests
public int minimumScore(int[] nums, int[][] edges) {
    int n = nums.length;
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] xor = new int[n], tin = new int[n], tout = new int[n];
    int[] timer = {0};
    dfs(adj, 0, -1, nums, xor, tin, tout, timer);
    int total = xor[0], best = Integer.MAX_VALUE;
    for (int u = 1; u < n; u++) {
        for (int v = u + 1; v < n; v++) {
            int a, b, c;
            if (isAncestor(u, v, tin, tout)) { a = xor[v]; b = xor[u] ^ xor[v]; c = total ^ xor[u]; }
            else if (isAncestor(v, u, tin, tout)) { a = xor[u]; b = xor[v] ^ xor[u]; c = total ^ xor[v]; }
            else { a = xor[u]; b = xor[v]; c = total ^ xor[u] ^ xor[v]; }
            best = Math.min(best, Math.max(a, Math.max(b, c)) - Math.min(a, Math.min(b, c)));
        }
    }
    return best;
}

// Is u an ancestor of v (u's interval contains v's)?
private boolean isAncestor(int u, int v, int[] tin, int[] tout) {
    return tin[u] <= tin[v] && tout[v] <= tout[u];
}

// Computes subtree xors and the Euler-tour times
private void dfs(List<List<Integer>> adj, int u, int parent, int[] nums, int[] xor, int[] tin, int[] tout, int[] timer) {
    xor[u] = nums[u];
    tin[u] = timer[0]++;
    for (int v : adj.get(u)) {
        if (v == parent) continue;
        dfs(adj, v, u, nums, xor, tin, tout, timer);
        xor[u] ^= xor[v];
    }
    tout[u] = timer[0]++;
}
```

| Approach | Time | Space |
|---|---|---|
| Subtree xors + ancestor test | O(n²) | O(n) |

## Recall before you reveal
<details><summary>How do you test ancestry in O(1)?</summary>

tin[u] ≤ tin[v] and tout[v] ≤ tout[u].

</details>


<details><summary>Why only n² pairs?</summary>

Each removed edge is identified by its lower node.

</details>


## Connected
- [Check If Two Nodes Are On Same Path In A Graph](../Graph%20Basics/Check%20If%20Two%20Nodes%20Are%20On%20Same%20Path%20In%20A%20Graph.md)
- [Sum of Distances in Tree](Sum%20of%20Distances%20in%20Tree.md)
