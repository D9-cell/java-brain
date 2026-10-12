---
topic: Primes Divisors and Remainders
pattern: [Divisor pairs]
source: LeetCode 1390
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Four Divisors

> [!TIP]
> **🧠 Memory hook**
> Divisors come in **pairs (d, x/d)** with d ≤ √x. Count them, add them, **bail out past four**.
> **Mantra: FOR d·d ≤ x: d | x → count += (d == x/d ? 1 : 2) · count == 4 → add sum**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=3) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
For each number in nums that has exactly four divisors, add the sum of its divisors. Return the total.

## Key insight
Walking d up to √x finds each divisor pair once; a perfect square root counts once. Stopping when the count passes 4 saves time for highly composite numbers.

## Approach: Pair walk
```java
// Counts divisors in pairs (d, x / d) and stops once there are more than four
public int sumFourDivisors(int[] nums) {
    int total = 0;
    for (int x : nums) {
        int count = 0, sum = 0;
        for (int d = 1; d * d <= x && count <= 4; d++) {
            if (x % d != 0) continue;
            int e = x / d;
            count += d == e ? 1 : 2;
            sum += d == e ? d : d + e;
        }
        if (count == 4) total += sum;
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Pair walk | O(n √max) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Which numbers have four divisors?</summary>

p³ or p · q for distinct primes p, q.

</details>


<details><summary>Why handle d == x / d?</summary>

The square root is one divisor, not two.

</details>


## Connected
- [Prime Factors](Prime%20Factors.md)
- [Bulb Switcher](Bulb%20Switcher.md)
