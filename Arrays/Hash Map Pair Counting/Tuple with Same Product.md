---
topic: Hash Map Pair Counting
pattern: [Derived key]
source: LeetCode 1726
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Tuple with Same Product

> [!TIP]
> **🧠 Memory hook**
> Count pairs by **product**. Every two pairs with the same product give **8 ordered tuples** (2 pair orders × 2 × 2 inner orders).
> **Mantra: FOR pairs: count += 8 · seen[product] · seen[product]++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Hash%20Map%20Pair%20Counting/Hash%20Map%20Pair%20Counting%20Animations.html#p=1) · **Pattern hub:** [Hash Map Pair Counting - Pattern Map](Hash%20Map%20Pair%20Counting%20-%20Pattern%20Map.md)

## Problem
nums has distinct positive integers. Count tuples (a, b, c, d) of distinct elements with a · b = c · d.

## Key insight
With distinct values, two different pairs with the same product never share an element. Each such unordered pair of pairs gives 8 tuples.

## Approach: Products in a map
```java
// Every two pairs with the same product make 8 ordered tuples
public int tupleSameProduct(int[] nums) {
    Map<Integer, Integer> products = new HashMap<>();
    int count = 0;
    for (int i = 0; i < nums.length; i++)
        for (int j = i + 1; j < nums.length; j++) {
            int p = nums[i] * nums[j];
            count += 8 * products.getOrDefault(p, 0);
            products.merge(p, 1, Integer::sum);
        }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Products in a map | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why 8?</summary>

(a,b,c,d) can swap within each pair and swap the pairs: 2·2·2.

</details>


<details><summary>Why can pairs not share an element?</summary>

a·b = a·c with distinct values forces b = c.

</details>


## Connected
- [4Sum II](4Sum%20II.md)
