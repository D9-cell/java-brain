---
topic: Design
pattern: [Versioned values, Binary search]
source: LeetCode 1146
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Snapshot Array

> [!TIP]
> **🧠 Memory hook**
> A diary of changes per cell instead of photocopying the whole array.
> **Mantra: PER INDEX (snapId, val) LIST + BINARY SEARCH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=30) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
set(index, val), snap(), get(index, snapId).

## Key insight
Each index keeps a list of (snapId, value) changes. get = binary search for the last change with snapId ≤ the query.

## Approach: Change lists + binary search
```java
// Per index a list of (snapId, value) changes; get = last change with snapId <= requested
static class Snapshots {
    private final List<List<int[]>> hist = new ArrayList<>();
    private int snapId = 0;

    Snapshots(int length) { for (int i = 0; i < length; i++) hist.add(new ArrayList<>(List.of(new int[]{0, 0}))); }

    // Overwrite if the last change is from the current snap, else append
    public void set(int index, int val) {
        List<int[]> h = hist.get(index);
        if (h.get(h.size() - 1)[0] == snapId) h.get(h.size() - 1)[1] = val;
        else h.add(new int[]{snapId, val});
    }

    // Returns the id and starts a new one
    public int snap() { return snapId++; }

    // Binary search for the last entry with snapId <= id
    public int get(int index, int id) {
        List<int[]> h = hist.get(index);
        int lo = 0, hi = h.size() - 1;
        while (lo < hi) {
            int m = (lo + hi + 1) >>> 1;
            if (h.get(m)[0] <= id) lo = m; else hi = m - 1;
        }
        return h.get(lo)[1];
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Change lists + binary search | set O(1), get O(log s) | O(changes) |

> [!WARNING]
> **Java gotcha**
> Verified against storing a full array copy per snapshot.

## Recall before you reveal
<details><summary>Same-snap double set?</summary>

Overwrite the last entry.

</details>


## Connected
- [Time Based Key-Value Store](Time%20Based%20Key-Value%20Store.md)
