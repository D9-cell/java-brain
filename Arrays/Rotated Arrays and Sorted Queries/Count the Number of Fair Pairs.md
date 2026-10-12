---
topic: Rotated Arrays and Sorted Queries
pattern: [Sort, Two pointers, Count ≤]
source: LeetCode 2563
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Count the Number of Fair Pairs

> [!TIP]
> **🧠 Memory hook**
> Pairs with sum in [lower, upper] = **count(sum ≤ upper) − count(sum ≤ lower − 1)**. Each count is a two-pointer sweep on the sorted array.
> **Mantra: sort · atMost(upper) − atMost(lower − 1) · atMost: sum ≤ L → add j − i, i++ · ELSE j−−**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=6) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
Count pairs i < j with lower ≤ nums[i] + nums[j] ≤ upper.

## Key insight
Sorting does not change the set of pairs. In atMost, if nums[i] + nums[j] ≤ limit then nums[i] pairs with every index in (i, j], so add j − i at once.

## Approach: Two counts
```java
// Pairs with sum in [lower, upper] = pairs with sum <= upper minus pairs with sum <= lower - 1
public long countFairPairs(int[] nums, int lower, int upper) {
    Arrays.sort(nums);
    return atMost(nums, upper) - atMost(nums, lower - 1);
}

// Two pointers on the sorted array: pairs (i, j), i < j, with nums[i] + nums[j] <= limit
long atMost(int[] nums, int limit) {
    long count = 0;
    for (int i = 0, j = nums.length - 1; i < j; ) {
        if (nums[i] + nums[j] <= limit) {
            count += j - i;
            i++;
        } else j--;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Two counts | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why turn a range into two counts?</summary>

A ≤ count is easy with two pointers.

</details>


<details><summary>Binary search alternative?</summary>

For each i, two bounds on the suffix: O(n log n).

</details>


## Connected
- [Successful Pairs of Spells and Potions](Successful%20Pairs%20of%20Spells%20and%20Potions.md)
