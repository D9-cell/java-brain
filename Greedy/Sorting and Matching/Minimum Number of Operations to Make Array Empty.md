---
topic: Sorting and Matching
pattern: [Frequency, Groups of 2 and 3]
source: LeetCode 2870
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Number of Operations to Make Array Empty

> [!TIP]
> **🧠 Memory hook**
> Same puzzle as the task rounds: **delete 2 or 3 equal elements** per operation.
> **Mantra: f = 1 → −1, ELSE ceil(f / 3)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=21) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Delete two equal elements or three equal elements per operation. Return the minimum operations to empty the array, or −1.

## Key insight
Identical reduction: a value with frequency 1 makes it impossible; otherwise `ceil(f / 3)` per value.

## Approach: Frequency formula
```java
// Same problem, same formula: delete two equal elements or three equal elements per operation
public int minOperations(int[] nums) { return minimumRounds(nums); }
```

| Approach | Time | Space |
|---|---|---|
| Frequency formula | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>How is this different from task rounds?</summary>

Only the story; the code is the same.

</details>


## Connected
- [Minimum Rounds to Complete All Tasks](Minimum%20Rounds%20to%20Complete%20All%20Tasks.md)
