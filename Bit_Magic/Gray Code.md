---
topic: Bit Magic
pattern: [Reflection, Recursion]
source: LeetCode 89
difficulty: Medium
companies: [Microsoft, Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Gray Code

> [!TIP]
> **🧠 Memory hook**
> Mirror the list and light a new top lamp on the mirrored half.
> **Mantra: REFLECT + SET TOP BIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=9) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
A sequence of all 2^n codes starting at 0 where neighbours (and the ends) differ by one bit.

## Key insight
Reflecting keeps the seam at one-bit distance: the two middle codes differ only in the new bit.

## Approach 1: Reflect and set a bit
```java
// Approach 1 (reflect): code(n) = "0" + code(n−1), then "1" + code(n−1) REVERSED
public List<Integer> grayCodeReflect(int n) {
    List<Integer> res = new ArrayList<>(List.of(0));
    for (int b = 0; b < n; b++) for (int i = res.size() - 1; i >= 0; i--) res.add(res.get(i) | (1 << b));
    return res;
}
```

## Approach 2: Recursive flip
```java
// Approach 2: recursion on a bit pattern: generate with bit n−1 as is, flip it, generate again
public List<Integer> grayCode(int n) {
    List<Integer> res = new ArrayList<>();
    helper(new int[]{0}, n, res);
    return res;
}

helper(new int[]{0}, n, res);
```

| Approach | Time | Space |
|---|---|---|
| Reflect and set a bit | O(2^n) | O(2^n) |
| Recursive flip | O(2^n) | O(n) stack |

> [!WARNING]
> **Java gotcha**
> Checked for n = 1..10: distinct, starts at 0, every neighbour pair differs by one bit.

## Recall before you reveal
<details><summary>Formula?</summary>

i ^ (i >> 1).

</details>


## Connected
- [Minimum One Bit Operations to Make Integers Zero](Minimum%20One%20Bit%20Operations%20to%20Make%20Integers%20Zero.md)
