---
topic: Trie
pattern: [Digit trie, HashSet of prefixes]
source: LeetCode 3043
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Find the Length of the Longest Common Prefix

> [!TIP]
> **🧠 Memory hook**
> A phone-number directory: dial digits and see how far the directory follows.
> **Mantra: DIGIT TRIE, WALK UNTIL MISSING**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=3) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
Longest common digit prefix over all pairs (x ∈ arr1, y ∈ arr2).

## Key insight
Insert every arr1 number digit by digit. For each arr2 number, walk until a digit is missing; the walk length is that number's best LCP.

## Approach 1: HashSet of numeric prefixes
```java
// Approach 1: put every numeric prefix of arr1 in a set, then strip digits of arr2 values until found
public int longestCommonPrefixSet(int[] arr1, int[] arr2) {
    Set<Integer> seen = new HashSet<>();
    for (int v : arr1) for (; v > 0 && seen.add(v); v /= 10) ;
    int best = 0;
    for (int v : arr2) {
        while (v > 0 && !seen.contains(v)) v /= 10;
        if (v > 0) best = Math.max(best, String.valueOf(v).length());
    }
    return best;
}
```

## Approach 2: Digit trie
```java
// Approach 2: digit trie of arr1, then walk each arr2 number as far as it matches
public int longestCommonPrefix(int[] arr1, int[] arr2) {
    Node root = new Node();
    for (int v : arr1) {
        Node cur = root;
        for (char ch : String.valueOf(v).toCharArray()) {
            int d = ch - '0';
            if (cur.next[d] == null) cur.next[d] = new Node();
            cur = cur.next[d];
        }
    }
    int best = 0;
    for (int v : arr2) {
        Node cur = root;
        int len = 0;
        for (char ch : String.valueOf(v).toCharArray()) {
            cur = cur.next[ch - '0'];
            if (cur == null) break;
            len++;
        }
        best = Math.max(best, len);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| HashSet of numeric prefixes | O((m+n)·d) | O(m·d) |
| Digit trie | O((m+n)·d) | O(m·d) |

## Recall before you reveal
<details><summary>How do you get numeric prefixes without strings?</summary>

Repeated `v /= 10`.

</details>


<details><summary>Children per node?</summary>

10.

</details>


## Connected
- [Implement Trie (Prefix Tree)](Implement%20Trie%20%28Prefix%20Tree%29.md)
