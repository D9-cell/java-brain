---
topic: Trie
pattern: [Trie basics]
source: LeetCode 208
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Implement Trie (Prefix Tree)

> [!TIP]
> **🧠 Memory hook**
> Thumb-index tabs of a dictionary; a ★ sticker where a real word ends.
> **Mantra: WALK, CREATE IF MISSING, ★ AT THE END**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=0) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
Implement `insert`, `search` (whole word) and `startsWith` (prefix).

## Key insight
Every path from the root spells a prefix. `search` and `startsWith` share the same walk; only `search` also checks the ★.

## Approach: Array-of-26 trie
```java
// One node per character position; 26 child links and an end-of-word flag
static class Node {
    Node[] next = new Node[26];
    boolean end;
}

// Trie with insert, search and startsWith, each O(length)
static class Trie {
    private final Node root = new Node();

    // Walks down, creating missing nodes, and marks the last node as a word end
    public void insert(String word) {
        Node cur = root;
        for (char ch : word.toCharArray()) {
            int i = ch - 'a';
            if (cur.next[i] == null) cur.next[i] = new Node();
            cur = cur.next[i];
        }
        cur.end = true;
    }

    // Returns the node reached by following s, or null if the path breaks
    private Node walk(String s) {
        Node cur = root;
        for (char ch : s.toCharArray()) {
            cur = cur.next[ch - 'a'];
            if (cur == null) return null;
        }
        return cur;
    }

    // A whole word exists only if the path exists and ends on a word end
    public boolean search(String word) {
        Node n = walk(word);
        return n != null && n.end;
    }

    // A prefix exists if the path exists at all
    public boolean startsWith(String prefix) {
        return walk(prefix) != null;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Array-of-26 trie | O(L) per operation | O(total chars × 26) |

## Recall before you reveal
<details><summary>search vs startsWith?</summary>

Same walk; search also requires `end == true`.

</details>


<details><summary>Why a shared `walk` helper?</summary>

DRY: both operations follow the same path.

</details>


## Connected
- [Counting Words With a Given Prefix](Counting%20Words%20With%20a%20Given%20Prefix.md)
- [Replace Words](Replace%20Words.md)
- [Word Search II](Word%20Search%20II.md)
