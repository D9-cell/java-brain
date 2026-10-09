---
topic: HashMap
pattern: [Value → positions, Binary search]
source: LeetCode 3488
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Closest Equal Element Queries

> [!TIP]
> **🧠 Memory hook**
> On a circular track, the nearest twin is a neighbour in the sorted list of twins.
> **Mantra: VALUE → SORTED INDICES, CHECK NEIGHBOURS WITH WRAP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=5) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
For each query index, the minimum circular distance to another index with the same value (−1 if none).

## Key insight
Indices of a value are sorted; the closest one is the previous or next index in that list (wrapping around).

## Approach: Map of index lists + binary search
```java
// value → sorted indices; the closest equal element is a neighbour in that list (with wrap-around), distance on the circle
public List<Integer> solveQueries(int[] nums, int[] queries) {
    int n = nums.length;
    Map<Integer, List<Integer>> pos = new HashMap<>();
    for (int i = 0; i < n; i++) pos.computeIfAbsent(nums[i], k -> new ArrayList<>()).add(i);
    List<Integer> res = new ArrayList<>();
    for (int q : queries) {
        List<Integer> v = pos.get(nums[q]);
        int sz = v.size();
        if (sz == 1) { res.add(-1); continue; }
        int p = Collections.binarySearch(v, q), best = Integer.MAX_VALUE;
        for (int nb : new int[]{v.get((p + 1) % sz), v.get((p - 1 + sz) % sz)}) {
            int d = Math.abs(q - nb);
            best = Math.min(best, Math.min(d, n - d));
        }
        res.add(best);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Map of index lists + binary search | O((n + q) log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against scanning all indices.

## Recall before you reveal
<details><summary>Circular distance?</summary>

min(d, n − d).

</details>


## Connected
- [Minimum Distance Between Three Equal Elements I & II](Minimum%20Distance%20Between%20Three%20Equal%20Elements%20I%20%26%20II.md)
