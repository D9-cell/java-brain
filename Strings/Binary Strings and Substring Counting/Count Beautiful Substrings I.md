---
topic: Binary Strings and Substring Counting
pattern: [Enumerate substrings]
source: LeetCode 2947
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count Beautiful Substrings I

> [!TIP]
> **🧠 Memory hook**
> n ≤ 1000: for every start extend the end, keeping **vowel and consonant counts**; check **v == c** and **v·c % k == 0**.
> **Mantra: FOR i: FOR j ≥ i: update v, c · v == c && v·c % k == 0 → count**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=14) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
A substring is beautiful if it has equally many vowels and consonants and (vowels · consonants) % k == 0. Count beautiful substrings.

## Key insight
Running counts make each extension O(1), so all substrings are checked in O(n²).

## Approach: All substrings
```java
// Try every substring with running vowel and consonant counts
public int beautifulSubstrings(String s, int k) {
    int count = 0;
    for (int i = 0; i < s.length(); i++) {
        int v = 0, c = 0;
        for (int j = i; j < s.length(); j++) {
            if ("aeiou".indexOf(s.charAt(j)) >= 0) v++;
            else c++;
            if (v == c && (v * c) % k == 0) count++;
        }
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| All substrings | O(n²) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why running counts?</summary>

Recounting each substring would be O(n³).

</details>


<details><summary>Faster?</summary>

Part II uses a prefix balance and a residue.

</details>


## Connected
- [Count Beautiful Substrings II](Count%20Beautiful%20Substrings%20II.md)
