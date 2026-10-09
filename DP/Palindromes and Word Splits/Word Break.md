---
topic: Palindromes and Word Splits
pattern: [Prefix + last word, Boolean DP]
source: LeetCode 139
difficulty: Medium
companies: [Amazon, Google, Meta]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Word Break

> [!TIP]
> **🧠 Memory hook**
> Read the string from the left: a prefix is good if it is **a good prefix plus one dictionary word**.
> **Mantra: ok[i] = ∃ j: ok[j] AND s[j..i) ∈ dict**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=6) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Return true if s can be segmented into one or more dictionary words (words may be reused).

## Key insight
ok[i] says s[0..i) can be segmented. The last word is s[j..i); only j within the longest word length matter. The memo version tries every word as the next piece.

## Approach 1: Prefix booleans
```java
// ok[i] = s[0..i) splits; the last word is s[j..i) for some ok[j]
public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> dict = new HashSet<>(wordDict);
    int maxLen = 0;
    for (String w : wordDict) maxLen = Math.max(maxLen, w.length());
    boolean[] ok = new boolean[s.length() + 1];
    ok[0] = true;
    for (int i = 1; i <= s.length(); i++)
        for (int j = Math.max(0, i - maxLen); j < i && !ok[i]; j++) ok[i] = ok[j] && dict.contains(s.substring(j, i));
    return ok[s.length()];
}
```

## Approach 2: Top-down memo
```java
// Top-down: try every dictionary word as the next piece
public boolean wordBreakMemo(String s, List<String> wordDict) {
    return can(s, 0, wordDict, new Boolean[s.length() + 1]);
}

// Whether s[i..] splits into words
private boolean can(String s, int i, List<String> dict, Boolean[] memo) {
    if (i == s.length()) return true;
    if (memo[i] != null) return memo[i];
    for (String w : dict) if (s.startsWith(w, i) && can(s, i + w.length(), dict, memo)) return memo[i] = true;
    return memo[i] = false;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix booleans | O(n · L) | O(n) |
| Top-down memo | O(n · words · L) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why limit j by the longest word?</summary>

A longer last piece cannot be in the dictionary.

</details>


<details><summary>All sentences?</summary>

Word Break II: backtracking on top of this check.

</details>


## Connected
- [Word Break II](../../Backtracking/Word%20Break%20II.md)
- [Extra Characters in a String](Extra%20Characters%20in%20a%20String.md)
- [Decode Ways](../Stairs%20and%20Robbers/Decode%20Ways.md)
