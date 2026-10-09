---
topic: Bit Magic
pattern: [Masks as sets]
source: LeetCode 78
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Subsets (Bit Magic)

> [!TIP]
> **🧠 Memory hook**
> Every mask from 0 to 2^n − 1 is a subset.
> **Mantra: BIT i SET ⇒ TAKE nums[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=50) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
All subsets of distinct integers.

## Key insight
Mask m represents the subset of indices whose bits are set.

## Approach: Bitmask enumeration
```java
// Every mask 0 .. 2^n − 1 is one subset: bit i set ⇒ take nums[i]
public List<List<Integer>> subsets(int[] nums) {
    int n = nums.length;
    List<List<Integer>> res = new ArrayList<>();
    for (int mask = 0; mask < (1 << n); mask++) {
        List<Integer> cur = new ArrayList<>();
        for (int i = 0; i < n; i++) if ((mask >> i & 1) == 1) cur.add(nums[i]);
        res.add(cur);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Bitmask enumeration | O(n · 2^n) | O(n · 2^n) |

> [!WARNING]
> **Java gotcha**
> Checked: 2^n distinct subsets for n = 0..10.

## Recall before you reveal
<details><summary>Backtracking version?</summary>

See Subsets in Backtracking.

</details>


## Connected
- [Subsets](../Recursion/Subsets.md)
- [Subsets II](../Backtracking/Subsets%20II.md)
