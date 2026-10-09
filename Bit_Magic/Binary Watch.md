---
topic: Bit Magic
pattern: [Enumeration]
source: LeetCode 401
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Binary Watch

> [!TIP]
> **🧠 Memory hook**
> Only 720 possible times: enumerate.
> **Mantra: bitCount(h) + bitCount(m) == k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=15) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
All times a binary watch can show with k LEDs on.

## Key insight
Loop over hours 0–11 and minutes 0–59 and keep those whose popcounts add to k.

## Approach: Enumerate
```java
// Enumerate all 12 × 60 times and keep those whose bit counts sum to turnedOn
public List<String> readBinaryWatch(int turnedOn) {
    List<String> res = new ArrayList<>();
    for (int h = 0; h < 12; h++) for (int m = 0; m < 60; m++)
        if (Integer.bitCount(h) + Integer.bitCount(m) == turnedOn) res.add(h + ":" + (m < 10 ? "0" : "") + m);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Enumerate | O(720) | O(1) |

## Recall before you reveal
<details><summary>Format?</summary>

"h:mm".

</details>

