---
topic: Prefix Sums Basics
pattern: [Prefix products, Reset at zero]
source: LeetCode 1352
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Product of the Last K Numbers

> [!TIP]
> **🧠 Memory hook**
> Keep **prefix products since the last zero**. A query = last / pre[n − 1 − k]; if k reaches past the last zero, the answer is **0**.
> **Mantra: add 0 → reset · add x → pre.add(last · x) · k ≥ size → 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=8) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
Design a stream with add(num) and getProduct(k), the product of the last k numbers.

## Key insight
A zero kills every product that includes it, so restart the prefix list. The statement guarantees every queried product fits in an int.

## Approach: Prefix products
```java
// Prefix products restarted at every zero; a query reaching past the last zero is 0
class ProductOfTheLastKNumbers {
    List<Integer> pre = new ArrayList<>(List.of(1));

    public void add(int num) {
        if (num == 0) {
            pre = new ArrayList<>(List.of(1));
            return;
        }
        pre.add(pre.get(pre.size() - 1) * num);
    }

    public int getProduct(int k) {
        int n = pre.size();
        if (k >= n) return 0;
        return pre.get(n - 1) / pre.get(n - 1 - k);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix products | O(1) per call | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why reset on zero?</summary>

Dividing by a prefix containing 0 is impossible.

</details>


<details><summary>Why does k ≥ size mean 0?</summary>

The window includes the zero that caused the reset.

</details>


## Connected
- [Product of Array Except Self](Product%20of%20Array%20Except%20Self.md)
