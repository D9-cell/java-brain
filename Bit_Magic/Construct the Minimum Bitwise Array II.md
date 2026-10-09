---
topic: Bit Magic
pattern: [Bit construction]
source: LeetCode 3315
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Construct the Minimum Bitwise Array II

> [!TIP]
> **🧠 Memory hook**
> x | (x+1) lights the lowest dark lamp; undo it by dimming the last lamp of the trailing run.
> **Mantra: CLEAR THE BIT JUST BELOW THE FIRST 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=5) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
For each prime num, the smallest x with x | (x+1) = num, else −1.

## Key insight
x | (x+1) sets the lowest 0 of x. So num has a run of trailing 1s, and the smallest x clears the highest bit of that run.

## Approach: Bit trick
```java
// x | (x+1) sets the lowest 0 bit of x; reverse it: clear the highest 1 of num's trailing-ones block (num = 2 → −1)
public int[] minBitwiseArray(int[] nums) {
    int[] res = new int[nums.length];
    for (int i = 0; i < nums.length; i++) {
        int num = nums[i];
        if (num == 2) { res[i] = -1; continue; }
        res[i] = -1;
        for (int j = 1; j < 32; j++) {
            if ((num & (1 << j)) != 0) continue;
            res[i] = num ^ (1 << (j - 1));
            break;
        }
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Bit trick | O(32·n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against brute force for every prime below 5000.

## Recall before you reveal
<details><summary>Why −1 for 2?</summary>

x | (x+1) is always odd.

</details>


## Connected
- [Construct the Minimum Bitwise Array I](Construct%20the%20Minimum%20Bitwise%20Array%20I.md)
