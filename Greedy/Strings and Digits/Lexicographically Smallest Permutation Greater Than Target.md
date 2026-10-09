---
topic: Strings and Digits
pattern: [Next greater with a bag of letters]
source: LeetCode
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Lexicographically Smallest Permutation Greater Than Target

> [!TIP]
> **🧠 Memory hook**
> Follow the target as long as you can; at the first position where you can exceed it, **choose the smallest bigger letter** and then fill the rest ascending.
> **Mantra: TIGHT WITH THE TARGET, BREAK OUT WITH THE SMALLEST LARGER LETTER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=4) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Return the lexicographically smallest permutation of `s` that is strictly greater than `target` (same length), or "".

## Key insight
Backtrack position by position over letters in increasing order. While the prefix equals the target prefix only letters ≥ the target letter are allowed. Once a bigger letter is placed the remaining letters in sorted order give the smallest completion.

## Approach: Backtracking over counts
```java
// Build the answer letter by letter: stay equal to target while possible, and branch to a larger letter (then the rest is just the smallest remaining letters)
public String lexGreaterPermutation(String s, String target) {
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    StringBuilder cur = new StringBuilder();
    return solve(cur, count, target, 0, false) ? cur.toString() : "";
}

// Tries letters in increasing order; `greater` means the prefix is already larger than the target
private boolean solve(StringBuilder cur, int[] count, String target, int i, boolean greater) {
    if (i == target.length()) return greater;
    for (char ch = 'a'; ch <= 'z'; ch++) {
        if (count[ch - 'a'] == 0) continue;
        if (!greater && ch < target.charAt(i)) continue;
        cur.append(ch);
        count[ch - 'a']--;
        if (solve(cur, count, target, i + 1, greater || ch > target.charAt(i))) return true;
        cur.setLength(cur.length() - 1);
        count[ch - 'a']++;
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking over counts | O(26 n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does the search not blow up?</summary>

There is only one "tight" path; leaving it succeeds immediately if any letter is available.

</details>


## Connected
- [Lexicographically Smallest Palindromic Permutation Greater Than Target](Lexicographically%20Smallest%20Palindromic%20Permutation%20Greater%20Than%20Target.md)
