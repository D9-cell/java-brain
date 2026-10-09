---
topic: Sliding Window
pattern: [Fixed window, Gaps]
source: LeetCode 3439
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Reschedule Meetings for Maximum Free Time I

> [!TIP]
> **🧠 Memory hook**
> Pushing k meetings aside glues k + 1 gaps together.
> **Mantra: MAX SUM OF k + 1 CONSECUTIVE GAPS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=47) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Move at most k meetings (keeping order and durations) to maximise the longest free interval.

## Key insight
There are m + 1 gaps. Sliding k consecutive meetings to one side merges the k + 1 gaps around them.

## Approach: Window over gaps
```java
// Moving k meetings merges k + 1 neighbouring gaps: max sum of a window of k + 1 gaps
public int maxFreeTime(int eventTime, int k, int[] startTime, int[] endTime) {
    int m = startTime.length;
    int[] gaps = new int[m + 1];
    gaps[0] = startTime[0];
    for (int t = 1; t < m; t++) gaps[t] = startTime[t] - endTime[t - 1];
    gaps[m] = eventTime - endTime[m - 1];
    int best = 0, sum = 0;
    for (int i = 0, j = 0; j <= m; j++) {
        sum += gaps[j];
        if (j - i + 1 > k + 1) sum -= gaps[i++];
        best = Math.max(best, sum);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Window over gaps | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against exhaustively rescheduling small random schedules.

## Recall before you reveal
<details><summary>How many gaps?</summary>

m + 1: before, between, after.

</details>

