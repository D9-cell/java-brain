---
topic: HashMap
pattern: [Two maps]
source: LeetCode 3160
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Find the Number of Distinct Colors Among the Balls

> [!TIP]
> **🧠 Memory hook**
> Two ledgers: ball → colour and colour → how many balls.
> **Mantra: BALL→COLOR, COLOR→COUNT, SIZE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=18) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
After each recolouring query, how many distinct colours are in use?

## Key insight
Recolouring moves one ball between colour counts; remove colours that reach 0 so size() is the answer.

## Approach: Two maps
```java
// ball → color and color → how many balls; the answer is the number of colors with a positive count
public int[] queryResults(int limit, int[][] queries) {
    Map<Integer, Integer> ballColor = new HashMap<>(), colorCount = new HashMap<>();
    int[] res = new int[queries.length];
    for (int i = 0; i < queries.length; i++) {
        int ball = queries[i][0], color = queries[i][1];
        Integer old = ballColor.put(ball, color);
        if (old != null && colorCount.merge(old, -1, Integer::sum) == 0) colorCount.remove(old);
        colorCount.merge(color, 1, Integer::sum);
        res[i] = colorCount.size();
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Two maps | O(q) | O(q) |

> [!WARNING]
> **Java gotcha**
> Verified against recomputing distinct colours.

## Recall before you reveal
<details><summary>Why maps, not arrays?</summary>

Ball labels go up to 1e9.

</details>

