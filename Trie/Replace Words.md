---
topic: Trie
pattern: [Trie, Shortest prefix]
source: LeetCode 648
difficulty: Medium
companies: [Uber]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Replace Words

> [!TIP]
> **🧠 Memory hook**
> A word-root detective: walk the word and stop at the first ★.
> **Mantra: FIRST ★ WINS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=4) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
Replace every sentence word with the shortest dictionary root that is its prefix.

## Key insight
Walking left to right, the first end-marker you meet is the shortest matching root.

## Approach: Trie + first end-marker
```java
// Returns the shortest dictionary root that prefixes word, or word itself
static String shortestRoot(Node root, String word) {
    Node cur = root;
    for (int i = 0; i < word.length(); i++) {
        cur = cur.next[word.charAt(i) - 'a'];
        if (cur == null) return word;
        if (cur.end) return word.substring(0, i + 1);
    }
    return word;
}

// Insert all roots, then replace every sentence word by its shortest root
public String replaceWords(java.util.List<String> dictionary, String sentence) {
    Node root = new Node();
    for (String d : dictionary) {
        Node cur = root;
        for (char ch : d.toCharArray()) {
            int i = ch - 'a';
            if (cur.next[i] == null) cur.next[i] = new Node();
            cur = cur.next[i];
        }
        cur.end = true;
    }
    StringBuilder sb = new StringBuilder();
    for (String w : sentence.split(" ")) {
        if (sb.length() > 0) sb.append(' ');
        sb.append(shortestRoot(root, w));
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Trie + first end-marker | O(dict chars + sentence chars) | O(dict chars) |

## Recall before you reveal
<details><summary>Why is the first ★ the shortest root?</summary>

Prefixes are discovered in increasing length.

</details>


<details><summary>Sentence joining in Java?</summary>

`StringBuilder` with a space between words (or `String.join`).

</details>


## Connected
- HashSet version: HashSet/Replace Words
