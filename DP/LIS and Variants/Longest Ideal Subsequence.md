---
topic: LIS and Variants
pattern: [Keyed by letter, Window of predecessors]
source: LeetCode 2370
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Longest Ideal Subsequence

> [!TIP]
> **🧠 Memory hook**
> Only 26 letters exist, so keep **best[letter]** and look at the 2k + 1 letters around the new one.
> **Mantra: best[c] = 1 + max best[c − k .. c + k]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=7) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Find the longest subsequence of s where adjacent letters differ by at most k in the alphabet.

## Key insight
Instead of scanning earlier indexes, store the best length ending in each letter. A new letter c extends the best of the letters within k of it, then overwrites best[c].

## Approach: Best per letter
```java
// best[c] = longest ideal subsequence ending in letter c; extend from letters within k
public int longestIdealString(String s, int k) {
    int[] best = new int[26];
    int ans = 0;
    for (char ch : s.toCharArray()) {
        int c = ch - 'a', cur = 1;
        for (int p = Math.max(0, c - k); p <= Math.min(25, c + k); p++) cur = Math.max(cur, best[p] + 1);
        best[c] = cur;
        ans = Math.max(ans, cur);
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Best per letter | O(n · 26) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why overwrite best[c] without max?</summary>

cur is already at least best[c] + 1 when c is inside its own range.

</details>


<details><summary>k larger than 25?</summary>

The clamp to 0..25 handles it.

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
- [Longest String Chain](Longest%20String%20Chain.md)
