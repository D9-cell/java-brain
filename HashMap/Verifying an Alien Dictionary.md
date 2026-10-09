---
topic: HashMap
pattern: [Lookup table, Custom comparison]
source: LeetCode 953
difficulty: Easy
companies: [V, e, r, i, f, i, e, d,  , a, g, a, i, n, s, t,  , S, t, r, i, n, g, ., c, o, m, p, a, r, e, T, o,  , w, i, t, h,  , t, h, e,  , n, o, r, m, a, l,  , a, l, p, h, a, b, e, t, .]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Verifying an Alien Dictionary

> [!TIP]
> **🧠 Memory hook**
> Translate the alphabet to ranks and compare neighbours.
> **Mantra: RANK ARRAY, ADJACENT PAIRS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=43) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Are the words sorted in the alien alphabet order?

## Key insight
Sortedness only needs adjacent pairs; the first differing letter decides, else the shorter word first.

## Approach: Rank compare
```java
// Compares two words with the alien rank: first differing letter decides, else the shorter word first
static int compare(String a, String b, int[] rank) {
    for (int i = 0; i < Math.min(a.length(), b.length()); i++)
        if (a.charAt(i) != b.charAt(i)) return rank[a.charAt(i) - 'a'] - rank[b.charAt(i) - 'a'];
    return a.length() - b.length();
}

// Only adjacent pairs need checking
public boolean isAlienSorted(String[] words, String order) {
    int[] rank = new int[26];
    for (int i = 0; i < 26; i++) rank[order.charAt(i) - 'a'] = i;
    for (int i = 0; i + 1 < words.length; i++) if (compare(words[i], words[i + 1], rank) > 0) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Rank compare | O(total length) | O(26) |

## Recall before you reveal
<details><summary>"apple" after "app"?</summary>

Unsorted.

</details>


## Connected
- Facebook
