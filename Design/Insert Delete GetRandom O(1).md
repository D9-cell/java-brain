---
topic: Design
pattern: [List + map, Swap-delete]
source: LeetCode 380
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Insert Delete GetRandom O(1)

> [!TIP]
> **🧠 Memory hook**
> A row of seats: when someone leaves, the last person moves into their seat.
> **Mantra: LIST + MAP, SWAP-WITH-LAST DELETE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=22) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
insert, remove, getRandom in average O(1).

## Key insight
Random access needs an array; O(1) delete needs value → index; fill the hole with the last element.

## Approach: ArrayList + HashMap
```java
// ArrayList for O(1) random pick + value → index map; delete by swapping with the last element
static class RandomizedSet {
    private final List<Integer> vals = new ArrayList<>();
    private final Map<Integer, Integer> pos = new HashMap<>();
    private final Random rnd = new Random();

    // Append and remember the index
    public boolean insert(int val) {
        if (pos.containsKey(val)) return false;
        pos.put(val, vals.size());
        vals.add(val);
        return true;
    }

    // Move the last value into the hole, then drop the last slot
    public boolean remove(int val) {
        Integer i = pos.remove(val);
        if (i == null) return false;
        int last = vals.remove(vals.size() - 1);
        if (i < vals.size()) { vals.set(i, last); pos.put(last, i); }
        return true;
    }

    // Uniform random index
    public int getRandom() { return vals.get(rnd.nextInt(vals.size())); }
}
```

| Approach | Time | Space |
|---|---|---|
| ArrayList + HashMap | O(1) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Edge case?</summary>

The removed element is the last one: do not re-insert it.

</details>

