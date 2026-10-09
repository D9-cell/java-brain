---
topic: Stack
pattern: [Counter]
source: LeetCode 1614
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Maximum Nesting Depth of the Parentheses

> [!TIP]
> **🧠 Memory hook**
> Stack size = depth.
> **Mantra: COUNTER, MAX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=8) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Maximum nesting depth of a valid parentheses string.

## Key insight
Increment on "(", decrement on ")", record the maximum.

## Approach: Counter
```java
// A counter is the stack size: '(' increments, ')' decrements; track the maximum
public int maxDepth(String s) {
    int depth = 0, best = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') best = Math.max(best, ++depth);
        else if (c == ')') depth--;
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Counter | O(n) | O(1) |

## Recall before you reveal
<details><summary>Stack version?</summary>

Push on "(", the max size.

</details>

