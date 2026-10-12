---
topic: Rotated Arrays and Sorted Queries
pattern: [Sort + prefix max, Upper bound]
source: LeetCode 826
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Most Profit Assigning Work

> [!TIP]
> **🧠 Memory hook**
> Same shape: sort jobs by difficulty with a **running max profit**; each worker takes the best job **with difficulty ≤ ability**.
> **Mantra: sort jobs · prefix max profit · per worker: upper bound → add**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=9) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
Each worker can do at most one job with difficulty ≤ their ability (jobs can be shared). Return the maximum total profit.

## Key insight
A harder job may pay less, so the prefix maximum matters. Sorting workers too allows a single two-pointer sweep.

## Approach: Prefix max + search
```java
// Sort jobs by difficulty with a running max profit; each worker takes the best job it can do
public int maxProfitAssignment(int[] difficulty, int[] profit, int[] worker) {
    int n = difficulty.length;
    int[][] jobs = new int[n][];
    for (int i = 0; i < n; i++) jobs[i] = new int[]{difficulty[i], profit[i]};
    Arrays.sort(jobs, (a, b) -> a[0] - b[0]);
    for (int i = 1; i < n; i++) jobs[i][1] = Math.max(jobs[i][1], jobs[i - 1][1]);
    int total = 0;
    for (int w : worker) {
        int lo = 0, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (jobs[mid][0] <= w) lo = mid + 1;
            else hi = mid;
        }
        if (lo > 0) total += jobs[lo - 1][1];
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix max + search | O((n + w) log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Can two workers do the same job?</summary>

Yes, jobs are reusable.

</details>


<details><summary>Why prefix max?</summary>

An easier job may pay more.

</details>


## Connected
- [Most Beautiful Item for Each Query](Most%20Beautiful%20Item%20for%20Each%20Query.md)
