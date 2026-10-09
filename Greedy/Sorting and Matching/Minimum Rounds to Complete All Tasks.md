---
topic: Sorting and Matching
pattern: [Frequency, Groups of 2 and 3]
source: LeetCode 2244
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Rounds to Complete All Tasks

> [!TIP]
> **🧠 Memory hook**
> Tasks of one difficulty are done **2 or 3 at a time**.
> **Mantra: f = 1 → −1, ELSE ceil(f / 3)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=20) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
In one round you may complete 2 or 3 tasks of the same difficulty. Return the minimum rounds, or −1.

## Key insight
Count frequencies. A single task is impossible. Otherwise use as many triples as possible: `(f + 2) / 3` rounds.

## Approach: Frequency formula
```java
// Tasks of equal difficulty are done 2 or 3 at a time: a group of size 1 is impossible, otherwise ceil(size / 3) rounds
public int minimumRounds(int[] tasks) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int t : tasks) freq.merge(t, 1, Integer::sum);
    int rounds = 0;
    for (int f : freq.values()) {
        if (f == 1) return -1;
        rounds += (f + 2) / 3;
    }
    return rounds;
}
```

| Approach | Time | Space |
|---|---|---|
| Frequency formula | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does ceil(f/3) always work for f ≥ 2?</summary>

f mod 3 = 1 can be fixed by turning one triple into two pairs; f mod 3 = 2 needs one pair.

</details>


## Connected
- [Minimum Number of Operations to Make Array Empty](Minimum%20Number%20of%20Operations%20to%20Make%20Array%20Empty.md)
