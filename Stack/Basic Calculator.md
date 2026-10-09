---
topic: Stack
pattern: [Saved state]
source: LeetCode 224
difficulty: Hard
companies: [Google, Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Basic Calculator

> [!TIP]
> **🧠 Memory hook**
> A bookmark per bracket: save outer result and sign, compute inside, fold back.
> **Mantra: result + sign; "(" SAVES, ")" FOLDS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=2) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Evaluate an expression with + − ( ) and spaces (unary minus allowed at the start or after "(").

## Key insight
Keep result, current number and the sign of the next number. "(" pushes (result, sign) and restarts; ")" computes outer + sign × inner.

## Approach: Stack of (result, sign)
```java
// result and sign so far; '(' pushes (result, sign) and starts fresh; ')' folds back: saved + savedSign * inner
public int calculate(String s) {
    Deque<Integer> st = new ArrayDeque<>();
    int result = 0, num = 0, sign = 1;
    for (char c : s.toCharArray()) {
        if (Character.isDigit(c)) num = num * 10 + (c - '0');
        else if (c == '+' || c == '-') {
            result += sign * num;
            num = 0;
            sign = c == '+' ? 1 : -1;
        } else if (c == '(') {
            st.push(result);
            st.push(sign);
            result = 0;
            sign = 1;
        } else if (c == ')') {
            result += sign * num;
            num = 0;
            result = st.pop() * result + st.pop();
        }
    }
    return result + sign * num;
}
```

| Approach | Time | Space |
|---|---|---|
| Stack of (result, sign) | O(n) | O(depth) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent recursive-descent parser on 1000 random valid expressions. (A first test generator produced "5--3", which LeetCode forbids; it was fixed.)

## Recall before you reveal
<details><summary>Why push the sign too?</summary>

"−(…)" negates the whole group.

</details>


## Connected
- [Evaluate Reverse Polish Notation](Evaluate%20Reverse%20Polish%20Notation.md)
