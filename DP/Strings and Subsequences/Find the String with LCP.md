---
topic: Strings and Subsequences
pattern: [Greedy build + DP verify, LCP recurrence]
source: LeetCode 2573
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Find the String with LCP

> [!TIP]
> **🧠 Memory hook**
> `lcp[i][j] > 0` means **s[i] == s[j]**: group positions, give letters in order, then check the whole matrix.
> **Mantra: BUILD: NEW GROUP → NEXT LETTER · VERIFY: lcp[i][j] = s[i] == s[j] ? lcp[i+1][j+1] + 1 : 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=15) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
lcp[i][j] is the longest common prefix of the suffixes starting at i and j. Given the matrix, return the lexicographically smallest lowercase string with exactly this matrix, or "".

## Key insight
Scan left to right; an unassigned position starts a new group and gets the next unused letter (smallest possible), and every j with lcp[i][j] > 0 gets the same letter. Then recompute what the LCP must be from the bottom-right corner and compare.

## Approach: Greedy + verify
```java
// Greedy: lcp[i][j] > 0 forces equal letters; give each new group the next letter; then rebuild the LCP and compare
public String findTheString(int[][] lcp) {
    int n = lcp.length;
    char[] s = new char[n];
    char next = 'a';
    for (int i = 0; i < n; i++) {
        if (s[i] != 0) continue;
        if (next > 'z') return "";
        for (int j = i; j < n; j++) if (lcp[i][j] > 0) s[j] = next;
        next++;
    }
    for (int i = n - 1; i >= 0; i--)
        for (int j = n - 1; j >= 0; j--) {
            int want = s[i] != s[j] ? 0 : (i + 1 < n && j + 1 < n ? lcp[i + 1][j + 1] + 1 : 1);
            if (lcp[i][j] != want) return "";
        }
    return new String(s);
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy + verify | O(n²) | O(1) extra |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why verify?</summary>

The input may be inconsistent (wrong diagonal, asymmetric, wrong lengths).

</details>


<details><summary>When do letters run out?</summary>

More than 26 groups → "".

</details>


## Connected
- [Longest Common Substring](Longest%20Common%20Substring.md)
