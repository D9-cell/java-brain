---
topic: Heap
pattern: [Top-k heap, Bucket sort]
source: LeetCode 347
difficulty: Medium
companies: [Amazon, Facebook]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Top K Frequent Elements

> [!TIP]
> **🧠 Memory hook**
> Hang numbers on hooks numbered by frequency.
> **Mantra: COUNT, BUCKET BY FREQ, READ HIGH → LOW**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=25) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Return the k most frequent elements.

## Key insight
Frequencies are ≤ n, so bucket sort is O(n). A size-k min-heap is O(n log k).

## Approach 1: Min-heap
```java
// Approach 1: min-heap of size k by frequency
public int[] topKFrequentHeap(int[] nums, int k) {
    Map<Integer, Integer> cnt = new HashMap<>();
    for (int x : nums) cnt.merge(x, 1, Integer::sum);
    PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> cnt.get(a) - cnt.get(b));
    for (int x : cnt.keySet()) { pq.offer(x); if (pq.size() > k) pq.poll(); }
    return pq.stream().mapToInt(Integer::intValue).toArray();
}
```

## Approach 2: Bucket sort
```java
// Approach 2: bucket sort, bucket[f] = values seen exactly f times; read buckets from high to low
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> cnt = new HashMap<>();
    for (int x : nums) cnt.merge(x, 1, Integer::sum);
    List<List<Integer>> bucket = new ArrayList<>();
    for (int i = 0; i <= nums.length; i++) bucket.add(new ArrayList<>());
    cnt.forEach((v, f) -> bucket.get(f).add(v));
    int[] res = new int[k];
    int idx = 0;
    for (int f = nums.length; f >= 0 && idx < k; f--) for (int v : bucket.get(f)) if (idx < k) res[idx++] = v;
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Min-heap | O(n log k) | O(n) |
| Bucket sort | O(n) | O(n) |

## Recall before you reveal
<details><summary>Heap order?</summary>

Min by frequency (evict the least frequent).

</details>


## Connected
- [Top K Frequent Words](Top%20K%20Frequent%20Words.md)
