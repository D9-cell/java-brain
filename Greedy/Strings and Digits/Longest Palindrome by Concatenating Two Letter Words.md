---
topic: Strings and Digits
pattern: [Pair with the reverse, Odd middle]
source: LeetCode 2131
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Longest Palindrome by Concatenating Two Letter Words

> [!TIP]
> **🧠 Memory hook**
> Match every word with its **reversed twin**; one double like `gg` can sit in the middle.
> **Mantra: PAIR WITH REVERSE (+4), ONE xx LEFT OVER (+2)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=7) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Choose some two-letter words and concatenate them in any order into the longest possible palindrome. Return its length.

## Key insight
Use a map of unmatched words. A word whose reverse is waiting forms a pair (+4 letters). At the end, if any word like `aa` remains unmatched, one of it can be the middle (+2).

## Approach 1: Hash map
```java
// Pair each word with its reverse (4 letters per pair); one leftover "xx" word may sit in the middle
public int longestPalindrome(String[] words) {
    Map<String, Integer> cnt = new HashMap<>();
    int len = 0;
    for (String w : words) {
        String rev = "" + w.charAt(1) + w.charAt(0);
        if (cnt.getOrDefault(rev, 0) > 0) { len += 4; cnt.merge(rev, -1, Integer::sum); }
        else cnt.merge(w, 1, Integer::sum);
    }
    for (Map.Entry<String, Integer> e : cnt.entrySet()) if (e.getValue() > 0 && e.getKey().charAt(0) == e.getKey().charAt(1)) return len + 2;
    return len;
}
```

## Approach 2: 26 × 26 grid
```java
// Array of 26 x 26 counters instead of a hash map
public int longestPalindromeGrid(String[] words) {
    int[][] c = new int[26][26];
    int len = 0;
    for (String w : words) {
        int a = w.charAt(0) - 'a', b = w.charAt(1) - 'a';
        if (c[b][a] > 0) { c[b][a]--; len += 4; } else c[a][b]++;
    }
    for (int i = 0; i < 26; i++) if (c[i][i] > 0) return len + 2;
    return len;
}
```

| Approach | Time | Space |
|---|---|---|
| Hash map | O(n) | O(n) |
| 26 × 26 grid | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can several `aa` words not all be used in the middle?</summary>

Only one word can sit exactly in the middle; the others pair with each other.

</details>


## Connected
- [Longest Binary Subsequence Less Than or Equal to K](Longest%20Binary%20Subsequence%20Less%20Than%20or%20Equal%20to%20K.md)
