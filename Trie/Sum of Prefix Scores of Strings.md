---
topic: Trie
pattern: [Trie, Pass counts]
source: LeetCode 2416
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Sum of Prefix Scores of Strings

> [!TIP]
> **🧠 Memory hook**
> Each word pays a toll at every gate it passes; the toll = how many words pass that gate.
> **Mantra: PASS++ ON INSERT, SUM PASS ALONG PATH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=5) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
For each word, sum over its non-empty prefixes the number of words having that prefix.

## Key insight
Same pass counts as 2185. A word's answer is the sum of pass values along its own path.

## Approach: Trie with pass counts
```java
// Insert all words with pass counts, then each word's score is the sum of pass counts along its path
public int[] sumPrefixScores(String[] words) {
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
    int[] res = new int[words.length];
    for (int k = 0; k < words.length; k++) {
        Node cur = root;
        for (char ch : words[k].toCharArray()) {
            cur = cur.next[ch - 'a'];
            res[k] += cur.pass;
        }
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Trie with pass counts | O(total chars) | O(total chars) |

## Recall before you reveal
<details><summary>Relation to Prefix Count?</summary>

Read every node on the path instead of just the last one.

</details>


## Connected
- [Counting Words With a Given Prefix](Counting%20Words%20With%20a%20Given%20Prefix.md)
