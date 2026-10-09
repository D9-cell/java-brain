---
topic: Disjoint Set
pattern: [Two Union-Finds, Greedy]
source: LeetCode 1579
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Remove Max Number of Edges to Keep Graph Fully Traversable

> [!TIP]
> **🧠 Memory hook**
> A road both people can use is worth more than two roads for one each: take shared roads first.
> **Mantra: TYPE 3 FIRST, THEN TYPE 1 AND TYPE 2; KEEP ONLY MERGES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=11) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Edges have type 1 (Alice), 2 (Bob) or 3 (both). Remove as many as possible while both Alice and Bob can still reach every node. Return the maximum removable, or −1.

## Key insight
Keep two Union-Finds, one per person. Add type-3 edges first: they merge both structures and are counted once. Then add each person's own edges. An edge is kept only if it merges something for the person (or one of the two for type 3). If either structure is not a single component, the answer is −1; otherwise removed = total − kept.

## Approach: Two Union-Finds
```java
// Take the shared type-3 edges first (they serve both people), then each person's own edges; every edge that does not merge anything is removable
public int maxNumEdgesToRemove(int n, int[][] edges) {
    int[] alice = new int[n + 1], bob = new int[n + 1];
    for (int i = 0; i <= n; i++) alice[i] = bob[i] = i;
    int aliceParts = n, bobParts = n, used = 0;
    for (int[] e : edges) {
        if (e[0] != 3) continue;
        boolean a = union(alice, e[1], e[2]), b = union(bob, e[1], e[2]);
        if (a) aliceParts--;
        if (b) bobParts--;
        if (a || b) used++;
    }
    for (int[] e : edges) {
        if (e[0] == 1 && union(alice, e[1], e[2])) { aliceParts--; used++; }
        if (e[0] == 2 && union(bob, e[1], e[2])) { bobParts--; used++; }
    }
    return aliceParts == 1 && bobParts == 1 ? edges.length - used : -1;
}

// Joins two sets and reports whether they were different
private boolean union(int[] p, int a, int b) {
    a = find(p, a);
    b = find(p, b);
    if (a == b) return false;
    p[a] = b;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Two Union-Finds | O(E α) | O(n) |

## Recall before you reveal
<details><summary>Why type 3 first?</summary>

A shared edge serves both people, so it can replace two single-person edges.

</details>


<details><summary>How many edges does a connected graph need?</summary>

n − 1 per person, but shared edges count for both.

</details>


## Connected
- [Minimum Spanning Tree (Kruskal's Algorithm)](../Spanning%20Trees%20and%20Euler/Minimum%20Spanning%20Tree%20%28Kruskal%27s%20Algorithm%29.md)
