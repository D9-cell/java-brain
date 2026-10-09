---
topic: Stack
pattern: [Undo stack]
source: LeetCode 2390
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Removing Stars From a String

> [!TIP]
> **🧠 Memory hook**
> A star is a backspace.
> **Mantra: LETTER PUSH, STAR POP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=27) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Each star removes itself and the closest non-star to its left.

## Key insight
Stack (or a write pointer that moves back).

## Approach 1: StringBuilder stack
```java
// Approach 2: StringBuilder as stack: a star pops the last kept char
public String removeStars(String s) {
    StringBuilder st = new StringBuilder();
    for (char c : s.toCharArray()) {
        if (c == '*') st.deleteCharAt(st.length() - 1);
        else st.append(c);
    }
    return st.toString();
}
```

## Approach 2: Two pointers
```java
// Approach 3: two pointers writing into the same char array
public String removeStarsTwoPointers(String s) {
    char[] a = s.toCharArray();
    int w = 0;
    for (char c : a) {
        if (c == '*') w--;
        else a[w++] = c;
    }
    return new String(a, 0, w);
}
```

| Approach | Time | Space |
|---|---|---|
| StringBuilder stack | O(n) | O(n) |
| Two pointers | O(n) | O(1) extra |

> [!WARNING]
> **Java gotcha**
> Both versions agree on random inputs.

## Recall before you reveal
<details><summary>Why can the write pointer go back?</summary>

The star "un-writes" the last kept char.

</details>

