---
topic: Sorting and Matching
pattern: [Sort descending, Most expensive cut first]
source: LeetCode 3218, 3219
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Cost for Cutting Cake I - II

> [!TIP]
> **🧠 Memory hook**
> A cut costs its price **times the number of pieces it crosses**, so make expensive cuts while the cake is still in few pieces.
> **Mantra: LARGEST CUT FIRST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=19) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
A cake of m×n squares needs all horizontal and vertical cuts. Each cut line has a fixed cost, paid for every piece it cuts. Return the minimum total cost.

## Key insight
Sort both cut lists descending and always take the larger next cut. A horizontal cut is paid once per vertical piece created so far, and vice versa. Use `long` for the total (part II).

## Approach: Merge two sorted lists
```java
// Sort both cut lists descending and always make the more expensive cut first; a cut costs its price times the number of pieces it crosses
public long minimumCost(int m, int n, int[] horizontalCut, int[] verticalCut) {
    int[] h = horizontalCut.clone(), v = verticalCut.clone();
    Arrays.sort(h);
    Arrays.sort(v);
    int i = h.length - 1, j = v.length - 1;
    long hPieces = 1, vPieces = 1, cost = 0;
    while (i >= 0 || j >= 0) {
        if (j < 0 || (i >= 0 && h[i] >= v[j])) { cost += h[i--] * vPieces; hPieces++; }
        else { cost += v[j--] * hPieces; vPieces++; }
    }
    return cost;
}
```

| Approach | Time | Space |
|---|---|---|
| Merge two sorted lists | O(h log h + v log v) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a sub-rectangle DP. Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does the order matter?</summary>

A cut made later crosses more pieces, so it costs more.

</details>


## Connected
- [Two City Scheduling](Two%20City%20Scheduling.md)
