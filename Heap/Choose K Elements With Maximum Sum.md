---
topic: Heap
pattern: [Sort + heap]
source: LeetCode 3478
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Choose K Elements With Maximum Sum

> [!TIP]
> **🧠 Memory hook**
> A growing talent pool; keep the k best scores of everyone ranked strictly below you.
> **Mantra: SORT BY nums1, MIN-HEAP OF k LARGEST nums2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=11) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
For each i: the max sum of up to k values nums2[j] with nums1[j] < nums1[i].

## Key insight
Process indices by nums1; answer a whole equal-nums1 group before adding it; a min-heap keeps the k largest nums2 and a running sum.

## Approach 1: Brute force
```java
// Brute force: for each i collect, sort and sum the top k
static long[] brute(int[] a, int[] b, int k) {
    long[] ans = new long[a.length];
    for (int i = 0; i < a.length; i++) {
        List<Integer> c = new ArrayList<>();
        for (int j = 0; j < a.length; j++) if (a[j] < a[i]) c.add(b[j]);
        c.sort(Collections.reverseOrder());
        for (int t = 0; t < Math.min(k, c.size()); t++) ans[i] += c.get(t);
    }
    return ans;
}
```

## Approach 2: Sort + heap
```java
// Sort indices by nums1; a min-heap keeps the k largest nums2 seen among strictly smaller nums1
public long[] findMaxSum(int[] nums1, int[] nums2, int k) {
    int n = nums1.length;
    Integer[] idx = new Integer[n];
    for (int i = 0; i < n; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> Integer.compare(nums1[a], nums1[b]));
    long[] ans = new long[n];
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    long sum = 0;
    for (int i = 0; i < n; ) {
        int j = i;
        while (j < n && nums1[idx[j]] == nums1[idx[i]]) ans[idx[j++]] = sum;
        for (int t = i; t < j; t++) {
            pq.offer(nums2[idx[t]]);
            sum += nums2[idx[t]];
            if (pq.size() > k) sum -= pq.poll();
        }
        i = j;
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n² log n) | O(n) |
| Sort + heap | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Equal nums1?</summary>

Assign their answers first, then add them.

</details>

