---
topic: Trie
pattern: [Reversed trie, Best value per node]
source: LeetCode 3093
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Longest Common Suffix Queries

> [!TIP]
> **🧠 Memory hook**
> Every node is a notice board showing the best word that passed by (shortest, then earliest).
> **Mantra: REVERSE, KEEP BEST AT EVERY NODE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=6) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
For each query, return the index of the container word with the longest common suffix; ties → shortest length → smallest index.

## Key insight
Insert container words reversed. Each node (and the root) stores the best index among words passing through it. A query walks as far as it can, and the last node's best is the answer.

## Approach: Reversed trie with best index
```java
// Reversed-word trie node remembering the best container index (shortest, then earliest) below it
static class Node {
    Node[] next = new Node[26];
    int best;

    Node(int best) { this.best = best; }
}

// Inserts container words reversed; every node keeps the best index among words passing through
public int[] stringIndices(String[] container, String[] queries) {
    Node root = new Node(0);
    for (int i = 0; i < container.length; i++) {
        String w = container[i];
        if (w.length() < container[root.best].length()) root.best = i;
        Node cur = root;
        for (int j = w.length() - 1; j >= 0; j--) {
            int c = w.charAt(j) - 'a';
            if (cur.next[c] == null) cur.next[c] = new Node(i);
            cur = cur.next[c];
            if (w.length() < container[cur.best].length()) cur.best = i;
        }
    }
    int[] res = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        String w = queries[q];
        Node cur = root;
        for (int j = w.length() - 1; j >= 0 && cur.next[w.charAt(j) - 'a'] != null; j--) cur = cur.next[w.charAt(j) - 'a'];
        res[q] = cur.best;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Reversed trie with best index | O(total chars) | O(total chars × 26) |

## Recall before you reveal
<details><summary>Why update the root too?</summary>

A query with no common suffix returns the overall shortest word.

</details>


<details><summary>Why strict < ?</summary>

To keep the earliest index on equal lengths.

</details>


## Connected
- [Count Prefix and Suffix Pairs I](Count%20Prefix%20and%20Suffix%20Pairs%20I.md)
