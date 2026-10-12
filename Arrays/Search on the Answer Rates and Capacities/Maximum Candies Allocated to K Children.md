---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer, Maximum]
source: LeetCode 2226
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Candies Allocated to K Children

> [!TIP]
> **🧠 Memory hook**
> Search the **largest** pile size x with **Σ c / x ≥ k**. Use the upper-middle so the loop ends.
> **Mantra: mid = lo + (hi − lo + 1)/2 · kids(mid) ≥ k → lo = mid · ELSE hi = mid − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=8) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
Piles can be split but not merged. Each child gets one sub-pile of the same size. Return the maximum size so that k children each get one (0 if impossible).

## Key insight
Smaller sizes always serve at least as many children. Searching for a maximum needs mid rounded up, or lo = mid could loop forever.

## Approach: Binary search on size
```java
// Largest pile size x where sum of c / x reaches k children
public int maximumCandies(int[] candies, long k) {
    int lo = 0, hi = 0;
    for (int c : candies) hi = Math.max(hi, c);
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2;
        long kids = 0;
        for (int c : candies) kids += c / mid;
        if (kids >= k) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on size | O(n log max) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why round mid up?</summary>

With lo = mid, rounding down could leave the range unchanged.

</details>


<details><summary>Why long k?</summary>

k can be 10¹².

</details>


## Connected
- [Minimum Limit of Balls in a Bag](Minimum%20Limit%20of%20Balls%20in%20a%20Bag.md)
