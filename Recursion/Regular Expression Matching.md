---
topic: Recursion
pattern: [Recursion + memo]
source: LeetCode 10
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Regular Expression Matching

> [!TIP]
> **🧠 Memory hook**
> A game of choices at every "x*": skip it, or eat one matching char and stay. A memo table stops replaying the same game.
> **Mantra: x* → SKIP OR (MATCH AND STAY); MEMO (i, j)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=17) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Implement matching with "." (any char) and "*" (zero or more of the previous element) over the whole string.

## Key insight
State (i, j). If p[j+1] == '*': solve(i, j+2) || (first && solve(i+1, j)). Else first && solve(i+1, j+1).

## Approach 1: Plain recursion
```java
// Approach 1: plain recursion on substrings (exponential)
public boolean isMatchPlain(String s, String p) {
    if (p.isEmpty()) return s.isEmpty();
    boolean first = !s.isEmpty() && (p.charAt(0) == s.charAt(0) || p.charAt(0) == '.');
    if (p.length() >= 2 && p.charAt(1) == '*')
        return isMatchPlain(s, p.substring(2)) || (first && isMatchPlain(s.substring(1), p));
    return first && isMatchPlain(s.substring(1), p.substring(1));
}
```

## Approach 2: Memoised
```java
// Approach 2: same choices on indices (i, j) with memoisation
private boolean solve(int i, int j, String s, String p) {
    if (j == p.length()) return i == s.length();
    if (memo[i][j] != null) return memo[i][j];
    boolean first = i < s.length() && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');
    boolean ans;
    if (j + 1 < p.length() && p.charAt(j + 1) == '*') ans = solve(i, j + 2, s, p) || (first && solve(i + 1, j, s, p));
    else ans = first && solve(i + 1, j + 1, s, p);
    return memo[i][j] = ans;
}

// Entry point
public boolean isMatch(String s, String p) {
    memo = new Boolean[s.length() + 1][p.length() + 1];
    return solve(0, 0, s, p);
}
```

| Approach | Time | Space |
|---|---|---|
| Plain recursion | exponential | O(|s|+|p|) |
| Memoised | O(|s|·|p|) | O(|s|·|p|) |

> [!WARNING]
> **Java gotcha**
> Cross-checked against `String.matches` on 1000 random (s, p) pairs.

## Recall before you reveal
<details><summary>Base case?</summary>

j == |p| → i == |s|.

</details>


<details><summary>Memo type in Java?</summary>

`Boolean[][]` so null means not computed.

</details>


## Connected
- Bottom-up DP version: the DP folder
