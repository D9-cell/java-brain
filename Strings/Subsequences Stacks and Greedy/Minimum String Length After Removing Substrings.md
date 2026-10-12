---
topic: Subsequences Stacks and Greedy
pattern: [Stack cancel]
source: LeetCode 2696
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Minimum String Length After Removing Substrings

> [!TIP]
> **🧠 Memory hook**
> Stack: a **B on top of A** or a **D on top of C** cancels. The stack size is the answer.
> **Mantra: c == 'B' && top == 'A' or c == 'D' && top == 'C' → pop · ELSE push**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=5) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Repeatedly remove "AB" or "CD" from s. Return the minimum possible length.

## Key insight
Removing a pair can join its neighbours into a new pair; the stack handles that chain automatically.

## Approach: Stack
```java
// Stack: an A under a new B, or a C under a new D, cancels
public int minLength(String s) {
    StringBuilder st = new StringBuilder();
    for (char c : s.toCharArray()) {
        int n = st.length();
        if (n > 0 && ((c == 'B' && st.charAt(n - 1) == 'A') || (c == 'D' && st.charAt(n - 1) == 'C'))) st.deleteCharAt(n - 1);
        else st.append(c);
    }
    return st.length();
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is greedy removal optimal?</summary>

Removals never block each other: the end result is unique.

</details>


<details><summary>"ABFCACDB"?</summary>

Leaves "FC" → 2.

</details>


## Connected
- [Make The String Great](Make%20The%20String%20Great.md)
