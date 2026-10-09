---
topic: Design
pattern: [Trie with sums]
source: LeetCode 677
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Map Sum Pairs

> [!TIP]
> **🧠 Memory hook**
> A tally at every crossroads of the trie.
> **Mantra: TRIE NODE SUMS, ADD THE DELTA**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=23) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
insert(key, val) (overwrites) and sum(prefix).

## Key insight
Each node stores the total of values below it; insert adds val − oldVal along the key path.

## Approach: Trie with node sums
```java
// Trie node storing the sum of values of all keys passing through it
static class Node {
    Node[] next = new Node[26];
    int sum;
}

// Insert adds the DELTA (new - old value) along the key's path, so overwrites stay correct
static class MapSum {
    private final Node root = new Node();
    private final Map<String, Integer> vals = new HashMap<>();

    // Walk the key adding delta to every node
    public void insert(String key, int val) {
        int delta = val - vals.getOrDefault(key, 0);
        vals.put(key, val);
        Node cur = root;
        for (char c : key.toCharArray()) {
            if (cur.next[c - 'a'] == null) cur.next[c - 'a'] = new Node();
            cur = cur.next[c - 'a'];
            cur.sum += delta;
        }
    }

    // The prefix node's sum is the answer
    public int sum(String prefix) {
        Node cur = root;
        for (char c : prefix.toCharArray()) {
            cur = cur.next[c - 'a'];
            if (cur == null) return 0;
        }
        return cur.sum;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Trie with node sums | O(L) | O(total chars) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Why the delta?</summary>

Overwrites must subtract the old value.

</details>


## Connected
- [Trie - Pattern Map](../Trie/Trie%20-%20Pattern%20Map.md)
