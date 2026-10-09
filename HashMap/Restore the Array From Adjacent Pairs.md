---
topic: HashMap
pattern: [Graph in a map]
source: LeetCode 1743
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Restore the Array From Adjacent Pairs

> [!TIP]
> **🧠 Memory hook**
> Pairs are edges of a path; start at an end.
> **Mantra: ADJACENCY MAP, START AT DEGREE 1, NEVER STEP BACK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=40) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Rebuild the array (distinct values) from its unordered adjacent pairs.

## Key insight
The pairs form a path; an endpoint has one neighbour. Walk from it, always taking the neighbour that is not the previous element.

## Approach: Adjacency walk
```java
// Build the adjacency map; an end has one neighbour; walk from it never stepping back
public int[] restoreArray(int[][] pairs) {
    Map<Integer, List<Integer>> adj = new HashMap<>();
    for (int[] p : pairs) {
        adj.computeIfAbsent(p[0], k -> new ArrayList<>()).add(p[1]);
        adj.computeIfAbsent(p[1], k -> new ArrayList<>()).add(p[0]);
    }
    int start = 0;
    for (Map.Entry<Integer, List<Integer>> e : adj.entrySet()) if (e.getValue().size() == 1) { start = e.getKey(); break; }
    int n = pairs.length + 1;
    int[] res = new int[n];
    res[0] = start;
    res[1] = adj.get(start).get(0);
    for (int i = 2; i < n; i++) {
        List<Integer> nb = adj.get(res[i - 1]);
        res[i] = nb.get(0) == res[i - 2] ? nb.get(1) : nb.get(0);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Adjacency walk | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified on shuffled pairs from random arrays.

## Recall before you reveal
<details><summary>Which end?</summary>

Either; the reverse is accepted.

</details>


## Connected
- [Find the Town Judge](Find%20the%20Town%20Judge.md)
