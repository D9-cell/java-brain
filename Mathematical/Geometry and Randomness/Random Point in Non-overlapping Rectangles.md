---
topic: Geometry and Randomness
pattern: [Weighted pick, Prefix + binary search]
source: LeetCode 497
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Random Point in Non-overlapping Rectangles

> [!TIP]
> **🧠 Memory hook**
> Weight each rectangle by its **number of integer points**, pick one with a prefix-sum binary search, then a uniform point inside it.
> **Mantra: prefix of (w+1)(h+1) · target = rand(total) · first prefix > target**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=9) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Given non-overlapping axis-aligned rectangles, implement pick() returning a uniformly random integer point covered by one of them.

## Key insight
Picking a rectangle uniformly would favour small ones. Counting lattice points (w + 1)(h + 1) makes every point equally likely. Binary search finds the first prefix exceeding the random target.

## Approach: Prefix + binary search
```java
// Pick a rectangle weighted by its number of integer points, then a point inside it
class RandomPointInRectangles {
    final int[][] rects;
    final int[] prefix;
    final Random rng = new Random();

    RandomPointInRectangles(int[][] rects) {
        this.rects = rects;
        prefix = new int[rects.length];
        int sum = 0;
        for (int i = 0; i < rects.length; i++) {
            int[] r = rects[i];
            sum += (r[2] - r[0] + 1) * (r[3] - r[1] + 1);
            prefix[i] = sum;
        }
    }

    public int[] pick() {
        int target = rng.nextInt(prefix[prefix.length - 1]);
        int lo = 0, hi = prefix.length - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (prefix[mid] > target) hi = mid;
            else lo = mid + 1;
        }
        int[] r = rects[lo];
        return new int[]{r[0] + rng.nextInt(r[2] - r[0] + 1), r[1] + rng.nextInt(r[3] - r[1] + 1)};
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix + binary search | O(n) build, O(log n) pick | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked statistically: 10⁵ or more samples, every outcome reachable and each frequency within a few percent of uniform.

## Recall before you reveal
<details><summary>Why +1 on each side?</summary>

Edges are inclusive: x from x1 to x2 has x2 − x1 + 1 values.

</details>


<details><summary>Why prefix > target?</summary>

target is in [0, total), and rectangle i owns [prefix[i−1], prefix[i]).

</details>


## Connected
- [Generate Random Point in a Circle](Generate%20Random%20Point%20in%20a%20Circle.md)
- [Shuffle an Array](Shuffle%20an%20Array.md)
