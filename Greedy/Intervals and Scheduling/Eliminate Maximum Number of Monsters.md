---
topic: Intervals and Scheduling
pattern: [Arrival times, Shoot the earliest first]
source: LeetCode 1921
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Eliminate Maximum Number of Monsters

> [!TIP]
> **🧠 Memory hook**
> Convert every monster to an **arrival minute** and shoot them in that order, one per minute.
> **Mantra: SORT ARRIVALS, FAIL WHEN arrival ≤ index**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=5) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Monster i is `dist[i]` away and moves `speed[i]` per minute. You fire once per minute (the first shot at minute 0). If one reaches the city first you lose. Return the maximum monsters eliminated.

## Key insight
Monster i reaches the city after `ceil(dist/speed)` minutes. Sort the arrival minutes; the k-th monster is shot at minute k, which must be strictly before it arrives.

## Approach 1: Sort arrival minutes
```java
// The weapon fires once per minute, so the monster that arrives first must be shot first. Monster i (by arrival time t) is shot in minute i and must still be away
public int eliminateMaximum(int[] dist, int[] speed) {
    int n = dist.length;
    int[] arrive = new int[n];
    for (int i = 0; i < n; i++) arrive[i] = (dist[i] + speed[i] - 1) / speed[i];
    Arrays.sort(arrive);
    for (int i = 0; i < n; i++) if (arrive[i] <= i) return i;
    return n;
}
```

## Approach 2: Bucket by arrival minute
```java
// Counting version: bucket the arrival minutes and walk the minutes
public int eliminateMaximumBuckets(int[] dist, int[] speed) {
    int n = dist.length;
    int[] cnt = new int[n];
    for (int i = 0; i < n; i++) {
        int t = (dist[i] + speed[i] - 1) / speed[i];
        if (t < n) cnt[t]++;
    }
    int shot = 0, arrived = 0;
    for (int minute = 0; minute < n; minute++) {
        arrived += cnt[minute];
        if (arrived > minute) return minute;
    }
    return n;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort arrival minutes | O(n log n) | O(n) |
| Bucket by arrival minute | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why `arrive[i] <= i` loses?</summary>

At minute i the (i+1)-th monster has already arrived.

</details>


## Connected
- [Earliest Possible Day of Full Bloom](Earliest%20Possible%20Day%20of%20Full%20Bloom.md)
