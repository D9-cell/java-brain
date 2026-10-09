---
topic: HashSet
pattern: [HashSet, Reverse scan]
source: LeetCode 3396
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Minimum Number of Operations to Make Elements in Array Distinct

> [!TIP]
> **🧠 Memory hook**
> Read the queue from the back; the first repeated face tells how far from the front to cut.
> **Mantra: SCAN BACK, FIRST REPEAT i → ceil((i+1)/3)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=11) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Each operation removes the first 3 elements. Find the minimum number of operations to make the remaining elements distinct.

## Key insight
The kept part is a suffix. Scanning from the back, the first index i that repeats means 0..i must be removed: ceil((i+1)/3).

## Approach 1: Try each cut (brute force)
```java
// Approach 1: try removing 3, 6, 9, ... from the front and check the rest
public int minimumOperationsBrute(int[] nums) {
    int ops = 0;
    for (int i = 0; i < nums.length; i += 3, ops++) {
        Set<Integer> s = new HashSet<>();
        boolean ok = true;
        for (int j = i; j < nums.length && ok; j++) ok = s.add(nums[j]);
        if (ok) return ops;
    }
    return ops;
}
```

## Approach 2: Reverse scan
```java
// Approach 2: scan from the back; the first repeat at i means indices 0..i must go: ceil((i+1)/3) operations
public int minimumOperations(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int i = nums.length - 1; i >= 0; i--)
        if (!seen.add(nums[i])) return (i + 1 + 2) / 3;
    return 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Try each cut (brute force) | O(n²) | O(n) |
| Reverse scan | O(n) | O(n) |

## Recall before you reveal
<details><summary>Integer ceil of a/b?</summary>

(a + b − 1) / b.

</details>

