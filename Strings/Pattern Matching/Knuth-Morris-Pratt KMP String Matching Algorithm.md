---
topic: Pattern Matching
pattern: [KMP, lps array]
source: Classic (KMP)
difficulty: Medium
companies: [Google, Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Knuth-Morris-Pratt KMP String Matching Algorithm

> [!TIP]
> **🧠 Memory hook**
> lps[i] = longest **proper prefix of p[0..i] that is also a suffix**. On a mismatch jump **j = lps[j − 1]** instead of moving back in the text.
> **Mantra: build lps · match → i++ and j++ · mismatch → j = lps[j−1] (or i++ when j = 0) · full match → record and j = lps[j−1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Pattern%20Matching/Pattern%20Matching%20Animations.html#p=0) · **Pattern hub:** [Pattern Matching - Pattern Map](Pattern%20Matching%20-%20Pattern%20Map.md)

## Problem
Find all occurrences of pattern p in text s in O(n + m) time.

## Key insight
When j characters matched and the next one fails, the last lps[j − 1] text characters already equal the start of p, so matching resumes from there. The text index never moves backwards, so the scan is linear. Building lps is the same algorithm run on p against itself.

## Approach 1: lps table
```java
// lps[i] = length of the longest proper prefix of p[0..i] that is also a suffix of it
public int[] buildLps(String p) {
    int[] lps = new int[p.length()];
    for (int i = 1, len = 0; i < p.length(); ) {
        if (p.charAt(i) == p.charAt(len)) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    return lps;
}
```

## Approach 2: Search
```java
// All start indexes of p in s; on a mismatch fall back through lps instead of moving i back
public List<Integer> search(String s, String p) {
    int[] lps = buildLps(p);
    List<Integer> out = new ArrayList<>();
    for (int i = 0, j = 0; i < s.length(); ) {
        if (s.charAt(i) == p.charAt(j)) {
            i++;
            j++;
            if (j == p.length()) {
                out.add(i - j);
                j = lps[j - 1];
            }
        } else if (j > 0) j = lps[j - 1];
        else i++;
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| lps table | O(m) | O(m) |
| Search | O(n + m) | O(m) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why proper prefix?</summary>

The whole string as its own prefix would make lps useless.

</details>


<details><summary>Why does i never go back?</summary>

The fallback reuses what is known to match.

</details>


## Connected
- [Find the Index of the First Occurrence in a String](Find%20the%20Index%20of%20the%20First%20Occurrence%20in%20a%20String.md)
- [Shortest Palindrome](Shortest%20Palindrome.md)
