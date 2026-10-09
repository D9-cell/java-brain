---
topic: Sorting and Matching
pattern: [Frequency difference, Cheapest swap path]
source: LeetCode 2561
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Rearranging Fruits

> [!TIP]
> **🧠 Memory hook**
> Only the **surplus** fruits have to move; each swap can use the cheap global minimum as a middleman.
> **Mantra: MOVE HALF THE SURPLUS, COST MIN(x, 2·MIN)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=17) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Swapping `a` from basket 1 with `b` from basket 2 costs `min(a, b)`. Make both baskets equal as multisets with minimum cost, or return −1.

## Key insight
Count the difference per fruit; every difference must be even. List half of each surplus, sort, and fix the smaller half of that list. A pair of surpluses costs `min(x, 2 · globalMin)` since two swaps through the global minimum may beat a direct swap.

## Approach: Counts + sort
```java
// Count surplus of every fruit between the baskets. Each swap fixes one surplus in both baskets; use the direct swap, or two swaps through the global minimum when that is cheaper
public long minCost(int[] basket1, int[] basket2) {
    Map<Integer, Integer> diff = new TreeMap<>();
    int min = Integer.MAX_VALUE;
    for (int x : basket1) { diff.merge(x, 1, Integer::sum); min = Math.min(min, x); }
    for (int x : basket2) { diff.merge(x, -1, Integer::sum); min = Math.min(min, x); }
    List<Integer> extra = new ArrayList<>();
    for (Map.Entry<Integer, Integer> e : diff.entrySet()) {
        if (e.getValue() % 2 != 0) return -1;
        for (int i = 0; i < Math.abs(e.getValue()) / 2; i++) extra.add(e.getKey());
    }
    Collections.sort(extra);
    long cost = 0;
    for (int i = 0; i < extra.size() / 2; i++) cost += Math.min(extra.get(i), 2L * min);
    return cost;
}
```

| Approach | Time | Space |
|---|---|---|
| Counts + sort | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against Dijkstra over all basket states. Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why only the smaller half of the surplus list?</summary>

Each swap fixes two surplus items; pairing the largest with the smallest means paying the smaller one.

</details>


## Connected
- [Minimum Equal Sum of Two Arrays After Replacing Zeros](Minimum%20Equal%20Sum%20of%20Two%20Arrays%20After%20Replacing%20Zeros.md)
