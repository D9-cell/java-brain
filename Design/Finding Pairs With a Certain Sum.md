---
topic: Design
pattern: [Two Sum with a frequency map]
source: LeetCode 1865
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Finding Pairs With a Certain Sum

> [!TIP]
> **🧠 Memory hook**
> Two Sum where the big list keeps changing.
> **Mantra: LOOP SMALL, MAP BIG**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=17) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
add(index, val) to nums2; count(tot) pairs (i, j) with nums1[i] + nums2[j] = tot.

## Key insight
nums1 is small (≤ 1000) and fixed: loop over it. nums2 is large and changing: maintain its frequency map.

## Approach: Frequency map
```java
// nums1 is small and fixed: loop over it; nums2 changes: keep a frequency map (Two Sum style)
static class FindSumPairs {
    private final int[] a, b;
    private final Map<Integer, Integer> freqB = new HashMap<>();

    FindSumPairs(int[] nums1, int[] nums2) {
        a = nums1;
        b = nums2;
        for (int x : b) freqB.merge(x, 1, Integer::sum);
    }

    // Update the map for the old and new value
    public void add(int index, int val) {
        freqB.merge(b[index], -1, Integer::sum);
        b[index] += val;
        freqB.merge(b[index], 1, Integer::sum);
    }

    // For each x in nums1 look up tot - x in nums2's map
    public int count(int tot) {
        int c = 0;
        for (int x : a) c += freqB.getOrDefault(tot - x, 0);
        return c;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Frequency map | add O(1), count O(|nums1|) | O(|nums2|) |

## Recall before you reveal
<details><summary>Update on add?</summary>

Decrement the old value count, increment the new one.

</details>

