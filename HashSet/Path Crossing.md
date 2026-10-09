---
topic: HashSet
pattern: [HashSet of points]
source: LeetCode 1496
difficulty: Easy
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Path Crossing

> [!TIP]
> **🧠 Memory hook**
> Breadcrumbs: drop one on every point; stepping on one means you crossed your path.
> **Mantra: WALK, SET OF POINTS, ADD FAILS → CROSS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=14) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Given moves N/S/E/W from (0,0), does the path visit any point twice?

## Key insight
Store every visited point. `set.add` returning false = a revisit.

## Approach: Set of encoded points
```java
// Packs (x, y) into one long so it can live in a HashSet
static long key(int x, int y) {
    return ((long) x << 32) | (y & 0xffffffffL);
}

// Walk and remember every visited point; a repeat means the path crossed itself
public boolean isPathCrossing(String path) {
    Set<Long> seen = new HashSet<>();
    int x = 0, y = 0;
    seen.add(key(x, y));
    for (char c : path.toCharArray()) {
        if (c == 'N') y++; else if (c == 'S') y--; else if (c == 'E') x++; else x--;
        if (!seen.add(key(x, y))) return true;
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Set of encoded points | O(n) | O(n) |

## Recall before you reveal
<details><summary>Encode a point in Java?</summary>

`((long) x << 32) | (y & 0xffffffffL)`.

</details>

