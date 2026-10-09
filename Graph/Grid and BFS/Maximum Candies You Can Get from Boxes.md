---
topic: Grid and BFS
pattern: [BFS, DFS, State tracking]
source: LeetCode 1298
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Maximum Candies You Can Get from Boxes

> [!TIP]
> **🧠 Memory hook**
> A box may be in your hands but locked, or its key may arrive before the box does; open it only when you have both.
> **Mantra: OPEN WHEN HAVE BOX AND (OPEN OR KEY)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=26) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Boxes may be open or locked, contain candies, keys, and other boxes. Starting from initialBoxes, return the maximum candies you can collect.

## Key insight
Track three facts per box: do we have it, is it opened, do we hold its key. Whenever a box or key arrives, check whether that box can now be opened and queue it exactly once.

## Approach 1: BFS
```java
// BFS over boxes we can open now; a closed box we hold waits until its key shows up
public int maxCandiesBfs(int[] status, int[] candies, int[][] keys, int[][] containedBoxes, int[] initialBoxes) {
    int n = status.length, total = 0;
    boolean[] have = new boolean[n], opened = new boolean[n], key = new boolean[n];
    Queue<Integer> que = new ArrayDeque<>();
    for (int b : initialBoxes) have[b] = true;
    for (int b : initialBoxes) if (status[b] == 1) { que.add(b); opened[b] = true; }
    while (!que.isEmpty()) {
        int box = que.poll();
        total += candies[box];
        for (int k : keys[box]) {
            key[k] = true;
            if (have[k] && !opened[k]) { opened[k] = true; que.add(k); }
        }
        for (int inner : containedBoxes[box]) {
            have[inner] = true;
            if (!opened[inner] && (status[inner] == 1 || key[inner])) { opened[inner] = true; que.add(inner); }
        }
    }
    return total;
}
```

## Approach 2: DFS
```java
// DFS with the same bookkeeping
public int maxCandiesDfs(int[] status, int[] candies, int[][] keys, int[][] containedBoxes, int[] initialBoxes) {
    int n = status.length;
    boolean[] have = new boolean[n], opened = new boolean[n], key = new boolean[n];
    int[] total = {0};
    for (int b : initialBoxes) have[b] = true;
    for (int b : initialBoxes) if (status[b] == 1 && !opened[b]) open(b, status, candies, keys, containedBoxes, have, opened, key, total);
    return total[0];
}

// Opens a box, collects candies, then follows new keys and boxes
private void open(int box, int[] status, int[] candies, int[][] keys, int[][] inside, boolean[] have, boolean[] opened, boolean[] key, int[] total) {
    opened[box] = true;
    total[0] += candies[box];
    for (int k : keys[box]) {
        key[k] = true;
        if (have[k] && !opened[k]) open(k, status, candies, keys, inside, have, opened, key, total);
    }
    for (int in : inside[box]) {
        have[in] = true;
        if (!opened[in] && (status[in] == 1 || key[in])) open(in, status, candies, keys, inside, have, opened, key, total);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| BFS | O(n + total keys + total boxes) | O(n) |
| DFS | O(n + total keys + total boxes) | O(n) |

## Recall before you reveal
<details><summary>Why both have[] and key[]?</summary>

The key can arrive before the box, or the box before the key.

</details>


<details><summary>Why mark opened when queuing?</summary>

So a box that gains both its box and key at once is processed once.

</details>


## Connected
- [Keys and Rooms](../Graph%20Basics/Keys%20and%20Rooms.md)
