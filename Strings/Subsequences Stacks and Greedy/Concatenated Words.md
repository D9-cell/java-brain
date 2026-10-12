---
topic: Subsequences Stacks and Greedy
pattern: [Word break]
source: LeetCode 472
difficulty: Hard
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Concatenated Words

> [!TIP]
> **🧠 Memory hook**
> For each word, run **word break** against the set of the **other** words.
> **Mantra: remove w · can[j] = can[i] && dict.contains(w[i..j)) · put w back**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=16) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Return all words that are made of at least two shorter words from the same list.

## Key insight
Taking the word itself out of the set forces at least two pieces. can[j] means the first j characters split into dictionary words.

## Approach: Word break per word
```java
// Word break against the set of the other words: can[j] true if a prefix of length j splits into words
public List<String> findAllConcatenatedWordsInADict(String[] words) {
    Set<String> dict = new HashSet<>(Arrays.asList(words));
    List<String> out = new ArrayList<>();
    for (String w : words) {
        if (w.isEmpty()) continue;
        dict.remove(w);
        if (canBreak(w, dict)) out.add(w);
        dict.add(w);
    }
    return out;
}

// Classic word break DP
boolean canBreak(String w, Set<String> dict) {
    int n = w.length();
    boolean[] can = new boolean[n + 1];
    can[0] = true;
    for (int j = 1; j <= n; j++)
        for (int i = 0; i < j && !can[j]; i++)
            can[j] = can[i] && dict.contains(w.substring(i, j));
    return can[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Word break per word | O(n · L³) | O(total) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why remove the word first?</summary>

Otherwise every word is trivially made of itself.

</details>


<details><summary>Faster lookups?</summary>

A trie of the words avoids substring hashing.

</details>


## Connected
- [Word Break](../../DP/Palindromes%20and%20Word%20Splits/Word%20Break.md)
