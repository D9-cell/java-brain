---
topic: Trie
pattern: [Trie, Pass counts]
source: LeetCode 2185
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Counting Words With a Given Prefix

> [!TIP]
> **🧠 Memory hook**
> A turnstile at every node clicks as words pass. Read the click count at the prefix node.
> **Mantra: PASS++ ON INSERT, READ AT PREFIX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=1) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
Return how many words have `pref` as a prefix.

## Key insight
Store at each node how many inserted words pass through it. The answer for a prefix is one walk plus one read.

## Approach 1: Brute force
```java
// Approach 1: check startsWith on every word
public int prefixCountBrute(String[] words, String pref) {
    int c = 0;
    for (String w : words) if (w.startsWith(pref)) c++;
    return c;
}
```

## Approach 2: Trie with pass counts
```java
// Approach 2: insert all words incrementing pass counts, then read the count at the prefix node
public int prefixCount(String[] words, String pref) {
    Node root = new Node();
    for (String w : words) {
        Node cur = root;
        for (char ch : w.toCharArray()) {
            int i = ch - 'a';
            if (cur.next[i] == null) cur.next[i] = new Node();
            cur = cur.next[i];
            cur.pass++;
        }
    }
    Node cur = root;
    for (char ch : pref.toCharArray()) {
        cur = cur.next[ch - 'a'];
        if (cur == null) return 0;
    }
    return cur.pass;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n·m) | O(1) |
| Trie with pass counts | O(total chars + m) | O(total chars) |

## Recall before you reveal
<details><summary>Increment pass before or after moving to the child?</summary>

After moving, so the node represents the prefix ending at that character.

</details>


## Connected
- Sum along the path instead: [Sum of Prefix Scores of Strings](Sum%20of%20Prefix%20Scores%20of%20Strings.md)
