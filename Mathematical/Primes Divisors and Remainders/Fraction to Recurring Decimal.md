---
topic: Primes Divisors and Remainders
pattern: [Long division, Remainder map]
source: LeetCode 166
difficulty: Medium
companies: [Meta, Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Fraction to Recurring Decimal

> [!TIP]
> **🧠 Memory hook**
> Do long division and **remember where each remainder first appeared**. A repeated remainder repeats the digits from there.
> **Mantra: sign · integer part · map rem → position · repeat → insert "(" and append ")"**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=10) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
Given numerator and denominator, return the fraction as a decimal string, putting a repeating part in parentheses, e.g. 4/333 → "0.(012)".

## Key insight
The next digit depends only on the current remainder. Store the output index at which each remainder produced its digit. When it comes back, the digits from that index on repeat. Use long and abs to handle -2³¹.

## Approach: Long division + map
```java
// Long division; the first remainder seen twice marks where the repeating part starts
public String fractionToDecimal(int numerator, int denominator) {
    if (numerator == 0) return "0";
    StringBuilder sb = new StringBuilder();
    if ((numerator < 0) ^ (denominator < 0)) sb.append('-');
    long num = Math.abs((long) numerator), den = Math.abs((long) denominator);
    sb.append(num / den);
    long rem = num % den;
    if (rem == 0) return sb.toString();
    sb.append('.');
    Map<Long, Integer> seen = new HashMap<>();
    while (rem != 0) {
        if (seen.containsKey(rem)) {
            sb.insert(seen.get(rem), "(");
            sb.append(')');
            break;
        }
        seen.put(rem, sb.length());
        rem *= 10;
        sb.append(rem / den);
        rem %= den;
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Long division + map | O(den) | O(den) |

> [!WARNING]
> **Java gotcha**
> `-2147483648 / -1` overflows in int; converting to long first avoids it. Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why long?</summary>

Math.abs(Integer.MIN_VALUE) overflows an int.

</details>


<details><summary>How is the sign decided?</summary>

XOR of the two signs, after checking numerator == 0.

</details>


## Connected
- [Smallest Integer Divisible by K](Smallest%20Integer%20Divisible%20by%20K.md)
