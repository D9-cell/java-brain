---
topic: Disjoint Set
pattern: [Union-Find, Multiset per component]
source: LeetCode 1722
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Minimize Hamming Distance After Swap Operations

> [!TIP]
> **🧠 Memory hook**
> Inside a group of swappable seats people can be arranged in any order, so only who is in the group matters.
> **Mantra: COMPONENT MULTISET OF SOURCE vs TARGET**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=7) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Swaps are allowed between listed index pairs, any number of times. Minimise the Hamming distance between source and target.

## Key insight
Swappable indices form components in which the values can be permuted arbitrarily. For each component compare the multiset of source values with the target values: every target value not available in the multiset is one mismatch.

## Approach: Union-Find + value counts
```java
// Indices linked by swaps form components inside which the values can be permuted freely; count the leftover mismatches per component
public int minimumHammingDistance(int[] source, int[] target, int[][] allowedSwaps) {
    int n = source.length;
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int[] s : allowedSwaps) parent[find(parent, s[0])] = find(parent, s[1]);
    Map<Integer, Map<Integer, Integer>> pool = new HashMap<>();
    for (int i = 0; i < n; i++) pool.computeIfAbsent(find(parent, i), k -> new HashMap<>()).merge(source[i], 1, Integer::sum);
    int mismatches = 0;
    for (int i = 0; i < n; i++) {
        Map<Integer, Integer> values = pool.get(find(parent, i));
        Integer have = values.get(target[i]);
        if (have == null || have == 0) mismatches++;
        else values.put(target[i], have - 1);
    }
    return mismatches;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find + value counts | O(n α) | O(n) |

## Recall before you reveal
<details><summary>Why is any order possible inside a component?</summary>

Repeated adjacent swaps along connected pairs can realise any permutation of the component.

</details>


<details><summary>Why a map per component?</summary>

To count which values are still unused.

</details>


## Connected
- [Most Stones Removed with Same Row or Column](../Graph%20Basics/Most%20Stones%20Removed%20with%20Same%20Row%20or%20Column.md)
