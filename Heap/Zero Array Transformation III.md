---
topic: Heap
pattern: [Greedy with regret, Difference array]
source: LeetCode 3362
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Zero Array Transformation III

> [!TIP]
> **🧠 Memory hook**
> Cover each spot with the blanket that reaches furthest.
> **Mantra: SWEEP, HEAP OF ENDS, DIFF ARRAY, q − used**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=31) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Maximum number of queries removable so the rest can still make nums all zeros (or -1).

## Key insight
Sweep indices; started queries wait in a max-heap by end. While coverage is short, use the furthest-reaching query (a difference array records its end).

## Approach: Sweep + heap
```java
// available query that reaches FURTHEST; a difference array tracks coverage. Answer = queries never used
public int maxRemoval(int[] nums, int[][] queries) {
    int n = nums.length, q = queries.length;
    Arrays.sort(queries, (a, b) -> a[0] - b[0]);
    PriorityQueue<Integer> avail = new PriorityQueue<>(Collections.reverseOrder());
    int[] diff = new int[n + 1];
    int cover = 0, used = 0, j = 0;
    for (int i = 0; i < n; i++) {
        cover += diff[i];
        while (j < q && queries[j][0] <= i) avail.offer(queries[j++][1]);
        while (cover < nums[i] && !avail.isEmpty() && avail.peek() >= i) {
            int end = avail.poll();
            cover++;
            diff[end + 1]--;
            used++;
        }
        if (cover < nums[i]) return -1;
    }
    return q - used;
}
```

| Approach | Time | Space |
|---|---|---|
| Sweep + heap | O((n + q) log q) | O(n + q) |

> [!WARNING]
> **Java gotcha**
> Verified against trying every subset of queries.

## Recall before you reveal
<details><summary>Why furthest end?</summary>

It helps the most future positions.

</details>


## Connected
- [Line Sweep - Pattern Map](../Line%20Sweep/Line%20Sweep%20-%20Pattern%20Map.md)
