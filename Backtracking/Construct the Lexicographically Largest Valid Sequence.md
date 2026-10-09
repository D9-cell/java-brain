---
topic: Backtracking
pattern: [Greedy-order backtracking]
source: LeetCode 1718
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Construct the Lexicographically Largest Valid Sequence

> [!TIP]
> **🧠 Memory hook**
> Seat the biggest guest first; x > 1 needs two seats exactly x apart.
> **Mantra: FILL LEFT→RIGHT, LARGEST FIRST, FIRST HIT WINS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=6) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Sequence of length 2n−1: 1 once, every x in 2..n twice at distance x; return the lexicographically largest.

## Key insight
Fill positions left to right trying the largest unused number; the first complete fill is the answer.

## Approach: Backtracking
```java
// Fill positions left to right trying the LARGEST unused number first; x > 1 also occupies i + x
private boolean solve(int i, int n, int[] res, boolean[] used) {
    if (i == res.length) return true;
    if (res[i] != 0) return solve(i + 1, n, res, used);
    for (int x = n; x >= 1; x--) {
        if (used[x]) continue;
        if (x > 1 && (i + x >= res.length || res[i + x] != 0)) continue;
        used[x] = true;
        res[i] = x;
        if (x > 1) res[i + x] = x;
        if (solve(i + 1, n, res, used)) return true;
        used[x] = false;
        res[i] = 0;
        if (x > 1) res[i + x] = 0;
    }
    return false;
}

// The first complete fill found is the lexicographically largest
public int[] constructDistancedSequence(int n) {
    int[] res = new int[2 * n - 1];
    solve(0, n, res, new boolean[n + 1]);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking | O(n!) worst, fast in practice | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked both samples and structural validity for n ≤ 12.

## Recall before you reveal
<details><summary>Why stop at the first?</summary>

Choices are tried largest-first at every position.

</details>

