---
topic: Disjoint Set
pattern: [Union-Find on keys, Factors]
source: LeetCode 952
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Largest Component Size by Common Factor

> [!TIP]
> **🧠 Memory hook**
> Same trick as GCD Traversal: link each number with its factors, not with other numbers.
> **Mantra: UNION NUMBER WITH EACH FACTOR > 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=5) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Link two numbers if they share a factor greater than 1. Return the size of the largest component.

## Key insight
For every number v and every divisor f of v (f from 2 to √v) union v with f and with v / f. Two numbers sharing a factor then land in the same set. Count numbers per root and take the maximum.

## Approach: Union with factors
```java
// Union every number with each of its factors greater than 1, then count numbers per root
public int largestComponentSize(int[] nums) {
    int max = 0;
    for (int v : nums) max = Math.max(max, v);
    int[] parent = new int[max + 1];
    for (int i = 0; i <= max; i++) parent[i] = i;
    for (int v : nums) {
        for (int f = 2; (long) f * f <= v; f++) {
            if (v % f == 0) {
                parent[find(parent, v)] = find(parent, f);
                parent[find(parent, v)] = find(parent, v / f);
            }
        }
    }
    Map<Integer, Integer> count = new HashMap<>();
    int best = 1;
    for (int v : nums) best = Math.max(best, count.merge(find(parent, v), 1, Integer::sum));
    return best;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| Union with factors | O(n √max) | O(max) |

## Recall before you reveal
<details><summary>Why union with the factor, not with other numbers?</summary>

Pairwise checks cost O(n²); factor nodes make it linear in the number of factors.

</details>


<details><summary>Why count only the given numbers?</summary>

The factor nodes are helpers, not part of the array.

</details>


## Connected
- [Greatest Common Divisor Traversal](Greatest%20Common%20Divisor%20Traversal.md)
