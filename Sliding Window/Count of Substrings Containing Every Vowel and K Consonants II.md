---
topic: Sliding Window
pattern: [Variable window, Next index]
source: LeetCode 3306
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Count of Substrings Containing Every Vowel and K Consonants II

> [!TIP]
> **🧠 Memory hook**
> Past a valid window you can coast over vowels until the next consonant.
> **Mantra: nextCons[j] − j EXTRA ENDS PER VALID WINDOW**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=12) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count substrings with all five vowels and exactly k consonants.

## Key insight
"Exactly k" is not monotone. Fix it: for a valid [i..j], ends j..nextCons[j]−1 add only vowels and stay valid, so add nextCons[j] − j and shrink.

## Approach: Window + next consonant
```java
// Window with exactly k consonants and all 5 vowels: every end up to the next consonant also works
public long countOfSubstrings(String word, int k) {
    int n = word.length(), cons = 0;
    int[] nextCons = new int[n];
    for (int i = n - 1, last = n; i >= 0; i--) {
        nextCons[i] = last;
        if (!isVowel(word.charAt(i))) last = i;
    }
    Map<Character, Integer> vowels = new HashMap<>();
    long count = 0;
    for (int i = 0, j = 0; j < n; j++) {
        char ch = word.charAt(j);
        if (isVowel(ch)) vowels.merge(ch, 1, Integer::sum); else cons++;
        while (cons > k) cons -= drop(word.charAt(i++), vowels);
        while (i < n && vowels.size() == 5 && cons == k) {
            count += nextCons[j] - j;
            cons -= drop(word.charAt(i++), vowels);
        }
    }
    return count;
}

// Removes one character from the window and returns 1 if it was a consonant
static int drop(char ch, Map<Character, Integer> vowels) {
    if (!isVowel(ch)) return 1;
    if (vowels.merge(ch, -1, Integer::sum) == 0) vowels.remove(ch);
    return 0;
}

// True for a, e, i, o, u
static boolean isVowel(char c) {
    return "aeiou".indexOf(c) >= 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Window + next consonant | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against checking every substring.

## Recall before you reveal
<details><summary>Alternative?</summary>

atLeast(k) − atLeast(k + 1).

</details>


<details><summary>What is nextCons[j]?</summary>

Index of the first consonant after j (or n).

</details>

