---
topic: Heap
pattern: [k sorted lists]
source: LeetCode 632
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Smallest Range Covering Elements from K Lists

> [!TIP]
> **🧠 Memory hook**
> One finger on each list; move the lowest finger.
> **Mantra: HEAP OF HEADS, TRACK MAX, ADVANCE MIN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=22) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Smallest range [a, b] containing at least one element of each list.

## Key insight
The heap gives the current minimum; track the current maximum; advance the list with the minimum until one list is exhausted.

## Approach: Heap of heads
```java
// One pointer per list in a min-heap; the range is [heap min, current max]; advance the list that owns the min
public int[] smallestRange(List<List<Integer>> nums) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(nums.get(a[0]).get(a[1]), nums.get(b[0]).get(b[1])));
    int max = Integer.MIN_VALUE;
    for (int i = 0; i < nums.size(); i++) { pq.offer(new int[]{i, 0}); max = Math.max(max, nums.get(i).get(0)); }
    int[] best = {nums.get(pq.peek()[0]).get(0), max};
    while (true) {
        int[] p = pq.poll();
        int lo = nums.get(p[0]).get(p[1]);
        if (max - lo < best[1] - best[0]) best = new int[]{lo, max};
        if (p[1] + 1 == nums.get(p[0]).size()) return best;
        int nx = nums.get(p[0]).get(p[1] + 1);
        max = Math.max(max, nx);
        pq.offer(new int[]{p[0], p[1] + 1});
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Heap of heads | O(N log k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Stop when?</summary>

The minimum's list has no next element.

</details>


## Connected
- [Find K Pairs with Smallest Sums](Find%20K%20Pairs%20with%20Smallest%20Sums.md)
