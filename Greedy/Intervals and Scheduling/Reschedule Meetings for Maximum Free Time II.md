---
topic: Intervals and Scheduling
pattern: [Gaps, Prefix and suffix maxima]
source: LeetCode 3440
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Reschedule Meetings for Maximum Free Time II

> [!TIP]
> **🧠 Memory hook**
> Move **one meeting** to where it hurts nobody, and the gaps on both sides of its old place merge.
> **Mantra: GAP LEFT + GAP RIGHT (+ DURATION IF IT FITS ELSEWHERE)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=12) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Meetings occupy [start, end] inside [0, eventTime]. You may move one meeting anywhere (even reordering) without overlapping others. Return the longest free time.

## Key insight
Compute the gaps. For meeting i the neighbouring gaps merge: `gap[i-1] + gap[i]`. If another gap (left or right, not touching i) can hold the meeting, it leaves completely and the free time grows by its duration. Prefix and suffix maxima of the gaps answer that check in O(1).

## Approach: Gaps + prefix/suffix max
```java
// Gaps between meetings; moving meeting i merges the two gaps next to it, and if another gap can hold it the meeting leaves its place entirely
public int maxFreeTime(int eventTime, int[] startTime, int[] endTime) {
    int n = startTime.length;
    int[] gap = new int[n + 1];
    gap[0] = startTime[0];
    for (int i = 1; i < n; i++) gap[i] = startTime[i] - endTime[i - 1];
    gap[n] = eventTime - endTime[n - 1];
    int[] maxLeft = new int[n + 1], maxRight = new int[n + 1];
    for (int i = 1; i <= n; i++) maxLeft[i] = Math.max(maxLeft[i - 1], gap[i - 1]);
    for (int i = n - 1; i >= 0; i--) maxRight[i] = Math.max(maxRight[i + 1], gap[i + 1]);
    int best = 0;
    for (int i = 1; i <= n; i++) {
        int dur = endTime[i - 1] - startTime[i - 1];
        if (dur <= Math.max(maxLeft[i - 1], maxRight[i])) best = Math.max(best, gap[i - 1] + dur + gap[i]);
        best = Math.max(best, gap[i - 1] + gap[i]);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Gaps + prefix/suffix max | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why not just compare duration with the largest gap?</summary>

The largest gap might be one of the two merged gaps next to the meeting; those do not count as a free spot elsewhere.

</details>


## Connected
- [Maximum Building Height](Maximum%20Building%20Height.md)
