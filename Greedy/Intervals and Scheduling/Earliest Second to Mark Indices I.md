---
topic: Intervals and Scheduling
pattern: [Binary search on the answer, Last occurrence]
source: LeetCode 3048
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Earliest Second to Mark Indices I

> [!TIP]
> **🧠 Memory hook**
> Binary search the second; inside, **mark each index as late as possible** (its last chance) so the earlier seconds are free for decrements.
> **Mantra: BINARY SEARCH s, MARK AT THE LAST OCCURRENCE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=13) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Each second you may decrement one nums[i], mark index changeIndices[s] if its value is 0, or do nothing. Return the earliest second at which all indices can be marked, or −1.

## Key insight
If it is feasible at second s it is feasible later, so binary search. For a fixed s every index needs an occurrence in `changeIndices[0..s)`; use the last one as the marking second. Process indices by that time and check that the total decrements plus marks fit before each marking second.

## Approach: Binary search + greedy check
```java
// Binary search on the second: it is feasible when every index can be fully decremented before its last chance to be marked
public int earliestSecondToMarkIndices(int[] nums, int[] changeIndices) {
    int n = nums.length, m = changeIndices.length;
    int lo = 1, hi = m, ans = -1;
    while (lo <= hi) {
        int mid = (lo + hi) >>> 1;
        if (feasible(nums, changeIndices, mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1;
    }
    return ans;
}

// Marks happen at the last occurrence of each index within the first s seconds; process indexes by that time and count the free seconds for decrements
private boolean feasible(int[] nums, int[] change, int s) {
    int n = nums.length;
    int[] last = new int[n + 1];
    Arrays.fill(last, -1);
    for (int i = 0; i < s; i++) last[change[i]] = i;
    for (int i = 1; i <= n; i++) if (last[i] == -1) return false;
    Integer[] order = new Integer[n];
    for (int i = 0; i < n; i++) order[i] = i + 1;
    Arrays.sort(order, (a, b) -> last[a] - last[b]);
    int used = 0;
    for (int idx : order) {
        int need = nums[idx - 1] + 1;
        if (used + need > last[idx] + 1) return false;
        used += need;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + greedy check | O(m log m + n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a state search over (remaining counts, marked set). Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why the last occurrence?</summary>

Marking later leaves the most seconds available for decrementing.

</details>


## Connected
- [Earliest Possible Day of Full Bloom](Earliest%20Possible%20Day%20of%20Full%20Bloom.md)
