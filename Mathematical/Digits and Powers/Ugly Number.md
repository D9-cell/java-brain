---
topic: Digits and Powers
pattern: [Divide out primes]
source: LeetCode 263
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Ugly Number

> [!TIP]
> **🧠 Memory hook**
> Divide out **2, 3 and 5** as long as they divide. An ugly number is reduced to **1**.
> **Mantra: FOR p IN 2,3,5: WHILE n % p == 0: n /= p · RETURN n == 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=4) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
An ugly number is a positive integer whose prime factors are only 2, 3 and 5. Return true if n is ugly.

## Key insight
Removing the allowed primes leaves the part made of other primes. If that part is 1, nothing else was there. n ≤ 0 is never ugly.

## Approach: Divide out
```java
// Divides out 2, 3 and 5; an ugly number is left with 1
public boolean isUgly(int n) {
    if (n <= 0) return false;
    for (int p : new int[]{2, 3, 5})
        while (n % p == 0) n /= p;
    return n == 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Divide out | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Is 1 ugly?</summary>

Yes, it has no prime factors at all.

</details>


<details><summary>Why check n ≤ 0?</summary>

The while loop on 0 would never end.

</details>


## Connected
- [Ugly Number II](../../DP/Stairs%20and%20Robbers/Ugly%20Number%20II.md)
- [Power of Three](Power%20of%20Three.md)
- [Prime Factors](../Primes%20Divisors%20and%20Remainders/Prime%20Factors.md)
