---
topic: Stack
pattern: [Index stack with base]
source: LeetCode 32
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Longest Valid Parentheses

> [!TIP]
> **🧠 Memory hook**
> A base marker remembers where the current valid run started.
> **Mantra: STACK OF INDICES, BASE −1, LENGTH = i − TOP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=12) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Length of the longest valid parentheses substring.

## Key insight
Stack of indices starting with −1. "(" pushes; ")" pops; if empty push i as the new base, else the run length is i − top.

## Approach 1: Two-pass counters
```java
// Approach 1: count open/close left→right (reset when close > open) and right→left (reset when open > close)
public int longestValidParenthesesTwoPass(String s) {
    int best = 0, open = 0, close = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') open++; else close++;
        if (open == close) best = Math.max(best, 2 * close); else if (close > open) open = close = 0;
    }
    open = close = 0;
    for (int i = s.length() - 1; i >= 0; i--) {
        if (s.charAt(i) == '(') open++; else close++;
        if (open == close) best = Math.max(best, 2 * open); else if (open > close) open = close = 0;
    }
    return best;
}
```

## Approach 2: Stack
```java
// Approach 2: stack of indices with a base marker; after a match, length = i - (new top)
public int longestValidParentheses(String s) {
    Deque<Integer> st = new ArrayDeque<>();
    st.push(-1);
    int best = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == '(') st.push(i);
        else {
            st.pop();
            if (st.isEmpty()) st.push(i);
            else best = Math.max(best, i - st.peek());
        }
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Two-pass counters | O(n) | O(1) |
| Stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Both verified against checking every substring.

## Recall before you reveal
<details><summary>Why two passes in the counter version?</summary>

One direction misses runs with extra "(" (or ")").

</details>

