---
topic: LCA Distance and Tree Graphs
pattern: [Org chart as a tree, Longest weighted path]
source: LeetCode 1376
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Time Needed to Inform All Employees

> [!TIP]
> **🧠 Memory hook**
> News flows down the org chart: the answer is the **slowest chain of managers**.
> **Mantra: MAX OVER PATHS OF Σ informTime(manager)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=8) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Each manager needs `informTime` minutes to tell all direct reports at once. Return the time until everyone knows.

## Key insight
Build children lists and DFS: time(e) = informTime(e) + max over reports of time(report). Or walk up from each employee adding the managers' inform times, with memoisation.

## Approach 1: DFS down
```java
// Build the manager -> reports lists and take the slowest root-to-leaf sum of inform times
public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
    List<List<Integer>> kids = new ArrayList<>();
    for (int i = 0; i < n; i++) kids.add(new ArrayList<>());
    for (int i = 0; i < n; i++) if (manager[i] != -1) kids.get(manager[i]).add(i);
    return dfs(headID, kids, informTime);
}

// Time until everyone below the employee has been informed
private int dfs(int e, List<List<Integer>> kids, int[] informTime) {
    int worst = 0;
    for (int c : kids.get(e)) worst = Math.max(worst, dfs(c, kids, informTime));
    return worst + informTime[e];
}
```

## Approach 2: Memoised walk up
```java
// Walk up from every employee to the head adding inform times, memoising each result
public int numOfMinutesUp(int n, int headID, int[] manager, int[] informTime) {
    int[] memo = new int[n];
    Arrays.fill(memo, -1);
    int best = 0;
    for (int i = 0; i < n; i++) best = Math.max(best, up(i, manager, informTime, memo));
    return best;
}

// Time at which employee e learns the news
private int up(int e, int[] manager, int[] informTime, int[] memo) {
    if (manager[e] == -1) return 0;
    if (memo[e] != -1) return memo[e];
    return memo[e] = informTime[manager[e]] + up(manager[e], manager, informTime, memo);
}
```

| Approach | Time | Space |
|---|---|---|
| DFS down | O(n) | O(n) |
| Memoised walk up | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is it a max and not a sum over reports?</summary>

A manager informs all direct reports at the same time.

</details>


## Connected
- [Kill Process](Kill%20Process.md)
- [Amount of Time for Binary Tree to Be Infected](Amount%20of%20Time%20for%20Binary%20Tree%20to%20Be%20Infected.md)
