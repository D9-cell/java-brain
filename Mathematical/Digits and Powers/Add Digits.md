---
topic: Digits and Powers
pattern: [Digital root, Mod 9]
source: LeetCode 258
difficulty: Easy
companies: [Adobe, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Add Digits

> [!TIP]
> **🧠 Memory hook**
> Summing digits keeps the **remainder mod 9**, so the end result is the digital root `1 + (n − 1) % 9`.
> **Mantra: n == 0 → 0 · ELSE 1 + (n − 1) % 9**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=0) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Given a non-negative integer num, repeatedly add all its digits until the result has only one digit, and return it.

## Key insight
Because 10 ≡ 1 (mod 9), every number is congruent to its digit sum mod 9. The loop never changes the remainder and stops at one digit 1..9 (or 0 for 0). Shifting by one maps remainder 0 to 9.

## Approach 1: Simulate
```java
// Repeatedly sums the digits until one digit is left
public int addDigitsLoop(int num) {
    while (num >= 10) {
        int sum = 0;
        while (num > 0) {
            sum += num % 10;
            num /= 10;
        }
        num = sum;
    }
    return num;
}
```

## Approach 2: Digital root formula
```java
// Digital root: a number and its digit sum leave the same remainder mod 9
public int addDigits(int num) {
    if (num == 0) return 0;
    return 1 + (num - 1) % 9;
}
```

| Approach | Time | Space |
|---|---|---|
| Simulate | O(log n) per round | O(1) |
| Digital root formula | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why mod 9?</summary>

10 leaves remainder 1 mod 9, so d·10^k and d leave the same remainder.

</details>


<details><summary>Why 1 + (n − 1) % 9 and not n % 9?</summary>

Multiples of 9 must give 9, not 0.

</details>


## Connected
- [Reverse Integer](Reverse%20Integer.md)
- [Mirror Distance of an Integer](Mirror%20Distance%20of%20an%20Integer.md)
