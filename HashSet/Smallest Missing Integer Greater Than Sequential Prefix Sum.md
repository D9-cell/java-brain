---
topic: HashSet
pattern: [HashSet membership]
source: LeetCode 2996
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Smallest Missing Integer Greater Than Sequential Prefix Sum

> [!TIP]
> **🧠 Memory hook**
> Climb the staircase prefix 3,4,5, then step over every number that already exists.
> **Mantra: SUM SEQUENTIAL PREFIX, BUMP WHILE PRESENT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=15) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
x must be ≥ the sum of the longest sequential prefix and missing from nums; return the smallest such x.

## Key insight
Compute the prefix sum, then increase it while it is in the set.

## Approach: Set + bump
```java
// Sum the longest sequential prefix, then bump the value up while it is present in the array
public int missingInteger(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int x : nums) set.add(x);
    int sum = nums[0];
    for (int j = 1; j < nums.length && nums[j] == nums[j - 1] + 1; j++) sum += nums[j];
    while (set.contains(sum)) sum++;
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Set + bump | O(n) | O(n) |

## Recall before you reveal
<details><summary>Sorting alternative?</summary>

Sort and bump when equal; O(n log n), O(1) extra.

</details>


## Connected
- [Longest Consecutive Sequence](Longest%20Consecutive%20Sequence.md)
