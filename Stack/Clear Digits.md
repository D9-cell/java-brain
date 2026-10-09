---
topic: Stack
pattern: [Undo stack]
source: LeetCode 3174
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Clear Digits

> [!TIP]
> **🧠 Memory hook**
> Each digit eats the last letter written.
> **Mantra: LETTER PUSH, DIGIT POP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=6) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Repeatedly delete the first digit and the closest non-digit to its left.

## Key insight
The closest letter to the left of a digit is the stack top.

## Approach 1: Brute force
```java
// Approach 1: repeatedly find the first digit and delete it with the closest non-digit on its left
public String clearDigitsBrute(String s) {
    StringBuilder sb = new StringBuilder(s);
    for (int i = 0; i < sb.length(); i++) {
        if (Character.isDigit(sb.charAt(i))) {
            sb.deleteCharAt(i);
            if (i > 0) { sb.deleteCharAt(i - 1); i -= 2; } else i -= 1;
        }
    }
    return sb.toString();
}
```

## Approach 2: Stack
```java
// Approach 2: StringBuilder as a stack: letters push, digits pop
public String clearDigits(String s) {
    StringBuilder st = new StringBuilder();
    for (char c : s.toCharArray()) {
        if (Character.isDigit(c)) { if (st.length() > 0) st.deleteCharAt(st.length() - 1); }
        else st.append(c);
    }
    return st.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n²) | O(n) |
| Stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Stack and brute versions agree on random inputs.

## Recall before you reveal
<details><summary>StringBuilder as a stack?</summary>

append / deleteCharAt(len − 1).

</details>

