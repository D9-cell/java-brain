---
topic: HashSet
pattern: [Set of generated values]
source: LeetCode 2975
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Maximum Square Area by Removing Fences From a Field

> [!TIP]
> **🧠 Memory hook**
> Two rulers: list every width gap, then find the largest height gap that is also on the width list.
> **Mantra: ADD BORDERS, SET OF WIDTHS, MATCH HEIGHTS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=6) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Remove some fences to get the largest square field; return its area mod 1e9+7, or −1.

## Key insight
All gaps between any two vertical fences (including borders) are possible widths. The best square side is the largest horizontal gap that is also a width.

## Approach: Set of widths
```java
// Add the borders, store every possible width, then find the largest height that is also a width
public int maximizeSquareArea(int m, int n, int[] hFences, int[] vFences) {
    int[] h = Arrays.copyOf(hFences, hFences.length + 2), v = Arrays.copyOf(vFences, vFences.length + 2);
    h[h.length - 2] = 1; h[h.length - 1] = m;
    v[v.length - 2] = 1; v[v.length - 1] = n;
    Set<Integer> widths = new HashSet<>();
    for (int i = 0; i < v.length; i++)
        for (int j = i + 1; j < v.length; j++) widths.add(Math.abs(v[j] - v[i]));
    long side = 0;
    for (int i = 0; i < h.length; i++)
        for (int j = i + 1; j < h.length; j++) {
            int d = Math.abs(h[j] - h[i]);
            if (d > side && widths.contains(d)) side = d;
        }
    return side == 0 ? -1 : (int) (side * side % 1_000_000_007);
}
```

| Approach | Time | Space |
|---|---|---|
| Set of widths | O(h² + v²) | O(v²) |

## Recall before you reveal
<details><summary>Why include 1 and m/n?</summary>

Borders cannot be removed.

</details>


<details><summary>Overflow?</summary>

Use long for side².

</details>

