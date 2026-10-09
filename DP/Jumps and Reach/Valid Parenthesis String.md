---
topic: Jumps and Reach
pattern: [Range of open counts, Memo over (i, open)]
source: LeetCode 678
difficulty: Medium
companies: [Amazon, Meta]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Valid Parenthesis String

> [!TIP]
> **🧠 Memory hook**
> Do not decide what each `*` is: keep the **range of possible open counts** [lo, hi].
> **Mantra: ( → lo++, hi++ · ) → lo−−, hi−− · * → lo−−, hi++; hi < 0 → false; lo = max(lo, 0)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=11) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
A string has '(', ')' and '*', where '*' can be '(', ')' or empty. Return true if it can be balanced.

## Key insight
The memo over (index, open count) tries all three meanings of `*`. The set of reachable open counts is always a contiguous range, so the greedy keeps only its ends: hi < 0 means too many closers; lo is clamped at 0; the string is valid if 0 is in the range at the end.

## Approach 1: Range greedy
```java
// Greedy: keep the range [lo, hi] of possible open counts
public boolean checkValidString(String s) {
    int lo = 0, hi = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') { lo++; hi++; }
        else if (c == ')') { lo--; hi--; }
        else { lo--; hi++; }
        if (hi < 0) return false;
        lo = Math.max(lo, 0);
    }
    return lo == 0;
}
```

## Approach 2: Memo over (i, open)
```java
// Top-down over (index, open count)
public boolean checkValidStringMemo(String s) {
    return ok(s, 0, 0, new Boolean[s.length() + 1][s.length() + 1]);
}

// Whether s[i..] can close exactly open brackets
private boolean ok(String s, int i, int open, Boolean[][] memo) {
    if (open < 0) return false;
    if (i == s.length()) return open == 0;
    if (memo[i][open] != null) return memo[i][open];
    char c = s.charAt(i);
    boolean r;
    if (c == '(') r = ok(s, i + 1, open + 1, memo);
    else if (c == ')') r = ok(s, i + 1, open - 1, memo);
    else r = ok(s, i + 1, open + 1, memo) || ok(s, i + 1, open - 1, memo) || ok(s, i + 1, open, memo);
    return memo[i][open] = r;
}
```

| Approach | Time | Space |
|---|---|---|
| Range greedy | O(n) | O(1) |
| Memo over (i, open) | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why clamp lo at 0?</summary>

A negative open count is impossible; that choice of `*` is simply discarded.

</details>


<details><summary>Why is the set an interval?</summary>

Every `*` widens by one in both directions, and brackets shift it.

</details>


## Connected
- [Valid Parentheses](../../Stack/Valid%20Parentheses.md)
- [Jump Game](Jump%20Game.md)
