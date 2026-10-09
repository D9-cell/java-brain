---
topic: Disjoint Set
pattern: [Binary search on answer, Union-Find]
source: LeetCode 3600
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Maximize Spanning Tree Stability with Upgrades

> [!TIP]
> **🧠 Memory hook**
> Ask "can every road be at least this strong?" and double the weakest roads you are allowed to.
> **Mantra: BINARY SEARCH s; MUST ≥ s, OPTIONAL FREE OR UPGRADE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=6) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Build a spanning tree that includes all mandatory edges. You may double the strength of at most k optional edges. Maximise the weakest edge in the tree (−1 if impossible).

## Key insight
Feasibility "stability ≥ s" is monotone, so binary search s. Union the must edges (they need strength ≥ s and must not form a cycle), union optional edges already ≥ s for free, then spend upgrades on optional edges with 2·strength ≥ s that connect different components. Check that everything is connected.

## Approach: Binary search + Union-Find
```java
// Binary search the stability s: must edges need strength >= s, optional edges at or above s are free, those with 2 * strength >= s cost one upgrade
public int maxStability(int n, int[][] edges, int k) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int maxStrength = 0;
    for (int[] e : edges) {
        maxStrength = Math.max(maxStrength, e[2]);
        if (e[3] == 1) {
            int a = find(parent, e[0]), b = find(parent, e[1]);
            if (a == b) return -1;
            parent[a] = b;
        }
    }
    int low = 1, high = 2 * maxStrength, answer = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (feasible(n, edges, k, mid)) { answer = mid; low = mid + 1; }
        else high = mid - 1;
    }
    return answer;
}

// Can a spanning tree with every edge at least s (after at most k upgrades) exist?
private boolean feasible(int n, int[][] edges, int k, int s) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    List<int[]> upgradable = new ArrayList<>();
    for (int[] e : edges) {
        if (e[3] == 1) {
            if (e[2] < s) return false;
            parent[find(parent, e[0])] = find(parent, e[1]);
        } else if (e[2] >= s) {
            parent[find(parent, e[0])] = find(parent, e[1]);
        } else if (2 * e[2] >= s) {
            upgradable.add(e);
        }
    }
    for (int[] e : upgradable) {
        if (find(parent, e[0]) != find(parent, e[1])) {
            if (k == 0) return false;
            k--;
            parent[find(parent, e[0])] = find(parent, e[1]);
        }
    }
    int root = find(parent, 0);
    for (int i = 1; i < n; i++) if (find(parent, i) != root) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + Union-Find | O(E α log S) | O(n + E) |

## Recall before you reveal
<details><summary>Why upgrade only when it connects different components?</summary>

An upgrade that joins already connected nodes is wasted.

</details>


<details><summary>When is the answer −1?</summary>

If the must edges form a cycle, or the graph cannot be spanned.

</details>


## Connected
- [Minimum Spanning Tree (Kruskal's Algorithm)](../Spanning%20Trees%20and%20Euler/Minimum%20Spanning%20Tree%20%28Kruskal%27s%20Algorithm%29.md)
- [Minimize the Maximum Edge Weight of Graph](../Trees%20and%20Advanced%20Graphs/Minimize%20the%20Maximum%20Edge%20Weight%20of%20Graph.md)
