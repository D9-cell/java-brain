---
topic: Palindromes and Word Splits
pattern: [Prefix + last word, Min cost]
source: LeetCode 2707
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Extra Characters in a String

> [!TIP]
> **🧠 Memory hook**
> Word Break where a letter may be **left over at a cost of 1**.
> **Mantra: dp[i] = min(dp[i − 1] + 1, dp[j] IF s[j..i) ∈ dict)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=7) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Split s into non-overlapping dictionary words; characters not covered are extra. Return the minimum number of extra characters.

## Key insight
dp[i] = fewest extras in s[0..i). The last character is either extra (dp[i − 1] + 1) or ends a dictionary word s[j..i) (dp[j]).

## Approach: Prefix DP
```java
// dp[i] = fewest extra chars in s[0..i): leave s[i-1] extra or end a word at i
public int minExtraChar(String s, String[] dictionary) {
    Set<String> dict = new HashSet<>(Arrays.asList(dictionary));
    int n = s.length();
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + 1;
        for (int j = 0; j < i; j++) if (dict.contains(s.substring(j, i))) dp[i] = Math.min(dp[i], dp[j]);
    }
    return dp[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix DP | O(n³) with substrings | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Speed-up?</summary>

A trie over reversed words, walking left from i.

</details>


<details><summary>Relation to Word Break?</summary>

Word Break asks whether the minimum is 0.

</details>


## Connected
- [Word Break](Word%20Break.md)
