---
topic: Sliding Window
pattern: [Last positions]
source: LeetCode 2444
difficulty: Hard
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Count Subarrays With Fixed Bounds

> [!TIP]
> **🧠 Memory hook**
> Three bookmarks: last bad index, last minK, last maxK.
> **Mantra: ADD max(0, min(minPos, maxPos) − bad)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=9) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count subarrays whose minimum is minK and maximum is maxK.

## Key insight
For end i, a start must be after the last out-of-range index and at or before both the last minK and the last maxK.

## Approach 1: Brute force
```java
// Tracks min and max of every subarray from each start
public long countSubarraysBrute(int[] nums, int minK, int maxK) {
    long count = 0;
    for (int s = 0; s < nums.length; s++) {
        int lo = nums[s], hi = nums[s];
        for (int e = s; e < nums.length; e++) {
            lo = Math.min(lo, nums[e]);
            hi = Math.max(hi, nums[e]);
            if (lo == minK && hi == maxK) count++;
        }
    }
    return count;
}
```

## Approach 2: Three bookmarks
```java
// Remember the last bad index and last minK / maxK positions; starts in (bad, min(minPos, maxPos)] work
public long countSubarrays(int[] nums, int minK, int maxK) {
    long ans = 0;
    int minPos = -1, maxPos = -1, bad = -1;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] < minK || nums[i] > maxK) bad = i;
        if (nums[i] == minK) minPos = i;
        if (nums[i] == maxK) maxPos = i;
        ans += Math.max(0, Math.min(minPos, maxPos) - bad);
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n²) | O(1) |
| Three bookmarks | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the O(n²) scan.

## Recall before you reveal
<details><summary>Why max(0, …)?</summary>

If a bound has not appeared since the bad index, no start works.

</details>

