---
topic: Sliding Window
pattern: [Shortest window]
source: LeetCode 2904
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Shortest and Lexicographically Smallest Beautiful String

> [!TIP]
> **🧠 Memory hook**
> Trim the fat: no extra 1s and no leading 0s.
> **Mantra: WINDOW ≤ k ONES, NO LEADING 0; COMPARE LENGTH THEN LEX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=49) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Among substrings with exactly k ones, return the shortest, ties broken lexicographically.

## Key insight
The best candidates start and end with 1. Keep at most k ones and drop leading zeros; compare each candidate by length, then lexicographically.

## Approach 1: Brute force by length
```java
// Try lengths from k upward; the first length with a beautiful substring wins, smallest string at that length
public String shortestBeautifulSubstringBrute(String s, int k) {
    for (int len = k; len <= s.length(); len++) {
        String best = "";
        for (int st = 0; st + len <= s.length(); st++) {
            String t = s.substring(st, st + len);
            if (t.chars().filter(c -> c == '1').count() == k && (best.isEmpty() || t.compareTo(best) < 0)) best = t;
        }
        if (!best.isEmpty()) return best;
    }
    return "";
}
```

## Approach 2: Window
```java
// Window with at most k ones and no leading zero; each window with exactly k ones is a candidate
public String shortestBeautifulSubstring(String s, int k) {
    int ones = 0;
    String result = "";
    for (int i = 0, j = 0; j < s.length(); j++) {
        if (s.charAt(j) == '1') ones++;
        while (i <= j && (ones > k || s.charAt(i) == '0')) if (s.charAt(i++) == '1') ones--;
        if (ones == k) {
            String t = s.substring(i, j + 1);
            if (result.isEmpty() || t.length() < result.length() || (t.length() == result.length() && t.compareTo(result) < 0)) result = t;
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force by length | O(n³) | O(n) |
| Window | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Java needs `i <= j` in the trim loop; the C++ relies on the `\0` after the string. Both approaches agree on random strings.

## Recall before you reveal
<details><summary>Why O(n²)?</summary>

Comparing candidate strings.

</details>

