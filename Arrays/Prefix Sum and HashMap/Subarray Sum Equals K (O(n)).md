---
topic: Prefix Sum and HashMap
pattern: [Exact sum, Prefix count]
source: LeetCode 560
difficulty: Medium
companies: [Meta, Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Subarray Sum Equals K (O(n))

> [!TIP]
> **🧠 Memory hook**
> Walk once with a running prefix. Subarrays ending here with sum k = **number of earlier prefixes equal to prefix − k**.
> **Mantra: seen{0:1} · prefix += x · count += seen[prefix − k] · seen[prefix]++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=0) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Return the number of contiguous subarrays whose sum equals k (values can be negative).

## Key insight
Negative values rule out a sliding window. The map counts prefix sums; seeding 0 → 1 covers subarrays that start at index 0.

## Approach: Prefix + HashMap
```java
// A subarray ending here sums to k when an earlier prefix equals prefix - k
public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> seen = new HashMap<>();
    seen.put(0, 1);
    int prefix = 0, count = 0;
    for (int x : nums) {
        prefix += x;
        count += seen.getOrDefault(prefix - k, 0);
        seen.merge(prefix, 1, Integer::sum);
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix + HashMap | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why seed 0 → 1?</summary>

The empty prefix lets subarrays start at index 0.

</details>


<details><summary>Why not a sliding window?</summary>

Negative numbers break its monotonicity.

</details>


## Connected
- [Maximum Size Subarray Sum Equals k](Maximum%20Size%20Subarray%20Sum%20Equals%20k.md)
- [Subarray Sums Divisible by K](Subarray%20Sums%20Divisible%20by%20K.md)
