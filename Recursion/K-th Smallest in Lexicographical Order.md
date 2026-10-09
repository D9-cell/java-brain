---
topic: Recursion
pattern: [Counting subtrees, Digit tree]
source: LeetCode 440
difficulty: Hard
companies: [Hulu]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# K-th Smallest in Lexicographical Order

> [!TIP]
> **🧠 Memory hook**
> A library catalogue: count the books on shelf "1"; if k is past them, skip the whole shelf, otherwise open it.
> **Mantra: COUNT SUBTREE → SKIP SIBLING OR GO DOWN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=20) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Return the k-th number in lexicographic order among 1..n (n ≤ 1e9).

## Key insight
Walking one by one is O(n). Instead count how many numbers sit under prefix `curr` (level by level), and either skip to `curr+1` or descend to `curr*10`.

## Approach: Count and skip
```java
// How many numbers <= n live in the subtree of prefix curr (level by level: [curr, next) then x10)
static long countUnder(long curr, long n) {
    long next = curr + 1, cnt = 0;
    while (curr <= n) {
        cnt += Math.min(n + 1, next) - curr;
        curr *= 10;
        next *= 10;
    }
    return cnt;
}

// Skip whole subtrees while k is beyond them; otherwise step down one level
public int findKthNumber(int n, int k) {
    long curr = 1;
    k--;
    while (k > 0) {
        long cnt = countUnder(curr, n);
        if (cnt <= k) { k -= cnt; curr++; }
        else { k--; curr *= 10; }
    }
    return (int) curr;
}
```

| Approach | Time | Space |
|---|---|---|
| Count and skip | O(log² n) | O(1) |

## Recall before you reveal
<details><summary>Why `long`?</summary>

curr and next are multiplied by 10 repeatedly.

</details>


## Connected
- [Lexicographical Numbers](Lexicographical%20Numbers.md)
