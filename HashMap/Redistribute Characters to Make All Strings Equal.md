---
topic: HashMap
pattern: [Frequency counting]
source: LeetCode 1897
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Redistribute Characters to Make All Strings Equal

> [!TIP]
> **🧠 Memory hook**
> Free moves: just check divisibility.
> **Mantra: COUNT % n == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=39) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Can moving characters between words make all words equal?

## Key insight
Every letter's total count must split evenly across n words.

## Approach: Counts
```java
// Moves are free, so every letter's total count must split evenly among the n words
public boolean makeEqual(String[] words) {
    int[] cnt = new int[26];
    for (String w : words) for (char c : w.toCharArray()) cnt[c - 'a']++;
    for (int c : cnt) if (c % words.length != 0) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Counts | O(total length) | O(26) |

## Recall before you reveal
<details><summary>Order?</summary>

Irrelevant.

</details>

