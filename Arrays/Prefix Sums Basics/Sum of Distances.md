---
topic: Prefix Sums Basics
pattern: [Group by value, Distance sums]
source: LeetCode 2615
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Sum of Distances

> [!TIP]
> **🧠 Memory hook**
> Group indexes by value; inside a group the indexes are sorted, so apply the **absolute-difference prefix trick** to them.
> **Mantra: groups[value] = sorted indexes · per group: i·k − left + right − i·(m−1−k)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=11) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
For each i return Σ |i − j| over all j with nums[j] == nums[i].

## Key insight
Indexes are collected in increasing order, so each group is already sorted. Use long: sums of indexes reach 10¹⁰.

## Approach: Groups + prefix sums
```java
// Group indexes by value; within a group apply the sorted absolute-difference prefix trick
public long[] distance(int[] nums) {
    Map<Integer, List<Integer>> groups = new HashMap<>();
    for (int i = 0; i < nums.length; i++) groups.computeIfAbsent(nums[i], k -> new ArrayList<>()).add(i);
    long[] out = new long[nums.length];
    for (List<Integer> idx : groups.values()) {
        long total = 0, left = 0;
        for (int i : idx) total += i;
        int m = idx.size();
        for (int k = 0; k < m; k++) {
            long i = idx.get(k), right = total - left - i;
            out[(int) i] = i * k - left + right - i * (m - 1 - k);
            left += i;
        }
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Groups + prefix sums | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why are groups sorted?</summary>

Indexes are appended left to right.

</details>


<details><summary>Why long?</summary>

Up to 10⁵ indexes summing to 10¹⁰.

</details>


## Connected
- [Sum of Absolute Differences in a Sorted Array](Sum%20of%20Absolute%20Differences%20in%20a%20Sorted%20Array.md)
