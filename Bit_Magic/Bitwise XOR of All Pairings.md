---
topic: Bit Magic
pattern: [XOR cancels]
source: LeetCode 2425
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Bitwise XOR of All Pairings

> [!TIP]
> **🧠 Memory hook**
> Count appearances: an even number of copies cancels.
> **Mantra: XOR nums1 IF |nums2| ODD, nums2 IF |nums1| ODD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=1) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
XOR of nums1[i] ^ nums2[j] over every pair.

## Key insight
nums1[i] appears |nums2| times and nums2[j] appears |nums1| times; only odd counts survive.

## Approach 1: Frequency count
```java
// Approach 1: each nums1[i] appears n2 times and each nums2[j] n1 times; only odd counts survive XOR
public int xorAllNumsCount(int[] nums1, int[] nums2) {
    java.util.Map<Integer, Long> freq = new java.util.HashMap<>();
    for (int x : nums1) freq.merge(x, (long) nums2.length, Long::sum);
    for (int x : nums2) freq.merge(x, (long) nums1.length, Long::sum);
    int res = 0;
    for (java.util.Map.Entry<Integer, Long> e : freq.entrySet()) if (e.getValue() % 2 == 1) res ^= e.getKey();
    return res;
}
```

## Approach 2: Parity rule
```java
// Approach 2: XOR nums1 only if nums2's length is odd, and nums2 only if nums1's length is odd
public int xorAllNums(int[] nums1, int[] nums2) {
    int res = 0;
    if (nums2.length % 2 == 1) for (int x : nums1) res ^= x;
    if (nums1.length % 2 == 1) for (int x : nums2) res ^= x;
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Frequency count | O(n + m) | O(n + m) |
| Parity rule | O(n + m) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against XOR of all pairs.

## Recall before you reveal
<details><summary>x ^ x?</summary>

0.

</details>

