---
topic: Bit Magic
pattern: [Per-bit nearest index]
source: LeetCode 2411
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Smallest Subarrays With Maximum Bitwise OR

> [!TIP]
> **🧠 Memory hook**
> Reach the nearest carrier of every bit.
> **Mantra: RIGHT TO LEFT, nearest[b], MAX END**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=48) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
For each i, the shortest subarray starting at i whose OR equals the maximum OR from i.

## Key insight
The maximum OR contains every bit that appears at or after i; the subarray must reach the nearest index carrying each one.

## Approach: Nearest index per bit
```java
// Right to left: nearest[b] = closest index ≥ i having bit b; the subarray must reach the farthest of those
public int[] smallestSubarrays(int[] nums) {
    int n = nums.length;
    int[] res = new int[n], nearest = new int[32];
    java.util.Arrays.fill(nearest, -1);
    for (int i = n - 1; i >= 0; i--) {
        int end = i;
        for (int b = 0; b < 32; b++) {
            if ((nums[i] >> b & 1) == 1) nearest[b] = i;
            else if (nearest[b] != -1) end = Math.max(end, nearest[b]);
        }
        res[i] = end - i + 1;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Nearest index per bit | O(32·n) | O(32) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Direction?</summary>

Right to left.

</details>

