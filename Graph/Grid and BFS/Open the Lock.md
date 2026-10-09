---
topic: Grid and BFS
pattern: [Implicit graph BFS, Bidirectional BFS]
source: LeetCode 752
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Open the Lock

> [!TIP]
> **🧠 Memory hook**
> A combination lock is a graph with 10,000 rooms and 8 doors out of each room.
> **Mantra: STATE = 4-DIGIT STRING; DEADENDS ARE WALLS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=16) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Turn a 4-wheel lock from 0000 to the target, avoiding deadends. Return the fewest turns or −1.

## Key insight
Nodes are the 10,000 wheel positions; each has 8 neighbours (one wheel ±1, wrapping). Deadends are blocked nodes. BFS gives the fewest turns; a bidirectional BFS meets in the middle and explores far fewer states.

## Approach 1: BFS
```java
// BFS over the 10,000 wheel states: each move turns one wheel one step up or down
public int openLock(String[] deadends, String target) {
    Set<String> dead = new HashSet<>(Arrays.asList(deadends));
    if (dead.contains("0000")) return -1;
    Set<String> visited = new HashSet<>(List.of("0000"));
    Queue<String> que = new ArrayDeque<>(List.of("0000"));
    int turns = 0;
    while (!que.isEmpty()) {
        for (int size = que.size(); size > 0; size--) {
            String cur = que.poll();
            if (cur.equals(target)) return turns;
            for (String next : neighbours(cur)) {
                if (!dead.contains(next) && visited.add(next)) que.add(next);
            }
        }
        turns++;
    }
    return -1;
}

// The eight states one turn away
private List<String> neighbours(String s) {
    List<String> res = new ArrayList<>();
    char[] c = s.toCharArray();
    for (int i = 0; i < 4; i++) {
        char old = c[i];
        c[i] = (char) ((old - '0' + 1) % 10 + '0');
        res.add(new String(c));
        c[i] = (char) ((old - '0' + 9) % 10 + '0');
        res.add(new String(c));
        c[i] = old;
    }
    return res;
}
```

## Approach 2: Bidirectional BFS
```java
// Bidirectional BFS: grow the smaller frontier until the two meet
public int openLockBidirectional(String[] deadends, String target) {
    Set<String> dead = new HashSet<>(Arrays.asList(deadends));
    if (dead.contains("0000") || dead.contains(target)) return -1;
    Set<String> front = new HashSet<>(List.of("0000")), back = new HashSet<>(List.of(target)), seen = new HashSet<>(List.of("0000", target));
    int turns = 0;
    if (target.equals("0000")) return 0;
    while (!front.isEmpty() && !back.isEmpty()) {
        if (front.size() > back.size()) { Set<String> t = front; front = back; back = t; }
        Set<String> next = new HashSet<>();
        for (String cur : front) {
            for (String nb : neighbours(cur)) {
                if (back.contains(nb)) return turns + 1;
                if (!dead.contains(nb) && seen.add(nb)) next.add(nb);
            }
        }
        front = next;
        turns++;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS | O(10⁴ · 8) | O(10⁴) |
| Bidirectional BFS | O(10⁴ · 8) worst | O(10⁴) |

## Recall before you reveal
<details><summary>What if 0000 is a deadend?</summary>

Return −1 at once.

</details>


<details><summary>Why does bidirectional BFS help?</summary>

Two small balls of radius d/2 contain far fewer states than one ball of radius d.

</details>


## Connected
- [Word Ladder](Word%20Ladder.md)
- [Minimum Genetic Mutation](Minimum%20Genetic%20Mutation.md)
