---
topic: Formulas and Observations
pattern: [Series, Perfect square]
source: LeetCode 2485
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Find the Pivot Integer

> [!TIP]
> **🧠 Memory hook**
> x(x + 1)/2 = total − x(x − 1)/2 simplifies to **x² = n(n + 1)/2**. Check if that is a perfect square.
> **Mantra: total = n(n+1)/2 · x = √total · x² == total ? x : −1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=6) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Return x such that 1 + … + x = x + … + n, or -1 if none exists.

## Key insight
Both sides contain x. Adding x(x − 1)/2 + x(x + 1)/2 = x² gives x² = total. So x exists exactly when the total is a perfect square.

## Approach 1: Formula
```java
// 1 + ... + x = x + ... + n means x² = n(n + 1) / 2
public int pivotInteger(int n) {
    int total = n * (n + 1) / 2;
    int x = (int) Math.sqrt(total);
    return x * x == total ? x : -1;
}
```

## Approach 2: Running sums
```java
// Two running sums meeting in the middle
public int pivotIntegerScan(int n) {
    int total = n * (n + 1) / 2, left = 0;
    for (int x = 1; x <= n; x++) {
        left += x;
        if (left == total - left + x) return x;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Formula | O(1) | O(1) |
| Running sums | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is x unique?</summary>

x² = total has one positive root.

</details>


<details><summary>n = 8?</summary>

total 36, x = 6.

</details>


## Connected
- [Count Odd Numbers in an Interval Range](Count%20Odd%20Numbers%20in%20an%20Interval%20Range.md)
