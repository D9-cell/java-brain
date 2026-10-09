---
topic: Jumps and Reach
pattern: [Sort then two-state DP, Binary search counts]
source: LeetCode 3661
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Walls Destroyed by Robots

> [!TIP]
> **🧠 Memory hook**
> Each robot shoots **left or right**; only neighbouring robots can hit the same walls.
> **Mantra: STATE = PREVIOUS ROBOT FIRED RIGHT?; COUNT WALLS IN RANGE BY BINARY SEARCH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=12) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
Robots stand at distinct positions; robot i fires one bullet left or right that travels distance[i] and destroys every wall it passes, but stops before hitting another robot. Walls at a robot position are destroyed by its bullet. Return the maximum number of distinct walls destroyed.

## Key insight
Sort robots and walls. Robot i covers [max(pos − d, prev robot + 1), pos] going left or [pos, min(pos + d, next robot − 1)] going right. Only the right shot of robot i − 1 can overlap the left shot of robot i, so the DP state is whether the previous robot fired right; if it did, the left range starts after its range.

## Approach: Two-state DP
```java
// Sort robots; DP over robots remembering whether the previous one fired right
public int maxWalls(int[] robots, int[] distance, int[] walls) {
    int n = robots.length;
    int[][] rd = new int[n][];
    for (int i = 0; i < n; i++) rd[i] = new int[]{robots[i], distance[i]};
    Arrays.sort(rd, (a, b) -> a[0] - b[0]);
    int[] w = walls.clone();
    Arrays.sort(w);
    long[] lo = new long[n], hi = new long[n];
    for (int i = 0; i < n; i++) {
        lo[i] = Math.max((long) rd[i][0] - rd[i][1], i > 0 ? rd[i - 1][0] + 1L : Long.MIN_VALUE);
        hi[i] = Math.min((long) rd[i][0] + rd[i][1], i + 1 < n ? rd[i + 1][0] - 1L : Long.MAX_VALUE);
    }
    int left = 0, right = 0;
    for (int i = 0; i < n; i++) {
        int fireLeftAfterLeft = count(w, lo[i], rd[i][0]) + left;
        int fireLeftAfterRight = count(w, Math.max(lo[i], i > 0 ? hi[i - 1] + 1 : lo[i]), rd[i][0]) + right;
        int fireRight = count(w, rd[i][0], hi[i]) + Math.max(left, right);
        left = Math.max(fireLeftAfterLeft, fireLeftAfterRight);
        right = fireRight;
    }
    return Math.max(left, right);
}

// Walls with position in [a, b] by binary search
private int count(int[] w, long a, long b) {
    if (a > b) return 0;
    return upper(w, b) - upper(w, a - 1);
}

// Number of walls at positions <= x
private int upper(int[] w, long x) {
    int l = 0, r = w.length;
    while (l < r) { int m = (l + r) >>> 1; if (w[m] <= x) l = m + 1; else r = m; }
    return l;
}
```

| Approach | Time | Space |
|---|---|---|
| Two-state DP | O((n + w) log w + n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why only neighbours overlap?</summary>

Bullets stop before other robots, so ranges of non-adjacent robots are separated.

</details>


<details><summary>How are walls counted?</summary>

Binary search on sorted wall positions.

</details>


## Connected
- [Paint House](../Counting%20Walks%20and%20Moves/Paint%20House.md)
- [House Robber](../Stairs%20and%20Robbers/House%20Robber.md)
