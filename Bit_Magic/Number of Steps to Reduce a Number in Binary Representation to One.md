---
topic: Bit Magic
pattern: [Carry simulation]
source: LeetCode 1404
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Number of Steps to Reduce a Number in Binary Representation to One

> [!TIP]
> **🧠 Memory hook**
> Walk right to left carrying the +1.
> **Mantra: ODD → 2 STEPS, CARRY 1; EVEN → 1 STEP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=39) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Steps (even: halve, odd: add 1) to reduce binary s to 1.

## Key insight
Each bit with the incoming carry decides: odd costs add + halve and creates a carry; even costs one halving.

## Approach 1: Simulate on the string
```java
// Approach 1: simulate on the string: even → drop the last char, odd → add 1 with carry
public int numStepsSimulate(String s) {
    StringBuilder sb = new StringBuilder(s);
    int steps = 0;
    while (sb.length() > 1) {
        int last = sb.length() - 1;
        if (sb.charAt(last) == '0') sb.deleteCharAt(last);
        else {
            int i = last;
            while (i >= 0 && sb.charAt(i) == '1') sb.setCharAt(i--, '0');
            if (i < 0) sb.insert(0, '1'); else sb.setCharAt(i, '1');
        }
        steps++;
    }
    return steps;
}
```

## Approach 2: Carry scan
```java
// Approach 2: right to left with a carry: (bit + carry) odd → 2 steps (add, then halve) and carry = 1; even → 1 step
public int numSteps(String s) {
    int steps = 0, carry = 0;
    for (int i = s.length() - 1; i > 0; i--) {
        if (((s.charAt(i) - '0') + carry) % 2 == 1) { steps += 2; carry = 1; }
        else steps += 1;
    }
    return steps + carry;
}
```

| Approach | Time | Space |
|---|---|---|
| Simulate on the string | O(n²) | O(n) |
| Carry scan | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against BigInteger.

## Recall before you reveal
<details><summary>Leftover carry?</summary>

One extra step.

</details>

