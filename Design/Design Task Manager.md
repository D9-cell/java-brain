---
topic: Design
pattern: [HashMap + TreeSet]
source: LeetCode 3408
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design Task Manager

> [!TIP]
> **🧠 Memory hook**
> A priority inbox: edits re-sort, execTop takes the top.
> **Mantra: TREESET (priority ↓, id ↓) + MAP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=14) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
add, edit, rmv, execTop (highest priority, ties → highest taskId; returns its userId).

## Key insight
TreeSet of (priority, taskId) plus taskId → (userId, priority).

## Approach: TreeSet + map
```java
// TreeSet of (priority, taskId) for the top + taskId → [userId, priority]
static class TaskManager {
    private final Map<Integer, int[]> info = new HashMap<>();
    private final TreeSet<int[]> order = new TreeSet<>((a, b) -> a[0] != b[0] ? Integer.compare(b[0], a[0]) : Integer.compare(b[1], a[1]));

    TaskManager(List<List<Integer>> tasks) { for (List<Integer> t : tasks) add(t.get(0), t.get(1), t.get(2)); }

    // Register the task in both structures
    public void add(int userId, int taskId, int priority) {
        info.put(taskId, new int[]{userId, priority});
        order.add(new int[]{priority, taskId});
    }

    // Remove with the old priority, re-add with the new one
    public void edit(int taskId, int newPriority) {
        int[] t = info.get(taskId);
        order.remove(new int[]{t[1], taskId});
        t[1] = newPriority;
        order.add(new int[]{newPriority, taskId});
    }

    // Drop the task everywhere
    public void rmv(int taskId) {
        int[] t = info.remove(taskId);
        order.remove(new int[]{t[1], taskId});
    }

    // Highest priority (ties: highest taskId) is executed and removed
    public int execTop() {
        if (order.isEmpty()) return -1;
        int[] top = order.pollFirst();
        return info.remove(top[1])[0];
    }
}
```

| Approach | Time | Space |
|---|---|---|
| TreeSet + map | O(log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Lazy heap variant?</summary>

Push on edit, skip entries whose priority/existence changed.

</details>


## Connected
- [Design a Food Rating System](Design%20a%20Food%20Rating%20System.md)
