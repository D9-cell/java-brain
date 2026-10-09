---
topic: Recursion
pattern: [Recursive chunking]
source: LeetCode 273
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Integer to English Words

> [!TIP]
> **🧠 Memory hook**
> A bank cashier reading a cheque: Billions, Millions, Thousands, Hundreds; each chunk is read the same way.
> **Mantra: BIGGEST UNIT: solve(n / u) + NAME + solve(n % u)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=15) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Convert a non-negative integer to English words.

## Key insight
Find the largest unit ≤ n, name n / unit recursively, add the unit name, then name n % unit (if non-zero).

## Approach: Recursion with tables
```java
// Splits num at the biggest unit it reaches and lets recursion name both parts
private String solve(int num) {
    if (num < 20) return ONES[num];
    if (num < 100) return TENS[num / 10] + (num % 10 != 0 ? " " + ONES[num % 10] : "");
    if (num < 1000) return chunk(num, 100, " Hundred");
    if (num < 1_000_000) return chunk(num, 1000, " Thousand");
    if (num < 1_000_000_000) return chunk(num, 1_000_000, " Million");
    return chunk(num, 1_000_000_000, " Billion");
}

// "<num / unit> Name <num % unit>" with the remainder omitted when it is 0
private String chunk(int num, int unit, String name) {
    return solve(num / unit) + name + (num % unit != 0 ? " " + solve(num % unit) : "");
}

// Zero is the only special case
public String numberToWords(int num) {
    return num == 0 ? "Zero" : solve(num);
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion with tables | O(log n) | O(log n) |

## Recall before you reveal
<details><summary>Zero?</summary>

Handled outside: "Zero".

</details>


<details><summary>Why ONES up to 19?</summary>

10–19 have unique names.

</details>

