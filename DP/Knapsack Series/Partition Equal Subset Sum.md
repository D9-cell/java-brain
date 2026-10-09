---
topic: Knapsack Series
pattern: [Reduce to subset sum, Bitset]
source: LeetCode 416
difficulty: Medium
companies: [Amazon, Meta]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Partition Equal Subset Sum

> [!TIP]
> **🧠 Memory hook**
> Two equal halves means **one subset hits total / 2**.
> **Mantra: ODD TOTAL → false; ELSE SUBSET SUM TO total / 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=3) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Return true if the array can be split into two subsets with equal sums.

## Key insight
If the total is odd it is impossible. Otherwise the question is subset sum with target total / 2. A BigInteger bitset makes each item one shift-and-OR.

## Approach 1: Boolean row
```java
// Subset sum to total / 2 with one boolean row
public boolean canPartition(int[] nums) {
    int total = Arrays.stream(nums).sum();
    if (total % 2 == 1) return false;
    int half = total / 2;
    boolean[] can = new boolean[half + 1];
    can[0] = true;
    for (int x : nums)
        for (int s = half; s >= x; s--) can[s] |= can[s - x];
    return can[half];
}
```

## Approach 2: Bitset
```java
// Bitset: bit s of the BigInteger marks a reachable sum
public boolean canPartitionBits(int[] nums) {
    int total = Arrays.stream(nums).sum();
    if (total % 2 == 1) return false;
    java.math.BigInteger bits = java.math.BigInteger.ONE;
    for (int x : nums) bits = bits.or(bits.shiftLeft(x));
    return bits.testBit(total / 2);
}
```

| Approach | Time | Space |
|---|---|---|
| Boolean row | O(n · total) | O(total) |
| Bitset | O(n · total / 64) | O(total) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why only half?</summary>

The other subset is everything else.

</details>


<details><summary>k groups?</summary>

Partition to K Equal Sum Subsets needs backtracking or bitmask DP.

</details>


## Connected
- [Subset Sum Problem](Subset%20Sum%20Problem.md)
- [Partition to K Equal Sum Subsets](../../Backtracking/Partition%20to%20K%20Equal%20Sum%20Subsets.md)
- [Minimum Sum Partition](Minimum%20Sum%20Partition.md)
