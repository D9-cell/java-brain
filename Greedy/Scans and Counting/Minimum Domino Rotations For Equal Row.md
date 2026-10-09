---
topic: Scans and Counting
pattern: [Candidate values, Count swaps]
source: LeetCode 1007
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Domino Rotations For Equal Row

> [!TIP]
> **🧠 Memory hook**
> The common value has to appear on the **first domino**, so there are only two candidates.
> **Mantra: CANDIDATES: tops[0], bottoms[0]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=5) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Rotate dominoes so that all tops or all bottoms show the same value. Return the minimum rotations, or −1.

## Key insight
Try the two values of the first domino. For a candidate, every domino must contain it; the cost is the smaller of "dominoes whose top is wrong" and "dominoes whose bottom is wrong".

## Approach 1: Two candidates
```java
// The shared value must be tops[0] or bottoms[0]; for each candidate count the rotations needed for either row
public int minDominoRotations(int[] tops, int[] bottoms) {
    int r = rotations(tops, bottoms, tops[0]);
    if (r != -1 || tops[0] == bottoms[0]) return r;
    return rotations(tops, bottoms, bottoms[0]);
}

// Rotations to make one row all equal to v, or -1
private int rotations(int[] a, int[] b, int v) {
    int swapA = 0, swapB = 0;
    for (int i = 0; i < a.length; i++) {
        if (a[i] != v && b[i] != v) return -1;
        if (a[i] != v) swapA++;
        if (b[i] != v) swapB++;
    }
    return Math.min(swapA, swapB);
}
```

## Approach 2: All six values
```java
// Frequency version: a value is feasible when it appears in every domino
public int minDominoRotationsCount(int[] tops, int[] bottoms) {
    int n = tops.length, best = -1;
    for (int v = 1; v <= 6; v++) {
        int inTop = 0, inBottom = 0, both = 0;
        for (int i = 0; i < n; i++) { if (tops[i] == v) inTop++; if (bottoms[i] == v) inBottom++; if (tops[i] == v && bottoms[i] == v) both++; }
        if (inTop + inBottom - both != n) continue;
        int cost = Math.min(n - inTop, n - inBottom);
        if (best == -1 || cost < best) best = cost;
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Two candidates | O(n) | O(1) |
| All six values | O(6n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why only two candidates?</summary>

Whatever value fills the row must appear on domino 0.

</details>


## Connected
- [Wiggle Subsequence](Wiggle%20Subsequence.md)
