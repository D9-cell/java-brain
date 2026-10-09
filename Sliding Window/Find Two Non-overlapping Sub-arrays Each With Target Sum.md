---
topic: Sliding Window
pattern: [Variable window, Best so far]
source: LeetCode 1477
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Find Two Non-overlapping Sub-arrays Each With Target Sum

> [!TIP]
> **🧠 Memory hook**
> Remember the best ticket so far on your left; pair it with each new match.
> **Mantra: best[j] = SHORTEST MATCH ENDING ≤ j; PAIR WITH best[i − 1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=17) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Find two non-overlapping subarrays with sum = target and minimum total length (positive numbers).

## Key insight
Each match [i..j] found by the window pairs with the shortest match that ends before i, stored in best[i − 1].

## Approach: Window + prefix best
```java
// Positive window for sum == target; best[j] = shortest match ending at or before j, paired with the match starting at i
public int minSumOfLengths(int[] arr, int target) {
    int n = arr.length, sum = 0, bestLen = Integer.MAX_VALUE, result = Integer.MAX_VALUE;
    int[] best = new int[n];
    for (int i = 0, j = 0; j < n; j++) {
        sum += arr[j];
        while (i < j && sum > target) sum -= arr[i++];
        if (sum == target) {
            int len = j - i + 1;
            if (i > 0 && best[i - 1] != Integer.MAX_VALUE) result = Math.min(result, len + best[i - 1]);
            bestLen = Math.min(bestLen, len);
        }
        best[j] = bestLen;
    }
    return result == Integer.MAX_VALUE ? -1 : result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window + prefix best | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against all pairs of matching subarrays.

## Recall before you reveal
<details><summary>Why is a window valid here?</summary>

All numbers are positive.

</details>


## Connected
- [Minimum Size Subarray Sum](Minimum%20Size%20Subarray%20Sum.md)
