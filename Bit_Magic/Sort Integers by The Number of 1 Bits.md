---
topic: Bit Magic
pattern: [Custom sort key]
source: LeetCode 1356
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Sort Integers by The Number of 1 Bits

> [!TIP]
> **🧠 Memory hook**
> Pack (popcount, value) into one int.
> **Mantra: bitCount · 100000 + value**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=49) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Sort by popcount, ties by value.

## Key insight
A comparator works; or encode both keys in one int and sort primitives.

## Approach 1: Comparator with own countBits
```java
// Self-written popcount
static int countBits(int x) {
    int c = 0;
    for (; x > 0; x >>= 1) c += x & 1;
    return c;
}

// Approach 1: comparator with our own countBits, ties by value
public int[] sortByBitsCustom(int[] arr) {
    return Arrays.stream(arr).boxed().sorted((a, b) -> countBits(a) != countBits(b) ? countBits(a) - countBits(b) : a - b).mapToInt(Integer::intValue).toArray();
}
```

## Approach 2: Packed key
```java
// Approach 2: Integer.bitCount; or pack the key as bitCount · 100000 + value and sort plain ints
public int[] sortByBits(int[] arr) {
    int[] key = new int[arr.length];
    for (int i = 0; i < arr.length; i++) key[i] = Integer.bitCount(arr[i]) * 100_000 + arr[i];
    Arrays.sort(key);
    for (int i = 0; i < arr.length; i++) key[i] %= 100_000;
    return key;
}
```

| Approach | Time | Space |
|---|---|---|
| Comparator with own countBits | O(n log n · log V) | O(n) |
| Packed key | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Both agree on random arrays.

## Recall before you reveal
<details><summary>Why 100000?</summary>

Values ≤ 10^4.

</details>

