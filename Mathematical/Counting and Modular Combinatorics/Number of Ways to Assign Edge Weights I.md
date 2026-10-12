---
topic: Counting and Modular Combinatorics
pattern: [BFS depth, Parity counting]
source: LeetCode 3558
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Number of Ways to Assign Edge Weights I

> [!TIP]
> **🧠 Memory hook**
> Only the path to the **deepest node** matters. d edges of weight 1 or 2 have an odd sum in **2^(d − 1)** ways.
> **Mantra: d = max depth from node 1 · RETURN 2^(d − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=7) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
A tree rooted at node 1. Pick a node x at maximum depth and assign weight 1 or 2 to each edge on the path 1 → x. Count assignments with an odd total, mod 1e9+7.

## Key insight
Weight 2 does not change parity; the sum is odd iff an odd number of edges get weight 1. Half of all 2^d assignments have an odd count of ones (flip the last edge to pair them), so 2^(d − 1).

## Approach: BFS + power of two
```java
// Only the deepest path matters: d edges of weight 1 or 2 with an odd sum gives 2^(d - 1)
public int assignEdgeWeights(int[][] edges) {
    int n = edges.length + 1;
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) {
        adj.get(e[0]).add(e[1]);
        adj.get(e[1]).add(e[0]);
    }
    int[] depth = new int[n + 1];
    Arrays.fill(depth, -1);
    depth[1] = 0;
    Deque<Integer> q = new ArrayDeque<>(List.of(1));
    int maxDepth = 0;
    while (!q.isEmpty()) {
        int u = q.poll();
        maxDepth = Math.max(maxDepth, depth[u]);
        for (int v : adj.get(u))
            if (depth[v] == -1) {
                depth[v] = depth[u] + 1;
                q.add(v);
            }
    }
    long MOD = 1_000_000_007, ways = 1;
    for (int i = 1; i < maxDepth; i++) ways = ways * 2 % MOD;
    return (int) ways;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS + power of two | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why half?</summary>

Toggling one fixed edge swaps odd and even sums, a perfect pairing.

</details>


<details><summary>Why BFS?</summary>

It gives the depth of every node from the root in one pass.

</details>


## Connected
- [Number of Ways to Assign Edge Weights II](../../Binary%20Lifting/Number%20of%20Ways%20to%20Assign%20Edge%20Weights%20II.md)
