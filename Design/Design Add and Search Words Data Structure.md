---
topic: Design
pattern: [Trie, DFS with wildcard]
source: LeetCode 211
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design Add and Search Words Data Structure

> [!TIP]
> **🧠 Memory hook**
> A trie where a dot is a fork in the road.
> **Mantra: TRIE + DFS ON "."**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=3) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
Support addWord and search where "." matches any letter.

## Key insight
Insert normally. Search recursively: a letter follows one child; "." tries all 26.

## Approach: Trie + DFS
```java
// Trie node
static class Node {
    Node[] next = new Node[26];
    boolean end;
}

// Trie where '.' in a search branches into every child
static class WordDictionary {
    private final Node root = new Node();

    // Standard trie insert
    public void addWord(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            if (cur.next[c - 'a'] == null) cur.next[c - 'a'] = new Node();
            cur = cur.next[c - 'a'];
        }
        cur.end = true;
    }

    // DFS from node at position i; '.' tries all children
    private boolean dfs(Node node, String w, int i) {
        if (node == null) return false;
        if (i == w.length()) return node.end;
        char c = w.charAt(i);
        if (c != '.') return dfs(node.next[c - 'a'], w, i + 1);
        for (Node child : node.next) if (dfs(child, w, i + 1)) return true;
        return false;
    }

    // Public search
    public boolean search(String word) { return dfs(root, word, 0); }
}
```

| Approach | Time | Space |
|---|---|---|
| Trie + DFS | add O(L), search O(26^dots·L) | O(total chars) |

> [!WARNING]
> **Java gotcha**
> Verified against a regex model on random words and patterns.

## Recall before you reveal
<details><summary>Base case?</summary>

End of word → node.end.

</details>


## Connected
- [Implement Trie (Prefix Tree)](../Trie/Implement%20Trie%20%28Prefix%20Tree%29.md)
