---
topic: Stock and Kadane States
pattern: [Open / closed states, Weighted pieces]
source: LeetCode 3077
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Strength of K Disjoint Subarrays

> [!TIP]
> **🧠 Memory hook**
> Each element either **continues the open piece**, **starts the next piece**, or is skipped.
> **Mantra: open[j] = max(open[j], closed[j−1], open[j−1]) + w(j)·x; closed[j] = max(closed[j], open[j])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=13) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Choose exactly k (odd) disjoint subarrays in order. Strength = sum[1]·k − sum[2]·(k − 1) + sum[3]·(k − 2) − … Return the maximum strength.

## Key insight
Each element contributes x times the weight of the piece it belongs to, so the problem is per element. open[j] = best while piece j includes the current element; closed[j] = best after piece j has ended somewhere. Piece j can start right after piece j − 1 (adjacent) or after a gap.

## Approach: Open / closed rolling arrays
```java
// closed[j] = best after finishing j subarrays; open[j] = best while subarray j is still open at this element
public long maximumStrength(int[] nums, int k) {
    long[] closed = new long[k + 1], open = new long[k + 1];
    Arrays.fill(closed, NEG);
    Arrays.fill(open, NEG);
    closed[0] = 0;
    for (int x : nums) {
        long[] nOpen = new long[k + 1];
        Arrays.fill(nOpen, NEG);
        for (int j = 1; j <= k; j++) {
            long w = (long) (k - j + 1) * (j % 2 == 1 ? 1 : -1) * x;
            long start = Math.max(closed[j - 1], open[j - 1]);
            long best = Math.max(open[j], start);
            if (best > NEG) nOpen[j] = best + w;
        }
        for (int j = 1; j <= k; j++) closed[j] = Math.max(closed[j], nOpen[j]);
        open = nOpen;
    }
    return closed[k];
}
```

| Approach | Time | Space |
|---|---|---|
| Open / closed rolling arrays | O(n · k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why may piece j start right after piece j − 1?</summary>

Disjoint does not mean separated: adjacent pieces are allowed.

</details>


<details><summary>Weight of piece j?</summary>

(k − j + 1), positive for odd j, negative for even j.

</details>


## Connected
- [Maximum Sum of 3 Non-Overlapping Subarrays](Maximum%20Sum%20of%203%20Non-Overlapping%20Subarrays.md)
- [Best Time to Buy and Sell Stock IV](Best%20Time%20to%20Buy%20and%20Sell%20Stock%20IV.md)
