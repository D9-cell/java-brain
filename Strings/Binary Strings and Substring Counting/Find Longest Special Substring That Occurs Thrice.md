---
topic: Binary Strings and Substring Counting
pattern: [Runs, Top three]
source: LeetCode 2981, 2982
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find Longest Special Substring That Occurs Thrice

> [!TIP]
> **🧠 Memory hook**
> Per letter keep the **three longest runs** t0 ≥ t1 ≥ t2. Best length: **max(t0 − 2, min(t0 − 1, t1), t2)**.
> **Mantra: top3 runs per letter · max(t0−2, min(t0−1, t1), t2) · none → −1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=19) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
A special string is made of one repeated character. Return the length of the longest special substring that occurs at least three times in s, or -1. (Part II is the same with n up to 5·10⁵.)

## Key insight
Three occurrences come from one run (length t0 − 2 fits three times), from two runs (t0 − 1 twice in the longest, or t1), or from three runs (the shortest of the top three).

## Approach: Top three runs
```java
// Keep the three longest runs per letter; the answer for a letter comes from those three
public int maximumLength(String s) {
    int[][] top = new int[26][3];
    for (int i = 0; i < s.length(); ) {
        int j = i;
        while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
        int[] t = top[s.charAt(i) - 'a'];
        int len = j - i;
        if (len > t[0]) {
            t[2] = t[1];
            t[1] = t[0];
            t[0] = len;
        } else if (len > t[1]) {
            t[2] = t[1];
            t[1] = len;
        } else if (len > t[2]) t[2] = len;
        i = j;
    }
    int best = 0;
    for (int[] t : top) best = Math.max(best, Math.max(t[0] - 2, Math.max(Math.min(t[0] - 1, t[1]), t[2])));
    return best == 0 ? -1 : best;
}
```

| Approach | Time | Space |
|---|---|---|
| Top three runs | O(n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why t0 − 2?</summary>

A run of length L contains L − len + 1 copies of a length-len block.

</details>


<details><summary>Why min(t0 − 1, t1)?</summary>

Two copies from the longest run plus one from the second.

</details>


## Connected
- [Count Number of Homogenous Substrings](Count%20Number%20of%20Homogenous%20Substrings.md)
