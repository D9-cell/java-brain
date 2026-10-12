---
topic: Search on the Answer Distances and K-th Values
pattern: [Maximise the minimum, Greedy placement]
source: LeetCode 1552
difficulty: Medium
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Magnetic Force Between Two Balls

> [!TIP]
> **🧠 Memory hook**
> Guess a gap d. **Greedy from the left**: drop a ball at the first basket, then at every basket ≥ d past the last ball. Largest d that places m balls.
> **Mantra: sort · fits(d): count balls placed greedily ≥ m → lo = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=0) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
Place m balls in baskets at the given positions so the minimum distance between any two balls is as large as possible. Return that distance.

## Key insight
If gap d is achievable, every smaller gap is too. Putting each ball as far left as allowed leaves the most room for the rest, so the greedy count is optimal.

## Approach: Binary search on gap
```java
// Largest gap d such that greedy placement from the left fits m balls
public int maxDistance(int[] position, int m) {
    Arrays.sort(position);
    int lo = 1, hi = position[position.length - 1] - position[0];
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2;
        if (fits(position, m, mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

// Place a ball at the first position, then at every position at least d past the last ball
boolean fits(int[] pos, int m, int d) {
    int count = 1, last = pos[0];
    for (int p : pos)
        if (p - last >= d) {
            count++;
            last = p;
        }
    return count >= m;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on gap | O(n log n + n log range) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the greedy placement optimal?</summary>

Placing a ball earlier never hurts later placements.

</details>


<details><summary>Same idea elsewhere?</summary>

Aggressive Cows (SPOJ).

</details>


## Connected
- [Maximize the Distance Between Points on a Square](Maximize%20the%20Distance%20Between%20Points%20on%20a%20Square.md)
- [Capacity To Ship Packages Within D Days](../Search%20on%20the%20Answer%20Rates%20and%20Capacities/Capacity%20To%20Ship%20Packages%20Within%20D%20Days.md)
