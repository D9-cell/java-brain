---
topic: HashSet
pattern: [Distinct counting]
source: LeetCode 3375
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Minimum Operations to Make Array Values Equal to K

> [!TIP]
> **🧠 Memory hook**
> A staircase down to k: each distinct step above k costs one jump.
> **Mantra: ANY < k → −1, ELSE #DISTINCT > k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=12) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
An operation picks a valid h and sets every value > h to h. Minimum operations to make all values equal k.

## Key insight
Values below k make it impossible. Otherwise every distinct value above k needs exactly one operation.

## Approach: Set of values above k
```java
// Impossible if anything is below k; otherwise each distinct value above k costs one operation
public int minOperations(int[] nums, int k) {
    Set<Integer> above = new HashSet<>();
    for (int x : nums) {
        if (x < k) return -1;
        if (x > k) above.add(x);
    }
    return above.size();
}
```

| Approach | Time | Space |
|---|---|---|
| Set of values above k | O(n) | O(n) |

## Recall before you reveal
<details><summary>Answer for [9,7,5,3], k=1?</summary>

4.

</details>

