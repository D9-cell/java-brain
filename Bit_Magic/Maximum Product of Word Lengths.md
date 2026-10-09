---
topic: Bit Magic
pattern: [Masks as sets]
source: LeetCode 318
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Maximum Product of Word Lengths

> [!TIP]
> **🧠 Memory hook**
> Disjoint letters ⇔ masks AND to 0.
> **Mantra: MASK PER WORD, O(1) OVERLAP CHECK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=28) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Max len(a)·len(b) over word pairs with no common letter.

## Key insight
Precompute a 26-bit mask per word so each pair check is one AND.

## Approach 1: Boolean arrays
```java
// Approach 1: compare letter sets with boolean arrays
public int maxProductNoBits(String[] words) {
    int best = 0;
    for (int i = 0; i < words.length; i++) for (int j = i + 1; j < words.length; j++) {
        boolean[] has = new boolean[26];
        for (char c : words[i].toCharArray()) has[c - 'a'] = true;
        boolean share = false;
        for (char c : words[j].toCharArray()) if (has[c - 'a']) { share = true; break; }
        if (!share) best = Math.max(best, words[i].length() * words[j].length());
    }
    return best;
}
```

## Approach 2: Bitmasks
```java
// Approach 2: one 26-bit mask per word; no common letter ⇔ (mask[i] & mask[j]) == 0
public int maxProduct(String[] words) {
    int n = words.length, best = 0;
    int[] mask = new int[n];
    for (int i = 0; i < n; i++) for (char c : words[i].toCharArray()) mask[i] |= 1 << (c - 'a');
    for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++)
        if ((mask[i] & mask[j]) == 0) best = Math.max(best, words[i].length() * words[j].length());
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Boolean arrays | O(n² · L) | O(26) |
| Bitmasks | O(n² + total length) | O(n) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on random words.

## Recall before you reveal
<details><summary>Speedup?</summary>

Keep only the longest word per mask.

</details>

