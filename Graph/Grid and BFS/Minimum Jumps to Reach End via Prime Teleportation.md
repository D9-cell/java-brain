---
topic: Grid and BFS
pattern: [BFS, Sieve, Implicit edges]
source: LeetCode 3629
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Minimum Jumps to Reach End via Prime Teleportation

> [!TIP]
> **🧠 Memory hook**
> A prime is a portal key: standing on p lets you teleport to every multiple of p, but each portal group only needs opening once.
> **Mantra: GROUP INDICES BY PRIME FACTOR; USE EACH GROUP ONCE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=24) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
From index i you can move to i ± 1, or if nums[i] is a prime p, jump to any index whose value is divisible by p. Return the fewest jumps to the last index.

## Key insight
A sieve gives each number's prime factors, so map every prime to the indices of its multiples. During BFS, standing on prime p expands that whole group once and then discards it: all members get the same distance, so re-expanding them is wasted.

## Approach: BFS with prime groups
```java
// BFS over indices: step to i - 1 or i + 1, or from a prime p jump to every index holding a multiple of p (each prime used once)
public int minJumps(int[] nums) {
    int n = nums.length, max = 0;
    for (int v : nums) max = Math.max(max, v);
    int[] smallestFactor = new int[max + 1];
    for (int i = 2; i <= max; i++) if (smallestFactor[i] == 0) for (int j = i; j <= max; j += i) if (smallestFactor[j] == 0) smallestFactor[j] = i;
    Map<Integer, List<Integer>> indicesOfPrime = new HashMap<>();
    for (int i = 0; i < n; i++) {
        int v = nums[i];
        while (v > 1) {
            int p = smallestFactor[v];
            indicesOfPrime.computeIfAbsent(p, k -> new ArrayList<>()).add(i);
            while (v % p == 0) v /= p;
        }
    }
    int[] dist = new int[n];
    Arrays.fill(dist, -1);
    dist[0] = 0;
    Queue<Integer> que = new ArrayDeque<>(List.of(0));
    while (!que.isEmpty()) {
        int i = que.poll();
        if (i == n - 1) return dist[i];
        List<Integer> next = new ArrayList<>();
        if (i > 0) next.add(i - 1);
        if (i + 1 < n) next.add(i + 1);
        int p = nums[i];
        if (p >= 2 && smallestFactor[p] == p) {
            List<Integer> group = indicesOfPrime.remove(p);
            if (group != null) next.addAll(group);
        }
        for (int j : next) if (dist[j] == -1) { dist[j] = dist[i] + 1; que.add(j); }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS with prime groups | O(n log max) | O(n log max) |

## Recall before you reveal
<details><summary>Why remove the group after using it?</summary>

Every index in it already received the shortest distance; scanning it again is pure waste.

</details>


<details><summary>Why a smallest-factor sieve?</summary>

It factors every number in O(log) time.

</details>


## Connected
- [Word Ladder](Word%20Ladder.md)
- [Bus Routes](Bus%20Routes.md)
