---
topic: Character Counts and Anagrams
pattern: [Merge requirements]
source: LeetCode 916
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Word Subsets

> [!TIP]
> **🧠 Memory hook**
> All of words2 must fit, so merge them into one requirement: **max count of each letter**.
> **Mantra: need[c] = max over words2 · keep words1 with count ≥ need**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=6) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
A word a is universal if every word b in words2 is a subset of a (counting multiplicity). Return the universal words of words1.

## Key insight
b fits in a iff a has at least b's count of each letter. Checking every b separately is slow; the per-letter maximum over words2 captures all of them at once.

## Approach: Max requirement
```java
// Merge words2 into one requirement: the max count of each letter over all of them
public List<String> wordSubsets(String[] words1, String[] words2) {
    int[] need = new int[26];
    for (String w : words2) {
        int[] c = count(w);
        for (int i = 0; i < 26; i++) need[i] = Math.max(need[i], c[i]);
    }
    List<String> out = new ArrayList<>();
    for (String w : words1) {
        int[] c = count(w);
        boolean ok = true;
        for (int i = 0; i < 26 && ok; i++) ok = c[i] >= need[i];
        if (ok) out.add(w);
    }
    return out;
}

// Letter counts of one word
int[] count(String w) {
    int[] c = new int[26];
    for (char ch : w.toCharArray()) c[ch - 'a']++;
    return c;
}
```

| Approach | Time | Space |
|---|---|---|
| Max requirement | O(total length) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why max and not sum?</summary>

Each b is checked separately, so a shared letter does not add up.

</details>


<details><summary>Complexity gain?</summary>

From |words1|·|words2| checks to |words1| + |words2|.

</details>


## Connected
- [Find Words That Can Be Formed by Characters](Find%20Words%20That%20Can%20Be%20Formed%20by%20Characters.md)
