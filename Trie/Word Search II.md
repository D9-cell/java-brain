---
topic: Trie
pattern: [Trie, DFS backtracking on grid]
source: LeetCode 212
difficulty: Hard
companies: [Google, Amazon, Meta, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Word Search II

> [!TIP]
> **🧠 Memory hook**
> A guided maze walk: the trie is the tour guide; no guide edge, no step.
> **Mantra: ONE TRIE, ONE DFS, PRUNE BY TRIE, ERASE FOUND**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=8) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
Return all words from the list that can be traced on the board using adjacent cells (no reuse within a word).

## Key insight
Put all words in one trie. DFS from every cell, but only move to a neighbour whose letter is a child of the current trie node. Store the word at its end node and null it after finding it.

## Approach: Trie-guided backtracking
```java
// DFS from a cell, moving only along trie edges; marks visited cells with '$'
private void dfs(char[][] b, int i, int j, Node parent) {
    if (i < 0 || j < 0 || i >= b.length || j >= b[0].length || b[i][j] == '$') return;
    Node cur = parent.next[b[i][j] - 'a'];
    if (cur == null) return;
    if (cur.word != null) {
        result.add(cur.word);
        cur.word = null;
    }
    char saved = b[i][j];
    b[i][j] = '$';
    for (int[] d : DIRS) dfs(b, i + d[0], j + d[1], cur);
    b[i][j] = saved;
}

// Puts all words in one trie so a single board DFS searches every word at once
public List<String> findWords(char[][] board, String[] words) {
    Node root = new Node();
    for (String w : words) {
        Node cur = root;
        for (char ch : w.toCharArray()) {
            int c = ch - 'a';
            if (cur.next[c] == null) cur.next[c] = new Node();
            cur = cur.next[c];
        }
        cur.word = w;
    }
    for (int i = 0; i < board.length; i++)
        for (int j = 0; j < board[0].length; j++) dfs(board, i, j, root);
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Trie-guided backtracking | O(cells · 4 · 3^(L−1)) | O(total chars) |

## Recall before you reveal
<details><summary>Why null out `word` after adding it?</summary>

To avoid duplicate results.

</details>


<details><summary>Visited marking?</summary>

Set the cell to '$' and restore it after exploring.

</details>


## Connected
- Word Search I: the `Backtracking` folder
- [Implement Trie (Prefix Tree)](Implement%20Trie%20%28Prefix%20Tree%29.md)
