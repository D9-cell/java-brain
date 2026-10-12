---
topic: Prefix Sums Basics
pattern: [Prefix count]
source: LeetCode 2559
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Count Vowel Strings in Ranges

> [!TIP]
> **🧠 Memory hook**
> Turn each word into a **0/1 flag** (starts and ends with a vowel); a prefix of flags answers each range in O(1).
> **Mantra: pre[i+1] = pre[i] + flag · answer = pre[r+1] − pre[l]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=5) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
For each query [l, r] return how many words in that range start and end with a vowel.

## Key insight
The same prefix idea works for any yes/no property over a range.

## Approach: Prefix of flags
```java
// Prefix count of words that start and end with a vowel answers each range in O(1)
public int[] vowelStrings(String[] words, int[][] queries) {
    int n = words.length;
    int[] pre = new int[n + 1];
    for (int i = 0; i < n; i++) {
        String w = words[i];
        boolean good = isVowel(w.charAt(0)) && isVowel(w.charAt(w.length() - 1));
        pre[i + 1] = pre[i] + (good ? 1 : 0);
    }
    int[] out = new int[queries.length];
    for (int q = 0; q < queries.length; q++) out[q] = pre[queries[q][1] + 1] - pre[queries[q][0]];
    return out;
}

// Lowercase vowel
boolean isVowel(char c) {
    return "aeiou".indexOf(c) >= 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix of flags | O(n + q) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why pre of size n + 1?</summary>

pre[0] = 0 makes l = 0 work.

</details>


<details><summary>Other properties?</summary>

Any per-element yes/no works the same way.

</details>


## Connected
- [Find Pivot Index](Find%20Pivot%20Index.md)
