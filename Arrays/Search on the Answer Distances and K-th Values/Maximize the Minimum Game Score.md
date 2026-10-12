---
topic: Search on the Answer Distances and K-th Values
pattern: [Maximise the minimum, Bounce greedy]
source: LeetCode 3449
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximize the Minimum Game Score

> [!TIP]
> **🧠 Memory hook**
> Guess x. Walk left to right; index i needs **⌈x / points[i]⌉** visits. Bouncing i ↔ i + 1 gives i its visits and **spills extra visits onto i + 1**.
> **Mantra: need = ⌈x/p[i]⌉ − spill · need > 0: moves += 2·need − 1, spill = need − 1 · ELSE step on (except at the end)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=7) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
Start at index −1. Each move goes one step left or right (staying in range after the first move) and adds points[i] to gameScore[i] at the landing index. With at most m moves, maximise the minimum gameScore.

## Key insight
Reaching i costs 1 move, each extra visit costs 2 (go to i + 1 and back), and those trips also visit i + 1. If the spill already covers i, just step on, unless i is the last index.

## Approach: Binary search + greedy walk
```java
// Largest x such that a left-to-right walk, bouncing between i and i + 1 as needed, gives every index >= x
public long maxScore(int[] points, int m) {
    long lo = 0, hi = (long) m * 1_000_000;
    while (lo < hi) {
        long mid = lo + (hi - lo + 1) / 2;
        if (enough(points, m, mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

// Moves needed when visits to i are made by bouncing i <-> i + 1; extra visits spill onto i + 1
boolean enough(int[] p, int m, long x) {
    int n = p.length;
    long moves = 0, spill = 0;
    for (int i = 0; i < n; i++) {
        long need = (x + p[i] - 1) / p[i] - spill;
        if (need > 0) {
            moves += 2 * need - 1;
            spill = need - 1;
        } else if (i < n - 1) {
            moves += 1;
            spill = 0;
        }
        if (moves > m) return false;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + greedy walk | O(n log(m · max)) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against an exhaustive search over all walks on small inputs.

## Recall before you reveal
<details><summary>Why 2·need − 1?</summary>

One move to arrive plus two per additional visit.

</details>


<details><summary>Why skip the last step?</summary>

Nothing lies beyond the last index that needs reaching.

</details>


## Connected
- [Magnetic Force Between Two Balls](Magnetic%20Force%20Between%20Two%20Balls.md)
