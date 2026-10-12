---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer, Capped sum]
source: LeetCode 2141
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Running Time of N Computers

> [!TIP]
> **🧠 Memory hook**
> n computers run for T minutes iff **Σ min(b, T) ≥ n · T**: a battery cannot power two computers at once, so it contributes at most T.
> **Mantra: hi = Σ b / n · usable(mid) ≥ n·mid → lo = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=11) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Batteries can be swapped between computers at any time. Return the maximum minutes all n computers can run simultaneously.

## Key insight
A battery bigger than T can only serve one computer for T minutes. If the capped total covers n · T, swapping makes it work.

## Approach: Binary search on time
```java
// n computers run for T minutes iff the batteries can give sum of min(b, T) >= n * T
public long maxRunTime(int n, int[] batteries) {
    long total = 0;
    for (int b : batteries) total += b;
    long lo = 0, hi = total / n;
    while (lo < hi) {
        long mid = lo + (hi - lo + 1) / 2, usable = 0;
        for (int b : batteries) usable += Math.min(b, mid);
        if (usable >= (long) n * mid) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on time | O(m log(Σb / n)) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why cap at T?</summary>

One battery cannot run two computers at once.

</details>


<details><summary>Greedy alternative?</summary>

Sort and drop batteries larger than the average.

</details>


## Connected
- [Maximum Candies Allocated to K Children](Maximum%20Candies%20Allocated%20to%20K%20Children.md)
