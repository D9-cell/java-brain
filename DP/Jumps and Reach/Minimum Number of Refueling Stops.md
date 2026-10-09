---
topic: Jumps and Reach
pattern: [Knapsack on stop count, Greedy with max-heap]
source: LeetCode 871
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Minimum Number of Refueling Stops

> [!TIP]
> **🧠 Memory hook**
> Drive until the tank is empty, then **wish** you had stopped at the biggest station you already passed.
> **Mantra: dp[t + 1] = max(dp[t + 1], dp[t] + fuel) IF dp[t] ≥ pos (t DESCENDING)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=7) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
A car starts with startFuel litres and uses one litre per mile. Stations along the road give fuel. Return the fewest stops needed to drive target miles, or −1.

## Key insight
DP: dp[t] = the farthest you can get with exactly t stops among the stations seen so far. A station can be added to any plan that reaches it; going t downward uses each station once (0/1 knapsack). Greedy: drive as far as possible; when stuck, retroactively take the largest fuel passed (heap). Taking more fuel earlier never hurts.

## Approach 1: DP over stop count
```java
// dp[t] = farthest distance reachable with exactly t stops; each station updates t from high to low
public int minRefuelStops(int target, int startFuel, int[][] stations) {
    int n = stations.length;
    long[] dp = new long[n + 1];
    dp[0] = startFuel;
    for (int i = 0; i < n; i++)
        for (int t = i; t >= 0; t--)
            if (dp[t] >= stations[i][0]) dp[t + 1] = Math.max(dp[t + 1], dp[t] + stations[i][1]);
    for (int t = 0; t <= n; t++) if (dp[t] >= target) return t;
    return -1;
}
```

## Approach 2: Max-heap greedy
```java
// Greedy: drive as far as possible, and when stuck take the largest fuel passed so far
public int minRefuelStopsHeap(int target, int startFuel, int[][] stations) {
    PriorityQueue<Integer> passed = new PriorityQueue<>(Collections.reverseOrder());
    long reach = startFuel;
    int stops = 0, i = 0;
    while (reach < target) {
        while (i < stations.length && stations[i][0] <= reach) passed.add(stations[i++][1]);
        if (passed.isEmpty()) return -1;
        reach += passed.poll();
        stops++;
    }
    return stops;
}
```

| Approach | Time | Space |
|---|---|---|
| DP over stop count | O(n²) | O(n) |
| Max-heap greedy | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does the DP loop t downward?</summary>

So a station is not used twice in the same round.

</details>


<details><summary>Why is the greedy safe?</summary>

Any plan with t stops reaches at most as far as the t largest fuels you passed.

</details>


## Connected
- [Furthest Building You Can Reach](../../Heap/Furthest%20Building%20You%20Can%20Reach.md)
- [Grinding Geek](Grinding%20Geek.md)
