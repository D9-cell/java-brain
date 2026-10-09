---
topic: Backtracking
pattern: [Row-by-row backtracking, Memo]
source: LeetCode 756
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Pyramid Transition Matrix

> [!TIP]
> **🧠 Memory hook**
> Stack Lego bricks: each pair below allows certain bricks on top.
> **Mantra: BUILD ROW ABOVE, RECURSE, MEMO FAILED ROWS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=25) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Can the pyramid be built to a single top block?

## Key insight
Build the next row block by block from allowed triples; when complete, recurse; memoise rows.

## Approach: Backtracking + memo
```java
// Build the row above `row` one block at a time; when complete, recurse on it
private boolean build(String row, int i, StringBuilder above) {
    if (row.length() == 1) return true;
    if (i == row.length() - 1) {
        String next = above.toString();
        Boolean known = memo.get(next);
        if (known != null) return known;
        boolean res = build(next, 0, new StringBuilder());
        memo.put(next, res);
        return res;
    }
    for (char c : tops.getOrDefault(row.substring(i, i + 2), List.of())) {
        above.append(c);
        if (build(row, i + 1, above)) return true;
        above.deleteCharAt(above.length() - 1);
    }
    return false;
}

// Index the allowed triples by their bottom pair
public boolean pyramidTransition(String bottom, List<String> allowed) {
    for (String a : allowed) tops.computeIfAbsent(a.substring(0, 2), k -> new ArrayList<>()).add(a.charAt(2));
    return build(bottom, 0, new StringBuilder());
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking + memo | ~L^n | O(rows seen) |

> [!WARNING]
> **Java gotcha**
> A first version used `memo.computeIfAbsent(row, k -> build(k, …))`; the recursive call modifies the same HashMap and Java throws ConcurrentModificationException. Fixed with explicit get/put.

## Recall before you reveal
<details><summary>Java pitfall?</summary>

Recursive computeIfAbsent throws ConcurrentModificationException.

</details>

