---
topic: Bit Magic
pattern: [Modular arithmetic]
source: LeetCode 1018
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Binary Prefix Divisible By 5

> [!TIP]
> **🧠 Memory hook**
> Keep only the remainder.
> **Mantra: rem = (2·rem + bit) % 5**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=14) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
For each prefix of the bit array, is its value divisible by 5?

## Key insight
Appending a bit doubles the value and adds the bit; remainders follow the same rule.

## Approach: Running remainder
```java
// Appending a bit doubles the value and adds the bit; keep only the remainder mod 5
public List<Boolean> prefixesDivBy5(int[] nums) {
    List<Boolean> res = new ArrayList<>();
    int rem = 0;
    for (int b : nums) {
        rem = (rem * 2 + b) % 5;
        res.add(rem == 0);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Running remainder | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against BigInteger.

## Recall before you reveal
<details><summary>Why not keep the value?</summary>

It overflows after 31 bits.

</details>

