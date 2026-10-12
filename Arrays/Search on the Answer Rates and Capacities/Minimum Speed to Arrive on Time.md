---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer, Rounding]
source: LeetCode 1870
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Speed to Arrive on Time

> [!TIP]
> **🧠 Memory hook**
> Every ride except the last waits for the **next whole hour** (ceil); the last one is exact. Search speeds 1..10⁷.
> **Mantra: n − 1 ≥ hour → −1 · time(mid) ≤ hour → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=4) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Trains run dist[i] km in order; each train departs only at an integer hour. Return the minimum integer speed to arrive within hour, or -1.

## Key insight
Even infinite speed needs n − 1 whole hours for the first rides, so hour ≤ n − 1 is impossible. Integer ceil avoids floating error on the early rides.

## Approach: Binary search on speed
```java
// Every ride but the last waits for the next whole hour; search speeds 1..10^7
public int minSpeedOnTime(int[] dist, double hour) {
    if (hour <= dist.length - 1) return -1;
    int lo = 1, hi = 10_000_000;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (time(dist, mid) <= hour) hi = mid;
        else lo = mid + 1;
    }
    return time(dist, lo) <= hour ? lo : -1;
}

// Total travel time at a given speed
double time(int[] dist, int speed) {
    double t = 0;
    for (int i = 0; i < dist.length - 1; i++) t += (dist[i] + speed - 1) / speed;
    return t + (double) dist[dist.length - 1] / speed;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on speed | O(n log 10⁷) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the last ride not rounded?</summary>

You arrive immediately, no waiting for a departure.

</details>


<details><summary>Why 10⁷?</summary>

The statement guarantees the answer is at most 10⁷.

</details>


## Connected
- [Koko Eating Bananas](Koko%20Eating%20Bananas.md)
