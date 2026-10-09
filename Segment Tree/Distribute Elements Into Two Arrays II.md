---
topic: Segment Tree
pattern: [Count segment tree, Coordinate compression]
source: LeetCode 3072
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Distribute Elements Into Two Arrays II

> [!TIP]
> **🧠 Memory hook**
> Join the queue with more people taller than you; a frequency tree counts "taller" quickly.
> **Mantra: COMPRESS, COUNT > v PER ARRAY, ROUTE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=8) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Distribute elements by greaterCount (ties → shorter array, then arr1). Return arr1 + arr2.

## Key insight
Compress values to ranks. Keep one frequency tree per array; `greaterCount(v)` = range sum over ranks (cv+1 … m−1).

## Approach: Two frequency trees
```java
// Frequency segment tree over compressed values: counts how many values fall in a range
static class CountTree {
    private final int m;
    private final int[] tree;

    // Creates an empty tree over m compressed values
    CountTree(int m) {
        this.m = m;
        tree = new int[4 * m];
    }

    // Adds one occurrence of compressed value cv
    private void add(int i, int l, int r, int cv) {
        if (l == r) { tree[i]++; return; }
        int mid = (l + r) >>> 1;
        if (cv <= mid) add(2 * i + 1, l, mid, cv);
        else add(2 * i + 2, mid + 1, r, cv);
        tree[i] = tree[2 * i + 1] + tree[2 * i + 2];
    }

    // Counts occurrences with compressed value in [ql, qr]
    private int count(int i, int l, int r, int ql, int qr) {
        if (ql > qr || r < ql || l > qr) return 0;
        if (ql <= l && r <= qr) return tree[i];
        int mid = (l + r) >>> 1;
        return count(2 * i + 1, l, mid, ql, qr) + count(2 * i + 2, mid + 1, r, ql, qr);
    }

    // Public insert
    void add(int cv) { add(0, 0, m - 1, cv); }

    // How many inserted values are strictly greater than cv
    int greaterThan(int cv) { return count(0, 0, m - 1, cv + 1, m - 1); }
}

// Compress values, then route each element by greaterCount, tie-break on size
public int[] resultArray(int[] nums) {
    int[] sorted = Arrays.stream(nums).distinct().sorted().toArray();
    int m = sorted.length;
    CountTree t1 = new CountTree(m), t2 = new CountTree(m);
    List<Integer> a1 = new ArrayList<>(), a2 = new ArrayList<>();
    a1.add(nums[0]);
    t1.add(Arrays.binarySearch(sorted, nums[0]));
    a2.add(nums[1]);
    t2.add(Arrays.binarySearch(sorted, nums[1]));
    for (int i = 2; i < nums.length; i++) {
        int cv = Arrays.binarySearch(sorted, nums[i]);
        int c1 = t1.greaterThan(cv), c2 = t2.greaterThan(cv);
        boolean toFirst = c1 != c2 ? c1 > c2 : a1.size() <= a2.size();
        if (toFirst) { a1.add(nums[i]); t1.add(cv); } else { a2.add(nums[i]); t2.add(cv); }
    }
    a1.addAll(a2);
    return a1.stream().mapToInt(Integer::intValue).toArray();
}
```

| Approach | Time | Space |
|---|---|---|
| Two frequency trees | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Why compress?</summary>

Values up to 1e9 cannot index an array.

</details>


## Connected
- [Count Good Triplets in an Array](Count%20Good%20Triplets%20in%20an%20Array.md)
