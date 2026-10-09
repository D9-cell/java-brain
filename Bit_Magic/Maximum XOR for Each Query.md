---
topic: Bit Magic
pattern: [XOR cancels, Masks]
source: LeetCode 1829
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Maximum XOR for Each Query

> [!TIP]
> **🧠 Memory hook**
> k flips the prefix XOR into all ones.
> **Mantra: k = xor ^ (2^maxBit − 1), REMOVE LAST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=29) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
For each shrinking prefix, the k < 2^maximumBit maximising XOR.

## Key insight
The best target is all ones, so k = xor ^ mask; removing the last element is XOR-ing it again.

## Approach: Running XOR
```java
// k = (2^maxBit − 1) ^ (XOR of the current prefix); remove the last element by XOR-ing it out
public int[] getMaximumXor(int[] nums, int maximumBit) {
    int n = nums.length, xor = 0, mask = (1 << maximumBit) - 1;
    for (int x : nums) xor ^= x;
    int[] res = new int[n];
    for (int i = 0; i < n; i++) {
        res[i] = xor ^ mask;
        xor ^= nums[n - 1 - i];
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Running XOR | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified by trying every k.

## Recall before you reveal
<details><summary>Remove an element?</summary>

XOR it again.

</details>

