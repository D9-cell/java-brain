---
topic: Design
pattern: [Sorting + binary search, Trie]
source: LeetCode 1268
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Search Suggestions System

> [!TIP]
> **🧠 Memory hook**
> In a dictionary, all words with a prefix sit on the same page.
> **Mantra: SORT + LOWER BOUND + TAKE 3**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=27) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
After each typed character, return up to 3 lexicographically smallest products with that prefix.

## Key insight
Sort; for each prefix lower-bound the first product ≥ prefix and take up to 3 that still match.

## Approach 1: Trie keeping the top 3
```java
// Trie node keeping up to 3 lexicographically smallest words through it
static class Node {
    Node[] next = new Node[26];
    List<String> top = new ArrayList<>();
}

// Approach 1: sort products, insert into a trie; each node keeps the first 3 words that pass it
public List<List<String>> suggestedProductsTrie(String[] products, String searchWord) {
    Arrays.sort(products);
    Node root = new Node();
    for (String p : products) {
        Node cur = root;
        for (char c : p.toCharArray()) {
            if (cur.next[c - 'a'] == null) cur.next[c - 'a'] = new Node();
            cur = cur.next[c - 'a'];
            if (cur.top.size() < 3) cur.top.add(p);
        }
    }
    List<List<String>> res = new ArrayList<>();
    Node cur = root;
    for (char c : searchWord.toCharArray()) {
        cur = cur == null ? null : cur.next[c - 'a'];
        res.add(cur == null ? new ArrayList<>() : cur.top);
    }
    return res;
}
```

## Approach 2: Sort + binary search
```java
// Approach 2: sort, then for each prefix binary-search the first product >= prefix and take up to 3 matches
public List<List<String>> suggestedProducts(String[] products, String searchWord) {
    Arrays.sort(products);
    List<List<String>> res = new ArrayList<>();
    int start = 0;
    String prefix = "";
    for (char c : searchWord.toCharArray()) {
        prefix += c;
        int lo = start, hi = products.length;
        while (lo < hi) { int m = (lo + hi) >>> 1; if (products[m].compareTo(prefix) < 0) lo = m + 1; else hi = m; }
        start = lo;
        List<String> cur = new ArrayList<>();
        for (int i = lo; i < Math.min(lo + 3, products.length) && products[i].startsWith(prefix); i++) cur.add(products[i]);
        res.add(cur);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Trie keeping the top 3 | O(total chars) | O(total chars) |
| Sort + binary search | O(n log n + L log n) | O(1) extra |

> [!WARNING]
> **Java gotcha**
> Both approaches agree with a filter-and-sort model on random inputs.

## Recall before you reveal
<details><summary>Why can the search start move only right?</summary>

A longer prefix sorts no earlier.

</details>


## Connected
- [Trie - Pattern Map](../Trie/Trie%20-%20Pattern%20Map.md)
