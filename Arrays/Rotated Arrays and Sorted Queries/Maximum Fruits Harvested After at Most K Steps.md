---
topic: Rotated Arrays and Sorted Queries
pattern: [Prefix sums, Try the turn]
source: LeetCode 2106
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Fruits Harvested After at Most K Steps

> [!TIP]
> **🧠 Memory hook**
> An optimal walk turns **at most once**. Try going d steps one way first, then the remaining **k − 2d** the other way; sum fruit in that range with prefix sums.
> **Mantra: FOR d: left d then right k − 2d · right d then left k − 2d · range sum by bounds**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=13) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
Fruits lie at sorted positions with amounts. Starting at startPos, walk at most k steps left or right and collect fruit at visited positions. Return the maximum fruit.

## Key insight
Covering [L, R] around start costs min(2·(start − L) + (R − start), 2·(R − start) + (start − L)). Enumerating the shorter leg d covers every useful range. Prefix sums with binary search give each range total.

## Approach: Enumerate the turn
```java
// Choose how far to go left (or right) first, then binary search the farthest reach the other way
public int maxTotalFruits(int[][] fruits, int startPos, int k) {
    int n = fruits.length;
    int[] pos = new int[n];
    long[] pre = new long[n + 1];
    for (int i = 0; i < n; i++) {
        pos[i] = fruits[i][0];
        pre[i + 1] = pre[i] + fruits[i][1];
    }
    long best = 0;
    for (int d = 0; d <= k; d++) {
        int leftTurn = startPos - d, rightAfter = startPos + Math.max(0, k - 2 * d);
        best = Math.max(best, sum(pos, pre, leftTurn, rightAfter));
        int rightTurn = startPos + d, leftAfter = startPos - Math.max(0, k - 2 * d);
        best = Math.max(best, sum(pos, pre, leftAfter, rightTurn));
    }
    return (int) best;
}

// Total fruit at positions in [from, to]
long sum(int[] pos, long[] pre, int from, int to) {
    return pre[upper(pos, to)] - pre[upper(pos, from - 1)];
}

// Number of positions <= x
int upper(int[] pos, int x) {
    int lo = 0, hi = pos.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (pos[mid] <= x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Enumerate the turn | O(k log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why at most one turn?</summary>

Turning twice re-walks ground for nothing.

</details>


<details><summary>Faster?</summary>

A sliding window over fruit positions gives O(n).

</details>


## Connected
- [Apply Operations to Maximize Frequency Score](Apply%20Operations%20to%20Maximize%20Frequency%20Score.md)
