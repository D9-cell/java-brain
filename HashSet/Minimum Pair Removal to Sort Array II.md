---
topic: HashSet
pattern: [TreeSet as min-structure, Linked list simulation]
source: LeetCode 3510
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Minimum Pair Removal to Sort Array II

> [!TIP]
> **🧠 Memory hook**
> A train of wagons: always couple the lightest adjacent pair; track how many joints are out of order.
> **Mantra: TREESET(sum, idx) + LINKED LIST + BAD COUNT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=7) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Repeatedly merge the adjacent pair with the smallest sum (leftmost on ties) until non-decreasing. Return the number of operations.

## Key insight
Simulate efficiently: an ordered set of (pairSum, leftIndex), prev/next arrays for alive cells, and a running count of bad adjacent pairs. A merge touches only the neighbours.

## Approach: Ordered set simulation
```java
// Ordered set of (pairSum, leftIndex) + a doubly linked list over alive indices + a running count of bad pairs
public int minimumPairRemoval(int[] nums) {
    int n = nums.length;
    long[] v = new long[n];
    for (int i = 0; i < n; i++) v[i] = nums[i];
    int[] next = new int[n], prev = new int[n];
    for (int i = 0; i < n; i++) { next[i] = i + 1; prev[i] = i - 1; }
    TreeSet<long[]> pairs = new TreeSet<>((a, b) -> a[0] != b[0] ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1]));
    int bad = 0;
    for (int i = 0; i + 1 < n; i++) {
        if (v[i] > v[i + 1]) bad++;
        pairs.add(new long[]{v[i] + v[i + 1], i});
    }
    int ops = 0;
    while (bad > 0) {
        int a = (int) pairs.pollFirst()[1], b = next[a], left = prev[a], right = next[b];
        long merged = v[a] + v[b];
        if (v[a] > v[b]) bad--;
        if (left >= 0) {
            if (v[left] > v[a] && v[left] <= merged) bad--;
            else if (v[left] <= v[a] && v[left] > merged) bad++;
            pairs.remove(new long[]{v[left] + v[a], left});
            pairs.add(new long[]{v[left] + merged, left});
        }
        if (right < n) {
            if (v[right] >= v[b] && v[right] < merged) bad++;
            else if (v[right] < v[b] && v[right] >= merged) bad--;
            pairs.remove(new long[]{v[b] + v[right], b});
            pairs.add(new long[]{merged + v[right], a});
            prev[right] = a;
        }
        next[a] = right;
        v[a] = merged;
        ops++;
    }
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Ordered set simulation | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a literal list simulation on 500 random arrays.

## Recall before you reveal
<details><summary>Which bad-pair statuses can change in one merge?</summary>

(a,b) disappears; (left,a) and (b,right) are replaced by (left,a+b) and (a+b,right).

</details>


<details><summary>Why long values?</summary>

Repeated merges can exceed int.

</details>


## Connected
- Version I (small n): direct simulation
