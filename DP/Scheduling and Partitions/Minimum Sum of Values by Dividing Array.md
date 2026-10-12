---
topic: Scheduling and Partitions
pattern: [Blocks counted, Running AND groups]
source: LeetCode 3117
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Minimum Sum of Values by Dividing Array

> [!TIP]
> **🧠 Memory hook**
> The AND of a block as its start moves left takes only **~17 distinct values**: group starts by that value.
> **Mantra: dp[j][i] = (best dp[j−1][start] with AND == target) + nums[i − 1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Scheduling%20and%20Partitions/Scheduling%20and%20Partitions%20Animations.html#p=6) · **Pattern hub:** [Scheduling and Partitions - Pattern Map](Scheduling%20and%20Partitions%20-%20Pattern%20Map.md)

## Problem
Split nums into m contiguous subarrays so the j-th subarray's AND equals andValues[j]. A subarray's value is its last element. Return the minimum total value, or −1.

## Key insight
For each block index j, sweep i and keep a map from "AND of the current block if it started at s" to the best dp[j − 1][s] among those starts. Extending the block ANDs every key with the new element. Reading the map at the target AND gives dp[j][i].

## Approach: Layered DP + AND groups
```java
// starts of the current block are grouped by their running AND (at most ~17 distinct values)
public int minimumValueSum(int[] nums, int[] andValues) {
    int n = nums.length, m = andValues.length, INF = Integer.MAX_VALUE / 2;
    int[] prev = new int[n + 1];
    Arrays.fill(prev, INF);
    prev[0] = 0;
    for (int j = 1; j <= m; j++) {
        int[] cur = new int[n + 1];
        Arrays.fill(cur, INF);
        Map<Integer, Integer> groups = new HashMap<>();
        for (int i = 1; i <= n; i++) {
            int x = nums[i - 1];
            Map<Integer, Integer> next = new HashMap<>();
            for (Map.Entry<Integer, Integer> e : groups.entrySet()) next.merge(e.getKey() & x, e.getValue(), Math::min);
            if (prev[i - 1] < INF) next.merge(x, prev[i - 1], Math::min);
            groups = next;
            Integer best = groups.get(andValues[j - 1]);
            if (best != null) cur[i] = best + x;
        }
        prev = cur;
    }
    return prev[n] >= INF ? -1 : prev[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Layered DP + AND groups | O(m · n · log V) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why few distinct ANDs?</summary>

AND only clears bits, so it changes at most log V times.

</details>


<details><summary>Why a map and not a start index?</summary>

Starts with the same AND behave identically.

</details>


## Connected
- [Minimum Difficulty of a Job Schedule](Minimum%20Difficulty%20of%20a%20Job%20Schedule.md)
- [Partition Array for Maximum Sum](Partition%20Array%20for%20Maximum%20Sum.md)
