---
topic: Scheduling and Partitions
pattern: [Match sorted lists, Expanded slots]
source: LeetCode 2463
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Total Distance Traveled

> [!TIP]
> **🧠 Memory hook**
> Sort robots and factories; **repeat each factory by its limit** and each robot takes the next slot in order.
> **Mantra: dp[i][j] = min(dp[i][j − 1], dp[i − 1][j − 1] + |robot_i − slot_j|)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Scheduling%20and%20Partitions/Scheduling%20and%20Partitions%20Animations.html#p=7) · **Pattern hub:** [Scheduling and Partitions - Pattern Map](Scheduling%20and%20Partitions%20-%20Pattern%20Map.md)

## Problem
Robots and factories lie on a line; each factory repairs at most `limit` robots. Return the minimum total distance for all robots to reach a factory.

## Key insight
With robots and slots sorted, an optimal matching never crosses. dp[i][j] is the cost for the first i robots using the first j slots: skip slot j or give it to robot i.

## Approach: Slot expansion
```java
// Sorted robots and factory slots (each factory repeated by its limit); dp[i][j] = least distance for the first i robots using the first j slots
public long minimumTotalDistance(List<Integer> robot, int[][] factory) {
    List<Integer> robots = new ArrayList<>(robot);
    Collections.sort(robots);
    Arrays.sort(factory, (a, b) -> Integer.compare(a[0], b[0]));
    List<Integer> slots = new ArrayList<>();
    for (int[] f : factory) for (int c = 0; c < f[1]; c++) slots.add(f[0]);
    int m = robots.size(), n = slots.size();
    long INF = Long.MAX_VALUE / 4;
    long[][] dp = new long[m + 1][n + 1];
    for (int i = 1; i <= m; i++) dp[i][0] = INF;
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            long take = dp[i - 1][j - 1] + Math.abs(robots.get(i - 1) - slots.get(j - 1));
            dp[i][j] = Math.min(dp[i][j - 1], take);
        }
    return dp[m][n];
}
```

| Approach | Time | Space |
|---|---|---|
| Slot expansion | O(R · S) | O(R · S) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why no crossing?</summary>

Swapping two crossed assignments never increases the total distance.

</details>


<details><summary>Why long?</summary>

Distances can reach 10⁹ per robot.

</details>


## Connected
- [Minimum Number of Taps to Open to Water a Garden](../../Greedy/Intervals%20and%20Scheduling/Minimum%20Number%20of%20Taps%20to%20Open%20to%20Water%20a%20Garden.md)
