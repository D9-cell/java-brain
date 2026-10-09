---
topic: HashMap
pattern: [Frequency counting]
source: LeetCode 781
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Rabbits in Forest

> [!TIP]
> **🧠 Memory hook**
> An answer x means a team of x + 1.
> **Mantra: ceil(c / (x + 1)) · (x + 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=38) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Minimum number of rabbits given their answers.

## Key insight
Rabbits with the same answer x share teams of size x + 1; c of them need ceil(c / (x+1)) teams.

## Approach: Count map
```java
// Answer x means a colour group of size x+1; c rabbits answering x need ceil(c / (x+1)) groups
public int numRabbits(int[] answers) {
    Map<Integer, Integer> cnt = new HashMap<>();
    for (int a : answers) cnt.merge(a, 1, Integer::sum);
    int total = 0;
    for (Map.Entry<Integer, Integer> e : cnt.entrySet()) {
        int size = e.getKey() + 1;
        total += (e.getValue() + size - 1) / size * size;
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Count map | O(n) | O(n) |

## Recall before you reveal
<details><summary>Answer 0?</summary>

Each such rabbit is alone.

</details>

