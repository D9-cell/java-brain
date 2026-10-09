---
topic: Bit Magic
pattern: [Masks as sets, Take / skip]
source: LeetCode 1239
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Maximum Length of a Concatenated String with Unique Characters (Bit Magic)

> [!TIP]
> **🧠 Memory hook**
> Letters as lamps: overlap is one AND.
> **Mantra: MASK PER WORD, TAKE IF used & mask == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=26) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Longest concatenation of a subsequence of words with all letters unique.

## Key insight
Turn each word into a 26-bit mask (drop words with repeats); take or skip, allowed only when masks do not overlap.

## Approach: Bitmask take/skip
```java
// Each word → 26-bit mask (skip words with repeated letters); take/skip with "no overlapping bits"
public int maxLength(List<String> arr) {
    List<Integer> masks = new ArrayList<>();
    for (String w : arr) {
        int m = 0;
        boolean dup = false;
        for (char c : w.toCharArray()) { if ((m >> (c - 'a') & 1) == 1) dup = true; m |= 1 << (c - 'a'); }
        if (!dup) masks.add(m);
    }
    return solve(masks, 0, 0);
}

// Best extra length from masks[i..] given the letters already used
private int solve(List<Integer> masks, int i, int used) {
    if (i == masks.size()) return Integer.bitCount(used);
    int best = solve(masks, i + 1, used);
    if ((used & masks.get(i)) == 0) best = Math.max(best, solve(masks, i + 1, used | masks.get(i)));
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Bitmask take/skip | O(2^n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against all subsets of strings.

## Recall before you reveal
<details><summary>Words with repeated letters?</summary>

Can never be used.

</details>


## Connected
- [Maximum Length of a Concatenated String with Unique Characters](../Recursion/Maximum%20Length%20of%20a%20Concatenated%20String%20with%20Unique%20Characters.md)
