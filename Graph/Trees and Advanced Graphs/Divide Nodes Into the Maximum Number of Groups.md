---
topic: Trees and Advanced Graphs
pattern: [Bipartite, BFS depth, Components]
source: LeetCode 2493
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Divide Nodes Into the Maximum Number of Groups

> [!TIP]
> **🧠 Memory hook**
> Groups form BFS layers: the deeper you can make the layering, the more groups, but only if there is no odd cycle.
> **Mantra: BIPARTITE CHECK + DEEPEST BFS PER COMPONENT, SUMMED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=14) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Place nodes into numbered groups so that every edge joins consecutive groups. Return the maximum number of groups, or −1.

## Key insight
A valid placement is a BFS layering from some start node, which needs the component to be bipartite. The best count for a component is the maximum BFS depth over all start nodes. Components are independent, so sum them.

## Approach: Bipartite check + BFS from every node
```java
// Per component: it must be bipartite, and the best group count is the largest BFS depth over all start nodes; sum the components
public int magnificentSets(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] comp = new int[n + 1], color = new int[n + 1];
    Arrays.fill(comp, -1);
    Arrays.fill(color, -1);
    int comps = 0;
    for (int i = 1; i <= n; i++) {
        if (comp[i] != -1) continue;
        if (!colour(adj, i, comps, comp, color)) return -1;
        comps++;
    }
    int[] best = new int[comps];
    for (int s = 1; s <= n; s++) best[comp[s]] = Math.max(best[comp[s]], depth(adj, s, n));
    int total = 0;
    for (int b : best) total += b;
    return total;
}

// Labels the component with id and 2-colours it; false when an odd cycle appears
private boolean colour(List<List<Integer>> adj, int start, int id, int[] comp, int[] color) {
    Queue<Integer> que = new ArrayDeque<>(List.of(start));
    comp[start] = id;
    color[start] = 0;
    while (!que.isEmpty()) {
        int u = que.poll();
        for (int v : adj.get(u)) {
            if (comp[v] == -1) { comp[v] = id; color[v] = 1 - color[u]; que.add(v); }
            else if (color[v] == color[u]) return false;
        }
    }
    return true;
}

// Number of BFS layers when starting at s
private int depth(List<List<Integer>> adj, int s, int n) {
    int[] dist = new int[n + 1];
    Arrays.fill(dist, -1);
    Queue<Integer> que = new ArrayDeque<>(List.of(s));
    dist[s] = 0;
    int layers = 1;
    while (!que.isEmpty()) {
        int u = que.poll();
        layers = Math.max(layers, dist[u] + 1);
        for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; que.add(v); }
    }
    return layers;
}
```

| Approach | Time | Space |
|---|---|---|
| Bipartite check + BFS from every node | O(n · (n + E)) | O(n + E) |

## Recall before you reveal
<details><summary>Why try every start node?</summary>

The BFS depth depends on the start; the best layering comes from an end of a long path.

</details>


<details><summary>When is the answer −1?</summary>

If some component contains an odd cycle.

</details>


## Connected
- [Is Graph Bipartite](../Graph%20Basics/Is%20Graph%20Bipartite.md)
- [Possible Bipartition](../Graph%20Basics/Possible%20Bipartition.md)
