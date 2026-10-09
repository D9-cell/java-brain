---
topic: Disjoint Set
pattern: [Union-Find, Two passes]
source: LeetCode 990
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Satisfiability of Equality Equations

> [!TIP]
> **🧠 Memory hook**
> First merge everything declared equal; only then check that nothing declared different ended up together.
> **Mantra: UNION ALL ==; THEN CHECK ALL !=**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=12) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Given equations "a==b" and "a!=b", can integer values be assigned to the variables to satisfy all?

## Key insight
Equality is transitive, so union the "==" pairs. After all unions, every "!=" pair must have different roots. The order matters: a later "==" can still link two letters.

## Approach 1: Union-Find
```java
// Union all "==" pairs first, then no "!=" pair may share a root
public boolean equationsPossible(String[] equations) {
    int[] parent = new int[26];
    for (int i = 0; i < 26; i++) parent[i] = i;
    for (String e : equations) if (e.charAt(1) == '=') parent[find(parent, e.charAt(0) - 'a')] = find(parent, e.charAt(3) - 'a');
    for (String e : equations) if (e.charAt(1) == '!' && find(parent, e.charAt(0) - 'a') == find(parent, e.charAt(3) - 'a')) return false;
    return true;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

## Approach 2: DFS labelling
```java
// DFS version: build a graph of "==" links, label its components, then check the "!=" pairs
public boolean equationsPossibleDfs(String[] equations) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < 26; i++) adj.add(new ArrayList<>());
    for (String e : equations) if (e.charAt(1) == '=') { adj.get(e.charAt(0) - 'a').add(e.charAt(3) - 'a'); adj.get(e.charAt(3) - 'a').add(e.charAt(0) - 'a'); }
    int[] comp = new int[26];
    Arrays.fill(comp, -1);
    int id = 0;
    for (int i = 0; i < 26; i++) if (comp[i] == -1) label(adj, i, id++, comp);
    for (String e : equations) if (e.charAt(1) == '!' && comp[e.charAt(0) - 'a'] == comp[e.charAt(3) - 'a']) return false;
    return true;
}

// Labels one component
private void label(List<List<Integer>> adj, int u, int id, int[] comp) {
    comp[u] = id;
    for (int v : adj.get(u)) if (comp[v] == -1) label(adj, v, id, comp);
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find | O(m α) | O(26) |
| DFS labelling | O(m) | O(26) |

## Recall before you reveal
<details><summary>Why two passes?</summary>

A "!=" cannot be judged before every "==" has been applied.

</details>


<details><summary>Why only 26 nodes?</summary>

Variables are lowercase letters.

</details>


## Connected
- [Lexicographically Smallest Equivalent String](Lexicographically%20Smallest%20Equivalent%20String.md)
