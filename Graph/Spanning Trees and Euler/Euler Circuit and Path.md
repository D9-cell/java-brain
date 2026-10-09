---
topic: Spanning Trees and Euler
pattern: [Euler path, Degrees]
source: GfG
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, spanning-euler]
---
# Euler Circuit and Path

> [!TIP]
> **🧠 Memory hook**
> Odd junctions can only be the start and the finish of the tour.
> **Mantra: 0 ODD ⇒ CIRCUIT; 2 ODD ⇒ PATH; ELSE NONE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Spanning%20Trees%20and%20Euler/Spanning%20Trees%20and%20Euler%20Animations.html#p=5) · **Pattern hub:** [Spanning Trees and Euler - Pattern Map](Spanning%20Trees%20and%20Euler%20-%20Pattern%20Map.md)

## Problem
Return 2 if an Euler circuit exists, 1 if only an Euler path exists, else 0.

## Key insight
Check that all edges are in one component. Then count odd-degree vertices: none means a circuit, exactly two means a path from one to the other, anything else means neither (an Euler walk has at most two odd ends).

## Approach: Connectivity + odd-degree count
```java
// Connectivity of the edge-carrying vertices plus a count of odd-degree vertices: 0 odd ⇒ circuit, 2 odd ⇒ path, otherwise none
public int isEulerCircuitExist(int V, List<List<Integer>> adj) {
    if (!connected(V, adj)) return 0;
    int odd = 0;
    for (List<Integer> out : adj) if (out.size() % 2 != 0) odd++;
    if (odd > 2) return 0;
    return odd == 2 ? 1 : 2;
}

// Do all vertices that have edges lie in one component? (graphs with no edges count as connected)
private boolean connected(int V, List<List<Integer>> adj) {
    int start = -1;
    for (int i = 0; i < V; i++) if (!adj.get(i).isEmpty()) { start = i; break; }
    if (start == -1) return true;
    boolean[] seen = new boolean[V];
    dfs(adj, start, seen);
    for (int i = 0; i < V; i++) if (!adj.get(i).isEmpty() && !seen[i]) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Connectivity + odd-degree count | O(V + E) | O(V) |

## Recall before you reveal
<details><summary>Why at most 2 odd vertices?</summary>

Only the start and end of a walk can have an odd number of edges used.

</details>


<details><summary>Is the number of odd vertices always even?</summary>

Yes, by the handshake lemma.

</details>


## Connected
- [Euler Circuit in an Undirected Graph](Euler%20Circuit%20in%20an%20Undirected%20Graph.md)
