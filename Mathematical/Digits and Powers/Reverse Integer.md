---
topic: Digits and Powers
pattern: [Digit loop, Overflow guard]
source: LeetCode 7
difficulty: Medium
companies: [Amazon, Bloomberg, Apple]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Reverse Integer

> [!TIP]
> **🧠 Memory hook**
> Pop the last digit, push it onto the reverse, and **check overflow before multiplying by 10**.
> **Mantra: d = x % 10 · GUARD rev vs MAX/10 · rev = rev*10 + d**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=1) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Given a 32-bit signed integer x, return x with its digits reversed. If the result leaves the 32-bit range, return 0. Assume 64-bit integers are not allowed.

## Key insight
Java `%` keeps the sign of x, so negative numbers reverse without special handling. Before `rev * 10 + d` check that rev is not past MAX/10 (or MIN/10), and on the boundary that the digit is not past 7 (or −8).

## Approach: Digit loop with guard
```java
// Builds the reverse digit by digit and returns 0 before it would leave the int range
public int reverse(int x) {
    int rev = 0;
    while (x != 0) {
        int d = x % 10;
        if (rev > Integer.MAX_VALUE / 10 || (rev == Integer.MAX_VALUE / 10 && d > 7)) return 0;
        if (rev < Integer.MIN_VALUE / 10 || (rev == Integer.MIN_VALUE / 10 && d < -8)) return 0;
        rev = rev * 10 + d;
        x /= 10;
    }
    return rev;
}
```

| Approach | Time | Space |
|---|---|---|
| Digit loop with guard | O(log x) | O(1) |

> [!WARNING]
> **Java gotcha**
> `Math.abs(Integer.MIN_VALUE)` is still negative; the sign-keeping `%` avoids needing it. Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why check before multiplying?</summary>

After the overflow the value has already wrapped and the check is useless.

</details>


<details><summary>What does -123 % 10 give in Java?</summary>

-3, so the reverse is negative automatically.

</details>


## Connected
- [Mirror Distance of an Integer](Mirror%20Distance%20of%20an%20Integer.md)
- [Power of Numbers](Power%20of%20Numbers.md)
