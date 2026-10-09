---
topic: Disjoint Set
pattern: [Union-Find, DFS, BFS]
source: LeetCode 839
difficulty: Hard
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Similar String Groups

> [!TIP]
> **🧠 Memory hook**
> Anagrams one swap apart are neighbours; groups are the clusters of neighbours.
> **Mantra: SIMILAR = ≤ 2 DIFFERENT POSITIONS; COUNT COMPONENTS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=13) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Strings are similar if equal or they differ by one swap. Count the groups of strings connected through similarity.

## Key insight
Build the similarity relation on the fly (differ in at most 2 positions, since all are anagrams) and count connected components with DFS, BFS or Union-Find (groups = n minus successful unions).

## Approach 1: DFS
```java
// DFS over the similarity graph
public int numSimilarGroupsDfs(String[] strs) {
    boolean[] seen = new boolean[strs.length];
    int groups = 0;
    for (int i = 0; i < strs.length; i++) {
        if (seen[i]) continue;
        groups++;
        dfs(strs, i, seen);
    }
    return groups;
}

// Marks a whole group
private void dfs(String[] strs, int u, boolean[] seen) {
    seen[u] = true;
    for (int v = 0; v < strs.length; v++) if (!seen[v] && similar(strs[u], strs[v])) dfs(strs, v, seen);
}

// Two strings are similar when they differ in at most two positions (they are anagrams, so two differences mean one swap)
private boolean similar(String a, String b) {
    int diff = 0;
    for (int i = 0; i < a.length(); i++) if (a.charAt(i) != b.charAt(i) && ++diff > 2) return false;
    return true;
}
```

## Approach 2: BFS
```java
// BFS over the similarity graph
public int numSimilarGroupsBfs(String[] strs) {
    boolean[] seen = new boolean[strs.length];
    int groups = 0;
    for (int i = 0; i < strs.length; i++) {
        if (seen[i]) continue;
        groups++;
        Queue<Integer> que = new ArrayDeque<>(List.of(i));
        seen[i] = true;
        while (!que.isEmpty()) {
            int u = que.poll();
            for (int v = 0; v < strs.length; v++) if (!seen[v] && similar(strs[u], strs[v])) { seen[v] = true; que.add(v); }
        }
    }
    return groups;
}
```

## Approach 3: Union-Find
```java
// Union-Find: each successful union removes one group
public int numSimilarGroupsDsu(String[] strs) {
    int n = strs.length, groups = n;
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (!similar(strs[i], strs[j])) continue;
            int a = find(parent, i), b = find(parent, j);
            if (a != b) { parent[a] = b; groups--; }
        }
    }
    return groups;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(n² L) | O(n) |
| BFS | O(n² L) | O(n) |
| Union-Find | O(n² L) | O(n) |

## Recall before you reveal
<details><summary>Why ≤ 2 differences?</summary>

The strings are anagrams, so exactly 0 or 2 positions can differ for a single swap.

</details>


<details><summary>Cheaper when n is huge but L small?</summary>

Generate the swap neighbours of each string and look them up in a set.

</details>


## Connected
- [Number of Provinces](../Graph%20Basics/Number%20of%20Provinces.md)
