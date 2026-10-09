---
topic: Heap
pattern: [k sorted lists]
source: LeetCode 1508
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Range Sum of Sorted Subarray Sums

> [!TIP]
> **🧠 Memory hook**
> Positive numbers: extending a subarray only grows it.
> **Mantra: SEED SINGLES, POP, EXTEND BY ONE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=19) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Sum of the sorted subarray sums at positions left..right (mod 1e9+7).

## Key insight
Subarrays starting at i form a sorted list as they extend. Heap-merge the lists.

## Approach 1: Generate + sort
```java
// Approach 1: generate all n(n+1)/2 sums and sort
public int rangeSumSort(int[] nums, int n, int left, int right) {
    List<Integer> all = new ArrayList<>();
    for (int i = 0; i < n; i++) { int s = 0; for (int j = i; j < n; j++) { s += nums[j]; all.add(s); } }
    Collections.sort(all);
    long res = 0;
    for (int i = left - 1; i < right; i++) res += all.get(i);
    return (int) (res % 1_000_000_007);
}
```

## Approach 2: Heap merge
```java
// Approach 2: min-heap of (sum, end) seeded with every single element; pop in sorted order, extend the popped subarray
public int rangeSum(int[] nums, int n, int left, int right) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    for (int i = 0; i < n; i++) pq.offer(new int[]{nums[i], i});
    long res = 0;
    for (int c = 1; c <= right; c++) {
        int[] p = pq.poll();
        if (c >= left) res += p[0];
        if (p[1] + 1 < n) pq.offer(new int[]{p[0] + nums[p[1] + 1], p[1] + 1});
    }
    return (int) (res % 1_000_000_007);
}
```

| Approach | Time | Space |
|---|---|---|
| Generate + sort | O(n² log n) | O(n²) |
| Heap merge | O(right · log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Heap and sort versions agree on random inputs.

## Recall before you reveal
<details><summary>Requirement?</summary>

Positive values.

</details>


## Connected
- [Find K Pairs with Smallest Sums](Find%20K%20Pairs%20with%20Smallest%20Sums.md)
