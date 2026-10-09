---
topic: Trees and Advanced Graphs
pattern: [Re-rooting, Tree DP]
source: LeetCode 834
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Sum of Distances in Tree

> [!TIP]
> **🧠 Memory hook**
> Answer for the root, then shift the root along each edge: some nodes get one step closer, the rest one step farther.
> **Mantra: ANS[child] = ANS[parent] − size + (n − size)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=8) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Return, for every node, the sum of its distances to all other nodes.

## Key insight
BFS from every node is O(n²). Compute subtree sizes and the answer for root 0 in one pass. Then moving the root from u to its child v brings the size[v] nodes of v's subtree one step closer and pushes the other n − size[v] nodes one step farther.

## Approach: Two passes (re-rooting)
```java
// Re-rooting: compute subtree sizes and the answer for root 0, then derive each child's answer from its parent's
public int[] sumOfDistancesInTree(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] size = new int[n], answer = new int[n];
    down(adj, 0, -1, size, answer);
    up(adj, 0, -1, size, answer, n);
    return answer;
}

// answer[u] = sum of distances to nodes inside u's subtree; size[u] = subtree size
private void down(List<List<Integer>> adj, int u, int parent, int[] size, int[] answer) {
    size[u] = 1;
    for (int v : adj.get(u)) {
        if (v == parent) continue;
        down(adj, v, u, size, answer);
        size[u] += size[v];
        answer[u] += answer[v] + size[v];
    }
}

// Moving the root from u to its child v brings size[v] nodes one step closer and pushes n - size[v] nodes one step away
private void up(List<List<Integer>> adj, int u, int parent, int[] size, int[] answer, int n) {
    for (int v : adj.get(u)) {
        if (v == parent) continue;
        answer[v] = answer[u] - size[v] + (n - size[v]);
        up(adj, v, u, size, answer, n);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Two passes (re-rooting) | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why n − size[v]?</summary>

Every node outside v's subtree is one edge farther from v than from u.

</details>


<details><summary>Where else does re-rooting appear?</summary>

Any "answer for every node as root" question: tree diameter per node, centroid, rerooting DP.

</details>


## Connected
- [Tree Diameter](Tree%20Diameter.md)
