---
topic: Backtracking
pattern: [String backtracking, Precedence trick]
source: LeetCode 282
difficulty: Hard
companies: [Google, Facebook]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Expression Add Operators

> [!TIP]
> **🧠 Memory hook**
> Write +, −, × between digits; × undoes the last term and multiplies it.
> **Mantra: TRACK val AND last; × → val − last + last·cur**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=7) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All ways to insert + − * between digits so the expression equals target.

## Key insight
Carry the value so far and the last multiplicative term; for × replace last by last·cur.

## Approach: Backtracking
```java
// Track the running value and the last multiplicative term so '*' can undo it: val - last + last * cur
private void solve(String num, int target, int i, String expr, long val, long last, List<String> res) {
    if (i == num.length()) { if (val == target) res.add(expr); return; }
    for (int j = i; j < num.length(); j++) {
        if (j > i && num.charAt(i) == '0') break;
        String part = num.substring(i, j + 1);
        long cur = Long.parseLong(part);
        if (i == 0) { solve(num, target, j + 1, part, cur, cur, res); continue; }
        solve(num, target, j + 1, expr + "+" + part, val + cur, cur, res);
        solve(num, target, j + 1, expr + "-" + part, val - cur, -cur, res);
        solve(num, target, j + 1, expr + "*" + part, val - last + last * cur, last * cur, res);
    }
}

// Entry point
public List<String> addOperators(String num, int target) {
    List<String> res = new ArrayList<>();
    solve(num, target, 0, "", 0, 0, res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking | O(4^n · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against evaluating every operator/concatenation choice.

## Recall before you reveal
<details><summary>Leading zeros?</summary>

A piece starting with 0 must have length 1.

</details>

