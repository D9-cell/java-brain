---
topic: Palindromes and Word Splits
pattern: [Memo over (i, j, length), Split with or without swap]
source: LeetCode 87
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Scramble String

> [!TIP]
> **🧠 Memory hook**
> Cut s1 somewhere; the two halves either **stay in place or swap**, recursively.
> **Mantra: FOR EACH CUT k: (L↔L AND R↔R) OR (L↔R-END AND R↔L-START)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=8) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
s2 is a scramble of s1 if s1 can be split into two non-empty parts, each part scrambled, and the parts optionally swapped. Return true if s2 is a scramble of s1.

## Key insight
A state is a substring of s1 and an equally long substring of s2 (start1, start2, length). Try every cut: the first k letters of s1 match either the first k or the last k letters of s2. Different letter counts prune immediately.

## Approach: Memo over (i, j, len)
```java
// Memo over (start in s1, start in s2, length): try every split, swapped or not
public boolean isScramble(String s1, String s2) {
    int n = s1.length();
    return go(s1, s2, 0, 0, n, new Boolean[n][n][n + 1]);
}

// Whether s1[i..i+len) scrambles into s2[j..j+len)
private boolean go(String a, String b, int i, int j, int len, Boolean[][][] memo) {
    if (memo[i][j][len] != null) return memo[i][j][len];
    if (a.regionMatches(i, b, j, len)) return memo[i][j][len] = true;
    int[] cnt = new int[26];
    for (int k = 0; k < len; k++) { cnt[a.charAt(i + k) - 'a']++; cnt[b.charAt(j + k) - 'a']--; }
    for (int c : cnt) if (c != 0) return memo[i][j][len] = false;
    for (int k = 1; k < len; k++) {
        if (go(a, b, i, j, k, memo) && go(a, b, i + k, j + k, len - k, memo)) return memo[i][j][len] = true;
        if (go(a, b, i, j + len - k, k, memo) && go(a, b, i + k, j, len - k, memo)) return memo[i][j][len] = true;
    }
    return memo[i][j][len] = false;
}
```

| Approach | Time | Space |
|---|---|---|
| Memo over (i, j, len) | O(n⁴) | O(n³) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why the letter-count check?</summary>

Scrambling never changes the multiset; it prunes most branches.

</details>


<details><summary>State size?</summary>

n² starts × n lengths.

</details>


## Connected
- [Interleaving String](../Strings%20and%20Subsequences/Interleaving%20String.md)
- Burst Balloons
