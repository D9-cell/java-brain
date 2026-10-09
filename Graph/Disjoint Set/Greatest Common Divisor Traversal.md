---
topic: Disjoint Set
pattern: [Union-Find on keys, Primes]
source: LeetCode 2709
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Greatest Common Divisor Traversal

> [!TIP]
> **🧠 Memory hook**
> Numbers are friends if they share a prime: link each number to its primes instead of to each other.
> **Mantra: UNION INDEX WITH EACH PRIME FACTOR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=4) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Indices i and j can be traversed if gcd(nums[i], nums[j]) > 1. Can every pair of indices be reached from each other?

## Key insight
Checking all pairs is O(n²). Instead add the primes as extra nodes: union each index with every prime factor of its value. Two numbers sharing a prime end up in the same set. The answer is "all indices share one root". A value 1 can never connect (unless n = 1).

## Approach: Union with prime factors
```java
// Union each index with every prime factor of its value, so two numbers sharing a prime end up in one set
public boolean canTraverseAllPairs(int[] nums) {
    int n = nums.length;
    if (n == 1) return true;
    int max = 0;
    for (int v : nums) { if (v == 1) return false; max = Math.max(max, v); }
    int[] smallest = new int[max + 1];
    for (int i = 2; i <= max; i++) if (smallest[i] == 0) for (int j = i; j <= max; j += i) if (smallest[j] == 0) smallest[j] = i;
    int[] parent = new int[n + max + 1];
    for (int i = 0; i < parent.length; i++) parent[i] = i;
    for (int i = 0; i < n; i++) {
        int v = nums[i];
        while (v > 1) {
            int p = smallest[v];
            parent[find(parent, i)] = find(parent, n + p);
            while (v % p == 0) v /= p;
        }
    }
    int root = find(parent, 0);
    for (int i = 1; i < n; i++) if (find(parent, i) != root) return false;
    return true;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

| Approach | Time | Space |
|---|---|---|
| Union with prime factors | O(n √max) | O(n + max) |

## Recall before you reveal
<details><summary>Why union with primes?</summary>

It replaces O(n²) pair checks by O(n log max) links.

</details>


<details><summary>When is the answer false immediately?</summary>

If any value is 1 and n > 1.

</details>


## Connected
- [Largest Component Size by Common Factor](Largest%20Component%20Size%20by%20Common%20Factor.md)
