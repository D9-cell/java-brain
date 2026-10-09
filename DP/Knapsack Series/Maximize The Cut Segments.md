---
topic: Knapsack Series
pattern: [Unbounded knapsack, Exact fill]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximize The Cut Segments

> [!TIP]
> **🧠 Memory hook**
> Only three saws: **x, y, z**. Every length must be cut exactly, so mark the unreachable ones.
> **Mantra: best[len] = max(best[len − p] + 1), −1 IF UNREACHABLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=11) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Cut a segment of length n into pieces of lengths x, y or z only, maximising the number of pieces. Return 0 if it cannot be done exactly.

## Key insight
Like Coin Change, but maximise the count and require an exact fill. −1 marks lengths that cannot be cut exactly, so they are never extended.

## Approach: Bottom-up
```java
// best[len] = most pieces for length len, -1 if it cannot be cut exactly
public int maximizeTheCuts(int n, int x, int y, int z) {
    int[] best = new int[n + 1];
    Arrays.fill(best, -1);
    best[0] = 0;
    for (int len = 1; len <= n; len++)
        for (int p : new int[]{x, y, z})
            if (p <= len && best[len - p] >= 0) best[len] = Math.max(best[len], best[len - p] + 1);
    return Math.max(best[n], 0);
}
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why −1 and not 0?</summary>

0 is a valid count for length 0; unreachable lengths need a separate marker.

</details>


<details><summary>Answer when impossible?</summary>

0, as the problem asks.

</details>


## Connected
- [Rod Cutting](Rod%20Cutting.md)
- [Coin Change](Coin%20Change.md)
