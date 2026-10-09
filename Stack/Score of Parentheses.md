---
topic: Stack
pattern: [Depth counting]
source: LeetCode 856
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Score of Parentheses

> [!TIP]
> **🧠 Memory hook**
> Only the innermost "()" cores score; each enclosing pair doubles them.
> **Mantra: CORE AT DEPTH d → 2^d**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=31) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
"()" = 1, AB = A + B, (A) = 2·A.

## Key insight
Each core "()" at depth d contributes 2^d.

## Approach 1: Stack of scores
```java
// Approach 1: stack of partial scores; ')' closes: max(2 * inner, 1) added to the outer score
public int scoreOfParenthesesStack(String s) {
    Deque<Integer> st = new ArrayDeque<>();
    st.push(0);
    for (char c : s.toCharArray()) {
        if (c == '(') st.push(0);
        else { int inner = st.pop(); st.push(st.pop() + Math.max(2 * inner, 1)); }
    }
    return st.pop();
}
```

## Approach 2: Depth
```java
// Approach 2: only "()" cores score, each worth 2^(depth at that point)
public int scoreOfParentheses(String s) {
    int depth = 0, score = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == '(') depth++;
        else { depth--; if (s.charAt(i - 1) == '(') score += 1 << depth; }
    }
    return score;
}
```

| Approach | Time | Space |
|---|---|---|
| Stack of scores | O(n) | O(n) |
| Depth | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both versions agree on random balanced strings.

## Recall before you reveal
<details><summary>Stack rule at ")"?</summary>

outer += max(2 · inner, 1).

</details>

