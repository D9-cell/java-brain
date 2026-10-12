---
topic: Search on the Answer Distances and K-th Values
pattern: [Maximise the minimum, Difference array]
source: LeetCode 2528
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximize the Minimum Powered City

> [!TIP]
> **🧠 Memory hook**
> Guess the target. Sweep cities left to right; when a city is short, add stations **as far right as still covers it** (i + r), tracking their effect with a **difference array**.
> **Mantra: power via diff · reach(t): short city → add need at i + r, effect ends at i + 2r + 1 · total ≤ k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=6) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
A station powers cities within distance r. Add k more stations anywhere. Return the maximum possible minimum power over all cities.

## Key insight
Cities to the left are already satisfied, so new stations should reach as far right as possible: placed at i + r they cover [i, i + 2r]. The difference array keeps each check O(n).

## Approach: Binary search + greedy sweep
```java
// Largest minimum power: sweep left to right and place missing stations as far right as still helps
public long maxPower(int[] stations, int r, int k) {
    int n = stations.length;
    long[] power = new long[n];
    long[] diff = new long[n + 1];
    for (int i = 0; i < n; i++) {
        diff[Math.max(0, i - r)] += stations[i];
        diff[Math.min(n, i + r + 1)] -= stations[i];
    }
    long run = 0;
    for (int i = 0; i < n; i++) power[i] = run += diff[i];
    long lo = 0, hi = 0;
    for (long p : power) hi = Math.max(hi, p);
    hi += k;
    while (lo < hi) {
        long mid = lo + (hi - lo + 1) / 2;
        if (reach(power, r, k, mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

// Can every city reach target power using at most k new stations?
boolean reach(long[] power, int r, long k, long target) {
    int n = power.length;
    long[] extra = new long[n + 1];
    long added = 0;
    for (int i = 0; i < n; i++) {
        added += extra[i];
        long have = power[i] + added;
        if (have < target) {
            long need = target - have;
            if (need > k) return false;
            k -= need;
            added += need;
            extra[Math.min(n, i + 2 * r + 1)] -= need;
        }
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + greedy sweep | O(n log(sum + k)) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why place at i + r?</summary>

It covers city i and as many later cities as possible.

</details>


<details><summary>Why a difference array?</summary>

Range additions in O(1) each.

</details>


## Connected
- [Car Pooling](../../Line%20Sweep/Car%20Pooling.md)
- [Magnetic Force Between Two Balls](Magnetic%20Force%20Between%20Two%20Balls.md)
