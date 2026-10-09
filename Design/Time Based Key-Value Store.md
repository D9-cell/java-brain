---
topic: Design
pattern: [TreeMap floor]
source: LeetCode 981
difficulty: Medium
companies: [Google, LinkedIn]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Time Based Key-Value Store

> [!TIP]
> **🧠 Memory hook**
> A version history: ask for the latest version at or before a time.
> **Mantra: TREEMAP floorEntry**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=31) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
set(key, value, timestamp); get(key, timestamp) = value with the largest timestamp ≤ the query.

## Key insight
Per key a TreeMap; floorEntry does the search.

## Approach: TreeMap per key
```java
// key → TreeMap(timestamp → value); get = floorEntry
static class TimeMap {
    private final Map<String, TreeMap<Integer, String>> m = new HashMap<>();

    // Store under the timestamp
    public void set(String key, String value, int timestamp) { m.computeIfAbsent(key, k -> new TreeMap<>()).put(timestamp, value); }

    // Largest timestamp <= the requested one
    public String get(String key, int timestamp) {
        TreeMap<Integer, String> t = m.get(key);
        if (t == null) return "";
        Map.Entry<Integer, String> e = t.floorEntry(timestamp);
        return e == null ? "" : e.getValue();
    }
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap per key | O(log n) | O(n) |

## Recall before you reveal
<details><summary>Alternative?</summary>

Timestamps are increasing → ArrayList + binary search.

</details>


## Connected
- [Snapshot Array](Snapshot%20Array.md)
