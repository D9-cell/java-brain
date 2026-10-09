---
topic: Sorting and Matching
pattern: [Frequency, Remove the rarest values]
source: LeetCode 1481
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Least Number of Unique Integers after K Removals

> [!TIP]
> **🧠 Memory hook**
> To lose the most distinct values, **delete the values that are cheapest to erase entirely**.
> **Mantra: SORT FREQUENCIES, WIPE OUT SMALLEST FIRST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=11) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Remove exactly k elements to minimise the number of distinct values left.

## Key insight
Count frequencies and remove whole values starting from the smallest frequency while k allows.

## Approach 1: Sorted frequencies
```java
// Count frequencies and remove whole values starting from the rarest
public int findLeastNumOfUniqueInts(int[] arr, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int x : arr) freq.merge(x, 1, Integer::sum);
    List<Integer> counts = new ArrayList<>(freq.values());
    Collections.sort(counts);
    int unique = counts.size();
    for (int c : counts) {
        if (k < c) break;
        k -= c;
        unique--;
    }
    return unique;
}
```

## Approach 2: Min-heap of frequencies
```java
// Min-heap of frequencies instead of sorting
public int findLeastNumOfUniqueIntsHeap(int[] arr, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int x : arr) freq.merge(x, 1, Integer::sum);
    PriorityQueue<Integer> pq = new PriorityQueue<>(freq.values());
    while (k > 0 && !pq.isEmpty()) {
        int c = pq.poll();
        if (c > k) { pq.add(c); break; }
        k -= c;
    }
    return pq.size();
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted frequencies | O(n log n) | O(n) |
| Min-heap of frequencies | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>What if k is left over after removing some values?</summary>

The extra removals just shrink a larger group and cannot reduce the distinct count.

</details>


## Connected
- [Minimum Rounds to Complete All Tasks](Minimum%20Rounds%20to%20Complete%20All%20Tasks.md)
