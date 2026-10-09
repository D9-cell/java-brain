---
topic: Backtracking
pattern: [Constrained generation]
source: LeetCode 22
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Generate Parentheses

> [!TIP]
> **🧠 Memory hook**
> A bouncer: open while doors remain, close only an open one.
> **Mantra: OPEN < n → "(", CLOSE < OPEN → ")"**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=10) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All well-formed strings of n pairs.

## Key insight
Only generate valid prefixes; every leaf is valid.

## Approach 1: Generate all + filter
```java
// Approach 1: generate all 2^(2n) strings and keep the valid ones
public List<String> generateBrute(int n) {
    List<String> res = new ArrayList<>();
    for (int m = 0; m < (1 << (2 * n)); m++) {
        StringBuilder sb = new StringBuilder();
        int bal = 0;
        boolean ok = true;
        for (int i = 0; i < 2 * n; i++) { boolean open = (m >> (2 * n - 1 - i) & 1) == 0; sb.append(open ? '(' : ')'); bal += open ? 1 : -1; if (bal < 0) ok = false; }
        if (ok && bal == 0) res.add(sb.toString());
    }
    return res;
}
```

## Approach 2: Smart recursion
```java
// Approach 2: add '(' while open < n, add ')' while close < open; every leaf is valid
private void solve(int open, int close, int n, StringBuilder cur, List<String> res) {
    if (cur.length() == 2 * n) { res.add(cur.toString()); return; }
    if (open < n) { cur.append('('); solve(open + 1, close, n, cur, res); cur.deleteCharAt(cur.length() - 1); }
    if (close < open) { cur.append(')'); solve(open, close + 1, n, cur, res); cur.deleteCharAt(cur.length() - 1); }
}

// Entry point
public List<String> generateParenthesis(int n) {
    List<String> res = new ArrayList<>();
    solve(0, 0, n, new StringBuilder(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Generate all + filter | O(n·4^n) | O(n) |
| Smart recursion | O(Catalan(n)·n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Smart and brute versions agree for n ≤ 8.

## Recall before you reveal
<details><summary>Count?</summary>

Catalan(n).

</details>

