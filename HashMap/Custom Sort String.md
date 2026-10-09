---
topic: HashMap
pattern: [Frequency counting]
source: LeetCode 791
difficulty: Medium
companies: [V, e, r, i, f, i, e, d,  , f, o, r,  , v, a, l, i, d, i, t, y,  , o, n,  , r, a, n, d, o, m,  , i, n, p, u, t, s, .]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Custom Sort String

> [!TIP]
> **🧠 Memory hook**
> Pour letters out of count buckets in the custom order.
> **Mantra: COUNT, POUR IN ORDER, THEN THE REST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=11) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Permute s so letters follow the order string.

## Key insight
Count s; emit letters in order's sequence, then the unlisted letters.

## Approach 1: Counting
```java
// Approach 1: count s's letters; emit them in order's sequence, then everything else
public String customSortString(String order, String s) {
    int[] cnt = new int[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    StringBuilder sb = new StringBuilder();
    for (char c : order.toCharArray()) while (cnt[c - 'a']-- > 0) sb.append(c);
    for (int c = 0; c < 26; c++) while (cnt[c]-- > 0) sb.append((char) ('a' + c));
    return sb.toString();
}
```

## Approach 2: Comparator on rank
```java
// Approach 2: sort with a comparator on the rank in order (unknown letters rank equal, after the known ones)
public String customSortStringComparator(String order, String s) {
    int[] rank = new int[26];
    Arrays.fill(rank, 26);
    for (int i = 0; i < order.length(); i++) rank[order.charAt(i) - 'a'] = i;
    Character[] cs = s.chars().mapToObj(c -> (char) c).toArray(Character[]::new);
    Arrays.sort(cs, (a, b) -> rank[a - 'a'] - rank[b - 'a']);
    StringBuilder sb = new StringBuilder();
    for (char c : cs) sb.append(c);
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Counting | O(n + 26) | O(26) |
| Comparator on rank | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Unlisted letters?</summary>

Anywhere; appended at the end here.

</details>


## Connected
- Facebook
