---
topic: Disjoint Set
pattern: [Union-Find, Process by value]
source: LeetCode 2421
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Number of Good Paths

> [!TIP]
> **🧠 Memory hook**
> Let the water rise value by value: when level v appears, equal peaks in one pool form good paths.
> **Mantra: ADD NODES BY VALUE; COUNT EQUAL PAIRS PER COMPONENT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=9) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
In a tree with node values, a good path has equal end values and no larger value on it. Count them (single nodes count).

## Key insight
Process values in increasing order. When value v is activated, union each v-node with neighbours of value ≤ v, so each component has maximum ≤ v. Two v-nodes in the same component are joined by a path whose maximum is v: a good path. Count pairs incrementally.

## Approach: Union-Find by increasing value
```java
// Process nodes by increasing value; when a value v becomes active, join its neighbours with value <= v, then count pairs of v-nodes per component
public int numberOfGoodPaths(int[] vals, int[][] edges) {
    int n = vals.length;
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    TreeMap<Integer, List<Integer>> byValue = new TreeMap<>();
    for (int i = 0; i < n; i++) byValue.computeIfAbsent(vals[i], k -> new ArrayList<>()).add(i);
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int count = n;
    for (Map.Entry<Integer, List<Integer>> en : byValue.entrySet()) {
        for (int u : en.getValue()) for (int v : adj.get(u)) if (vals[v] <= vals[u]) parent[find(parent, u)] = find(parent, v);
        Map<Integer, Integer> perRoot = new HashMap<>();
        for (int u : en.getValue()) {
            int c = perRoot.merge(find(parent, u), 1, Integer::sum);
            count += c - 1;
        }
    }
    return count;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find by increasing value | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Why union only with smaller-or-equal neighbours?</summary>

A larger value would break the "no larger node on the path" rule.

</details>


<details><summary>How are pairs counted?</summary>

The c-th v-node in a component adds c − 1 new pairs.

</details>


## Connected
- [Minimum Spanning Tree (Kruskal's Algorithm)](../Spanning%20Trees%20and%20Euler/Minimum%20Spanning%20Tree%20%28Kruskal%27s%20Algorithm%29.md)
