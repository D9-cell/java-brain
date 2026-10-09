---
topic: Stack
pattern: [Stack size only]
source: LeetCode 1598
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Crawler Log Folder

> [!TIP]
> **🧠 Memory hook**
> Only the height of the stack matters.
> **Mantra: DEPTH COUNTER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=7) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Minimum operations to return to the main folder.

## Key insight
Track the depth: "../" decrements (not below 0), "./" nothing, a name increments.

## Approach: Counter
```java
// Only the depth matters: "../" goes up (not below 0), "./" stays, anything else goes down
public int minOperations(String[] logs) {
    int depth = 0;
    for (String l : logs) {
        if (l.equals("../")) depth = Math.max(0, depth - 1);
        else if (!l.equals("./")) depth++;
    }
    return depth;
}
```

| Approach | Time | Space |
|---|---|---|
| Counter | O(n) | O(1) |

## Recall before you reveal
<details><summary>Why no real stack?</summary>

Folder names are never needed.

</details>


## Connected
- [Simplify Path](Simplify%20Path.md)
