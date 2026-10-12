---
topic: Prefix Sums Basics
pattern: [Running score]
source: LeetCode 2483
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Penalty for a Shop

> [!TIP]
> **🧠 Memory hook**
> Closing at j costs **N's before j + Y's from j**. Moving j one step right changes it by **−1 for Y, +1 for N**: track the running change.
> **Mantra: score += (Y ? −1 : +1) · best score → hour j + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=3) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
customers[i] is Y (customers come) or N. Closing at hour j costs 1 for every open hour without customers and every closed hour with customers. Return the earliest hour with the minimum penalty.

## Key insight
The absolute penalty at j = 0 is the number of Ys; every later penalty differs by the running score, so the minimum score marks the best hour.

## Approach: Running score
```java
// Closing at hour j costs N's before j plus Y's from j; track the running change instead
public int bestClosingTime(String customers) {
    int score = 0, best = 0, bestHour = 0;
    for (int j = 0; j < customers.length(); j++) {
        score += customers.charAt(j) == 'Y' ? -1 : 1;
        if (score < best) {
            best = score;
            bestHour = j + 1;
        }
    }
    return bestHour;
}
```

| Approach | Time | Space |
|---|---|---|
| Running score | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why ignore the starting penalty?</summary>

It is the same constant for every j.

</details>


<details><summary>Why strict <?</summary>

The earliest hour wins ties.

</details>


## Connected
- [Maximum Score After Splitting a String](../../Strings/Binary%20Strings%20and%20Substring%20Counting/Maximum%20Score%20After%20Splitting%20a%20String.md)
