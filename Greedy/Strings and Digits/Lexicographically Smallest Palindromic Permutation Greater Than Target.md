---
topic: Strings and Digits
pattern: [Choose the left half, Mirror]
source: LeetCode
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Lexicographically Smallest Palindromic Permutation Greater Than Target

> [!TIP]
> **🧠 Memory hook**
> A palindrome is decided by its **left half**; search the half, mirror it, compare with the target.
> **Mantra: HALF COUNTS, BACKTRACK THE HALF, MIRROR AND COMPARE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=5) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Return the lexicographically smallest palindromic permutation of `s` that is greater than `target`, or "".

## Key insight
At most one letter may have an odd count (the middle). Work with half the counts and choose the left half letter by letter in increasing order, staying tight with the target while its prefix matches. The full candidate is `half + middle + reverse(half)`.

## Approach: Half backtracking
```java
// Only the left half is chosen (the rest is its mirror plus the odd middle letter); search the half letter by letter like the plain permutation problem
public String lexPalindromicPermutation(String s, String target) {
    int n = s.length();
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    int odd = 0;
    char mid = 0;
    for (int c = 0; c < 26; c++) if (count[c] % 2 == 1) { odd++; mid = (char) ('a' + c); }
    if (odd > 1) return "";
    int[] half = new int[26];
    for (int c = 0; c < 26; c++) half[c] = count[c] / 2;
    String[] result = {""};
    search(new StringBuilder(), half, mid, target, n / 2, result);
    return result[0];
}

// Tries each letter for the next half position; at the end the full palindrome is compared with the target
private boolean search(StringBuilder cur, int[] half, char mid, String target, int len, String[] result) {
    if (cur.length() == len) {
        String right = new StringBuilder(cur).reverse().toString();
        String cand = cur.toString() + (mid != 0 ? String.valueOf(mid) : "") + right;
        if (cand.compareTo(target) > 0) { result[0] = cand; return true; }
        return false;
    }
    int i = cur.length();
    for (char ch = 'a'; ch <= 'z'; ch++) {
        if (half[ch - 'a'] == 0) continue;
        if (ch < target.charAt(i) && prefixSmaller(cur, target)) continue;
        cur.append(ch);
        half[ch - 'a']--;
        if (search(cur, half, mid, target, len, result)) return true;
        cur.setLength(cur.length() - 1);
        half[ch - 'a']++;
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Half backtracking | O(26 n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why compare only after building the half?</summary>

The mirrored right half is fixed by the left half, and the first differing position is usually in the left half.

</details>


## Connected
- [Lexicographically Smallest Permutation Greater Than Target](Lexicographically%20Smallest%20Permutation%20Greater%20Than%20Target.md)
- [Smallest Palindromic Rearrangement I](Smallest%20Palindromic%20Rearrangement%20I.md)
