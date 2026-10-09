---
topic: Grid and BFS
pattern: [Implicit graph BFS, DFS]
source: LeetCode 1625
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Lexicographically Smallest String After Applying Operations

> [!TIP]
> **🧠 Memory hook**
> Two buttons on a digit lock: explore every reachable setting and keep the smallest.
> **Mantra: BFS ALL REACHABLE STATES, KEEP THE MIN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=23) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Operations: add a to every digit at an odd index (mod 10), or rotate right by b. Return the lexicographically smallest reachable string.

## Key insight
The operations form a graph on strings with at most a few hundred reachable states (the add cycles after at most 10 steps and the rotation after n), so enumerate them all with BFS or DFS and keep the smallest.

## Approach 1: BFS over states
```java
// BFS over every reachable string, keeping the smallest
public String findLexSmallestStringBfs(String s, int a, int b) {
    Set<String> seen = new HashSet<>(List.of(s));
    Queue<String> que = new ArrayDeque<>(List.of(s));
    String best = s;
    while (!que.isEmpty()) {
        String cur = que.poll();
        if (cur.compareTo(best) < 0) best = cur;
        for (String next : List.of(add(cur, a), rotate(cur, b))) if (seen.add(next)) que.add(next);
    }
    return best;
}

// Adds a to every digit at an odd index, wrapping at 10
private String add(String s, int a) {
    char[] c = s.toCharArray();
    for (int i = 1; i < c.length; i += 2) c[i] = (char) ((c[i] - '0' + a) % 10 + '0');
    return new String(c);
}

// Rotates the string right by b positions
private String rotate(String s, int b) {
    int n = s.length();
    return s.substring(n - b % n) + s.substring(0, n - b % n);
}
```

## Approach 2: DFS over states
```java
// DFS over the same state graph
public String findLexSmallestStringDfs(String s, int a, int b) {
    String[] best = {s};
    dfs(s, a, b, new HashSet<>(), best);
    return best[0];
}

// Visits each reachable string once
private void dfs(String cur, int a, int b, Set<String> seen, String[] best) {
    if (!seen.add(cur)) return;
    if (cur.compareTo(best[0]) < 0) best[0] = cur;
    dfs(add(cur, a), a, b, seen, best);
    dfs(rotate(cur, b), a, b, seen, best);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS over states | O(states · n) | O(states · n) |
| DFS over states | O(states · n) | O(states · n) |

## Recall before you reveal
<details><summary>Why is it finite?</summary>

Adding a repeatedly returns to the start within 10 steps, and rotating by b returns within n steps.

</details>


<details><summary>Why a visited set?</summary>

The two operations create cycles.

</details>


## Connected
- [Open the Lock](Open%20the%20Lock.md)
