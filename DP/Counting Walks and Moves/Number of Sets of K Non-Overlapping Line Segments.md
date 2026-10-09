---
topic: Counting Walks and Moves
pattern: [State with an open flag, Stars and bars]
source: LeetCode 1621
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Number of Sets of K Non-Overlapping Line Segments

> [!TIP]
> **🧠 Memory hook**
> Walk the points with a **pen**: it is either down (inside a segment) or up.
> **Mantra: MEMO (point, left, open) · ANSWER = C(n + k − 1, 2k)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=19) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Points 0..n−1 lie on a line. Count the ways to draw exactly k non-overlapping segments (each covering at least 2 points, endpoints integers). Segments may share endpoints. Answer modulo 1e9+7.

## Key insight
DP: at each point with the pen up you either skip the point or start a segment here; with the pen down you either extend to the next point or close the segment there (and may immediately start another, which the pen-up state handles). Counting trick: add k − 1 virtual points so shared endpoints become distinct; then any 2k chosen points pair up into segments.

## Approach 1: Memo over (point, left, open)
```java
// Top-down over (point, segments left, a segment is open)
public int numberOfSets(int n, int k) {
    long[][][] memo = new long[n][k + 1][2];
    for (long[][] a : memo) for (long[] b : a) Arrays.fill(b, -1);
    return (int) go(0, k, 0, n, memo);
}

// Ways from point i with left segments still to finish
private long go(int i, int left, int open, int n, long[][][] memo) {
    if (left == 0) return 1;
    if (i == n - 1) return 0;
    if (memo[i][left][open] >= 0) return memo[i][left][open];
    long res;
    if (open == 1) res = go(i + 1, left, 1, n, memo) + go(i + 1, left - 1, 0, n, memo);
    else res = go(i + 1, left, 0, n, memo) + go(i, left, 1, n, memo);
    return memo[i][left][open] = res % MOD;
}
```

## Approach 2: Combinatorics
```java
// Stars and bars: the answer is C(n + k - 1, 2k)
public int numberOfSetsMath(int n, int k) {
    int top = n + k - 1, r = 2 * k;
    long num = 1, den = 1;
    for (int i = 0; i < r; i++) { num = num * (top - i) % MOD; den = den * (i + 1) % MOD; }
    return (int) (num * pow(den, MOD - 2) % MOD);
}

// Modular power by squaring
private long pow(long b, long e) {
    long r = 1;
    for (b %= MOD; e > 0; e >>= 1, b = b * b % MOD) if ((e & 1) == 1) r = r * b % MOD;
    return r;
}
```

| Approach | Time | Space |
|---|---|---|
| Memo over (point, left, open) | O(n · k) | O(n · k) |
| Combinatorics | O(k + log MOD) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why add k − 1 points?</summary>

Each shared endpoint is split into two distinct points, so endpoints become strictly increasing.

</details>


<details><summary>Double counting trap?</summary>

Closing a segment and reopening at the same point must be counted once.

</details>


## Connected
- [Find Number of Ways to Reach the K-th Stair](Find%20Number%20of%20Ways%20to%20Reach%20the%20K-th%20Stair.md)
- [K Inverse Pairs Array](K%20Inverse%20Pairs%20Array.md)
