---
topic: HashSet
pattern: [HashSet, Pigeonhole]
source: LeetCode 961
difficulty: Easy
companies: [Google, Amazon, Microsoft, Adobe]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# N-Repeated Element in Size 2N Array

> [!TIP]
> **🧠 Memory hook**
> Pigeonhole: half the seats hold the same person, so two of them sit at most 2 apart.
> **Mantra: CHECK i−1 AND i−2, ELSE nums[0]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=13) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
One value appears n times in a 2n-length array; the rest are unique. Return it.

## Key insight
With a set: the first repeat. With O(1) space: two copies are within distance 2, except [x, a, b, x].

## Approach 1: HashSet
```java
// Approach 1: the first value seen twice
public int repeatedNTimesSet(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int x : nums) if (!seen.add(x)) return x;
    return -1;
}
```

## Approach 2: Neighbour check
```java
// Approach 2: two copies must sit within distance 2 somewhere, except the [x, a, b, x] shape
public int repeatedNTimes(int[] nums) {
    for (int i = 2; i < nums.length; i++)
        if (nums[i] == nums[i - 1] || nums[i] == nums[i - 2]) return nums[i];
    return nums[0];
}
```

| Approach | Time | Space |
|---|---|---|
| HashSet | O(n) | O(n) |
| Neighbour check | O(n) | O(1) |

## Recall before you reveal
<details><summary>Why the fallback nums[0]?</summary>

Length 4 with copies at both ends.

</details>

