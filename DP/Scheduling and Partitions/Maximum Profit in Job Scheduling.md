---
topic: Scheduling and Partitions
pattern: [Time order, Binary search]
source: LeetCode 1235
difficulty: Hard
companies: [Google, Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Profit in Job Scheduling

> [!TIP]
> **🧠 Memory hook**
> Sort by **end time**; a job either adds to the best that finished before it starts or is skipped.
> **Mantra: best[i] = max(best[i − 1], best[last compatible] + profit)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Scheduling%20and%20Partitions/Scheduling%20and%20Partitions%20Animations.html#p=3) · **Pattern hub:** [Scheduling and Partitions - Pattern Map](Scheduling%20and%20Partitions%20-%20Pattern%20Map.md)

## Problem
Jobs have start, end and profit. Choose non-overlapping jobs (a job may start when another ends) for maximum profit.

## Key insight
Sorted by end time, best[i] covers the first i jobs. A binary search finds how many jobs end by the current job's start. Sorting by start and solving backwards is the mirror image.

## Approach 1: Sort by end
```java
// Jobs sorted by end time; best[i] = top profit using the first i jobs, found with a binary search for the last compatible job
public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
    int n = startTime.length;
    Integer[] order = new Integer[n];
    for (int i = 0; i < n; i++) order[i] = i;
    Arrays.sort(order, (a, b) -> Integer.compare(endTime[a], endTime[b]));
    int[] best = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        int job = order[i - 1], lo = 0, hi = i - 1;
        while (lo < hi) {
            int mid = (lo + hi + 1) >>> 1;
            if (endTime[order[mid - 1]] <= startTime[job]) lo = mid;
            else hi = mid - 1;
        }
        best[i] = Math.max(best[i - 1], best[lo] + profit[job]);
    }
    return best[n];
}
```

## Approach 2: Sort by start, backwards
```java
// Jobs sorted by start time, solved from the last one backwards; next[i] is the first job starting at or after job i ends
public int jobSchedulingByStart(int[] startTime, int[] endTime, int[] profit) {
    int n = startTime.length;
    Integer[] order = new Integer[n];
    for (int i = 0; i < n; i++) order[i] = i;
    Arrays.sort(order, (a, b) -> Integer.compare(startTime[a], startTime[b]));
    int[] starts = new int[n];
    for (int i = 0; i < n; i++) starts[i] = startTime[order[i]];
    int[] dp = new int[n + 1];
    for (int i = n - 1; i >= 0; i--) {
        int job = order[i];
        int lo = i + 1, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (starts[mid] >= endTime[job]) hi = mid;
            else lo = mid + 1;
        }
        dp[i] = Math.max(dp[i + 1], profit[job] + dp[lo]);
    }
    return dp[0];
}
```

| Approach | Time | Space |
|---|---|---|
| Sort by end | O(n log n) | O(n) |
| Sort by start, backwards | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why end ≤ start is allowed?</summary>

The statement lets a job start at the moment another ends.

</details>


<details><summary>Why not greedy?</summary>

Profits differ, so earliest-finish greedy is wrong.

</details>


## Connected
- [Maximum Score of Non-overlapping Intervals](Maximum%20Score%20of%20Non-overlapping%20Intervals.md)
- [Non-overlapping Intervals](../../Greedy/Intervals%20and%20Scheduling/Non-overlapping%20Intervals.md)
