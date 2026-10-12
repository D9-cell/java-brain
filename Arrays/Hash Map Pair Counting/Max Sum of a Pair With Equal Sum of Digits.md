---
topic: Hash Map Pair Counting
pattern: [Derived key, Best per group]
source: LeetCode 2342
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Max Sum of a Pair With Equal Sum of Digits

> [!TIP]
> **🧠 Memory hook**
> Group by **digit sum** and keep only the **largest** number per group; each new number pairs with that best.
> **Mantra: best[ds] → answer = max(best + x) · keep the larger**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Hash%20Map%20Pair%20Counting/Hash%20Map%20Pair%20Counting%20Animations.html#p=2) · **Pattern hub:** [Hash Map Pair Counting - Pattern Map](Hash%20Map%20Pair%20Counting%20-%20Pattern%20Map.md)

## Problem
Return the maximum nums[i] + nums[j] over i ≠ j with equal digit sums, or -1.

## Key insight
The best partner for x in its group is the largest other value, so one stored value per digit sum is enough.

## Approach: Best per digit sum
```java
// Keep the largest number seen for each digit sum and pair it with the current one
public int maximumSum(int[] nums) {
    Map<Integer, Integer> best = new HashMap<>();
    int answer = -1;
    for (int x : nums) {
        int s = 0;
        for (int y = x; y > 0; y /= 10) s += y % 10;
        Integer prev = best.get(s);
        if (prev != null) answer = Math.max(answer, prev + x);
        if (prev == null || x > prev) best.put(s, x);
    }
    return answer;
}
```

| Approach | Time | Space |
|---|---|---|
| Best per digit sum | O(n · digits) | O(1) (at most 82 keys) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why keep only the maximum?</summary>

It is always the best partner.

</details>


<details><summary>Key range?</summary>

Digit sums are at most 81.

</details>


## Connected
- [Pairs of Songs With Total Durations Divisible by 60](Pairs%20of%20Songs%20With%20Total%20Durations%20Divisible%20by%2060.md)
