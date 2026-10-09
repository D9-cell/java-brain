---
topic: Shortest Paths
pattern: [Dijkstra, DP on (position, index)]
source: LeetCode 514
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Freedom Trail

> [!TIP]
> **🧠 Memory hook**
> A safe dial: for each letter of the key choose which copy of the letter on the ring to use.
> **Mantra: STATE = (RING POSITION, KEY INDEX); COST = SHORT ROTATION + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=20) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Spell the key by rotating the ring so each letter is at 12 o'clock and pressing. Each rotation step and press costs 1.

## Key insight
A letter may appear in several places, so choosing the nearest copy greedily can lose. The state is (ring position, letters spelled so far); moving to another copy of the next letter costs the circular distance + 1. Dijkstra or memoised DP finds the minimum.

## Approach 1: Dijkstra on states
```java
// Dijkstra over states (ring position, letters of the key already spelled); rotating costs the circular distance, pressing costs 1
public int findRotateStepsDijkstra(String ring, String key) {
    int n = ring.length(), m = key.length();
    int[][] dist = new int[n][m + 1];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    dist[0][0] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int d = top[0], pos = top[1], idx = top[2];
        if (d > dist[pos][idx]) continue;
        if (idx == m) return d;
        for (int next = 0; next < n; next++) {
            if (ring.charAt(next) != key.charAt(idx)) continue;
            int gap = Math.abs(next - pos), steps = Math.min(gap, n - gap) + 1;
            if (d + steps < dist[next][idx + 1]) { dist[next][idx + 1] = d + steps; pq.add(new int[]{d + steps, next, idx + 1}); }
        }
    }
    return -1;
}
```

## Approach 2: Top-down DP
```java
// Top-down DP: the cheapest way to spell key[idx..] from the ring position pos
public int findRotateSteps(String ring, String key) {
    return solve(ring, key, 0, 0, new int[ring.length()][key.length()]);
}

// Tries every ring position that holds the next letter
private int solve(String ring, String key, int pos, int idx, int[][] memo) {
    if (idx == key.length()) return 0;
    if (memo[pos][idx] != 0) return memo[pos][idx];
    int best = Integer.MAX_VALUE, n = ring.length();
    for (int next = 0; next < n; next++) {
        if (ring.charAt(next) != key.charAt(idx)) continue;
        int gap = Math.abs(next - pos);
        best = Math.min(best, Math.min(gap, n - gap) + 1 + solve(ring, key, next, idx + 1, memo));
    }
    return memo[pos][idx] = best;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra on states | O(m · n²) | O(m · n) |
| Top-down DP | O(m · n²) | O(m · n) |

## Recall before you reveal
<details><summary>Why not greedy?</summary>

The nearest copy now can force a long rotation later.

</details>


<details><summary>Why circular distance?</summary>

The ring can rotate either way.

</details>


## Connected
- [Word Ladder](../Grid%20and%20BFS/Word%20Ladder.md)
