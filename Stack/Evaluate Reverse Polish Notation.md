---
topic: Stack
pattern: [Operand stack]
source: LeetCode 150
difficulty: Medium
companies: [Apple, Microsoft, Amazon, LinkedIn]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Evaluate Reverse Polish Notation

> [!TIP]
> **🧠 Memory hook**
> A calculator with memory slots: operators eat the top two.
> **Mantra: NUMBERS PUSH, OP POPS b THEN a**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=9) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Evaluate a postfix expression (integer division truncates toward zero).

## Key insight
Push numbers; for an operator pop b then a and push a op b.

## Approach: Stack
```java
// Numbers push; an operator pops b then a and pushes a op b (order matters for - and /)
public int evalRPN(String[] tokens) {
    Deque<Integer> st = new ArrayDeque<>();
    for (String t : tokens) {
        switch (t) {
            case "+" -> st.push(st.pop() + st.pop());
            case "*" -> st.push(st.pop() * st.pop());
            case "-" -> { int b = st.pop(), a = st.pop(); st.push(a - b); }
            case "/" -> { int b = st.pop(), a = st.pop(); st.push(a / b); }
            default -> st.push(Integer.parseInt(t));
        }
    }
    return st.pop();
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |

## Recall before you reveal
<details><summary>Operand order?</summary>

The second pop is the left operand.

</details>


## Connected
- [Basic Calculator](Basic%20Calculator.md)
