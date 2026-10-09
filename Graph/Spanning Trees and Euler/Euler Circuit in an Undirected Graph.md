---
topic: Spanning Trees and Euler
pattern: [Euler circuit, Degrees]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, spanning-euler]
---
# Euler Circuit in an Undirected Graph

> [!TIP]
> **🧠 Memory hook**
> A postman who must walk every street once and end where he began: every junction needs an even number of streets.
> **Mantra: ALL DEGREES EVEN AND ALL EDGES CONNECTED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Spanning%20Trees%20and%20Euler/Spanning%20Trees%20and%20Euler%20Animations.html#p=4) · **Pattern hub:** [Spanning Trees and Euler - Pattern Map](Spanning%20Trees%20and%20Euler%20-%20Pattern%20Map.md)

## Problem
Does an undirected graph have a closed walk that uses every edge exactly once?

## Key insight
Each time the walk passes through a vertex it uses two edges, so every degree must be even; and the edges must form one connected piece. The C++/Java original checks only the degrees, so two separate cycles pass wrongly.

## Approach 1: Degree parity + connectivity
```java
// Exists iff every vertex has even degree AND all edges lie in one connected piece
public boolean isEulerCircuitExist(int V, List<List<Integer>> adj) {
    for (List<Integer> out : adj) if (out.size() % 2 != 0) return false;
    return edgesConnected(V, adj);
}

// DFS from a vertex that has edges; every vertex with edges must be reached
private boolean edgesConnected(int V, List<List<Integer>> adj) {
    int start = -1;
    for (int i = 0; i < V; i++) if (!adj.get(i).isEmpty()) { start = i; break; }
    if (start == -1) return true;
    boolean[] seen = new boolean[V];
    dfs(adj, start, seen);
    for (int i = 0; i < V; i++) if (!adj.get(i).isEmpty() && !seen[i]) return false;
    return true;
}
```

## Approach 2: Degrees only (the original)
Wrong when the graph has two or more separate cycles.

```java
// The degree-only test of the original, which wrongly accepts two separate cycles
public boolean degreesOnly(int V, List<List<Integer>> adj) {
    for (List<Integer> out : adj) if (out.size() % 2 != 0) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Degree parity + connectivity | O(V + E) | O(V) |
| Degrees only (the original) | O(V) | O(1) |

> [!WARNING]
> **Java gotcha**
> The original code returns true for two disjoint triangles because it checks degrees only.

## Recall before you reveal
<details><summary>Why must the edges be connected?</summary>

A single walk cannot jump between components.

</details>


<details><summary>Directed graphs?</summary>

Need in-degree = out-degree for every vertex, plus connectivity.

</details>


## Connected
- [Euler Circuit and Path](Euler%20Circuit%20and%20Path.md)
