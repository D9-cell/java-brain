---
topic: HashSet
pattern: [HashSet, Start-of-run]
source: LeetCode 128
difficulty: Medium
companies: [Amazon, Microsoft, Walmart]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Longest Consecutive Sequence

> [!TIP]
> **🧠 Memory hook**
> Only the first domino in a row starts counting.
> **Mantra: START ONLY IF x−1 MISSING, WALK UP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=5) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Find the length of the longest run of consecutive integers in O(n).

## Key insight
Put all numbers in a set. Start walking only from numbers whose predecessor is missing, so each run is walked once.

## Approach: Set + start-of-run
```java
// Only start counting from a number whose predecessor is missing, so each number is walked once
public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int x : nums) set.add(x);
    int best = 0;
    for (int x : set) {
        if (set.contains(x - 1)) continue;
        int len = 1;
        while (set.contains(x + len)) len++;
        best = Math.max(best, len);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Set + start-of-run | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why iterate over the set and not the array?</summary>

Duplicated start values would repeat the same walk (worst case O(n²)).

</details>


<details><summary>Sort-based approach?</summary>

O(n log n); fine but not what the question asks.

</details>


## Connected
- [Smallest Missing Integer Greater Than Sequential Prefix Sum](Smallest%20Missing%20Integer%20Greater%20Than%20Sequential%20Prefix%20Sum.md)
