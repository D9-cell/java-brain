---
topic: Line Sweep
pattern: [Line sweep, TreeMap]
source: LeetCode 1943
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, line-sweep]
---
# Describe the Painting

> [!TIP]
> **🧠 Memory hook**
> Paint layers on a wall: every boundary starts a new strip, even when the colour sum looks unchanged.
> **Mantra: BOUNDARIES CUT PIECES, SUM > 0 → EMIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Line%20Sweep/Line%20Sweep%20Animations.html#p=2) · **Pattern hub:** [Line Sweep - Pattern Map](Line%20Sweep%20-%20Pattern%20Map.md)

## Problem
Half-open segments `[start, end)` each have a unique colour. A mixed area is described by the **sum** of its colours. Return the painted pieces `[l, r, sum]`.

## Key insight
Put +colour at start and −colour at end in a TreeMap. Between consecutive keys the mix is constant, so emit `[prevKey, key, sum]` whenever sum > 0. A key whose net delta is 0 is still a boundary (the colour set changed).

## Approach: TreeMap sweep
```java
// Sweep sorted boundaries; every boundary (even with net 0 change) starts a new segment
public List<List<Long>> splitPainting(int[][] segments) {
    TreeMap<Integer, Long> events = new TreeMap<>();
    for (int[] s : segments) {
        events.merge(s[0], (long) s[2], Long::sum);
        events.merge(s[1], (long) -s[2], Long::sum);
    }
    List<List<Long>> res = new ArrayList<>();
    long sum = 0;
    Integer prev = null;
    for (Map.Entry<Integer, Long> e : events.entrySet()) {
        if (prev != null && sum > 0) res.add(List.of((long) prev, (long) e.getKey(), sum));
        sum += e.getValue();
        prev = e.getKey();
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap sweep | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Why not merge neighbouring pieces with an equal sum?</summary>

Different colour sets can have the same sum; the problem treats them as different pieces.

</details>


<details><summary>Type of the sum?</summary>

`long`.

</details>


## Connected
- Sweep basics: [Car Pooling](Car%20Pooling.md)
