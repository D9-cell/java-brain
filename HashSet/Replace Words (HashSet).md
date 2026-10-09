---
topic: HashSet
pattern: [HashSet of prefixes]
source: LeetCode 648
difficulty: Medium
companies: [Uber]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Replace Words (HashSet)

> [!TIP]
> **🧠 Memory hook**
> Try on hats from smallest to largest; the first that fits is the root.
> **Mantra: PREFIXES SHORT → LONG, FIRST HIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=8) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Replace each word in the sentence by its shortest dictionary root.

## Key insight
Put the roots in a HashSet and test each prefix of a word from length 1 upward.

## Approach: HashSet of roots
```java
// Tries prefixes from shortest to longest and returns the first one that is a root
static String findRoot(String word, Set<String> roots) {
    for (int len = 1; len <= word.length(); len++) {
        String p = word.substring(0, len);
        if (roots.contains(p)) return p;
    }
    return word;
}

// Replaces each word by its shortest root
public String replaceWords(List<String> dictionary, String sentence) {
    Set<String> roots = new HashSet<>(dictionary);
    StringJoiner sj = new StringJoiner(" ");
    for (String w : sentence.split(" ")) sj.add(findRoot(w, roots));
    return sj.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| HashSet of roots | O(Σ L²) | O(dict) |

## Recall before you reveal
<details><summary>Trie advantage?</summary>

Each word is O(L) instead of O(L²).

</details>


## Connected
- Trie version: [Trie → Replace Words](../Trie/Replace%20Words.md)
