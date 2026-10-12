---
topic: Interval DP
pattern: [Moves instead of floors, Binary search on the DP]
source: LeetCode 887
difficulty: Hard
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Super Egg Drop

> [!TIP]
> **🧠 Memory hook**
> Flip the question: how many floors can I **settle with m moves and e eggs**?
> **Mantra: floors(m, e) = floors(m−1, e−1) + floors(m−1, e) + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=11) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
With k eggs and a building of n floors, find the minimum number of moves that guarantees finding the critical floor.

## Key insight
One drop from some floor: if the egg breaks, the floors below are covered with m − 1 moves and e − 1 eggs; if it survives, the floors above are covered with m − 1 moves and e eggs; plus the floor itself. Increase m until the covered floors reach n. The classic floors-based DP does the same with a binary search for the balanced drop floor.

## Approach 1: Moves DP
```java
// dp[e] = floors that can be settled with the current number of moves and e eggs: a drop splits into broke and survived
public int superEggDrop(int k, int n) {
    int[] dp = new int[k + 1];
    int moves = 0;
    while (dp[k] < n) {
        moves++;
        for (int e = k; e >= 1; e--) dp[e] = dp[e] + dp[e - 1] + 1;
    }
    return moves;
}
```

## Approach 2: Floors DP + binary search
```java
// Classic table over (eggs, floors); the worst case of "breaks" (rises) versus "survives" (falls) is balanced with a binary search on the drop floor
public int superEggDropBinary(int k, int n) {
    int[][] t = new int[k + 1][n + 1];
    for (int f = 1; f <= n; f++) t[1][f] = f;
    for (int e = 2; e <= k; e++)
        for (int f = 1; f <= n; f++) {
            int lo = 1, hi = f, best = f;
            while (lo <= hi) {
                int mid = (lo + hi) >>> 1;
                int breaks = t[e - 1][mid - 1], holds = t[e][f - mid];
                best = Math.min(best, 1 + Math.max(breaks, holds));
                if (breaks < holds) lo = mid + 1;
                else hi = mid - 1;
            }
            t[e][f] = best;
        }
    return t[k][n];
}
```

| Approach | Time | Space |
|---|---|---|
| Moves DP | O(k · moves) | O(k) |
| Floors DP + binary search | O(k · n log n) | O(k · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why binary search in approach 2?</summary>

The breaks value rises and the holds value falls with the drop floor; the best is at the crossing.

</details>


<details><summary>Why is approach 1 faster?</summary>

It never loops over floors.

</details>


## Connected
- [Burst Balloons](Burst%20Balloons.md)
