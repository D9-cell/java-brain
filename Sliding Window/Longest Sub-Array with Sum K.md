---
topic: Sliding Window
pattern: [Prefix sum, HashMap]
source: GfG
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Longest Sub-Array with Sum K

> [!TIP]
> **🧠 Memory hook**
> With negatives, remember the first sighting of each prefix sum.
> **Mantra: FIRST INDEX OF EACH PREFIX; i − first[sum − K]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=32) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Length of the longest subarray with sum K (negatives allowed).

## Key insight
With negatives a window cannot decide when to shrink. Prefix sums: if prefix − K was seen at index j, (j, i] sums to K. Keep the first index for the longest length.

## Approach: Prefix sum + first index
```java
// Negatives break a plain window, so use prefix sums: keep the FIRST index of each prefix to get the longest
public int lenOfLongSubarr(int[] nums, int k) {
    Map<Long, Integer> first = new HashMap<>();
    first.put(0L, -1);
    long sum = 0;
    int len = 0;
    for (int i = 0; i < nums.length; i++) {
        sum += nums[i];
        Integer j = first.get(sum - k);
        if (j != null) len = Math.max(len, i - j);
        first.putIfAbsent(sum, i);
    }
    return len;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix sum + first index | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Prefix sums can exceed int: long keys. Verified against O(n²).

## Recall before you reveal
<details><summary>All positive?</summary>

A plain window works.

</details>


<details><summary>Why putIfAbsent?</summary>

Keep the earliest index.

</details>


## Connected
- [Find the Longest Substring Containing Vowels in Even Counts](Find%20the%20Longest%20Substring%20Containing%20Vowels%20in%20Even%20Counts.md)
