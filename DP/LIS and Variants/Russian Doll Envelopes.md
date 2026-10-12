---
topic: LIS and Variants
pattern: [Sort + LIS, Tails array]
source: LeetCode 354
difficulty: Hard
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Russian Doll Envelopes

> [!TIP]
> **🧠 Memory hook**
> Sort so one dimension is free, then the other becomes a plain **LIS**. Equal widths go **height descending** so they cannot chain.
> **Mantra: WIDTH ASC, HEIGHT DESC → LIS ON HEIGHT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=2) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Envelope (w, h) fits inside another only if both w and h are strictly smaller. Return the longest nesting chain.

## Key insight
After sorting by width ascending, any increasing run of heights has strictly growing widths, except for equal widths. Sorting equal widths by height descending makes it impossible to pick two of them in an increasing run.

## Approach: Sort + tails
```java
// Sort width ascending and height descending, then take the LIS of the heights
public int maxEnvelopes(int[][] envelopes) {
    Arrays.sort(envelopes, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(b[1], a[1]));
    int[] tails = new int[envelopes.length];
    int size = 0;
    for (int[] e : envelopes) {
        int lo = 0, hi = size;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (tails[mid] < e[1]) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = e[1];
        if (lo == size) size++;
    }
    return size;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + tails | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> The comparator uses Integer.compare so large dimensions cannot overflow a subtraction.

## Recall before you reveal
<details><summary>Why height descending on ties?</summary>

Two envelopes of equal width must not both be chosen.

</details>


<details><summary>Why not sort by both ascending?</summary>

Equal widths would chain wrongly.

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
- [Maximum Length of Pair Chain](Maximum%20Length%20of%20Pair%20Chain.md)
