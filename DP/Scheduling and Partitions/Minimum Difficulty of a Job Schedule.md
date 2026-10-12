---
topic: Scheduling and Partitions
pattern: [Blocks counted, Prefix DP]
source: LeetCode 1335
difficulty: Hard
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Difficulty of a Job Schedule

> [!TIP]
> **🧠 Memory hook**
> Add a **day dimension**: dp[day][i] splits the first i jobs into exactly `day` blocks.
> **Mantra: dp[day][i] = min over j of dp[day − 1][j − 1] + max(jobs j..i)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Scheduling%20and%20Partitions/Scheduling%20and%20Partitions%20Animations.html#p=2) · **Pattern hub:** [Scheduling and Partitions - Pattern Map](Scheduling%20and%20Partitions%20-%20Pattern%20Map.md)

## Problem
Jobs must be done in order over exactly d days, at least one per day. A day's difficulty is its hardest job. Return the minimum total difficulty, or −1.

## Key insight
If there are fewer jobs than days it is impossible. Otherwise the last day does jobs j..i, costing the maximum of that range, after the previous days handled the first j − 1 jobs.

## Approach: Day layers
```java
// dp[day][i] = least total difficulty doing the first i jobs in `day` days; a day costs its hardest job
public int minDifficulty(int[] jobDifficulty, int d) {
    int n = jobDifficulty.length, INF = Integer.MAX_VALUE / 2;
    if (n < d) return -1;
    int[][] dp = new int[d + 1][n + 1];
    for (int[] row : dp) Arrays.fill(row, INF);
    dp[0][0] = 0;
    for (int day = 1; day <= d; day++)
        for (int i = day; i <= n; i++) {
            int hardest = 0;
            for (int j = i; j >= day; j--) {
                hardest = Math.max(hardest, jobDifficulty[j - 1]);
                dp[day][i] = Math.min(dp[day][i], dp[day - 1][j - 1] + hardest);
            }
        }
    return dp[d][n];
}
```

| Approach | Time | Space |
|---|---|---|
| Day layers | O(d · n²) | O(d · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why -1?</summary>

Each day needs at least one job, so n < d is impossible.

</details>


<details><summary>Optimise?</summary>

A monotonic stack brings it to O(d · n).

</details>


## Connected
- [Partition Array for Maximum Sum](Partition%20Array%20for%20Maximum%20Sum.md)
