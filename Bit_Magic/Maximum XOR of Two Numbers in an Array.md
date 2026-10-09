---
topic: Bit Magic
pattern: [Bit trie, Greedy high bit]
source: LeetCode 421
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Maximum XOR of Two Numbers in an Array

> [!TIP]
> **🧠 Memory hook**
> In a bit trie, always take the opposite road.
> **Mantra: TRIE, GREEDY OPPOSITE BIT FROM THE TOP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=30) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Maximum nums[i] ^ nums[j].

## Key insight
A higher bit outweighs all lower bits together, so from the top bit greedily choose the opposite bit when such a number exists.

## Approach: Binary trie
```java
// Binary trie node: children for bit 0 and bit 1
static class Node {
    Node[] kid = new Node[2];
}

// Insert every number high bit first; for each number walk the trie choosing the OPPOSITE bit when it exists
public int findMaximumXOR(int[] nums) {
    Node root = new Node();
    for (int x : nums) {
        Node cur = root;
        for (int b = 31; b >= 0; b--) {
            int bit = x >>> b & 1;
            if (cur.kid[bit] == null) cur.kid[bit] = new Node();
            cur = cur.kid[bit];
        }
    }
    int best = 0;
    for (int x : nums) {
        Node cur = root;
        int val = 0;
        for (int b = 31; b >= 0; b--) {
            int want = (x >>> b & 1) ^ 1;
            if (cur.kid[want] != null) { val |= 1 << b; cur = cur.kid[want]; }
            else cur = cur.kid[want ^ 1];
        }
        best = Math.max(best, val);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary trie | O(32·n) | O(32·n) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Why from the top?</summary>

2^b > sum of all lower bits.

</details>


## Connected
- [Trie](../Trie/Trie%20-%20Pattern%20Map.md)
