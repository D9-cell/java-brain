---
topic: Stock and Kadane States
pattern: [Prefix sums, Parity swap]
source: LeetCode 1664
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Ways to Make a Fair Array

> [!TIP]
> **🧠 Memory hook**
> Removing one element makes everything after it **change parity**.
> **Mantra: evenLeft + oddRight == oddLeft + evenRight**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=8) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Count the indices whose removal makes the sum of even-indexed elements equal the sum of odd-indexed elements.

## Key insight
Before i nothing changes; after i every element shifts one position left, so odd becomes even and even becomes odd. With prefix sums on the left and suffix sums on the right, each index is checked in O(1).

## Approach: Prefix and suffix parity sums
```java
// Elements after the removed index swap parity, so combine prefix sums with swapped suffix sums
public int waysToMakeFair(int[] nums) {
    int evenRight = 0, oddRight = 0, evenLeft = 0, oddLeft = 0, count = 0;
    for (int i = 0; i < nums.length; i++) { if (i % 2 == 0) evenRight += nums[i]; else oddRight += nums[i]; }
    for (int i = 0; i < nums.length; i++) {
        if (i % 2 == 0) evenRight -= nums[i]; else oddRight -= nums[i];
        if (evenLeft + oddRight == oddLeft + evenRight) count++;
        if (i % 2 == 0) evenLeft += nums[i]; else oddLeft += nums[i];
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix and suffix parity sums | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why swap only the right side?</summary>

Only elements after the removed one move.

</details>


<details><summary>What is updated before the check?</summary>

The removed element leaves the right sums first.

</details>


## Connected
- Find the Middle Index in Array
- [Range Sum Query - Mutable](../../Segment%20Tree/Range%20Sum%20Query%20-%20Mutable.md)
