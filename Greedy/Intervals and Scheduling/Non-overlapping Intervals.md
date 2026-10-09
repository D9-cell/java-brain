---
topic: Intervals and Scheduling
pattern: [Sort by end, Activity selection]
source: LeetCode 435
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Non-overlapping Intervals

> [!TIP]
> **🧠 Memory hook**
> Keep the interval that **finishes earliest**: it leaves the most room for the rest.
> **Mantra: SORT BY END, KEEP IF start ≥ lastEnd**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=0) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of intervals to remove so the rest do not overlap (touching ends are fine).

## Key insight
Maximising the kept intervals is activity selection. Sort by end, keep an interval when it starts at or after the last kept end, otherwise count it as removed.

## Approach 1: Sort by end
```java
// Sort by end; keep an interval when it starts at or after the last kept end, otherwise remove it
public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
    int removed = 0, end = Integer.MIN_VALUE;
    for (int[] in : intervals) {
        if (in[0] >= end) end = in[1]; else removed++;
    }
    return removed;
}
```

## Approach 2: Sort by start, drop the later end
```java
// Sort by start; when two overlap, drop the one that ends later
public int eraseOverlapIntervalsByStart(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    int removed = 0, end = intervals[0][1];
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) { removed++; end = Math.min(end, intervals[i][1]); }
        else end = intervals[i][1];
    }
    return removed;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort by end | O(n log n) | O(1) |
| Sort by start, drop the later end | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why end and not start?</summary>

An interval that starts early but ends late blocks more future intervals.

</details>


<details><summary>Why `>=` and not `>`?</summary>

Intervals [1,2] and [2,3] only touch.

</details>


## Connected
- [Minimum Number of Arrows to Burst Balloons](Minimum%20Number%20of%20Arrows%20to%20Burst%20Balloons.md)
- [Maximum Number of Non-Overlapping Substrings](Maximum%20Number%20of%20Non-Overlapping%20Substrings.md)
