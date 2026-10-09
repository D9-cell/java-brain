---
topic: Traversals and Views
pattern: [Level scan, Minimum swaps via cycles]
source: LeetCode 2471
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Minimum Number of Operations to Sort a Binary Tree by Level

> [!TIP]
> **🧠 Memory hook**
> Each row is its own puzzle: how many **swaps** sort an array?
> **Mantra: PER LEVEL: CYCLES, LENGTH − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/Traversals%20and%20Views/Traversals%20and%20Views%20Animations.html#p=23) · **Pattern hub:** [Traversals and Views - Pattern Map](Traversals%20and%20Views%20-%20Pattern%20Map.md)

## Problem
In one operation you may swap two values on the same level. Return the minimum operations to make every level strictly increasing.

## Key insight
For distinct values compute where each element must go. The permutation splits into cycles, and a cycle of length L needs L − 1 swaps.

## Approach: Cycle counting per level
```java
// Every level is independent: add up the minimum swaps needed to sort the level
public int minimumOperations(TreeNode root) {
    int ops = 0;
    for (List<Integer> level : TreeNode.levels(root)) ops += minSwaps(level.stream().mapToInt(Integer::intValue).toArray());
    return ops;
}

// Minimum swaps to sort distinct values: the target slot of each value forms cycles, a cycle of length L costs L - 1
static int minSwaps(int[] a) {
    int n = a.length;
    Integer[] order = new Integer[n];
    for (int i = 0; i < n; i++) order[i] = i;
    Arrays.sort(order, (x, y) -> Integer.compare(a[x], a[y]));
    boolean[] seen = new boolean[n];
    int swaps = 0;
    for (int i = 0; i < n; i++) {
        if (seen[i] || order[i] == i) continue;
        int len = 0;
        for (int j = i; !seen[j]; j = order[j]) { seen[j] = true; len++; }
        swaps += len - 1;
    }
    return swaps;
}
```

| Approach | Time | Space |
|---|---|---|
| Cycle counting per level | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified the swap formula against a BFS over permutations. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why L − 1 swaps for a cycle?</summary>

Each swap fixes one element into its final place; the last swap fixes two.

</details>


## Connected
- [Cousins in Binary Tree II](Cousins%20in%20Binary%20Tree%20II.md)
