---
topic: Trie
pattern: [Trie, Reverse for suffix]
source: LeetCode 3042
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Count Prefix and Suffix Pairs I

> [!TIP]
> **🧠 Memory hook**
> A suffix is a prefix seen in a mirror: reverse both strings and reuse the prefix check.
> **Mantra: PREFIX TRIE + REVERSED TRIE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=2) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
Count pairs `i < j` where `words[i]` is both a prefix and a suffix of `words[j]`.

## Key insight
For each j, a prefix trie of `words[j]` answers the prefix check, and a trie of reversed `words[j]` answers the suffix check.

## Approach 1: Brute force
```java
// Approach 1: direct startsWith/endsWith on every pair
public int countPrefixSuffixPairsBrute(String[] words) {
    int c = 0;
    for (int i = 0; i < words.length; i++)
        for (int j = i + 1; j < words.length; j++)
            if (words[j].startsWith(words[i]) && words[j].endsWith(words[i])) c++;
    return c;
}
```

## Approach 2: Two tries per j
```java
// Inserts s into the trie rooted at root
static void insert(Node root, String s) {
    Node cur = root;
    for (char ch : s.toCharArray()) {
        int i = ch - 'a';
        if (cur.next[i] == null) cur.next[i] = new Node();
        cur = cur.next[i];
    }
}

// True if s is a path from root (i.e. a prefix of the inserted word)
static boolean hasPrefix(Node root, String s) {
    Node cur = root;
    for (char ch : s.toCharArray()) {
        cur = cur.next[ch - 'a'];
        if (cur == null) return false;
    }
    return true;
}

// Approach 2: for each j build a prefix trie of words[j] and a trie of reversed words[j]
public int countPrefixSuffixPairs(String[] words) {
    int c = 0;
    for (int j = 0; j < words.length; j++) {
        Node pre = new Node(), suf = new Node();
        insert(pre, words[j]);
        insert(suf, new StringBuilder(words[j]).reverse().toString());
        for (int i = 0; i < j; i++) {
            if (words[i].length() > words[j].length()) continue;
            if (hasPrefix(pre, words[i]) && hasPrefix(suf, new StringBuilder(words[i]).reverse().toString())) c++;
        }
    }
    return c;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n²·L) | O(1) |
| Two tries per j | O(n²·L) | O(L) |

## Recall before you reveal
<details><summary>How do you test "suffix" with a trie?</summary>

Insert reversed strings and check reversed candidates as prefixes.

</details>


<details><summary>Version II idea?</summary>

One trie keyed by (s[i], s[n−1−i]) pairs.

</details>


## Connected
- Reversed trie again: [Longest Common Suffix Queries](Longest%20Common%20Suffix%20Queries.md)
