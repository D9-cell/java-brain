---
topic: LIS and Variants
pattern: [Chain DP, Rebuild with prev]
source: LeetCode 2901
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Longest Unequal Adjacent Groups Subsequence II

> [!TIP]
> **🧠 Memory hook**
> Same chain DP as LIS: the relation is **different group and Hamming distance 1**.
> **Mantra: dp[i] = 1 + max dp[j] WHERE groups DIFFER AND words DIFFER BY ONE LETTER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=12) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Pick the longest subsequence of words where neighbours have different groups and equal-length words differing in exactly one position. Return the words.

## Key insight
The relation is only about neighbours in the chosen subsequence, so a plain O(n² · L) DP with prev[] works.

## Approach: Chain DP + prev
```java
// LIS-style chain: neighbours differ in group, have equal length and Hamming distance 1
public List<String> getWordsInLongestSubsequence(String[] words, int[] groups) {
    int n = words.length, end = 0;
    int[] dp = new int[n], prev = new int[n];
    for (int i = 0; i < n; i++) {
        dp[i] = 1;
        prev[i] = -1;
        for (int j = 0; j < i; j++)
            if (groups[i] != groups[j] && hamming1(words[i], words[j]) && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        if (dp[i] > dp[end]) end = i;
    }
    LinkedList<String> res = new LinkedList<>();
    for (int i = end; i >= 0; i = prev[i]) res.addFirst(words[i]);
    return res;
}

// Whether a and b have equal length and differ in exactly one position
private boolean hamming1(String a, String b) {
    if (a.length() != b.length()) return false;
    int diff = 0;
    for (int i = 0; i < a.length(); i++) if (a.charAt(i) != b.charAt(i) && ++diff > 1) return false;
    return diff == 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Chain DP + prev | O(n² · L) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Is the relation transitive?</summary>

No, which is fine: only adjacent chosen items are checked.

</details>


<details><summary>Multiple answers?</summary>

Any longest one is accepted.

</details>


## Connected
- [Largest Divisible Subset](Largest%20Divisible%20Subset.md)
- [Longest String Chain](Longest%20String%20Chain.md)
