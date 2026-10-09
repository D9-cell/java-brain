---
topic: Meet In The Middle
pattern: [Meet in the middle, Bucket by subset size, Math reformulation]
source: LeetCode 805
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, mitm]
---
# Split Array With Same Average

> [!TIP]
> **🧠 Memory hook**
> If two groups have the same average, both equal the **class average**. So find ONE group whose average is the class average.
> **Mantra: avg(A) = avg(ALL) ⇒ sum·N = size·S**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Meet%20In%20The%20Middle/Meet%20In%20The%20Middle%20Animations.html#p=3) · **Pattern hub:** [Meet In The Middle - Pattern Map](Meet%20In%20The%20Middle%20-%20Pattern%20Map.md)

## Problem
Can `nums` (N ≤ 30) be split into two non-empty arrays with equal averages?

## Key insight
Find a proper non-empty subset A with `sum(A)·N == size(A)·S`. For each total size, the needed sum is `size·S/N` (it must be an integer). Combine a left (size k, sum ls) with a right bucket of size m, looking for `size·S/N − ls`.

## Approach: MITM with size buckets (HashSet lookup)
The C++ sorts the buckets and binary-searches. In Java a `HashSet` per size gives O(1) exact lookups and simpler code.

```java
// Subset sums of a[from .. from+len) grouped by subset size, each group stored in a HashSet
static List<Set<Integer>> sumsBySize(int[] a, int from, int len) {
    List<Set<Integer>> res = new ArrayList<>();
    for (int k = 0; k <= len; k++) res.add(new HashSet<>());
    for (int mask = 0; mask < (1 << len); mask++) {
        int s = 0;
        for (int i = 0; i < len; i++) if ((mask >> i & 1) == 1) s += a[from + i];
        res.get(Integer.bitCount(mask)).add(s);
    }
    return res;
}

// Needs one proper subset A with sum(A) * N == size(A) * S; combine halves by size
public boolean splitArraySameAverage(int[] nums) {
    int N = nums.length, S = 0;
    for (int x : nums) S += x;
    int n1 = N / 2, n2 = N - n1;
    List<Set<Integer>> left = sumsBySize(nums, 0, n1), right = sumsBySize(nums, n1, n2);
    for (int k = 0; k <= n1; k++) {
        for (int ls : left.get(k)) {
            for (int m = 0; m <= n2; m++) {
                int size = k + m;
                if (size == 0 || size == N || size * S % N != 0) continue;
                if (right.get(m).contains(size * S / N - ls)) return true;
            }
        }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| MITM with size buckets (HashSet lookup) | O(2^(N/2) · N) | O(2^(N/2)) |

## Recall before you reveal
<details><summary>Why may we look for just one subset?</summary>

If A has the overall average, the rest B automatically does too.

</details>


<details><summary>Which sizes can be skipped immediately?</summary>

Those where `size·S % N != 0`, plus 0 and N.

</details>


<details><summary>Exact match or closest?</summary>

Exact. So a HashSet works; no neighbour checks are needed.

</details>


## Connected
- Size buckets first seen in [Partition Array Into Two Arrays to Minimize Sum Difference](Partition%20Array%20Into%20Two%20Arrays%20to%20Minimize%20Sum%20Difference.md)
