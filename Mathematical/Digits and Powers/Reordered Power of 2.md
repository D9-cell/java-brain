---
topic: Digits and Powers
pattern: [Digit signature]
source: LeetCode 869
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Reordered Power of 2

> [!TIP]
> **🧠 Memory hook**
> Reordering keeps the **multiset of digits**. Compare the sorted digits with the 31 powers of two.
> **Mantra: key = sorted digits of n · ANY 2^p WITH SAME key**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=11) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Reorder the digits of n (no leading zero) in any order. Return true if some order is a power of two.

## Key insight
Two numbers are reorderings of each other exactly when their sorted digit strings match. There are only 31 powers of two in the int range, so compare against each. A power of two never starts with zero, so the leading-zero rule is automatic.

## Approach: Sorted-digit signature
```java
// Compares the sorted digits of n with those of every power of two
public boolean reorderedPowerOf2(int n) {
    String key = sortedDigits(n);
    for (int p = 0; p < 31; p++)
        if (sortedDigits(1 << p).equals(key)) return true;
    return false;
}

// Digits of n in sorted order, used as a signature
String sortedDigits(int n) {
    char[] c = String.valueOf(n).toCharArray();
    Arrays.sort(c);
    return new String(c);
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted-digit signature | O(31 · log n) | O(log n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why no permutation search?</summary>

The signature captures every permutation at once.

</details>


<details><summary>Leading zeros?</summary>

Powers of two have no leading zero, so a matching one is valid.

</details>


## Connected
- [Finding 3-Digit Even Numbers](Finding%203-Digit%20Even%20Numbers.md)
