---
topic: Stack
pattern: [Cancel pairs]
source: LeetCode 1047
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Remove All Adjacent Duplicates In String

> [!TIP]
> **🧠 Memory hook**
> Bubble wrap: two equal neighbours pop together.
> **Mantra: EQUAL TO TOP → POP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=24) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Repeatedly remove adjacent equal pairs.

## Key insight
Equal to the stack top → pop (the next pair is exposed automatically).

## Approach: StringBuilder stack
```java
// StringBuilder as a stack: equal to the top → pop, else push
public String removeDuplicates(String s) {
    StringBuilder st = new StringBuilder();
    for (char c : s.toCharArray()) {
        if (st.length() > 0 && st.charAt(st.length() - 1) == c) st.deleteCharAt(st.length() - 1);
        else st.append(c);
    }
    return st.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| StringBuilder stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on random inputs when it was written.

## Recall before you reveal
<details><summary>k-duplicates variant?</summary>

Store (char, count) pairs.

</details>

