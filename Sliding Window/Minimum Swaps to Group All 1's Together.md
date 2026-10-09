---
topic: Sliding Window
pattern: [Fixed window]
source: LeetCode 1151
difficulty: Medium
companies: [Adobe]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Minimum Swaps to Group All 1's Together

> [!TIP]
> **🧠 Memory hook**
> Choose the parking spot (window of size ones) with the fewest intruders (zeros).
> **Mantra: MIN ZEROS IN A WINDOW OF SIZE ones**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=42) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Minimum swaps to group all 1s together (linear array).

## Key insight
One swap fixes one zero inside the target block.

## Approach: Fixed window
```java
// Fixed window of size = total ones; the answer is the fewest zeros any such window holds
public int minSwaps(int[] data) {
    int n = data.length, w = Arrays.stream(data).sum();
    if (w == 0) return 0;
    int zeros = 0;
    for (int t = 0; t < w; t++) if (data[t] == 0) zeros++;
    int minZeros = zeros;
    for (int i = 1, j = w; j < n; i++, j++) {
        if (data[i - 1] == 0) zeros--;
        if (data[j] == 0) zeros++;
        minZeros = Math.min(minZeros, zeros);
    }
    return minZeros;
}
```

| Approach | Time | Space |
|---|---|---|
| Fixed window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> **C++ bugs:** the file uses undeclared `n` and `arr` (the parameter is `data`) and does not compile; it also returns −1 when there are no ones, but grouping nothing needs 0 swaps. Verified against brute force.

## Recall before you reveal
<details><summary>No ones?</summary>

Answer 0.

</details>


## Connected
- [Minimum Swaps to Group All 1's Together II](Minimum%20Swaps%20to%20Group%20All%201%27s%20Together%20II.md)
