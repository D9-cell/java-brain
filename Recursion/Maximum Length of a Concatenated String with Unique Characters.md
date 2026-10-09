---
topic: Recursion
pattern: [Backtracking, Bitmask]
source: LeetCode 1239
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Maximum Length of a Concatenated String with Unique Characters

> [!TIP]
> **🧠 Memory hook**
> Packing a suitcase of letters: add a word only if none of its letters are packed already.
> **Mantra: BITMASK PER WORD, ADD IF mask & m == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=11) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Choose a subsequence of words whose concatenation has all-unique letters; maximise its length.

## Key insight
Backtrack over the words. A 26-bit mask per word makes the "no shared letters" test one AND.

## Approach 1: String recursion
```java
// Approach 1: recursion on strings; stop as soon as the current concatenation has a repeat
public int maxLengthStrings(List<String> arr, String temp, int idx) {
    if (temp.chars().distinct().count() != temp.length()) return 0;
    int best = temp.length();
    for (int i = idx; i < arr.size(); i++) best = Math.max(best, maxLengthStrings(arr, temp + arr.get(i), i + 1));
    return best;
}
```

## Approach 2: Bitmask DFS
```java
// Approach 2: same take/skip recursion but each word is a 26-bit mask; overlap test is mask & m
private int dfs(int[] masks, int[] lens, int idx, int mask, int len) {
    int best = len;
    for (int i = idx; i < masks.length; i++)
        if (masks[i] != -1 && (mask & masks[i]) == 0) best = Math.max(best, dfs(masks, lens, i + 1, mask | masks[i], len + lens[i]));
    return best;
}

// Converts words to masks (-1 if a word repeats a letter itself)
public int maxLength(List<String> arr) {
    int n = arr.size();
    int[] masks = new int[n], lens = new int[n];
    for (int i = 0; i < n; i++) {
        int m = 0;
        for (char c : arr.get(i).toCharArray()) {
            if ((m >> (c - 'a') & 1) == 1) { m = -1; break; }
            m |= 1 << (c - 'a');
        }
        masks[i] = m;
        lens[i] = arr.get(i).length();
    }
    return dfs(masks, lens, 0, 0, 0);
}
```

| Approach | Time | Space |
|---|---|---|
| String recursion | O(2^n · L) | O(n·L) |
| Bitmask DFS | O(2^n) | O(n) |

## Recall before you reveal
<details><summary>Words like "aa"?</summary>

Invalid on their own; skip them.

</details>


## Connected
- [Subsets](Subsets.md)
- Bit_Magic folder
