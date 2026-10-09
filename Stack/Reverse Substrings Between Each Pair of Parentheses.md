---
topic: Stack
pattern: [Bracket pairing (wormholes)]
source: LeetCode 1190
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Reverse Substrings Between Each Pair of Parentheses

> [!TIP]
> **🧠 Memory hook**
> Wormholes: entering a bracket teleports you to its partner and reverses your walk.
> **Mantra: PAIR BRACKETS, WALK + JUMP + FLIP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=29) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Reverse every bracketed substring, innermost first, and remove the brackets.

## Key insight
Precompute bracket partners; walk, and at a bracket jump to its partner and flip direction. Every char is read once.

## Approach 1: Stack of builders
```java
// Approach 1: stack of builders; on ')' reverse the inner builder and append it to the outer one
public String reverseParenthesesBrute(String s) {
    Deque<StringBuilder> st = new ArrayDeque<>();
    st.push(new StringBuilder());
    for (char c : s.toCharArray()) {
        if (c == '(') st.push(new StringBuilder());
        else if (c == ')') { StringBuilder in = st.pop().reverse(); st.peek().append(in); }
        else st.peek().append(c);
    }
    return st.peek().toString();
}
```

## Approach 2: Wormholes
```java
// Approach 2 (wormholes): pair each bracket with its partner; walk, and at a bracket jump to its partner and flip direction
public String reverseParentheses(String s) {
    int n = s.length();
    int[] pair = new int[n];
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        if (s.charAt(i) == '(') st.push(i);
        else if (s.charAt(i) == ')') { int j = st.pop(); pair[i] = j; pair[j] = i; }
    }
    StringBuilder sb = new StringBuilder();
    for (int i = 0, dir = 1; i < n; i += dir) {
        char c = s.charAt(i);
        if (c == '(' || c == ')') { i = pair[i]; dir = -dir; }
        else sb.append(c);
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Stack of builders | O(n²) | O(n) |
| Wormholes | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Both versions agree on random balanced strings.

## Recall before you reveal
<details><summary>Why does flipping work?</summary>

Odd nesting levels are read reversed.

</details>

