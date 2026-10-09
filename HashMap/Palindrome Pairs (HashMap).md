---
topic: HashMap
pattern: [Map of reversed words, Split points]
source: LeetCode 336
difficulty: Hard
companies: [Airbnb, Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Palindrome Pairs (HashMap)

> [!TIP]
> **🧠 Memory hook**
> Cut each word: one part must be a palindrome, the other a reversed word.
> **Mantra: MAP OF REVERSED WORDS, TRY EVERY CUT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=37) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
All (i, j) with words[i] + words[j] a palindrome.

## Key insight
For each cut of w: if left is a reversed word and right is a palindrome → (i, j); if right is a reversed word and left is a palindrome → (j, i).

## Approach: Map + cuts
```java
// s[i..j] is a palindrome
static boolean isPal(String s, int i, int j) {
    while (i < j) if (s.charAt(i++) != s.charAt(j--)) return false;
    return true;
}

// Map reversed words to indices; split each word at every cut: palindrome prefix + reversed-suffix word, or palindrome suffix + reversed-prefix word
public List<List<Integer>> palindromePairs(String[] words) {
    Map<String, Integer> rev = new HashMap<>();
    for (int i = 0; i < words.length; i++) rev.put(new StringBuilder(words[i]).reverse().toString(), i);
    Set<List<Integer>> res = new LinkedHashSet<>();
    for (int i = 0; i < words.length; i++) {
        String w = words[i];
        for (int cut = 0; cut <= w.length(); cut++) {
            String left = w.substring(0, cut), right = w.substring(cut);
            Integer j = rev.get(left);
            if (j != null && j != i && isPal(w, cut, w.length() - 1)) res.add(List.of(i, j));
            j = rev.get(right);
            if (j != null && j != i && isPal(w, 0, cut - 1)) res.add(List.of(j, i));
        }
    }
    return new ArrayList<>(res);
}
```

| Approach | Time | Space |
|---|---|---|
| Map + cuts | O(n·L²) | O(n·L) |

> [!WARNING]
> **Java gotcha**
> Verified against all ordered pairs.

## Recall before you reveal
<details><summary>Duplicates at cut 0 / L?</summary>

Use a set, or skip one side at the edges.

</details>


## Connected
- [Palindrome Pairs](../Trie/Palindrome%20Pairs.md)
- [Longest Palindrome by Concatenating Two Letter Words](Longest%20Palindrome%20by%20Concatenating%20Two%20Letter%20Words.md)
