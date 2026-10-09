---
topic: Spanning Trees and Euler
pattern: [Kruskal, MST variants]
source: LeetCode 1489
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, spanning-euler]
---
# Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree

> [!TIP]
> **🧠 Memory hook**
> Some roads are indispensable; others are interchangeable twins.
> **Mantra: CRITICAL: WITHOUT IT THE MST GETS HEAVIER. PSEUDO: FORCED IN STILL EQUALS THE MST.**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Spanning%20Trees%20and%20Euler/Spanning%20Trees%20and%20Euler%20Animations.html#p=3) · **Pattern hub:** [Spanning Trees and Euler - Pattern Map](Spanning%20Trees%20and%20Euler%20-%20Pattern%20Map.md)

## Problem
Return the edges that appear in every MST (critical) and those that appear in some but not all (pseudo-critical).

## Key insight
Compute the MST weight with Kruskal. For each edge: exclude it and recompute; a heavier (or impossible) result means it is critical. Otherwise force it in first and recompute; if the weight is still the MST weight, it is pseudo-critical.

## Approach: Kruskal with skip / force
```java
// Critical edge: removing it raises the MST weight (or disconnects). Pseudo-critical: not critical, but forcing it in still gives the MST weight
public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
    int m = edges.length;
    int[][] sorted = new int[m][];
    for (int i = 0; i < m; i++) sorted[i] = new int[]{edges[i][0], edges[i][1], edges[i][2], i};
    Arrays.sort(sorted, (a, b) -> a[2] - b[2]);
    int best = mst(n, sorted, -1, -1);
    List<Integer> critical = new ArrayList<>(), pseudo = new ArrayList<>();
    for (int i = 0; i < m; i++) {
        if (mst(n, sorted, i, -1) > best) critical.add(i);
        else if (mst(n, sorted, -1, i) == best) pseudo.add(i);
    }
    return List.of(critical, pseudo);
}

// Kruskal weight, skipping the edge with id skip and forcing the edge with id force first; Integer.MAX_VALUE when disconnected
private int mst(int n, int[][] sorted, int skip, int force) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int sum = 0, used = 0;
    if (force != -1) {
        for (int[] e : sorted) if (e[3] == force) { parent[find(parent, e[0])] = find(parent, e[1]); sum += e[2]; used++; }
    }
    for (int[] e : sorted) {
        if (e[3] == skip || e[3] == force) continue;
        int a = find(parent, e[0]), b = find(parent, e[1]);
        if (a != b) { parent[a] = b; sum += e[2]; used++; }
    }
    return used == n - 1 ? sum : Integer.MAX_VALUE;
}
```

| Approach | Time | Space |
|---|---|---|
| Kruskal with skip / force | O(E² α) | O(V + E) |

## Recall before you reveal
<details><summary>Why test excluding first?</summary>

An edge that cannot be skipped is critical; only then does "forced in" make sense for the rest.

</details>


<details><summary>Are heavier-than-needed edges ever pseudo-critical?</summary>

No: forcing them raises the weight.

</details>


## Connected
- [Minimum Spanning Tree (Kruskal's Algorithm)](Minimum%20Spanning%20Tree%20%28Kruskal%27s%20Algorithm%29.md)
