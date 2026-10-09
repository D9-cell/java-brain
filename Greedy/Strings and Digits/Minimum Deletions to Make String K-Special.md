---
topic: Strings and Digits
pattern: [Try each minimum frequency, Trim the rest]
source: LeetCode 3085
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Deletions to Make String K-Special

> [!TIP]
> **🧠 Memory hook**
> Fix the **smallest kept frequency** `f`: delete rarer letters entirely, trim bigger ones to `f + k`.
> **Mantra: FOR EACH f: DELETE g < f, TRIM g > f + k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=16) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
A string is k-special if for all letters |freq(x) − freq(y)| ≤ k. Return the minimum deletions to make it k-special.

## Key insight
Only the existing frequencies are candidates for the smallest kept frequency (at most 26). For candidate `f`, letters with `g < f` are removed completely and letters with `g > f + k` lose `g - (f + k)`. Take the best.

## Approach 1: Try every f
```java
// Try each existing frequency f as the smallest kept frequency: letters rarer than f are deleted, letters above f + k are trimmed to f + k
public int minimumDeletions(String word, int k) {
    int[] freq = new int[26];
    for (char c : word.toCharArray()) freq[c - 'a']++;
    int best = word.length();
    for (int f : freq) {
        if (f == 0) continue;
        int del = 0;
        for (int g : freq) {
            if (g < f) del += g;
            else if (g > f + k) del += g - (f + k);
        }
        best = Math.min(best, del);
    }
    return best;
}
```

## Approach 2: Kept characters
```java
// Sorted frequencies and a sliding window of allowed range [f, f + k]
public int minimumDeletionsSorted(String word, int k) {
    int[] freq = new int[26];
    for (char c : word.toCharArray()) freq[c - 'a']++;
    List<Integer> f = new ArrayList<>();
    for (int x : freq) if (x > 0) f.add(x);
    Collections.sort(f);
    int total = word.length(), keptBest = 0;
    for (int i = 0; i < f.size(); i++) {
        int kept = 0;
        for (int j = i; j < f.size(); j++) kept += Math.min(f.get(j), f.get(i) + k);
        keptBest = Math.max(keptBest, kept);
    }
    return total - keptBest;
}
```

| Approach | Time | Space |
|---|---|---|
| Try every f | O(26²) | O(1) |
| Kept characters | O(26²) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why not try values of f that are not frequencies?</summary>

Raising f up to the nearest existing frequency never costs more.

</details>


## Connected
- [Minimum Deletions to Make Character Frequencies Unique](Minimum%20Deletions%20to%20Make%20Character%20Frequencies%20Unique.md)
