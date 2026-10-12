---
topic: Subsequences Stacks and Greedy
pattern: [Stack cancel]
source: LeetCode 1544
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Make The String Great

> [!TIP]
> **🧠 Memory hook**
> Stack of letters: if the new letter is the **same letter in the other case** as the top, **pop**; else push.
> **Mantra: |top − c| == 32 → pop · ELSE push**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=4) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Remove adjacent pairs like "aA" or "Bb" repeatedly. Return the final string.

## Key insight
A removal can expose a new adjacent pair, exactly the way a stack top changes after a pop.

## Approach: Stack
```java
// Stack: drop the top when the new letter is its other case
public String makeGood(String s) {
    StringBuilder st = new StringBuilder();
    for (char c : s.toCharArray()) {
        int n = st.length();
        if (n > 0 && Math.abs(st.charAt(n - 1) - c) == 32) st.deleteCharAt(n - 1);
        else st.append(c);
    }
    return st.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why 32?</summary>

Upper and lower case ASCII codes differ by 32.

</details>


<details><summary>Order of removals?</summary>

The final result is the same in any order.

</details>


## Connected
- [Minimum String Length After Removing Substrings](Minimum%20String%20Length%20After%20Removing%20Substrings.md)
- [Backspace String Compare](Backspace%20String%20Compare.md)
