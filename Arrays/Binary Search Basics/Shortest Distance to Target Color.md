---
topic: Binary Search Basics
pattern: [Position lists, Binary search]
source: LeetCode 1182
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Shortest Distance to Target Color

> [!TIP]
> **🧠 Memory hook**
> Store **sorted positions per color**. For a query, binary search the insertion point and compare the **neighbours on both sides**.
> **Mantra: pos[color] · ins = binarySearch · min(right − i, i − left)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=12) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
colors holds values 1..3. For each query (i, c) return the distance from index i to the nearest index with color c, or -1.

## Key insight
Positions are added in increasing order, so each list is sorted. Collections.binarySearch returns −(insertion point) − 1 when i is not in the list.

## Approach: Lists + binary search
```java
// Keep the sorted positions of each color and binary search the nearest one per query
public List<Integer> shortestDistanceColor(int[] colors, int[][] queries) {
    List<List<Integer>> pos = new ArrayList<>();
    for (int c = 0; c <= 3; c++) pos.add(new ArrayList<>());
    for (int i = 0; i < colors.length; i++) pos.get(colors[i]).add(i);
    List<Integer> out = new ArrayList<>();
    for (int[] q : queries) {
        List<Integer> p = pos.get(q[1]);
        if (p.isEmpty()) {
            out.add(-1);
            continue;
        }
        int j = Collections.binarySearch(p, q[0]);
        if (j >= 0) {
            out.add(0);
            continue;
        }
        int ins = -j - 1, best = Integer.MAX_VALUE;
        if (ins < p.size()) best = p.get(ins) - q[0];
        if (ins > 0) best = Math.min(best, q[0] - p.get(ins - 1));
        out.add(best);
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Lists + binary search | O(n + q log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Decoding the insertion point?</summary>

ins = −result − 1.

</details>


<details><summary>Linear alternative?</summary>

Precompute nearest-left and nearest-right per color: O(3n).

</details>


## Connected
- [Number of Matching Subsequences](../../HashMap/Number%20of%20Matching%20Subsequences.md)
- [Find K Closest Elements](Find%20K%20Closest%20Elements.md)
