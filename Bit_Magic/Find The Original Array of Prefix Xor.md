---
topic: Bit Magic
pattern: [XOR cancels]
source: LeetCode 2433
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Find The Original Array of Prefix Xor

> [!TIP]
> **🧠 Memory hook**
> XOR is its own undo button.
> **Mantra: arr[i] = pref[i] ^ pref[i−1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=8) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Recover arr from its prefix XOR array.

## Key insight
pref[i] ^ pref[i−1] cancels the shared prefix and leaves arr[i].

## Approach 1: New array
```java
// Approach 1: new array: arr[i] = pref[i] ^ pref[i−1] (XOR cancels the shared prefix)
public int[] findArray(int[] pref) {
    int[] arr = new int[pref.length];
    arr[0] = pref[0];
    for (int i = 1; i < pref.length; i++) arr[i] = pref[i] ^ pref[i - 1];
    return arr;
}
```

## Approach 2: In place from the back
```java
// Approach 2: in place, walking from the back so pref[i−1] is still intact
public int[] findArrayInPlace(int[] pref) {
    for (int i = pref.length - 1; i > 0; i--) pref[i] ^= pref[i - 1];
    return pref;
}
```

| Approach | Time | Space |
|---|---|---|
| New array | O(n) | O(n) |
| In place from the back | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified by round trip.

## Recall before you reveal
<details><summary>Why from the back in place?</summary>

pref[i−1] must still be the original value.

</details>


## Connected
- [XOR Queries of a Subarray](XOR%20Queries%20of%20a%20Subarray.md)
