---
topic: Difference Arrays
pattern: [Rises]
source: LeetCode 1526
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Number of Increments on Subarrays to Form a Target Array

> [!TIP]
> **🧠 Memory hook**
> Each **rise** from target[i − 1] to target[i] needs that many new operations; a drop can reuse earlier operations for free.
> **Mantra: ops = target[0] + Σ max(0, target[i] − target[i−1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=10) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Starting from zeros, one operation adds 1 to any subarray. Return the minimum operations to form target.

## Key insight
Read target as a difference array: positive differences are where operations must start. Each operation can extend right as long as needed.

## Approach: Sum of rises
```java
// Each rise from target[i - 1] to target[i] needs that many new operations; drops are free
public int minNumberOperations(int[] target) {
    int ops = target[0];
    for (int i = 1; i < target.length; i++) ops += Math.max(0, target[i] - target[i - 1]);
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Sum of rises | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why are drops free?</summary>

Operations that started earlier simply end there.

</details>


<details><summary>Same idea?</summary>

Counting the "new layers" when stacking blocks.

</details>


## Connected
- [Range Addition](Range%20Addition.md)
