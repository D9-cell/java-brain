---
topic: Topological Sort
pattern: [Kahn + longest path, DP on a DAG]
source: LeetCode 2050
difficulty: Hard
companies: [Uber]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Parallel Courses III

> [!TIP]
> **🧠 Memory hook**
> Unlimited parallel study: a course ends when its slowest prerequisite ends plus its own length.
> **Mantra: finish[v] = max(finish[u]) + time[v]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=10) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Each course takes time[i] months; courses with no dependency run in parallel. Return the minimum months to finish all.

## Key insight
It is the longest weighted path in a DAG. In topological order, finish[v] = max over prerequisites u of finish[u], plus time[v]. The answer is the largest finish time. A memoised DFS gives the same.

## Approach 1: Kahn with finish times
```java
// Kahn's algorithm with finish[v] = max over prerequisites of finish[u], plus the course's own duration
public int minimumTime(int n, int[][] relations, int[] time) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[n], finish = new int[n];
    for (int[] r : relations) { adj.get(r[0] - 1).add(r[1] - 1); indegree[r[1] - 1]++; }
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (indegree[i] == 0) { que.add(i); finish[i] = time[i]; }
    int answer = 0;
    while (!que.isEmpty()) {
        int u = que.poll();
        answer = Math.max(answer, finish[u]);
        for (int v : adj.get(u)) {
            finish[v] = Math.max(finish[v], finish[u] + time[v]);
            if (--indegree[v] == 0) que.add(v);
        }
    }
    return answer;
}
```

## Approach 2: DFS with memo
```java
// DFS with memoisation: the finish time of a course is its duration plus the slowest prerequisite chain
public int minimumTimeDfs(int n, int[][] relations, int[] time) {
    List<List<Integer>> pre = new ArrayList<>();
    for (int i = 0; i < n; i++) pre.add(new ArrayList<>());
    for (int[] r : relations) pre.get(r[1] - 1).add(r[0] - 1);
    int[] memo = new int[n];
    int best = 0;
    for (int i = 0; i < n; i++) best = Math.max(best, finish(pre, i, time, memo));
    return best;
}

// Memoised longest weighted chain ending at u
private int finish(List<List<Integer>> pre, int u, int[] time, int[] memo) {
    if (memo[u] != 0) return memo[u];
    int slowest = 0;
    for (int p : pre.get(u)) slowest = Math.max(slowest, finish(pre, p, time, memo));
    return memo[u] = slowest + time[u];
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn with finish times | O(V + E) | O(V + E) |
| DFS with memo | O(V + E) | O(V + E) |

## Recall before you reveal
<details><summary>Why max over prerequisites?</summary>

You can only start when all of them are done.

</details>


<details><summary>Where does the answer come from?</summary>

The maximum finish time over all courses.

</details>


## Connected
- [Parallel Courses](Parallel%20Courses.md)
- [Largest Color Value in a Directed Graph](Largest%20Color%20Value%20in%20a%20Directed%20Graph.md)
