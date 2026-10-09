---
topic: Bit Magic
pattern: [Meet in the middle, Bitmask subsets]
source: LeetCode 2035
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Partition Array Into Two Arrays to Minimize Sum Difference (Bit Magic)

> [!TIP]
> **🧠 Memory hook**
> Split the array in two halves and meet in the middle.
> **Mantra: SUBSET SUMS BY SIZE, BINARY SEARCH THE OTHER HALF**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=43) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Split 2n numbers into two arrays of n with minimum |sum difference|.

## Key insight
Enumerate subset sums per size in each half (2^n each). Taking s from the left needs n − s from the right; binary-search the right sum closest to total/2 − a.

## Approach: Meet in the middle
```java
// Subset sums by size per half (bitmasks); for each left sum, lower_bound the complementary size on the right
public int minimumDifference(int[] nums) {
    int n = nums.length, N = n / 2, total = 0;
    for (int x : nums) total += x;
    List<List<Integer>> left = new ArrayList<>(), right = new ArrayList<>();
    for (int i = 0; i <= N; i++) { left.add(new ArrayList<>()); right.add(new ArrayList<>()); }
    for (int mask = 0; mask < (1 << N); mask++) {
        int size = 0, ls = 0, rs = 0;
        for (int i = 0; i < N; i++) if ((mask >> i & 1) == 1) { size++; ls += nums[i]; rs += nums[i + N]; }
        left.get(size).add(ls);
        right.get(size).add(rs);
    }
    for (List<Integer> l : right) Collections.sort(l);
    int best = Math.min(Math.abs(total - 2 * left.get(N).get(0)), Math.abs(total - 2 * right.get(N).get(0)));
    for (int ls = 1; ls < N; ls++) {
        List<Integer> r = right.get(N - ls);
        for (int a : left.get(ls)) {
            int target = (total - 2 * a) / 2, pos = lowerBound(r, target);
            if (pos < r.size()) best = Math.min(best, Math.abs(total - 2 * (a + r.get(pos))));
        }
    }
    return best;
}

// First index with value ≥ target
private static int lowerBound(List<Integer> l, int target) {
    int lo = 0, hi = l.size();
    while (lo < hi) { int m = (lo + hi) >>> 1; if (l.get(m) < target) lo = m + 1; else hi = m; }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Meet in the middle | O(2^n · n) | O(2^n) |

> [!WARNING]
> **Java gotcha**
> Verified against brute force on 2000 random arrays with negatives; checking only lower_bound is enough.

## Recall before you reveal
<details><summary>Why only lower_bound?</summary>

The complementary split (sizes swapped) covers the value just below.

</details>


## Connected
- [Partition Array Into Two Arrays to Minimize Sum Difference](../Meet%20In%20The%20Middle/Partition%20Array%20Into%20Two%20Arrays%20to%20Minimize%20Sum%20Difference.md)
