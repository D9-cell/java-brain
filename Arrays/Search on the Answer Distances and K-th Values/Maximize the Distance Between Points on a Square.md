---
topic: Search on the Answer Distances and K-th Values
pattern: [Unroll the boundary, Greedy jumps]
source: LeetCode 3464
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximize the Distance Between Points on a Square

> [!TIP]
> **🧠 Memory hook**
> **Unroll the square's boundary** into a line of length 4·side. For a guess d ≤ side, try each start, **jump to the first point ≥ last + d**, and check the wrap-around gap.
> **Mantra: unroll · sort · canPick(d): per start, k − 1 lower-bound jumps · first + 4·side − last ≥ d**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=8) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
Points lie on the boundary of a square of side length side. Choose k of them to maximise the minimum Manhattan distance between any two chosen points.

## Key insight
The answer never exceeds side (k ≥ 4 points on a perimeter of 4·side), and for distances up to side the Manhattan distance between boundary points matches their distance along the boundary for the pairs that matter. Binary search jumps keep each check fast.

## Approach: Binary search + greedy jumps
```java
// Unroll the boundary into a line; for a gap d try each start and jump greedily with binary search
public int maxDistance(int side, int[][] points, int k) {
    int n = points.length;
    long[] pos = new long[n];
    for (int i = 0; i < n; i++) pos[i] = unroll(side, points[i][0], points[i][1]);
    Arrays.sort(pos);
    long perimeter = 4L * side;
    int lo = 1, hi = side;
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2;
        if (canPick(pos, k, mid, perimeter)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

// Position along the boundary, walking counter-clockwise from (0, 0)
long unroll(int side, int x, int y) {
    if (y == 0) return x;
    if (x == side) return (long) side + y;
    if (y == side) return 3L * side - x;
    return 4L * side - y;
}

// Some start allows k picks each at least d apart, with the wrap-around gap also at least d
boolean canPick(long[] pos, int k, long d, long perimeter) {
    int n = pos.length;
    for (int s = 0; s < n; s++) {
        long first = pos[s], last = first;
        int idx = s, picked = 1;
        while (picked < k) {
            int nxt = lowerBound(pos, last + d);
            if (nxt >= n) break;
            last = pos[nxt];
            idx = nxt;
            picked++;
        }
        if (picked == k && first + perimeter - last >= d) return true;
        if (picked < k && idx == n - 1) break;
    }
    return false;
}

// First index with pos >= x
int lowerBound(long[] pos, long x) {
    int lo = 0, hi = pos.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (pos[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + greedy jumps | O(n · k · log n · log side) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against an exhaustive search over all k-subsets on small squares.

## Recall before you reveal
<details><summary>Why unroll the boundary?</summary>

Points become sorted numbers on a circle.

</details>


<details><summary>Why check the wrap-around?</summary>

The last and first chosen points are neighbours on the circle.

</details>


## Connected
- [Magnetic Force Between Two Balls](Magnetic%20Force%20Between%20Two%20Balls.md)
