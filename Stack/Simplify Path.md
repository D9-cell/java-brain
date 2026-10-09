---
topic: Stack
pattern: [Undo stack]
source: LeetCode 71
difficulty: Medium
companies: [Meta, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Simplify Path

> [!TIP]
> **🧠 Memory hook**
> A file explorer: names go in, ".." goes up.
> **Mantra: SPLIT "/", NAME PUSH, ".." POP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=32) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Canonical form of a Unix path.

## Key insight
Split on "/"; skip "" and "."; ".." pops; others push; join.

## Approach: Deque
```java
// Split on '/', ignore "" and ".", ".." pops, anything else pushes; join with '/'
public String simplifyPath(String path) {
    Deque<String> st = new ArrayDeque<>();
    for (String part : path.split("/")) {
        if (part.isEmpty() || part.equals(".")) continue;
        if (part.equals("..")) { if (!st.isEmpty()) st.pollLast(); }
        else st.offerLast(part);
    }
    return "/" + String.join("/", st);
}
```

| Approach | Time | Space |
|---|---|---|
| Deque | O(n) | O(n) |

## Recall before you reveal
<details><summary>"..." ?</summary>

A normal name.

</details>


## Connected
- [Crawler Log Folder](Crawler%20Log%20Folder.md)
