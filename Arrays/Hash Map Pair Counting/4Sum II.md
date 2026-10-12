---
topic: Hash Map Pair Counting
pattern: [Complements, Meet in the middle]
source: LeetCode 454
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# 4Sum II

> [!TIP]
> **🧠 Memory hook**
> Split the four arrays into two halves: **count every a + b**, then for each c + d add the count of **−(c + d)**.
> **Mantra: map[a + b]++ · count += map[−(c + d)]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Hash%20Map%20Pair%20Counting/Hash%20Map%20Pair%20Counting%20Animations.html#p=0) · **Pattern hub:** [Hash Map Pair Counting - Pattern Map](Hash%20Map%20Pair%20Counting%20-%20Pattern%20Map.md)

## Problem
Count tuples (i, j, k, l) with nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0.

## Key insight
Four nested loops are n⁴. Pairing the arrays turns it into two n² passes, the meet-in-the-middle idea.

## Approach: Pair sums + map
```java
// Count every a + b, then for every c + d look up how many pairs make the total zero
public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
    Map<Integer, Integer> sums = new HashMap<>();
    for (int a : nums1)
        for (int b : nums2) sums.merge(a + b, 1, Integer::sum);
    int count = 0;
    for (int c : nums3)
        for (int d : nums4) count += sums.getOrDefault(-(c + d), 0);
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Pair sums + map | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why split in halves?</summary>

n² + n² beats n⁴.

</details>


<details><summary>Same idea elsewhere?</summary>

Meet in the middle for subset sums.

</details>


## Connected
- [Tuple with Same Product](Tuple%20with%20Same%20Product.md)
- [Meet In The Middle - Pattern Map](../../Meet%20In%20The%20Middle/Meet%20In%20The%20Middle%20-%20Pattern%20Map.md)
