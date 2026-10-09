---
topic: Design
pattern: [Two maps, TreeSet]
source: LeetCode 2349
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design a Number Container System

> [!TIP]
> **🧠 Memory hook**
> A catalogue both ways: shelf → book and book → sorted shelves.
> **Mantra: idx→num + num→TreeSet<idx>**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=5) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
change(index, number) overwrites; find(number) returns the smallest index or -1.

## Key insight
Keep index → number and number → TreeSet of indices; on overwrite, remove the index from the old number's set.

## Approach: Two maps
```java
// index → number, and number → sorted set of indices
static class NumberContainers {
    private final Map<Integer, Integer> idxToNum = new HashMap<>();
    private final Map<Integer, TreeSet<Integer>> numToIdx = new HashMap<>();

    // Removes the index from its old number's set before adding it to the new one
    public void change(int index, int number) {
        Integer old = idxToNum.put(index, number);
        if (old != null) {
            TreeSet<Integer> s = numToIdx.get(old);
            s.remove(index);
            if (s.isEmpty()) numToIdx.remove(old);
        }
        numToIdx.computeIfAbsent(number, k -> new TreeSet<>()).add(index);
    }

    // Smallest index holding number, or -1
    public int find(int number) {
        TreeSet<Integer> s = numToIdx.get(number);
        return s == null ? -1 : s.first();
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Two maps | O(log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Lazy heap alternative?</summary>

Min-heap per number; pop tops whose index no longer maps to that number.

</details>

