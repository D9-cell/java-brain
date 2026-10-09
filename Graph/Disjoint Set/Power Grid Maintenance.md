---
topic: Disjoint Set
pattern: [Union-Find, TreeSet, DFS]
source: LeetCode 3607
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Power Grid Maintenance

> [!TIP]
> **🧠 Memory hook**
> Each grid keeps a sorted list of working stations; a failed station is answered by the smallest working one.
> **Mantra: COMPONENT + SORTED SET OF ONLINE STATIONS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=16) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Stations are linked in grids. Query [1, x]: x resolves a check if online, else the smallest online station in its grid (or −1). Query [2, x]: x goes offline.

## Key insight
The grids never change, so compute components once (Union-Find or DFS). Keep a TreeSet of online stations per component: checks read the first element, going offline removes from it.

## Approach 1: Union-Find + TreeSet
```java
// Components from Union-Find; each component keeps its online stations in a TreeSet so "smallest online" is O(log c)
public int[] processQueries(int c, int[][] connections, int[][] queries) {
    int[] parent = new int[c + 1];
    for (int i = 0; i <= c; i++) parent[i] = i;
    for (int[] e : connections) parent[find(parent, e[0])] = find(parent, e[1]);
    Map<Integer, TreeSet<Integer>> online = new HashMap<>();
    for (int i = 1; i <= c; i++) online.computeIfAbsent(find(parent, i), k -> new TreeSet<>()).add(i);
    boolean[] off = new boolean[c + 1];
    List<Integer> result = new ArrayList<>();
    for (int[] q : queries) {
        int x = q[1];
        if (q[0] == 1) {
            if (!off[x]) result.add(x);
            else {
                TreeSet<Integer> set = online.get(find(parent, x));
                result.add(set.isEmpty() ? -1 : set.first());
            }
        } else {
            off[x] = true;
            online.get(find(parent, x)).remove(x);
        }
    }
    return result.stream().mapToInt(Integer::intValue).toArray();
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

## Approach 2: DFS labelling + TreeSet
```java
// Same answers with a DFS labelling of components instead of Union-Find
public int[] processQueriesDfs(int c, int[][] connections, int[][] queries) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= c; i++) adj.add(new ArrayList<>());
    for (int[] e : connections) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] comp = new int[c + 1];
    Map<Integer, TreeSet<Integer>> online = new HashMap<>();
    for (int i = 1; i <= c; i++) if (comp[i] == 0) label(adj, i, i, comp, online);
    boolean[] off = new boolean[c + 1];
    List<Integer> result = new ArrayList<>();
    for (int[] q : queries) {
        int x = q[1];
        if (q[0] == 1) {
            if (!off[x]) result.add(x);
            else result.add(online.get(comp[x]).isEmpty() ? -1 : online.get(comp[x]).first());
        } else {
            off[x] = true;
            online.get(comp[x]).remove(x);
        }
    }
    return result.stream().mapToInt(Integer::intValue).toArray();
}

// Labels one component and fills its sorted set
private void label(List<List<Integer>> adj, int u, int id, int[] comp, Map<Integer, TreeSet<Integer>> online) {
    comp[u] = id;
    online.computeIfAbsent(id, k -> new TreeSet<>()).add(u);
    for (int v : adj.get(u)) if (comp[v] == 0) label(adj, v, id, comp, online);
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find + TreeSet | O((c + q) log c) | O(c) |
| DFS labelling + TreeSet | O((c + q) log c) | O(c) |

## Recall before you reveal
<details><summary>Why a TreeSet?</summary>

It gives the smallest online station in O(log c) and supports removal.

</details>


<details><summary>Why not recompute components?</summary>

Going offline does not change connectivity of the grid for queries.

</details>


## Connected
- [Number of Connected Components in an Undirected Graph](../Graph%20Basics/Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
