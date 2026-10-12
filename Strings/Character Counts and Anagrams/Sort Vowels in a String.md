---
topic: Character Counts and Anagrams
pattern: [Counting sort]
source: LeetCode 2785
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Sort Vowels in a String

> [!TIP]
> **🧠 Memory hook**
> Consonants stay. Count vowels by **ASCII code** and refill the vowel slots in **increasing code**.
> **Mantra: cnt[vowel]++ · vowel slot ← smallest remaining code**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=18) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Permute s so consonants stay in place and vowels are sorted by ASCII value.

## Key insight
Only 10 vowel characters exist, so a counting sort replaces collecting and sorting. Upper-case vowels have smaller codes and come first.

## Approach: Counting sort
```java
// Count vowels by ASCII code, then refill vowel slots in increasing code order
public String sortVowels(String s) {
    int[] cnt = new int[128];
    for (char c : s.toCharArray()) if (isVowel(c)) cnt[c]++;
    char[] out = s.toCharArray();
    int code = 0;
    for (int i = 0; i < out.length; i++) {
        if (!isVowel(out[i])) continue;
        while (cnt[code] == 0) code++;
        out[i] = (char) code;
        cnt[code]--;
    }
    return new String(out);
}

// Upper or lower case vowel
boolean isVowel(char c) {
    return "aeiouAEIOU".indexOf(c) >= 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Counting sort | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why do capitals come first?</summary>

A–Z have smaller ASCII codes than a–z.

</details>


<details><summary>Why counting sort?</summary>

The key range is tiny.

</details>


## Connected
- [Determine if String Halves Are Alike](Determine%20if%20String%20Halves%20Are%20Alike.md)
