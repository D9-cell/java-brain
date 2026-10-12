---
topic: Binary Search Basics
pattern: [Exact match, API-driven]
source: LeetCode 374
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Guess Number Higher or Lower

> [!TIP]
> **🧠 Memory hook**
> Same search, but the comparison comes from **guess(mid)**: −1 go left, 1 go right, 0 found.
> **Mantra: g = guess(mid) · 0 → mid · −1 → hi = mid − 1 · 1 → lo = mid + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=1) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
A number was picked from 1..n. guess(num) returns -1 if num is higher than the pick, 1 if lower, 0 if equal. Find the pick.

## Key insight
n can be 2³¹ − 1, so the overflow-safe middle matters here.

## Approach: Binary search
```java
// Binary search on 1..n driven by the guess API
public int guessNumber(int n) {
    int lo = 1, hi = n;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int g = guess(mid);
        if (g == 0) return mid;
        if (g < 0) hi = mid - 1;
        else lo = mid + 1;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Which way on −1?</summary>

Our guess is too high, search left.

</details>


<details><summary>Why lo + (hi − lo) / 2?</summary>

n can be Integer.MAX_VALUE.

</details>


## Connected
- [Binary Search](Binary%20Search.md)
