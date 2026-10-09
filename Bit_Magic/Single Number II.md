---
topic: Bit Magic
pattern: [One bit at a time]
source: LeetCode 137
difficulty: Medium
companies: [Google, Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Single Number II

> [!TIP]
> **🧠 Memory hook**
> Count each bit mod 3.
> **Mantra: PER BIT: ones % 3**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=46) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Every element appears three times except one; find it.

## Key insight
For every bit, triples contribute a multiple of 3 ones; the remainder belongs to the single number.

## Approach 1: Map
```java
// Approach 1: frequency map
public int singleNumberMap(int[] nums) {
    Map<Integer, Integer> cnt = new HashMap<>();
    for (int x : nums) cnt.merge(x, 1, Integer::sum);
    for (Map.Entry<Integer, Integer> e : cnt.entrySet()) if (e.getValue() == 1) return e.getKey();
    return -1;
}
```

## Approach 2: Sort and step by 3
```java
// Approach 2: sort, then step in threes; the first triple that breaks holds the answer
public int singleNumberSort(int[] nums) {
    int[] a = nums.clone();
    Arrays.sort(a);
    for (int i = 0; i + 1 < a.length; i += 3) if (a[i] != a[i + 1]) return a[i];
    return a[a.length - 1];
}
```

## Approach 3: Bit counts mod 3
```java
// Approach 3: for every bit, the count of ones mod 3 is the single number's bit
public int singleNumber(int[] nums) {
    int res = 0;
    for (int b = 0; b < 32; b++) {
        int ones = 0;
        for (int x : nums) if ((x & (1 << b)) != 0) ones++;
        if (ones % 3 == 1) res |= 1 << b;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Map | O(n) | O(n) |
| Sort and step by 3 | O(n log n) | O(1) |
| Bit counts mod 3 | O(32·n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified on random arrays with negatives.

## Recall before you reveal
<details><summary>Negatives?</summary>

Bit 31 is handled like any other.

</details>


## Connected
- [Single Number III](Single%20Number%20III.md)
