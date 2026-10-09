---
topic: Bit Magic
pattern: [Prefix XOR]
source: LeetCode 1442
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Count Triplets That Can Form Two Arrays of Equal XOR

> [!TIP]
> **🧠 Memory hook**
> a == b ⇔ the whole block XORs to 0.
> **Mantra: EQUAL PREFIX XOR, ADD k − i − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=7) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Count (i, j, k) with XOR(arr[i..j−1]) == XOR(arr[j..k]).

## Key insight
a ^ b = 0 means XOR(arr[i..k]) = 0, i.e. equal prefix XORs; then every j in between works.

## Approach: Prefix XOR pairs
```java
// a == b ⇔ XOR of arr[i..k] is 0 ⇔ prefix[i] == prefix[k+1]; then j can be any of the k − i positions between
public int countTriplets(int[] arr) {
    int n = arr.length + 1;
    int[] pre = new int[n];
    for (int i = 1; i < n; i++) pre[i] = pre[i - 1] ^ arr[i - 1];
    int triplets = 0;
    for (int i = 0; i < n; i++) for (int k = i + 1; k < n; k++) if (pre[k] == pre[i]) triplets += k - i - 1;
    return triplets;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix XOR pairs | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n⁴).

## Recall before you reveal
<details><summary>O(n)?</summary>

Map prefix → (count, sum of indices).

</details>


## Connected
- [XOR Queries of a Subarray](XOR%20Queries%20of%20a%20Subarray.md)
