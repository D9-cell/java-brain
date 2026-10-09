---
topic: Bit Magic
pattern: [XOR cancels]
source: LeetCode 2683
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Neighboring Bitwise XOR

> [!TIP]
> **🧠 Memory hook**
> Every original bit is used twice.
> **Mantra: XOR OF derived == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=37) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Is there a binary array whose circular neighbour XORs equal derived?

## Key insight
XOR of all derived values contains each original bit twice, so it must be 0; and 0 is enough.

## Approach 1: Try both starts
```java
// Approach 1: simulate: guess original[0] (0 or 1), rebuild, check the wrap-around
public boolean doesValidArraySimulate(int[] derived) {
    for (int start = 0; start <= 1; start++) {
        int cur = start;
        for (int i = 0; i < derived.length - 1; i++) cur ^= derived[i];
        if ((cur ^ start) == derived[derived.length - 1]) return true;
    }
    return false;
}
```

## Approach 2: XOR rule
```java
// Approach 2: every original bit appears twice in the XOR of derived, so it must be 0
public boolean doesValidArray(int[] derived) {
    int x = 0;
    for (int d : derived) x ^= d;
    return x == 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Try both starts | O(n) | O(1) |
| XOR rule | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both agree on 1000 random arrays.

## Recall before you reveal
<details><summary>Why sufficient?</summary>

Start with 0 and rebuild; the wrap check equals the XOR rule.

</details>

