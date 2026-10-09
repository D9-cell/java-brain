---
topic: HashMap
pattern: [Frequency counting]
source: LeetCode 1207
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Unique Number of Occurrences

> [!TIP]
> **🧠 Memory hook**
> Counts must be all different.
> **Mantra: MAP OF COUNTS, SET OF COUNTS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=42) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Is every value's frequency unique?

## Key insight
Put the counts into a set; equal sizes ⇔ no repeat.

## Approach: Map + set
```java
// Count occurrences; all counts must be distinct (a set catches a repeat)
public boolean uniqueOccurrences(int[] arr) {
    Map<Integer, Integer> cnt = new HashMap<>();
    for (int x : arr) cnt.merge(x, 1, Integer::sum);
    return new HashSet<>(cnt.values()).size() == cnt.size();
}
```

| Approach | Time | Space |
|---|---|---|
| Map + set | O(n) | O(n) |

## Recall before you reveal
<details><summary>Check?</summary>

set size == map size.

</details>

