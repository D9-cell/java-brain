---
topic: Strings and Digits
pattern: [Count mismatch types]
source: LeetCode 1247
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Swaps to Make Strings Equal

> [!TIP]
> **🧠 Memory hook**
> Only two kinds of mismatch exist: **xy** and **yx**. Pairs of the same kind cost one swap.
> **Mantra: xy/2 + yx/2 + 2·(xy % 2)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=17) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Strings of `x` and `y` have equal length. In a swap you exchange `s1[i]` with `s2[j]`. Return the minimum swaps to make them equal, or −1.

## Key insight
Count positions with (s1, s2) = (x, y) and (y, x). If the total number of mismatches is odd it is impossible. Two mismatches of the same kind are fixed with one swap; one leftover of each kind needs two swaps.

## Approach: Counting
```java
// Count mismatches of type x/y and y/x. Two of the same type are fixed with one swap; one of each type needs two swaps; an odd total is impossible
public int minimumSwap(String s1, String s2) {
    int xy = 0, yx = 0;
    for (int i = 0; i < s1.length(); i++) {
        if (s1.charAt(i) == 'x' && s2.charAt(i) == 'y') xy++;
        else if (s1.charAt(i) == 'y' && s2.charAt(i) == 'x') yx++;
    }
    if ((xy + yx) % 2 == 1) return -1;
    return xy / 2 + yx / 2 + 2 * (xy % 2);
}
```

| Approach | Time | Space |
|---|---|---|
| Counting | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does an odd number of mismatches fail?</summary>

Each swap changes the number of mismatches by an even amount.

</details>


## Connected
- [Min Swaps to Make Palindrome](Min%20Swaps%20to%20Make%20Palindrome.md)
