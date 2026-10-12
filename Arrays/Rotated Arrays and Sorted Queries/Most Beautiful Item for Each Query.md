---
topic: Rotated Arrays and Sorted Queries
pattern: [Sort + prefix max, Upper bound]
source: LeetCode 2070
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Most Beautiful Item for Each Query

> [!TIP]
> **🧠 Memory hook**
> Sort items by price, keep a **running max beauty**, and for each query take the max at the **last affordable item**.
> **Mantra: sort by price · best[i] = max beauty up to i · upper bound(query) − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=8) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
items[i] = [price, beauty]. For each query return the maximum beauty among items with price ≤ query (0 if none).

## Key insight
After sorting, affordable items form a prefix, so the answer is a prefix maximum found by one binary search.

## Approach: Prefix max + search
```java
// Sort by price, keep a running max beauty, and binary search the last affordable item
public int[] maximumBeauty(int[][] items, int[] queries) {
    Arrays.sort(items, (a, b) -> a[0] - b[0]);
    int n = items.length;
    int[] best = new int[n];
    for (int i = 0; i < n; i++) best[i] = Math.max(items[i][1], i > 0 ? best[i - 1] : 0);
    int[] out = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        int lo = 0, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (items[mid][0] <= queries[q]) lo = mid + 1;
            else hi = mid;
        }
        out[q] = lo == 0 ? 0 : best[lo - 1];
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix max + search | O((n + q) log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why a prefix maximum?</summary>

All cheaper items are affordable too.

</details>


<details><summary>Offline alternative?</summary>

Sort queries and sweep items once.

</details>


## Connected
- [Most Profit Assigning Work](Most%20Profit%20Assigning%20Work.md)
