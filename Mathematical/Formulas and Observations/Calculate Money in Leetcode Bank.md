---
topic: Formulas and Observations
pattern: [Arithmetic series]
source: LeetCode 1716
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Calculate Money in Leetcode Bank

> [!TIP]
> **🧠 Memory hook**
> Week w (from 0) deposits **w + 1, w + 2, …, w + 7**. Full weeks sum to 28, 35, 42, …; the last partial week is a short series.
> **Mantra: w = n/7, r = n%7 · 28w + 7·w(w−1)/2 + r(w+1) + r(r−1)/2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=0) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Hercy deposits $1 on the first Monday and $1 more each next day; every Monday he deposits $1 more than the previous Monday. Return the total after n days.

## Key insight
Day d deposits d/7 + d%7 + 1. Summing per week: week w gives 28 + 7w. The w full weeks add 28w + 7·(0 + 1 + … + (w − 1)). The r leftover days start at w + 1 and step by 1.

## Approach 1: Simulate
```java
// Day d of week w (both from 0) deposits w + d + 1
public int totalMoneyLoop(int n) {
    int total = 0;
    for (int day = 0; day < n; day++) total += day / 7 + day % 7 + 1;
    return total;
}
```

## Approach 2: Formula
```java
// Full weeks form an arithmetic series of 28, 35, 42, ...; the last partial week is another series
public int totalMoney(int n) {
    int w = n / 7, r = n % 7;
    int full = 28 * w + 7 * w * (w - 1) / 2;
    int partial = r * (w + 1) + r * (r - 1) / 2;
    return full + partial;
}
```

| Approach | Time | Space |
|---|---|---|
| Simulate | O(n) | O(1) |
| Formula | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>What does week w deposit in total?</summary>

28 + 7w.

</details>


<details><summary>First deposit of the partial week?</summary>

w + 1.

</details>


## Connected
- [Count of Matches in Tournament](Count%20of%20Matches%20in%20Tournament.md)
- [Count Total Number of Colored Cells](Count%20Total%20Number%20of%20Colored%20Cells.md)
