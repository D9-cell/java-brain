---
topic: Trees and Advanced Graphs
pattern: [Tree DP, Subtree sums mod k]
source: LeetCode 2872
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Maximum Number of K-Divisible Components

> [!TIP]
> **🧠 Memory hook**
> Snip off every branch whose weight is a multiple of k: each snip is a free extra piece.
> **Mantra: SUBTREE SUM % k == 0 ⇒ CUT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=5) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Delete some edges so every component's value sum is divisible by k. Maximise the number of components.

## Key insight
Because the total is divisible by k, whenever a subtree's sum is divisible by k, cutting its parent edge leaves the rest divisible too. So count the subtrees (including the root) with sum % k == 0.

## Approach: DFS returning sum mod k
```java
// DFS returns each subtree's sum mod k; a subtree whose sum is divisible by k can be cut off as its own component
public int maxKDivisibleComponents(int n, int[][] edges, int[] values, int k) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] count = {0};
    dfs(adj, 0, -1, values, k, count);
    return count[0];
}

// Returns the subtree sum modulo k and counts one component whenever it is 0
private long dfs(List<List<Integer>> adj, int u, int parent, int[] values, int k, int[] count) {
    long sum = values[u];
    for (int v : adj.get(u)) if (v != parent) sum += dfs(adj, v, u, values, k, count);
    sum %= k;
    if (sum == 0) count[0]++;
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS returning sum mod k | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Add subtree values in `long` before taking `% k`.

## Recall before you reveal
<details><summary>Why does a divisible subtree always allow a cut?</summary>

The remainder of the tree also sums to a multiple of k.

</details>


<details><summary>Why long?</summary>

Sums reach n · 10⁹ before the modulo.

</details>


## Connected
- [Minimum Time to Collect All Apples in a Tree](Minimum%20Time%20to%20Collect%20All%20Apples%20in%20a%20Tree.md)
