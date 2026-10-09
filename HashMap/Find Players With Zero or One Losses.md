---
topic: HashMap
pattern: [Ordered map]
source: LeetCode 2225
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Find Players With Zero or One Losses

> [!TIP]
> **🧠 Memory hook**
> A sorted loss sheet.
> **Mantra: TREEMAP LOSSES, PICK 0 AND 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=16) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Players with no losses and with exactly one loss, each sorted.

## Key insight
TreeMap of losses (winners added with 0) gives sorted output for free.

## Approach: TreeMap
```java
// TreeMap player → losses (winners get 0 if absent); sorted output for free
public List<List<Integer>> findWinners(int[][] matches) {
    TreeMap<Integer, Integer> losses = new TreeMap<>();
    for (int[] m : matches) {
        losses.putIfAbsent(m[0], 0);
        losses.merge(m[1], 1, Integer::sum);
    }
    List<Integer> zero = new ArrayList<>(), one = new ArrayList<>();
    for (Map.Entry<Integer, Integer> e : losses.entrySet()) {
        if (e.getValue() == 0) zero.add(e.getKey());
        else if (e.getValue() == 1) one.add(e.getKey());
    }
    return List.of(zero, one);
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Why putIfAbsent for winners?</summary>

So unbeaten players appear with 0.

</details>

