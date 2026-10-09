---
topic: Scans and Counting
pattern: [Sweep the right end, Top two conflicts]
source: LeetCode 3480
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximize Subarrays After Removing One Conflicting Pair

> [!TIP]
> **🧠 Memory hook**
> For each right end the **nearest conflicting left point** limits the subarray. Removing the pair that creates the biggest limit frees `max − secondMax` subarrays.
> **Mantra: KEEP THE TWO LARGEST CONFLICTS, CREDIT THE REMOVAL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=10) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Remove exactly one conflicting pair. A subarray of 1..n is valid if it does not contain both numbers of any remaining pair. Maximise the number of valid subarrays.

## Key insight
Sweep `end` from 1 to n. Track the largest (`max1`) and second largest (`max2`) left conflicts among pairs ending at or before `end`. Valid subarrays ending here: `end - max1`. If the pair giving `max1` is removed, `max1 - max2` more subarrays become valid; accumulate that gain per `max1` and add the best.

## Approach: Sweep + gains
```java
// Sweep the right end; for each end the nearest conflict on the left limits the subarray. Removing the pair that creates the largest limit gains (max - secondMax) subarrays for each end it limits
public long maxSubarrays(int n, int[][] conflictingPairs) {
    List<List<Integer>> conflicts = new ArrayList<>();
    for (int i = 0; i <= n; i++) conflicts.add(new ArrayList<>());
    for (int[] p : conflictingPairs) conflicts.get(Math.max(p[0], p[1])).add(Math.min(p[0], p[1]));
    long valid = 0;
    long[] extra = new long[n + 1];
    int max1 = 0, max2 = 0;
    for (int end = 1; end <= n; end++) {
        for (int u : conflicts.get(end)) {
            if (u >= max1) { max2 = max1; max1 = u; }
            else if (u > max2) max2 = u;
        }
        valid += end - max1;
        extra[max1] += max1 - max2;
    }
    long bestExtra = 0;
    for (long e : extra) bestExtra = Math.max(bestExtra, e);
    return valid + bestExtra;
}
```

| Approach | Time | Space |
|---|---|---|
| Sweep + gains | O(n + p) | O(n + p) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why only the top two?</summary>

Removing one pair can only lower the limit down to the second largest conflict.

</details>


## Connected
- [Maximum Score of a Good Subarray](Maximum%20Score%20of%20a%20Good%20Subarray.md)
