---
topic: Stock and Kadane States
pattern: [Kadane on direction, Two run lengths]
source: LeetCode 978
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Longest Turbulent Subarray

> [!TIP]
> **🧠 Memory hook**
> A turbulent run is a **zigzag**: each step must go the opposite way of the last.
> **Mantra: UP: up = down + 1, down = 1 · DOWN: down = up + 1, up = 1 · EQUAL: both = 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=6) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest subarray where the comparison sign between neighbours alternates (<, >, <, … or >, <, >, …).

## Key insight
Keep the longest zigzag ending here whose last step went up, and the one whose last step went down. A rise extends a run that ended with a fall, and vice versa; an equal pair resets both.

## Approach: Two run lengths
```java
// up / down = longest turbulent run ending here whose last step went up / down
public int maxTurbulenceSize(int[] arr) {
    int up = 1, down = 1, best = 1;
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) { up = down + 1; down = 1; }
        else if (arr[i] < arr[i - 1]) { down = up + 1; up = 1; }
        else { up = 1; down = 1; }
        best = Math.max(best, Math.max(up, down));
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Two run lengths | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why reset to 1, not 0?</summary>

A single element is a turbulent subarray of length 1.

</details>


<details><summary>Related?</summary>

Wiggle Subsequence uses the same up/down pair but may skip elements.

</details>


## Connected
- [Wiggle Subsequence](../../Greedy/Scans%20and%20Counting/Wiggle%20Subsequence.md)
- [Number of ZigZag Arrays I](../Counting%20Walks%20and%20Moves/Number%20of%20ZigZag%20Arrays%20I.md)
