---
topic: Bit Magic
pattern: [Prefix XOR]
source: LeetCode 1310
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# XOR Queries of a Subarray

> [!TIP]
> **🧠 Memory hook**
> Prefix XOR: the shared part cancels.
> **Mantra: pre[r+1] ^ pre[l]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=51) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
XOR of arr[l..r] for each query.

## Key insight
Like prefix sums, but XOR is its own inverse.

## Approach: Prefix XOR
```java
// Prefix XOR: XOR(l..r) = pre[r + 1] ^ pre[l] (the shared prefix cancels)
public int[] xorQueries(int[] arr, int[][] queries) {
    int[] pre = new int[arr.length + 1];
    for (int i = 0; i < arr.length; i++) pre[i + 1] = pre[i] ^ arr[i];
    int[] res = new int[queries.length];
    for (int i = 0; i < queries.length; i++) res[i] = pre[queries[i][1] + 1] ^ pre[queries[i][0]];
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix XOR | O(n + q) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against direct XOR.

## Recall before you reveal
<details><summary>Like?</summary>

Prefix sums.

</details>


## Connected
- [Find The Original Array of Prefix Xor](Find%20The%20Original%20Array%20of%20Prefix%20Xor.md)
- [Count Triplets That Can Form Two Arrays of Equal XOR](Count%20Triplets%20That%20Can%20Form%20Two%20Arrays%20of%20Equal%20XOR.md)
