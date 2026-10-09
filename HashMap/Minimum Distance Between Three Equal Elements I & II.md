---
topic: HashMap
pattern: [Value → positions]
source: LeetCode 3740 / 3741
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Minimum Distance Between Three Equal Elements I & II

> [!TIP]
> **🧠 Memory hook**
> The distance of three is twice the span.
> **Mantra: THREE CONSECUTIVE OCCURRENCES, 2(k − i)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=30) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Minimum |i−j| + |j−k| + |k−i| over equal triples.

## Key insight
The sum equals 2(k − i), so only three consecutive occurrences of a value can be optimal.

## Approach: Index lists
```java
// |i−j|+|j−k|+|k−i| = 2(k−i): only three CONSECUTIVE occurrences of a value can be optimal
public int minimumDistance(int[] nums) {
    Map<Integer, List<Integer>> pos = new HashMap<>();
    int best = Integer.MAX_VALUE;
    for (int k = 0; k < nums.length; k++) {
        List<Integer> l = pos.computeIfAbsent(nums[k], x -> new ArrayList<>());
        l.add(k);
        if (l.size() >= 3) best = Math.min(best, k - l.get(l.size() - 3));
    }
    return best == Integer.MAX_VALUE ? -1 : 2 * best;
}
```

| Approach | Time | Space |
|---|---|---|
| Index lists | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n³).

## Recall before you reveal
<details><summary>Why consecutive?</summary>

Closer outer indices only help; the middle does not matter.

</details>


## Connected
- [Closest Equal Element Queries](Closest%20Equal%20Element%20Queries.md)
