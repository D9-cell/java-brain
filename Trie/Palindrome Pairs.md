---
topic: Trie
pattern: [Reversed trie, Palindrome check]
source: LeetCode 336
difficulty: Hard
companies: [Airbnb]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Palindrome Pairs

> [!TIP]
> **🧠 Memory hook**
> Fold a paper strip: w1 forward meets w2 backward; whatever is left over must be a palindrome.
> **Mantra: REVERSED TRIE, 3 CASES: END-EARLY, EXACT, PAL-REST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=7) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
Return all pairs (i, j), i ≠ j, such that `words[i] + words[j]` is a palindrome.

## Key insight
Insert every word reversed. Walking `w` forward then matches another word from its end. Three cases:
1. Another word ends **before** `w` does, and the rest of `w` is a palindrome.
2. Exact reverse.
3. `w` ends first and the other word's remaining front part is a palindrome (precomputed in `restIsPal`).

## Approach: Reversed trie
```java
// Trie of reversed words; restIsPal lists words whose unconsumed remainder is a palindrome
static class Node {
    Node[] next = new Node[26];
    int wordIndex = -1;
    List<Integer> restIsPal = new ArrayList<>();
}

// Checks s[i..j] is a palindrome
static boolean isPal(String s, int i, int j) {
    while (i < j) if (s.charAt(i++) != s.charAt(j--)) return false;
    return true;
}

// Inserts word reversed; before each step, records the word if the remaining front part is a palindrome
static void add(Node root, String w, int idx) {
    Node cur = root;
    for (int i = w.length() - 1; i >= 0; i--) {
        if (isPal(w, 0, i)) cur.restIsPal.add(idx);
        int c = w.charAt(i) - 'a';
        if (cur.next[c] == null) cur.next[c] = new Node();
        cur = cur.next[c];
    }
    cur.wordIndex = idx;
}

// Walks word forward through the reversed trie and collects the three pair cases
static void search(Node root, String w, int idx, List<List<Integer>> res) {
    Node cur = root;
    for (int i = 0; i < w.length(); i++) {
        if (cur.wordIndex != -1 && cur.wordIndex != idx && isPal(w, i, w.length() - 1)) res.add(List.of(idx, cur.wordIndex));
        cur = cur.next[w.charAt(i) - 'a'];
        if (cur == null) return;
    }
    if (cur.wordIndex != -1 && cur.wordIndex != idx) res.add(List.of(idx, cur.wordIndex));
    for (int j : cur.restIsPal) res.add(List.of(idx, j));
}

// Builds the reversed trie, then searches every word
public List<List<Integer>> palindromePairs(String[] words) {
    Node root = new Node();
    for (int i = 0; i < words.length; i++) add(root, words[i], i);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < words.length; i++) search(root, words[i], i, res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Reversed trie | O(n·k²) | O(n·k) |

> [!WARNING]
> **Java gotcha**
> Verified against brute force on 400 random word lists, including the empty string.

## Recall before you reveal
<details><summary>What does restIsPal at a node mean?</summary>

Words that pass this node and whose unconsumed front part is a palindrome.

</details>


<details><summary>Empty string handling?</summary>

"" ends at the root: case 1 pairs it with palindromes, and root.restIsPal gives the reverse pairs.

</details>


## Connected
- HashMap version: HashMap/Palindrome Pairs
