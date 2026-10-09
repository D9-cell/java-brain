---
topic: Bit Magic
pattern: [Subsets, Bit contribution]
source: LeetCode 1863
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Sum of All Subset XOR Totals

> [!TIP]
> **🧠 Memory hook**
> Each present bit is lit in exactly half the subsets.
> **Mantra: OR << (n − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=23) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Sum of the XOR of every subset.

## Key insight
For a bit present in some number, flipping that number's membership toggles the bit, so it is on in 2^(n−1) subsets.

## Approach 1: Generate subsets
```java
// Approach 1: generate every subset explicitly, then XOR it
public int subsetXORSumGenerate(int[] nums) {
    List<List<Integer>> subsets = new ArrayList<>();
    generate(nums, 0, new ArrayList<>(), subsets);
    int sum = 0;
    for (List<Integer> s : subsets) { int x = 0; for (int v : s) x ^= v; sum += x; }
    return sum;
}

generate(nums, 0, new ArrayList<>(), subsets);
int sum = 0;
for (List<Integer> s : subsets) { int x = 0; for (int v : s) x ^= v; sum += x; }
```

## Approach 2: Carry the XOR
```java
// Approach 2: carry the running XOR instead of the subset
public int subsetXORSumBacktrack(int[] nums) {
    return solve(nums, 0, 0);
}

// Sum of XOR totals of all subsets of nums[i..] given the XOR so far
private int solve(int[] nums, int i, int xor) {
    if (i == nums.length) return xor;
    return solve(nums, i + 1, xor ^ nums[i]) + solve(nums, i + 1, xor);
}
```

## Approach 3: OR formula
```java
// Approach 3: each bit present in any number is set in exactly half of the 2^n subsets → OR << (n − 1)
public int subsetXORSum(int[] nums) {
    int or = 0;
    for (int x : nums) or |= x;
    return or << (nums.length - 1);
}
```

| Approach | Time | Space |
|---|---|---|
| Generate subsets | O(n · 2^n) | O(n · 2^n) |
| Carry the XOR | O(2^n) | O(n) |
| OR formula | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Three approaches agree on random arrays.

## Recall before you reveal
<details><summary>Why half?</summary>

Toggle argument.

</details>

