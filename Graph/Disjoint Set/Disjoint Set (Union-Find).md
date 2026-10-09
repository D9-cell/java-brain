---
topic: Disjoint Set
pattern: [Union-Find]
source: GfG
difficulty: Medium
companies: [Google, Facebook, Apple, Amazon, Netflix, Flipkart]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Disjoint Set (Union-Find)

> [!TIP]
> **🧠 Memory hook**
> Clubs with leaders: ask who your leader is, and make one club follow the other.
> **Mantra: find = climb to the root (compress); union = root under root**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=0) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Implement a structure supporting union(a, b) and find(a) (are two elements in the same set?).

## Key insight
A plain parent array works but chains can get long. Union by rank (or size) keeps trees shallow and path compression flattens them: together almost O(1) per operation.

## Approach 1: Plain
```java
// Plain version: parent pointers only, so chains can get long
static class PlainDsu {
    final int[] parent;

    // Every element starts as its own set
    PlainDsu(int n) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    // Follows parents to the root
    int find(int x) {
        while (parent[x] != x) x = parent[x];
        return x;
    }

    // Hangs one root under the other
    void union(int a, int b) {
        parent[find(a)] = find(b);
    }
}
```

## Approach 2: Rank + path compression
```java
// Union by rank with path compression: near-constant time per operation
static class RankDsu {
    final int[] parent, rank;

    // Every element starts as its own set with rank 0
    RankDsu(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    // Finds the root and flattens the path on the way back
    int find(int x) {
        return parent[x] == x ? x : (parent[x] = find(parent[x]));
    }

    // Attaches the shorter tree under the taller one; returns false when already joined
    boolean union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rank[ra] < rank[rb]) parent[ra] = rb;
        else if (rank[ra] > rank[rb]) parent[rb] = ra;
        else { parent[rb] = ra; rank[ra]++; }
        return true;
    }
}
```

## Approach 3: Size + path compression
Also tells how big each group is.

```java
// Union by size with path compression: also answers "how big is my group"
static class SizeDsu {
    final int[] parent, size;

    // Every element starts as its own set of size 1
    SizeDsu(int n) {
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) { parent[i] = i; size[i] = 1; }
    }

    // Finds the root with path compression
    int find(int x) {
        return parent[x] == x ? x : (parent[x] = find(parent[x]));
    }

    // Attaches the smaller set under the bigger one and adds the sizes
    boolean union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (size[ra] < size[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra;
        size[ra] += size[rb];
        return true;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Plain | O(n) per find worst | O(n) |
| Rank + path compression | O(α(n)) | O(n) |
| Size + path compression | O(α(n)) | O(n) |

> [!WARNING]
> **Java gotcha**
> Cycle detection with Union-Find lives in [Detect Cycle in an Undirected Graph](../Graph%20Basics/Detect%20Cycle%20in%20an%20Undirected%20Graph.md).

## Recall before you reveal
<details><summary>Why union by rank?</summary>

It keeps the trees shallow so find is short.

</details>


<details><summary>What does path compression do?</summary>

After find, every node on the path points straight at the root.

</details>


## Connected
- [Redundant Connection](Redundant%20Connection.md)
- [Number of Connected Components in an Undirected Graph](../Graph%20Basics/Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
