---
topic: Digits and Powers
pattern: [Closed form]
source: LeetCode 3870
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Commas in Range

> [!TIP]
> **🧠 Memory hook**
> Up to 10⁵ only numbers **≥ 1000** have a comma, and exactly one. Answer: **max(n − 999, 0)**.
> **Mantra: max(n − 999, 0)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=16) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Write every integer from 1 to n with standard thousands separators (1,000). Return the total number of commas. Here n ≤ 10⁵.

## Key insight
Numbers 1..999 have no comma and 1000..99999 have one, so the count is how many numbers are at least 1000.

## Approach: Formula
```java
// For n up to 10^5 only numbers from 1000 on have a comma, and each has one
public int countCommas(int n) {
    return Math.max(n - 999, 0);
}
```

| Approach | Time | Space |
|---|---|---|
| Formula | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Where does the formula break?</summary>

At 1,000,000, which has two commas; see part II.

</details>


<details><summary>Why max with 0?</summary>

For n < 1000 there are no commas.

</details>


## Connected
- [Count Commas in Range II](Count%20Commas%20in%20Range%20II.md)
