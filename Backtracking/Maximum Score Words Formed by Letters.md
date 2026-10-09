---
topic: Backtracking
pattern: [Take/skip with resources]
source: LeetCode 1255
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Maximum Score Words Formed by Letters

> [!TIP]
> **🧠 Memory hook**
> Spell words from a bag of tiles; each word uses tiles up.
> **Mantra: SKIP OR TAKE IF LETTERS ALLOW, UNDO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=16) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Max total score of a set of words buildable from the given letters.

## Key insight
For each word: skip, or subtract its letters (if available), recurse, add back.

## Approach: Take/skip
```java
// Take word i if the remaining letters allow it (subtract, recurse, add back), or skip it
private int solve(String[] words, int i, int[] cnt, int[] score) {
    if (i == words.length) return 0;
    int best = solve(words, i + 1, cnt, score);
    int gain = 0;
    boolean ok = true;
    for (char c : words[i].toCharArray()) { if (--cnt[c - 'a'] < 0) ok = false; gain += score[c - 'a']; }
    if (ok) best = Math.max(best, gain + solve(words, i + 1, cnt, score));
    for (char c : words[i].toCharArray()) cnt[c - 'a']++;
    return best;
}

// Entry point
public int maxScoreWords(String[] words, char[] letters, int[] score) {
    int[] cnt = new int[26];
    for (char c : letters) cnt[c - 'a']++;
    return solve(words, 0, cnt, score);
}
```

| Approach | Time | Space |
|---|---|---|
| Take/skip | O(2^w · L) | O(26) |

## Recall before you reveal
<details><summary>Undo?</summary>

Always restore the counts.

</details>

