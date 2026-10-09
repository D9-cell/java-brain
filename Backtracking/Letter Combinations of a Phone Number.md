---
topic: Backtracking
pattern: [Cartesian product]
source: LeetCode 17
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Letter Combinations of a Phone Number

> [!TIP]
> **🧠 Memory hook**
> An odometer: each dial turns through its letters.
> **Mantra: ONE DIGIT PER LEVEL, EACH LETTER A BRANCH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=11) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All letter strings a digit string could represent.

## Key insight
Depth = digit index; branch over that key's letters.

## Approach: Backtracking
```java
// One digit per level; each letter of that key is a branch
private void solve(String digits, int i, StringBuilder cur, List<String> res) {
    if (i == digits.length()) { res.add(cur.toString()); return; }
    for (char c : KEYS[digits.charAt(i) - '0'].toCharArray()) {
        cur.append(c);
        solve(digits, i + 1, cur, res);
        cur.deleteCharAt(cur.length() - 1);
    }
}

// Empty input → empty list
public List<String> letterCombinations(String digits) {
    List<String> res = new ArrayList<>();
    if (!digits.isEmpty()) solve(digits, 0, new StringBuilder(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking | O(4^n · n) | O(n) |

## Recall before you reveal
<details><summary>Empty input?</summary>

Return [] (not [""]).

</details>

