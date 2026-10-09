---
topic: Intervals and Scheduling
pattern: [Propagate limits, Peak between two limits]
source: LeetCode 1840
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Building Height

> [!TIP]
> **🧠 Memory hook**
> A limit at position p also limits its neighbours: **push limits left and right**, then find the highest peak in each gap.
> **Mantra: FORWARD PASS, BACKWARD PASS, PEAK = (hL + hR + dist) / 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=8) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Building 1 has height 0, adjacent heights differ by at most 1, and some buildings have maximum heights. Return the tallest possible building.

## Key insight
Add the restriction (1, 0). Sort by position, make a forward pass `h[i] = min(h[i], h[i-1] + gap)` and a backward pass. Between two limits the best peak is `(hL + hR + gap) / 2`; after the last limit it keeps growing.

## Approach: Two passes + peaks
```java
// Propagate the restrictions both ways (a limit at position p limits p + d by d), then each gap between limits peaks in the middle
public int maxBuilding(int n, int[][] restrictions) {
    List<int[]> r = new ArrayList<>();
    r.add(new int[]{1, 0});
    for (int[] x : restrictions) r.add(new int[]{x[0], x[1]});
    r.sort((a, b) -> a[0] - b[0]);
    int m = r.size();
    for (int i = 1; i < m; i++) r.get(i)[1] = Math.min(r.get(i)[1], r.get(i - 1)[1] + r.get(i)[0] - r.get(i - 1)[0]);
    for (int i = m - 2; i >= 0; i--) r.get(i)[1] = Math.min(r.get(i)[1], r.get(i + 1)[1] + r.get(i + 1)[0] - r.get(i)[0]);
    int best = 0;
    for (int i = 1; i < m; i++) {
        int l = r.get(i - 1)[0], hl = r.get(i - 1)[1], rr = r.get(i)[0], hr = r.get(i)[1];
        best = Math.max(best, (hl + hr + (rr - l)) / 2);
    }
    return Math.max(best, r.get(m - 1)[1] + n - r.get(m - 1)[0]);
}
```

| Approach | Time | Space |
|---|---|---|
| Two passes + peaks | O(r log r) | O(r) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why two passes?</summary>

A tight limit on the right also limits positions on its left.

</details>


## Connected
- [Cinema Seat Allocation](Cinema%20Seat%20Allocation.md)
