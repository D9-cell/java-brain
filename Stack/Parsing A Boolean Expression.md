---
topic: Stack
pattern: [Saved state]
source: LeetCode 1106
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Parsing A Boolean Expression

> [!TIP]
> **🧠 Memory hook**
> Read until ")" and evaluate the innermost group.
> **Mantra: PUSH, ON ")" COLLECT AND APPLY**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=23) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Evaluate t, f, !(…), &(…), |(…).

## Key insight
Push everything except commas; on ")" pop operands to "(", pop the operator, push the result.

## Approach: Stack
```java
// Push everything except ',' ; on ')' pop the operands down to '(' and apply the operator under it
public boolean parseBoolExpr(String e) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : e.toCharArray()) {
        if (c == ',') continue;
        if (c != ')') { st.push(c); continue; }
        boolean anyT = false, anyF = false;
        while (st.peek() != '(') { if (st.pop() == 't') anyT = true; else anyF = true; }
        st.pop();
        char op = st.pop();
        boolean v = op == '!' ? anyF : op == '&' ? !anyF : anyT;
        st.push(v ? 't' : 'f');
    }
    return st.peek() == 't';
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a recursive evaluator on 1000 random expressions.

## Recall before you reveal
<details><summary>What must be collected?</summary>

Whether any t and any f occurred.

</details>

