---
topic: Bit Magic
pattern: [Observation]
source: LeetCode 3513
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Number of Unique XOR Triplets I

> [!TIP]
> **🧠 Memory hook**
> A permutation of 1..n reaches everything below the next power of two.
> **Mantra: n ≤ 2 → n, ELSE NEXT POWER OF TWO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=40) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Distinct values of nums[i] ^ nums[j] ^ nums[k] (i ≤ j ≤ k) for a permutation of 1..n.

## Key insight
With n ≥ 3, every value below the smallest power of two greater than n is reachable.

## Approach: Next power of two
```java
// nums is a permutation of 1..n: for n ≥ 3 every value below the next power of two above n is reachable
public int uniqueXorTriplets(int[] nums) {
    int n = nums.length;
    if (n <= 2) return n;
    int ans = 1;
    while (ans <= n) ans <<= 1;
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Next power of two | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against brute force for n = 1..40.

## Recall before you reveal
<details><summary>n = 1, 2?</summary>

1 and 2.

</details>


## Connected
- [Number of Unique XOR Triplets II](Number%20of%20Unique%20XOR%20Triplets%20II.md)
