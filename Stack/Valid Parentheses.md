---
topic: Stack
pattern: [Matching]
source: LeetCode 20
difficulty: Easy
companies: [Amazon, Google, Meta]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Valid Parentheses

> [!TIP]
> **🧠 Memory hook**
> Push the closer you expect.
> **Mantra: PUSH EXPECTED CLOSER, MATCH ON CLOSE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=36) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Are brackets closed in the correct order?

## Key insight
Push the matching closer for every opener; a closer must equal the popped value; the stack must end empty.

## Approach 1: Basic stack
```java
    // Approach 1: push openers; a closer must match the top
    public boolean isValidBasic(String s) {
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') { st.push(c); continue; }
            if (st.isEmpty()) return false;
            char o = st.pop();
            if ((c == ')' && o != '(') || (c == ']' && o != '[') || (c == '}' && o != '{')) return false;
        }
        return st.isEmpty();
    }

    // Approach 2 (tricky): push the EXPECTED closer; a closer must equal the popped expectation
    public boolean isValid(String s) {
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') st.push(')');
            else if (c == '[') st.push(']');
            else if (c == '{') st.push('}');
            else if (st.isEmpty() || st.pop() != c) return false;
        }
        return st.isEmpty();
    }

    // Repeatedly delete "()", "[]", "{}", used only to verify
    static boolean brute(String s) {
        String prev;
        do { prev = s; s = s.replace("()", "").replace("[]", "").replace("{}", ""); } while (!s.equals(prev));
        return s.isEmpty();
    }

    // Samples plus random strings for both approaches
    public static void main(String[] args) {
        ValidParentheses v = new ValidParentheses();
        boolean ok = v.isValid("()") && v.isValid("()[]{}") && !v.isValid("(]") && v.isValid("([])") && !v.isValid("([)]");
        Random r = new Random(28);
        int bad = 0;
        for (int it = 0; it < 2000; it++) {
            StringBuilder b = new StringBuilder();
            for (int k = r.nextInt(8); k > 0; k--) b.append("()[]{}".charAt(r.nextInt(6)));
            boolean e = brute(b.toString());
            if (v.isValid(b.toString()) != e || v.isValidBasic(b.toString()) != e) bad++;
        }
        System.out.println((ok && bad == 0 ? "OK   " : "FAIL ") + "samples + random vs repeated deletion, mismatches=" + bad);
    }
}
```

## Approach 2: Push expected closer
```java
// Approach 2 (tricky): push the EXPECTED closer; a closer must equal the popped expectation
public boolean isValid(String s) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(') st.push(')');
        else if (c == '[') st.push(']');
        else if (c == '{') st.push('}');
        else if (st.isEmpty() || st.pop() != c) return false;
    }
    return st.isEmpty();
}
```

| Approach | Time | Space |
|---|---|---|
| Basic stack | O(n) | O(n) |
| Push expected closer | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against repeatedly deleting "()", "[]", "{}".

## Recall before you reveal
<details><summary>Odd length?</summary>

Instantly invalid.

</details>

