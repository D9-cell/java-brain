---
topic: Subsequences Stacks and Greedy
pattern: [Balance counter, Two passes]
source: LeetCode 1249
difficulty: Medium
companies: [Meta, Amazon, Bloomberg]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Minimum Remove to Make Valid Parentheses

> [!TIP]
> **🧠 Memory hook**
> Left pass drops every **")" with no open partner**. Then drop the **leftover "(" from the right end**.
> **Mantra: pass 1: open count, skip bad ) · pass 2 from the right: skip open extra (**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=6) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Remove the minimum number of parentheses so the string is valid. Return any valid result.

## Key insight
Unmatched ")" are found left to right. The count left open after pass 1 is the number of unmatched "(", and removing the rightmost ones keeps every remaining ")" matched.

## Approach: Two passes
```java
// Left pass drops ')' with no open partner; right pass drops the extra '(' from the end
public String minRemoveToMakeValid(String s) {
    StringBuilder sb = new StringBuilder();
    int open = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') open++;
        else if (c == ')') {
            if (open == 0) continue;
            open--;
        }
        sb.append(c);
    }
    StringBuilder out = new StringBuilder();
    for (int i = sb.length() - 1; i >= 0; i--) {
        if (sb.charAt(i) == '(' && open > 0) {
            open--;
            continue;
        }
        out.append(sb.charAt(i));
    }
    return out.reverse().toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Two passes | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why remove the rightmost "("?</summary>

A "(" can only match ")" to its right, so the last ones are unmatched.

</details>


<details><summary>Stack version?</summary>

Push indexes of "(" and mark unmatched ones.

</details>


## Connected
- [Valid Parenthesis String](../../DP/Jumps%20and%20Reach/Valid%20Parenthesis%20String.md)
- [Make The String Great](Make%20The%20String%20Great.md)
