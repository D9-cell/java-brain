---
topic: Trees and Advanced Graphs
pattern: [Binary search, Bit subsets, Gosper's hack]
source: GfG
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Vertex Cover

> [!TIP]
> **🧠 Memory hook**
> Guard enough junctions that every street has a guard at one end; try bigger and bigger guard teams.
> **Mantra: MONOTONE IN k ⇒ BINARY SEARCH; TRY ALL k-SUBSETS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=13) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Given an undirected graph, find the size of the smallest vertex cover (a set of vertices touching every edge). n is small.

## Key insight
The problem is NP-hard, so enumerate: for a size k test every subset of k vertices. If a cover of size k exists then one of size k + 1 does too, so binary search k. Gosper's hack steps through all k-bit masks in increasing order.

## Approach: Binary search on k + Gosper's hack
```java
// Binary search on the size k: a cover of size k exists, then so does one of size k + 1, so the test is monotone
public int vertexCover(int n, int[][] edges) {
    int low = 1, high = n, answer = n;
    while (low <= high) {
        int mid = (low + high) >> 1;
        if (hasCover(n, mid, edges)) {
            answer = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return edges.length == 0 ? 0 : answer;
}

// Walks all vertex subsets of size k with Gosper's hack (next bit pattern with the same popcount)
private boolean hasCover(int n, int k, int[][] edges) {
    int set = (1 << k) - 1, limit = 1 << n;
    while (set < limit) {
        if (covers(set, edges)) return true;
        int c = set & -set, r = set + c;
        set = (((r ^ set) >> 2) / c) | r;
    }
    return false;
}

// Does the vertex set (bitmask over vertices 1..n at bit v-1) touch every edge?
private boolean covers(int set, int[][] edges) {
    for (int[] e : edges) if ((set >> (e[0] - 1) & 1) == 0 && (set >> (e[1] - 1) & 1) == 0) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on k + Gosper's hack | O(2ⁿ · E · log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> The C++ original keeps an O(n²) edge matrix and visited flags; the Java checks edges directly against the bitmask.

## Recall before you reveal
<details><summary>Why is binary search valid?</summary>

Adding any vertex to a cover keeps it a cover.

</details>


<details><summary>What does Gosper's hack do?</summary>

Computes the next integer with the same number of set bits.

</details>


## Connected
- [Bit Magic](../../Bit_Magic/Bit%20Magic%20-%20Pattern%20Map.md)
