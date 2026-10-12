---
topic: Formulas and Observations
pattern: [Symmetric series]
source: LeetCode 1551
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Minimum Operations to Make Array Equal

> [!TIP]
> **🧠 Memory hook**
> arr = 1, 3, …, 2n − 1 has mean **n**. Pair the smaller half with the larger: sum of (n − (2i + 1)) = **n²/4**.
> **Mantra: RETURN n * n / 4**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=11) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
arr[i] = 2i + 1. One operation subtracts 1 from one element and adds 1 to another. Return the minimum operations to make all elements equal.

## Key insight
The total is preserved, so every element ends at the mean n. Each operation moves one unit from a big element to a small one, so the answer is the total deficit of the lower half: (n − 1) + (n − 3) + …, which is ⌊n²/4⌋.

## Approach: Formula
```java
// Values 1, 3, ..., 2n - 1 all meet at n; pair the small half with the large half
public int minOperations(int n) {
    return n * n / 4;
}
```

| Approach | Time | Space |
|---|---|---|
| Formula | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the mean?</summary>

Operations keep the sum fixed.

</details>


<details><summary>n = 3?</summary>

arr 1,3,5 → 2 operations, and 9/4 = 2.

</details>


## Connected
- [Minimum Operations to Make a Uni-Value Grid](../Primes%20Divisors%20and%20Remainders/Minimum%20Operations%20to%20Make%20a%20Uni-Value%20Grid.md)
