---
topic: Stack
pattern: [Matching counter]
source: LeetCode 921
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Minimum Add to Make Parentheses Valid

> [!TIP]
> **🧠 Memory hook**
> Count the orphans on both sides.
> **Mantra: UNMATCHED ( + UNMATCHED )**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=15) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Minimum insertions to make the string valid.

## Key insight
open = unmatched "(", add = ")" with no partner; answer open + add.

## Approach: Counters
```java
// open = unmatched '(' so far; a ')' with no open needs an inserted '('
public int minAddToMakeValid(String s) {
    int open = 0, add = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') open++;
        else if (open > 0) open--;
        else add++;
    }
    return add + open;
}
```

| Approach | Time | Space |
|---|---|---|
| Counters | O(n) | O(1) |

## Recall before you reveal
<details><summary>Stack version?</summary>

Push "(", pop on ")", count failures.

</details>

