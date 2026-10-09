---
topic: Intervals and Scheduling
pattern: [Interval cover, Farthest reach]
source: LeetCode 1326
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Number of Taps to Open to Water a Garden

> [!TIP]
> **🧠 Memory hook**
> Cover `[0, n]` with intervals: always extend with the tap that **reaches farthest** from what is already covered.
> **Mantra: maxReach[left], THEN JUMP LIKE JUMP GAME II**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=2) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Tap i waters [i − ranges[i], i + ranges[i]]. Return the minimum taps to water the whole garden [0, n], or −1.

## Key insight
Record for every left end the farthest right end any tap reaches. Sweep from 0: keep the farthest reach of taps starting inside the current covered range; when you arrive at the covered end, open one more tap and extend.

## Approach 1: maxReach + jumps
```java
// maxReach[i] = farthest right end of any tap starting at or before i; then jump like Jump Game II
public int minTaps(int n, int[] ranges) {
    int[] maxReach = new int[n + 1];
    for (int i = 0; i <= n; i++) {
        int left = Math.max(0, i - ranges[i]), right = Math.min(n, i + ranges[i]);
        maxReach[left] = Math.max(maxReach[left], right);
    }
    int taps = 0, curEnd = 0, farthest = 0;
    for (int i = 0; i <= n && curEnd < n; i++) {
        farthest = Math.max(farthest, maxReach[i]);
        if (i == curEnd) {
            if (farthest <= curEnd) return -1;
            taps++;
            curEnd = farthest;
        }
    }
    return curEnd >= n ? taps : -1;
}
```

## Approach 2: Sort intervals by start
```java
// Sort tap intervals by left end and always extend with the interval that reaches farthest
public int minTapsSorted(int n, int[] ranges) {
    List<int[]> iv = new ArrayList<>();
    for (int i = 0; i <= n; i++) if (ranges[i] > 0) iv.add(new int[]{Math.max(0, i - ranges[i]), Math.min(n, i + ranges[i])});
    iv.sort((a, b) -> a[0] - b[0]);
    int taps = 0, target = 0, i = 0;
    while (target < n) {
        int best = -1;
        while (i < iv.size() && iv.get(i)[0] <= target) best = Math.max(best, iv.get(i++)[1]);
        if (best <= target) return -1;
        taps++;
        target = best;
    }
    return taps;
}
```

| Approach | Time | Space |
|---|---|---|
| maxReach + jumps | O(n) | O(n) |
| Sort intervals by start | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>When is the answer −1?</summary>

When no tap starting inside the covered part reaches beyond its end.

</details>


## Connected
- [Water the Plants](Water%20the%20Plants.md)
- [Non-overlapping Intervals](Non-overlapping%20Intervals.md)
