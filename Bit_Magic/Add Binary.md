---
topic: Bit Magic
pattern: [Carry simulation]
source: LeetCode 67
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Add Binary

> [!TIP]
> **🧠 Memory hook**
> School addition in base 2.
> **Mantra: SUM % 2 WRITE, SUM / 2 CARRY**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=11) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Sum of two binary strings.

## Key insight
Add from the right with a carry; continue while either string or the carry remains.

## Approach: Carry loop
```java
// School addition from the right with a carry
public String addBinary(String a, String b) {
    StringBuilder sb = new StringBuilder();
    int i = a.length() - 1, j = b.length() - 1, carry = 0;
    while (i >= 0 || j >= 0 || carry > 0) {
        int sum = carry;
        if (i >= 0) sum += a.charAt(i--) - '0';
        if (j >= 0) sum += b.charAt(j--) - '0';
        sb.append(sum % 2);
        carry = sum / 2;
    }
    return sb.reverse().toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Carry loop | O(m + n) | O(m + n) |

> [!WARNING]
> **Java gotcha**
> Verified against BigInteger.

## Recall before you reveal
<details><summary>Loop condition?</summary>

i ≥ 0 || j ≥ 0 || carry > 0.

</details>

