---
topic: Rotated Arrays and Sorted Queries
pattern: [Sort + lower bound]
source: LeetCode 2300
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Successful Pairs of Spells and Potions

> [!TIP]
> **🧠 Memory hook**
> Sort potions. Spell s needs potions **≥ ⌈success / s⌉**: lower bound, then count the rest.
> **Mantra: need = ⌈success / s⌉ · m − lowerBound(need)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=7) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
A spell and potion pair is successful if their product is at least success. For each spell return how many potions form a successful pair.

## Key insight
Products exceed int, so compute the threshold with longs using ceiling division instead of multiplying.

## Approach: Sort + lower bound
```java
// Sort potions; a spell works with every potion from the first one >= ceil(success / spell)
public int[] successfulPairs(int[] spells, int[] potions, long success) {
    Arrays.sort(potions);
    int m = potions.length;
    int[] out = new int[spells.length];
    for (int i = 0; i < spells.length; i++) {
        long need = (success + spells[i] - 1) / spells[i];
        int lo = 0, hi = m;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (potions[mid] < need) lo = mid + 1;
            else hi = mid;
        }
        out[i] = m - lo;
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + lower bound | O((n + m) log m) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why ceiling division?</summary>

The smallest p with s·p ≥ success is ⌈success / s⌉.

</details>


<details><summary>Two-pointer version?</summary>

Sort spells too and sweep potions from the strong end.

</details>


## Connected
- [Count the Number of Fair Pairs](Count%20the%20Number%20of%20Fair%20Pairs.md)
- [Most Beautiful Item for Each Query](Most%20Beautiful%20Item%20for%20Each%20Query.md)
