---
topic: Sliding Window
pattern: [Variable window, Bit counts]
source: LeetCode 3171
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Find Subarray With Bitwise AND Closest to K

> [!TIP]
> **🧠 Memory hook**
> AND is a dimmer that only goes down; bit counts let you turn it back up.
> **Mantra: AND > k: GROW; AND < k: SHRINK (BIT COUNTS)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=16) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Minimise |k − AND(nums[l..r])| over all subarrays.

## Key insight
Extending a window can only lower the AND. If it is still above k, grow; if it fell below k, shrink. AND cannot be undone, but counting how many numbers have each bit can: a bit is in the AND when its count equals the window length.

## Approach: Window with bit counts
```java
// Adds (op = 1) or removes (op = -1) the set bits of val
static void update(int[] bits, int val, int op) {
    for (int b = 0; val > 0; b++, val >>= 1) if ((val & 1) == 1) bits[b] += op;
}

// A bit is in the window AND when every one of the len numbers has it
static int andOf(int[] bits, int len) {
    int and = 0;
    for (int b = 0; b < 32; b++) if (bits[b] == len) and |= 1 << b;
    return and;
}

// Window AND only drops as j grows: move j while AND > k, shrink i while AND < k, rebuilding AND from bit counts
public int minimumDifference(int[] nums, int k) {
    int[] bits = new int[32];
    int result = Integer.MAX_VALUE, windowAnd = nums[0];
    for (int i = 0, j = 0; j < nums.length; j++) {
        windowAnd &= nums[j];
        update(bits, nums[j], 1);
        result = Math.min(result, Math.abs(k - windowAnd));
        if (windowAnd == k) return 0;
        while (i <= j && windowAnd < k) {
            update(bits, nums[i++], -1);
            windowAnd = andOf(bits, j - i + 1);
            result = Math.min(result, Math.abs(k - windowAnd));
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window with bit counts | O(32 · n) | O(32) |

> [!WARNING]
> **Java gotcha**
> Verified against all subarray ANDs.

## Recall before you reveal
<details><summary>Simpler alternative?</summary>

Keep the set of ANDs of subarrays ending at j: at most ~32 values.

</details>


<details><summary>Empty window?</summary>

Its "AND" is all ones; it never beats a real candidate.

</details>


## Connected
- [Longest Nice Subarray](Longest%20Nice%20Subarray.md)
- [Shortest Subarray With OR at Least K II](../Bit_Magic/Shortest%20Subarray%20With%20OR%20at%20Least%20K%20II.md)
