---
topic: Sliding Window
pattern: [Fixed window, Count array]
source: LeetCode 567
difficulty: Medium
companies: [Microsoft, Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Permutation in String

> [!TIP]
> **🧠 Memory hook**
> Slide a letter-count stencil of length |s1|.
> **Mantra: FIXED WINDOW |s1|, EQUAL COUNTS ⇒ TRUE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=46) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Does s2 contain a permutation of s1 as a substring?

## Key insight
A permutation is a window of length |s1| with the same letter counts.

## Approach 1: Sort each window
```java
// Sort s1 once, then sort every window of s2 of the same length and compare
public boolean checkInclusionSort(String s1, String s2) {
    int n = s1.length(), m = s2.length();
    if (n > m) return false;
    char[] a = s1.toCharArray();
    Arrays.sort(a);
    for (int i = 0; i + n <= m; i++) {
        char[] w = s2.substring(i, i + n).toCharArray();
        Arrays.sort(w);
        if (Arrays.equals(a, w)) return true;
    }
    return false;
}
```

## Approach 2: Fixed window
```java
// Fixed window of |s1| over s2 with two count arrays; equal arrays mean a permutation
public boolean checkInclusion(String s1, String s2) {
    int n = s1.length(), m = s2.length();
    if (n > m) return false;
    int[] need = new int[26], have = new int[26];
    for (char c : s1.toCharArray()) need[c - 'a']++;
    for (int i = 0, j = 0; j < m; j++) {
        have[s2.charAt(j) - 'a']++;
        if (j - i + 1 > n) have[s2.charAt(i++) - 'a']--;
        if (Arrays.equals(need, have)) return true;
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort each window | O((m − n) · n log n) | O(n) |
| Fixed window | O(26 · m) | O(26) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on random strings.

## Recall before you reveal
<details><summary>Brute force?</summary>

All permutations of s1: O(n!).

</details>


## Connected
- [Find All Anagrams in a String](Find%20All%20Anagrams%20in%20a%20String.md)
- [Count Occurences of Anagrams](Count%20Occurences%20of%20Anagrams.md)
