---
topic: Hash Map Pair Counting
pattern: [Complements, Set lookup]
source: GfG Swapping pairs make sum equal
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Swapping pairs make sum equal

> [!TIP]
> **🧠 Memory hook**
> Same equation as Fair Candy Swap: needs **y = x + (sumB − sumA)/2**, which is impossible if the difference is **odd**.
> **Mantra: odd difference → −1 · any x with x + delta in b → 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Hash%20Map%20Pair%20Counting/Hash%20Map%20Pair%20Counting%20Animations.html#p=7) · **Pattern hub:** [Hash Map Pair Counting - Pattern Map](Hash%20Map%20Pair%20Counting%20-%20Pattern%20Map.md)

## Problem
Given arrays a and b, return 1 if swapping one element from each makes their sums equal, otherwise -1.

## Key insight
The parity check comes first because half of an odd difference is not an integer.

## Approach: Set lookup
```java
// Same equation as Fair Candy Swap; the sum difference must be even
public int findSwapValues(int[] a, int[] b) {
    long sa = 0, sb = 0;
    for (int x : a) sa += x;
    Set<Long> inB = new HashSet<>();
    for (int y : b) {
        sb += y;
        inB.add((long) y);
    }
    if ((sb - sa) % 2 != 0) return -1;
    long delta = (sb - sa) / 2;
    for (int x : a)
        if (inB.contains(x + delta)) return 1;
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Set lookup | O(n + m) | O(m) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why check parity?</summary>

2(y − x) must equal sb − sa.

</details>


<details><summary>Sorted two-pointer version?</summary>

Sort both and walk with two pointers on y − x.

</details>


## Connected
- [Fair Candy Swap](Fair%20Candy%20Swap.md)
