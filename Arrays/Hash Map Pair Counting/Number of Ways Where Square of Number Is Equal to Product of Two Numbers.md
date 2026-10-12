---
topic: Hash Map Pair Counting
pattern: [Derived key]
source: LeetCode 1577
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Number of Ways Where Square of Number Is Equal to Product of Two Numbers

> [!TIP]
> **🧠 Memory hook**
> Count the **squares** of one array in a map, then look up **every pair product** of the other array. Do it both ways.
> **Mantra: squares of a · FOR j < k in b: total += squares[b[j]·b[k]] · swap roles**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Hash%20Map%20Pair%20Counting/Hash%20Map%20Pair%20Counting%20Animations.html#p=5) · **Pattern hub:** [Hash Map Pair Counting - Pattern Map](Hash%20Map%20Pair%20Counting%20-%20Pattern%20Map.md)

## Problem
Count triplets of type 1 (nums1[i]² = nums2[j] · nums2[k], j < k) plus type 2 (the same with the arrays swapped).

## Key insight
Use long: values up to 10⁵ square to 10¹⁰. Pairs dominate the cost at O(m²).

## Approach: Squares map + pair products
```java
// Count squares from one array, then look up every pair product from the other array
public int numTriplets(int[] nums1, int[] nums2) {
    return count(nums1, nums2) + count(nums2, nums1);
}

// Triplets with a[i]^2 == b[j] * b[k], j < k
int count(int[] a, int[] b) {
    Map<Long, Integer> squares = new HashMap<>();
    for (int x : a) squares.merge((long) x * x, 1, Integer::sum);
    int total = 0;
    for (int j = 0; j < b.length; j++)
        for (int k = j + 1; k < b.length; k++) total += squares.getOrDefault((long) b[j] * b[k], 0);
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Squares map + pair products | O(n² + m²) | O(n + m) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why long?</summary>

10⁵² overflows int.

</details>


<details><summary>Why count both ways?</summary>

Type 1 and type 2 swap the arrays.

</details>


## Connected
- [Tuple with Same Product](Tuple%20with%20Same%20Product.md)
