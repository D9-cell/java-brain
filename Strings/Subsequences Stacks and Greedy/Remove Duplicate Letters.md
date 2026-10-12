---
topic: Subsequences Stacks and Greedy
pattern: [Monotonic stack, Last occurrence]
source: LeetCode 316
difficulty: Medium
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Remove Duplicate Letters

> [!TIP]
> **🧠 Memory hook**
> Keep a stack in increasing order: **pop a bigger top if it appears again later**. Skip letters already in the stack.
> **Mantra: in stack → skip · WHILE top > c && last[top] > i: pop · push c**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=7) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Remove duplicate letters so every letter appears once and the result is the smallest in lexicographic order among all such subsequences.

## Key insight
A bigger letter before a smaller one should be dropped, but only if a copy of it remains later. Letters already placed are final, because their position was the best possible.

## Approach: Monotonic stack
```java
// Monotonic stack: pop a bigger letter if it appears again later
public String removeDuplicateLetters(String s) {
    int[] last = new int[26];
    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;
    boolean[] inStack = new boolean[26];
    StringBuilder st = new StringBuilder();
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        if (inStack[c - 'a']) continue;
        while (st.length() > 0 && st.charAt(st.length() - 1) > c && last[st.charAt(st.length() - 1) - 'a'] > i) {
            inStack[st.charAt(st.length() - 1) - 'a'] = false;
            st.deleteCharAt(st.length() - 1);
        }
        st.append(c);
        inStack[c - 'a'] = true;
    }
    return st.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic stack | O(n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why check last[top] > i?</summary>

Without a later copy the letter would be lost.

</details>


<details><summary>Same as which problem?</summary>

Smallest Subsequence of Distinct Characters (1081).

</details>


## Connected
- [Remove K Digits](../../Stack/Remove%20K%20Digits.md)
- [Using a Robot to Print the Lexicographically Smallest String](Using%20a%20Robot%20to%20Print%20the%20Lexicographically%20Smallest%20String.md)
