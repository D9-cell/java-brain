---
topic: Graph Basics
pattern: [DFS, Kosaraju idea]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Find Mother Vertex in Directed Graph

> [!TIP]
> **🧠 Memory hook**
> The last person to start a fresh rumour must be the one who can reach everyone, or nobody can.
> **Mantra: LAST DFS START ⇒ CANDIDATE; VERIFY ONCE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=4) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
A mother vertex reaches every other vertex. Find one, or return −1.

## Key insight
If a mother exists, the last vertex that has to start a new DFS in the outer loop is it (or lies in the same strongly connected piece). So one extra DFS from that candidate decides the answer: two passes total.

## Approach: Candidate + verify
```java
// Kosaraju trick: the last vertex that starts a fresh DFS is the only possible mother, so verify it once
public int findMother(List<List<Integer>> adj) {
    int n = adj.size(), candidate = 0;
    boolean[] visited = new boolean[n];
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(adj, i, visited);
            candidate = i;
        }
    }
    visited = new boolean[n];
    dfs(adj, candidate, visited);
    for (boolean b : visited) if (!b) return -1;
    return candidate;
}

// Marks everything reachable from u
private void dfs(List<List<Integer>> adj, int u, boolean[] visited) {
    visited[u] = true;
    for (int v : adj.get(u)) if (!visited[v]) dfs(adj, v, visited);
}
```

| Approach | Time | Space |
|---|---|---|
| Candidate + verify | O(V + E) | O(V) |

> [!WARNING]
> **Java gotcha**
> Verified against trying every vertex as the root on 4000 random digraphs.

## Recall before you reveal
<details><summary>Why is the last DFS start the candidate?</summary>

Any earlier start was either reached by a later DFS or cannot reach the later start; a mother can only be a vertex no later DFS reached.

</details>


<details><summary>Why a second DFS?</summary>

The candidate is only *possible*; the second pass proves it reaches everything.

</details>


## Connected
- [Strongly Connected Components (Kosaraju's Algo)](../Trees%20and%20Advanced%20Graphs/Strongly%20Connected%20Components%20%28Kosaraju%27s%20Algo%29.md)
