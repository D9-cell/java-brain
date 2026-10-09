---
topic: HashMap
pattern: [Ordered-map greedy]
source: LeetCode 846
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Hand of Straights

> [!TIP]
> **🧠 Memory hook**
> The smallest card must start a run.
> **Mantra: TREEMAP, TAKE firstKey .. +groupSize**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=20) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Can the hand be divided into groups of groupSize consecutive cards?

## Key insight
The smallest remaining card cannot be in the middle of a group, so it starts one.

## Approach: TreeMap greedy
```java
// The smallest remaining card must START a group: consume start .. start+groupSize-1 from a TreeMap
public boolean isNStraightHand(int[] hand, int groupSize) {
    if (hand.length % groupSize != 0) return false;
    TreeMap<Integer, Integer> cnt = new TreeMap<>();
    for (int x : hand) cnt.merge(x, 1, Integer::sum);
    while (!cnt.isEmpty()) {
        int start = cnt.firstKey();
        for (int v = start; v < start + groupSize; v++) {
            Integer c = cnt.get(v);
            if (c == null) return false;
            if (c == 1) cnt.remove(v); else cnt.put(v, c - 1);
        }
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap greedy | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against the same greedy on a list.

## Recall before you reveal
<details><summary>Quick reject?</summary>

n % groupSize ≠ 0.

</details>


## Connected
- [Array of Doubled Pairs](Array%20of%20Doubled%20Pairs.md)
