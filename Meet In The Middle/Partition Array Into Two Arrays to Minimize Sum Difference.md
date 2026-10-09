---
topic: Meet In The Middle
pattern: [Meet in the middle, Bucket by subset size]
source: LeetCode 2035
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, mitm]
---
# Partition Array Into Two Arrays to Minimize Sum Difference

> [!TIP]
> **🧠 Memory hook**
> A tug-of-war with **exactly n players per team**. Taking k players from the left half forces n − k from the right half.
> **Mantra: BUCKET BY SIZE, k + (n−k), AIM AT S/2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Meet%20In%20The%20Middle/Meet%20In%20The%20Middle%20Animations.html#p=2) · **Pattern hub:** [Meet In The Middle - Pattern Map](Meet%20In%20The%20Middle%20-%20Pattern%20Map.md)

## Problem
Split `2n` numbers into two arrays of length n each, minimising the absolute difference of their sums.

## Key insight
`|sum1 − sum2| = |S − 2·sum1|`, so we want sum1 ≈ S/2 **with exactly n elements**. Group subset sums of each half by size. For left size k, search only the right bucket of size n − k.

## Approach: MITM with size buckets
```java
// Subset sums of a[from .. from+len) grouped by subset size, each group sorted
static int[][] sumsBySize(int[] a, int from, int len) {
    List<List<Integer>> buckets = new ArrayList<>();
    for (int k = 0; k <= len; k++) buckets.add(new ArrayList<>());
    for (int mask = 0; mask < (1 << len); mask++) {
        int s = 0;
        for (int i = 0; i < len; i++) if ((mask >> i & 1) == 1) s += a[from + i];
        buckets.get(Integer.bitCount(mask)).add(s);
    }
    int[][] res = new int[len + 1][];
    for (int k = 0; k <= len; k++) {
        res[k] = buckets.get(k).stream().mapToInt(Integer::intValue).toArray();
        Arrays.sort(res[k]);
    }
    return res;
}

// Pick k from the left half and n-k from the right so the chosen sum is closest to S/2
public int minimumDifference(int[] nums) {
    int n = nums.length / 2, total = 0;
    for (int x : nums) total += x;
    int[][] left = sumsBySize(nums, 0, n), right = sumsBySize(nums, n, n);
    int best = Integer.MAX_VALUE;
    for (int k = 0; k <= n; k++) {
        int[] rb = right[n - k];
        for (int ls : left[k]) {
            int idx = lowerBound(rb, (total - 2 * ls) / 2);
            if (idx < rb.length) best = Math.min(best, Math.abs(total - 2 * (ls + rb[idx])));
            if (idx > 0) best = Math.min(best, Math.abs(total - 2 * (ls + rb[idx - 1])));
        }
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| MITM with size buckets | O(2^n · n), n = half length | O(2^n) |

## Recall before you reveal
<details><summary>Why is plain MITM not enough?</summary>

Team sizes must be exactly n. Bucketing by size enforces that.

</details>


<details><summary>Which right bucket pairs with left size k?</summary>

Size n − k.

</details>


<details><summary>Quantity to minimise?</summary>

|S − 2·(leftSum + rightSum)|.

</details>


## Connected
- Neighbour check from [Closest Subsequence Sum](Closest%20Subsequence%20Sum.md)
- Size buckets again in [Split Array With Same Average](Split%20Array%20With%20Same%20Average.md)
