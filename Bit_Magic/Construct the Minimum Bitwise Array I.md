---
topic: Bit Magic
pattern: [Brute force]
source: LeetCode 3314
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Construct the Minimum Bitwise Array I

> [!TIP]
> **🧠 Memory hook**
> Small values: try every x.
> **Mantra: FIRST x WITH x | (x+1) == num**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=17) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Smallest x with x | (x+1) = num (values ≤ 1000).

## Key insight
Try x from 0 upward.

## Approach: Try every x
```java
// Brute force: the smallest x with x | (x + 1) == num (values ≤ 1000)
public int[] minBitwiseArray(int[] nums) {
    int[] res = new int[nums.length];
    for (int i = 0; i < nums.length; i++) {
        res[i] = -1;
        for (int x = 0; x < nums[i]; x++) if ((x | (x + 1)) == nums[i]) { res[i] = x; break; }
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Try every x | O(n · max) | O(1) |

> [!WARNING]
> **Java gotcha**
> Agrees with Part II for odd values ≤ 1000.

## Recall before you reveal
<details><summary>Large values?</summary>

Part II bit trick.

</details>


## Connected
- [Construct the Minimum Bitwise Array II](Construct%20the%20Minimum%20Bitwise%20Array%20II.md)
