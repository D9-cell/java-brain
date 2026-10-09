---
topic: Bit Magic
pattern: [Sliding window, Bit counts]
source: LeetCode 3097
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Shortest Subarray With OR at Least K II

> [!TIP]
> **🧠 Memory hook**
> OR cannot be undone, but bit counts can.
> **Mantra: SLIDING WINDOW, COUNT PER BIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=45) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Length of the shortest subarray with OR ≥ k, or −1.

## Key insight
OR only grows when extending, so a window works if removals are supported: keep counts per bit.

## Approach: Window with bit counts
```java
// OR cannot be "un-done", so keep per-bit counts in the window; shrink from the left while OR ≥ k
public int minimumSubarrayLength(int[] nums, int k) {
    int[] bits = new int[32];
    int best = Integer.MAX_VALUE, i = 0;
    for (int j = 0; j < nums.length; j++) {
        update(bits, nums[j], 1);
        while (i <= j && value(bits) >= k) {
            best = Math.min(best, j - i + 1);
            update(bits, nums[i++], -1);
        }
    }
    return best == Integer.MAX_VALUE ? -1 : best;
}

update(bits, nums[j], 1);
while (i <= j && value(bits) >= k) {
    best = Math.min(best, j - i + 1);
    update(bits, nums[i++], -1);
}

// The window's OR rebuilt from bit counts
private static int value(int[] bits) {
    int v = 0;
    for (int b = 0; b < 32; b++) if (bits[b] > 0) v |= 1 << b;
    return v;
}
```

| Approach | Time | Space |
|---|---|---|
| Window with bit counts | O(32·n) | O(32) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>k = 0?</summary>

Answer 1.

</details>

