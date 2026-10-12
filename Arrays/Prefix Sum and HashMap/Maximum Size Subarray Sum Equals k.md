---
topic: Prefix Sum and HashMap
pattern: [Exact sum, First index]
source: LeetCode 325
difficulty: Medium
companies: [Meta, Palantir]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Size Subarray Sum Equals k

> [!TIP]
> **🧠 Memory hook**
> Keep the **earliest index** of each prefix. If prefix − k was seen at j, the subarray (j, i] sums to k.
> **Mantra: first{0:−1} · j = first[prefix − k] → best = max(i − j) · putIfAbsent(prefix, i)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=3) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Return the maximum length of a subarray that sums to k, or 0.

## Key insight
Same map as Subarray Sum Equals K, but storing the first index instead of a count. putIfAbsent keeps the earliest one.

## Approach: First index per prefix
```java
// Keep the earliest index of each prefix; prefix - k seen earlier gives a subarray summing to k
public int maxSubArrayLen(int[] nums, int k) {
    Map<Long, Integer> first = new HashMap<>();
    first.put(0L, -1);
    long prefix = 0;
    int best = 0;
    for (int i = 0; i < nums.length; i++) {
        prefix += nums[i];
        Integer j = first.get(prefix - k);
        if (j != null) best = Math.max(best, i - j);
        first.putIfAbsent(prefix, i);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| First index per prefix | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why putIfAbsent?</summary>

An earlier index gives a longer subarray.

</details>


<details><summary>Why long prefixes?</summary>

Sums can pass the int range.

</details>


## Connected
- [Subarray Sum Equals K (O(n))](Subarray%20Sum%20Equals%20K%20%28O%28n%29%29.md)
- [Contiguous Array](Contiguous%20Array.md)
