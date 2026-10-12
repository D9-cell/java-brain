---
topic: Numbers as Strings
pattern: [Mapped keys, Stable sort]
source: LeetCode 2191
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Sort the Jumbled Numbers

> [!TIP]
> **🧠 Memory hook**
> Compute each number's **mapped value once**, then **stable-sort indexes** by it so ties keep input order.
> **Mantra: key[i] = map digits of nums[i] · sort indexes by key**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=8) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
mapping[d] says what digit d becomes. Sort nums by their mapped values (ties keep relative order) and return the original numbers in that order.

## Key insight
Computing keys inside the comparator would redo the work O(n log n) times. Arrays.sort on objects is stable, so ties stay in input order.

## Approach: Precomputed keys
```java
// Compute every mapped value once, then stable-sort indexes by it
public int[] sortJumbled(int[] mapping, int[] nums) {
    int n = nums.length;
    long[] key = new long[n];
    Integer[] idx = new Integer[n];
    for (int i = 0; i < n; i++) {
        idx[i] = i;
        String s = String.valueOf(nums[i]);
        long v = 0;
        for (char c : s.toCharArray()) v = v * 10 + mapping[c - '0'];
        key[i] = v;
    }
    Arrays.sort(idx, (a, b) -> Long.compare(key[a], key[b]));
    int[] out = new int[n];
    for (int i = 0; i < n; i++) out[i] = nums[idx[i]];
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Precomputed keys | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why sort Integer[] and not int[]?</summary>

The object sort is stable and takes a comparator.

</details>


<details><summary>Leading zeros in the mapped value?</summary>

Building it as a number drops them naturally.

</details>


## Connected
- [Maximum Swap](Maximum%20Swap.md)
