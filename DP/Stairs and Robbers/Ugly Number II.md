---
topic: Stairs and Robbers
pattern: [Merge three streams, Three pointers]
source: LeetCode 264
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Ugly Number II

> [!TIP]
> **🧠 Memory hook**
> Every ugly number is an earlier one times **2, 3 or 5**: merge those three sorted streams.
> **Mantra: NEXT = MIN(u[i2]·2, u[i3]·3, u[i5]·5)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=13) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
An ugly number has only prime factors 2, 3 and 5. Return the n-th ugly number.

## Key insight
Keep three pointers into the list of ugly numbers found so far; the next ugly number is the smallest of the three products, and every pointer that produced it advances (this also removes duplicates).

## Approach 1: Three pointers
```java
// Three pointers: each ugly number is an earlier ugly number times 2, 3 or 5; always take the smallest candidate
public int nthUglyNumber(int n) {
    int[] ugly = new int[n];
    ugly[0] = 1;
    int i2 = 0, i3 = 0, i5 = 0;
    for (int i = 1; i < n; i++) {
        int a = ugly[i2] * 2, b = ugly[i3] * 3, c = ugly[i5] * 5;
        ugly[i] = Math.min(a, Math.min(b, c));
        if (ugly[i] == a) i2++;
        if (ugly[i] == b) i3++;
        if (ugly[i] == c) i5++;
    }
    return ugly[n - 1];
}
```

## Approach 2: Heap + set
```java
// Min-heap with a set to avoid duplicates
public int nthUglyNumberHeap(int n) {
    PriorityQueue<Long> pq = new PriorityQueue<>(List.of(1L));
    Set<Long> seen = new HashSet<>(List.of(1L));
    long cur = 1;
    for (int i = 0; i < n; i++) {
        cur = pq.poll();
        for (int f : new int[]{2, 3, 5}) if (seen.add(cur * f)) pq.add(cur * f);
    }
    return (int) cur;
}
```

| Approach | Time | Space |
|---|---|---|
| Three pointers | O(n) | O(n) |
| Heap + set | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why advance all matching pointers?</summary>

6 = 2·3 = 3·2 would otherwise appear twice.

</details>


## Connected
- [Perfect Squares](Perfect%20Squares.md)
