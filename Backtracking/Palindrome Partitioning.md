---
topic: Backtracking
pattern: [String partition backtracking]
source: LeetCode 131 / GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Palindrome Partitioning

> [!TIP]
> **🧠 Memory hook**
> Cut a ribbon only where the cut-off piece reads the same both ways.
> **Mantra: PAL TABLE, CUT ONLY AFTER PALINDROMES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=20) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All partitions of s into palindromes.

## Key insight
Precompute pal[i][j]; from i, try every palindromic prefix s[i..j].

## Approach: Backtracking + DP table
```java
// Approach 2: precompute pal[i][j] so each cut check is O(1), then cut only at palindromic prefixes
private void solve(String s, int i, boolean[][] pal, List<String> cur, List<List<String>> res) {
    if (i == s.length()) { res.add(new ArrayList<>(cur)); return; }
    for (int j = i; j < s.length(); j++) {
        if (!pal[i][j]) continue;
        cur.add(s.substring(i, j + 1));
        solve(s, j + 1, pal, cur, res);
        cur.remove(cur.size() - 1);
    }
}

// Builds the palindrome table bottom-up, then backtracks
public List<List<String>> partition(String s) {
    int n = s.length();
    boolean[][] pal = new boolean[n][n];
    for (int i = n - 1; i >= 0; i--)
        for (int j = i; j < n; j++) pal[i][j] = s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1]);
    List<List<String>> res = new ArrayList<>();
    solve(s, 0, pal, new ArrayList<>(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking + DP table | O(n·2^n) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against all cut masks.

## Recall before you reveal
<details><summary>Table recurrence?</summary>

pal[i][j] = s[i]==s[j] && (j−i<2 || pal[i+1][j−1]).

</details>


## Connected
- DP folder: Palindrome Partitioning II
