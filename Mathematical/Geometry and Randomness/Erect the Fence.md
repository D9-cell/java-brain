---
topic: Geometry and Randomness
pattern: [Convex hull, Monotone chain]
source: LeetCode 587
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Erect the Fence

> [!TIP]
> **🧠 Memory hook**
> Sort by x, build the **lower then upper** chain, popping only on a **right turn (cross < 0)** so points on the fence edges stay.
> **Mantra: sort · lower: pop while cross < 0 · upper: same backwards · dedupe**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=1) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Return the coordinates of all trees that lie on the perimeter of the smallest fence enclosing every tree.

## Key insight
Andrew's monotone chain keeps a stack that only turns left. Using < 0 (not ≤ 0) keeps collinear points, which the problem wants. When all points are collinear the two chains overlap, so a set removes duplicates.

## Approach: Monotone chain
```java
// Monotone chain that pops only on a right turn, so collinear boundary points stay
public int[][] outerTrees(int[][] trees) {
    Arrays.sort(trees, (a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
    int n = trees.length;
    int[][] hull = new int[2 * n][];
    int k = 0;
    for (int i = 0; i < n; i++) {
        while (k >= 2 && cross(hull[k - 2], hull[k - 1], trees[i]) < 0) k--;
        hull[k++] = trees[i];
    }
    for (int i = n - 2, lower = k + 1; i >= 0; i--) {
        while (k >= lower && cross(hull[k - 2], hull[k - 1], trees[i]) < 0) k--;
        hull[k++] = trees[i];
    }
    Set<String> seen = new HashSet<>();
    List<int[]> out = new ArrayList<>();
    for (int i = 0; i < k; i++)
        if (seen.add(hull[i][0] + "," + hull[i][1])) out.add(hull[i]);
    return out.toArray(new int[0][]);
}

// Positive for a left turn o -> a -> b, negative for a right turn, 0 when collinear
int cross(int[] o, int[] a, int[] b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}
```

| Approach | Time | Space |
|---|---|---|
| Monotone chain | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why < 0 and not ≤ 0?</summary>

Collinear boundary points must be reported.

</details>


<details><summary>Why dedupe?</summary>

The upper chain repeats points when everything is on one line.

</details>


## Connected
- [Largest Triangle Area](Largest%20Triangle%20Area.md)
- [Max Points on a Line](Max%20Points%20on%20a%20Line.md)
