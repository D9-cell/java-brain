---
topic: Counting and Modular Combinatorics
pattern: [Stars and bars, Inclusion-exclusion]
source: LeetCode 2929
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Distribute Candies Among Children II

> [!TIP]
> **🧠 Memory hook**
> All splits **C(n + 2, 2)**, minus those where some child exceeds the limit: subtract **limit + 1** from that child first.
> **Mantra: Σ (−1)^j · C(3, j) · C(n − j(limit+1) + 2, 2)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=8) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
Count the ways to give n candies to 3 children so that nobody gets more than limit.

## Key insight
Ways to split m candies among 3 children with no cap is C(m + 2, 2). Forcing j chosen children over the limit removes j(limit + 1) candies first. Alternate signs over j = 0..3.

## Approach: Inclusion-exclusion
```java
// Stars and bars for 3 children, minus the cases where some child gets more than limit
public long distributeCandies(int n, int limit) {
    long total = 0;
    for (int over = 0; over <= 3; over++) {
        long rest = n - (long) over * (limit + 1);
        if (rest < 0) break;
        long ways = choose3(over) * (rest + 2) * (rest + 1) / 2;
        total += over % 2 == 0 ? ways : -ways;
    }
    return total;
}

// C(3, k) for k = 0..3
long choose3(int k) {
    return k == 0 || k == 3 ? 1 : 3;
}
```

| Approach | Time | Space |
|---|---|---|
| Inclusion-exclusion | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why limit + 1?</summary>

A child over the limit has at least limit + 1; give that first, the rest is free.

</details>


<details><summary>Why stop when rest < 0?</summary>

No valid splits exist then.

</details>


## Connected
- [Count the Number of Ideal Arrays](Count%20the%20Number%20of%20Ideal%20Arrays.md)
