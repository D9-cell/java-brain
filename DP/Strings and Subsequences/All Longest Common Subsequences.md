---
topic: Strings and Subsequences
pattern: [LCS grid, Collect every path back]
source: GfG
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# All Longest Common Subsequences

> [!TIP]
> **🧠 Memory hook**
> Walk back through the LCS table but **follow every branch that keeps the length**.
> **Mantra: MATCH → APPEND CHAR · ELSE GO ↑ AND/OR ← IF EQUAL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=1) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Return all distinct longest common subsequences of two strings, sorted lexicographically.

## Key insight
Build the LCS table. From (i, j): a match extends every LCS of (i − 1, j − 1). Otherwise go up if dp[i − 1][j] equals dp[i][j] and left if dp[i][j − 1] does; both can be valid. A set per cell (memoised) removes duplicates.

## Approach: Table + set per cell
```java
// Build the LCS table, then collect strings backwards from (m, n) with a memo per cell
public List<String> allLCS(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    List<String> out = new ArrayList<>(collect(a, b, m, n, dp, new HashMap<>()));
    Collections.sort(out);
    return out;
}

// All LCS strings of a[0..i) and b[0..j)
private Set<String> collect(String a, String b, int i, int j, int[][] dp, Map<Integer, Set<String>> memo) {
    if (i == 0 || j == 0) return Set.of("");
    int key = i * (b.length() + 1) + j;
    if (memo.containsKey(key)) return memo.get(key);
    Set<String> res = new HashSet<>();
    if (a.charAt(i - 1) == b.charAt(j - 1)) {
        for (String s : collect(a, b, i - 1, j - 1, dp, memo)) res.add(s + a.charAt(i - 1));
    } else {
        if (dp[i - 1][j] == dp[i][j]) res.addAll(collect(a, b, i - 1, j, dp, memo));
        if (dp[i][j - 1] == dp[i][j]) res.addAll(collect(a, b, i, j - 1, dp, memo));
    }
    memo.put(key, res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Table + set per cell | output-sensitive | O(m · n · answers) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why a set?</summary>

Different paths can spell the same string.

</details>


<details><summary>Why memoise cells?</summary>

Many paths share the same sub-cells.

</details>


## Connected
- [Longest Common Subsequence](Longest%20Common%20Subsequence.md)
