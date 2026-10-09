---
topic: Bit Magic
pattern: [Masks]
source: LeetCode 476
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Number Complement

> [!TIP]
> **🧠 Memory hook**
> A mask from highestOneBit.
> **Mantra: num ^ ((highestOneBit << 1) − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=18) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Flip the bits of num.

## Key insight
Same as 1009: XOR with ones up to the highest set bit.

## Approach 1: XOR each bit
```java
// Approach 1: XOR each bit position up to the highest 1 with 1
public int findComplementXorEach(int num) {
    int bits = 32 - Integer.numberOfLeadingZeros(num);
    for (int i = 0; i < bits; i++) num ^= 1 << i;
    return num;
}
```

## Approach 2: Mask
```java
// Approach 2: an all-ones mask as wide as num
public int findComplement(int num) {
    int mask = Integer.highestOneBit(num);
    mask = (mask << 1) - 1;
    return num ^ mask;
}
```

## Approach 3: Rebuild digits
```java
// Approach 3: rebuild digit by digit
public int findComplementDigits(int num) {
    int res = 0;
    for (int i = 0; num > 0; i++, num >>= 1) if ((num & 1) == 0) res |= 1 << i;
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| XOR each bit | O(log n) | O(1) |
| Mask | O(1) | O(1) |
| Rebuild digits | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> The three approaches agree for n < 100000 and on MAX_VALUE.

## Recall before you reveal
<details><summary>2^31 − 1?</summary>

(highestOneBit << 1) overflows to MIN_VALUE, and MIN_VALUE − 1 = MAX_VALUE still works.

</details>


## Connected
- [Complement of Base 10 Integer](Complement%20of%20Base%2010%20Integer.md)
