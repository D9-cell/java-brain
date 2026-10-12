---
topic: Character Counts and Anagrams
pattern: [Sorted key]
source: LeetCode 2273
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find Resultant Array After Removing Anagrams

> [!TIP]
> **🧠 Memory hook**
> Delete a word when it is an anagram of the one just before it. Compare **sorted keys** with the last word seen.
> **Mantra: key = sorted(w) · key != prevKey → keep · prevKey = key**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=7) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Repeatedly delete words[i] if it is an anagram of words[i − 1]. Return the remaining words.

## Key insight
Deleting a word leaves its previous neighbour, which is an anagram of it, so comparing each word with the previous original word gives the same result in one pass.

## Approach: Sorted key scan
```java
// Keep a word only if it is not an anagram of the last kept word
public List<String> removeAnagrams(String[] words) {
    List<String> out = new ArrayList<>();
    String prevKey = "";
    for (String w : words) {
        char[] c = w.toCharArray();
        Arrays.sort(c);
        String key = new String(c);
        if (!key.equals(prevKey)) out.add(w);
        prevKey = key;
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted key scan | O(n · L log L) | O(L) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why update prevKey even when deleting?</summary>

The deleted word and its kept neighbour are anagrams, so the key is the same.

</details>


<details><summary>Faster key?</summary>

A 26-count string avoids sorting.

</details>


## Connected
- [Valid Anagram](Valid%20Anagram.md)
