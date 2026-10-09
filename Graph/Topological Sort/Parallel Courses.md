---
topic: Topological Sort
pattern: [Kahn by waves]
source: LeetCode 1136
difficulty: Medium
companies: [Uber]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Parallel Courses

> [!TIP]
> **🧠 Memory hook**
> Take everything you can each semester; the number of semesters is the length of the longest prerequisite chain.
> **Mantra: ONE KAHN WAVE = ONE SEMESTER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=9) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Courses with prerequisites; any number can be taken per semester once their prerequisites were finished in earlier semesters. Return the minimum semesters, or −1.

## Key insight
Run Kahn one layer at a time: the queue at the start of a wave holds the courses available this semester. The number of waves equals the longest chain. If some course is never taken there is a cycle: −1. A memoised DFS computes the chain length directly.

## Approach 1: Kahn by layers
```java
// Kahn by layers: every wave of zero-indegree courses is one semester
public int minimumSemesters(int n, int[][] relations) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[n + 1];
    for (int[] r : relations) { adj.get(r[0]).add(r[1]); indegree[r[1]]++; }
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 1; i <= n; i++) if (indegree[i] == 0) que.add(i);
    int semesters = 0, taken = 0;
    while (!que.isEmpty()) {
        semesters++;
        for (int size = que.size(); size > 0; size--) {
            int u = que.poll();
            taken++;
            for (int v : adj.get(u)) if (--indegree[v] == 0) que.add(v);
        }
    }
    return taken == n ? semesters : -1;
}
```

## Approach 2: DFS with memo
```java
// DFS: the semester of a course is 1 + the largest semester among its prerequisites; a cycle gives -1
public int minimumSemestersDfs(int n, int[][] relations) {
    List<List<Integer>> pre = new ArrayList<>();
    for (int i = 0; i <= n; i++) pre.add(new ArrayList<>());
    for (int[] r : relations) pre.get(r[1]).add(r[0]);
    int[] memo = new int[n + 1], state = new int[n + 1];
    int best = 0;
    for (int i = 1; i <= n; i++) {
        int s = semester(pre, i, memo, state);
        if (s == -1) return -1;
        best = Math.max(best, s);
    }
    return best;
}

// Longest chain ending at u, or -1 on a cycle
private int semester(List<List<Integer>> pre, int u, int[] memo, int[] state) {
    if (state[u] == 2) return memo[u];
    if (state[u] == 1) return -1;
    state[u] = 1;
    int best = 1;
    for (int p : pre.get(u)) {
        int s = semester(pre, p, memo, state);
        if (s == -1) return -1;
        best = Math.max(best, s + 1);
    }
    state[u] = 2;
    return memo[u] = best;
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn by layers | O(V + E) | O(V + E) |
| DFS with memo | O(V + E) | O(V + E) |

## Recall before you reveal
<details><summary>Why layers and not the plain order?</summary>

Courses in the same layer can be studied together, so they count as one semester.

</details>


<details><summary>What is the answer in graph terms?</summary>

The number of nodes on the longest path.

</details>


## Connected
- [Parallel Courses III](Parallel%20Courses%20III.md)
- [Course Schedule](Course%20Schedule.md)
