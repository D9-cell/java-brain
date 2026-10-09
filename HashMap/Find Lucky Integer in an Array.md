---
topic: HashMap
pattern: [Frequency counting]
source: LeetCode 1394
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Find Lucky Integer in an Array

> [!TIP]
> **🧠 Memory hook**
> A value equal to its own count.
> **Mantra: COUNT ARRAY, SCAN DOWN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=24) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Largest x whose frequency equals x, or −1.

## Key insight
Count, then scan from the largest value down.

## Approach: Count array
```java
// Values are ≤ 500: a frequency array; scan from the top so the first lucky value is the largest
public int findLucky(int[] arr) {
    int[] cnt = new int[501];
    for (int x : arr) cnt[x]++;
    for (int v = 500; v >= 1; v--) if (cnt[v] == v) return v;
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Count array | O(n) | O(500) |

## Recall before you reveal
<details><summary>Why scan down?</summary>

The first hit is the largest.

</details>

