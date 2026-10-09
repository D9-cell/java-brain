---
topic: LCA Distance and Tree Graphs
pattern: [Children lists, BFS / DFS from a node]
source: LeetCode 582
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Kill Process

> [!TIP]
> **🧠 Memory hook**
> Killing a process kills its **whole family tree**.
> **Mantra: MAP PARENT → CHILDREN, TRAVERSE FROM KILL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=7) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Given process ids and parent ids, return all processes killed when `kill` is killed.

## Key insight
Group children by parent in a hash map, then traverse from the killed id with BFS or DFS.

## Approach 1: BFS
```java
// Build parent -> children lists, then BFS from the killed process
public List<Integer> killProcess(List<Integer> pid, List<Integer> ppid, int kill) {
    Map<Integer, List<Integer>> kids = new HashMap<>();
    for (int i = 0; i < pid.size(); i++) kids.computeIfAbsent(ppid.get(i), k -> new ArrayList<>()).add(pid.get(i));
    List<Integer> res = new ArrayList<>();
    Queue<Integer> q = new LinkedList<>(List.of(kill));
    while (!q.isEmpty()) {
        int cur = q.poll();
        res.add(cur);
        q.addAll(kids.getOrDefault(cur, List.of()));
    }
    return res;
}
```

## Approach 2: DFS
```java
// Same map, DFS
public List<Integer> killProcessDfs(List<Integer> pid, List<Integer> ppid, int kill) {
    Map<Integer, List<Integer>> kids = new HashMap<>();
    for (int i = 0; i < pid.size(); i++) kids.computeIfAbsent(ppid.get(i), k -> new ArrayList<>()).add(pid.get(i));
    List<Integer> res = new ArrayList<>();
    dfs(kill, kids, res);
    return res;
}

// Adds the process and everything below it
private void dfs(int p, Map<Integer, List<Integer>> kids, List<Integer> res) {
    res.add(p);
    for (int c : kids.getOrDefault(p, List.of())) dfs(c, kids, res);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS | O(n) | O(n) |
| DFS | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why not scan the arrays for every level?</summary>

That is O(n · depth); the map makes it linear.

</details>


## Connected
- [Amount of Time for Binary Tree to Be Infected](Amount%20of%20Time%20for%20Binary%20Tree%20to%20Be%20Infected.md)
- [Time Needed to Inform All Employees](Time%20Needed%20to%20Inform%20All%20Employees.md)
