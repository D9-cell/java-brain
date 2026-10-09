---
topic: Sliding Window
pattern: [Fixed window, Two TreeSets]
source: LeetCode 3013
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Divide an Array Into Subarrays With Minimum Cost II

> [!TIP]
> **🧠 Memory hook**
> A sliding talent show: keep the k−1 cheapest contestants in view.
> **Mantra: TWO TREESETS: CHOSEN (k−1 SMALLEST) + REST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=14) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Split nums into k subarrays; cost = sum of first elements. The 2nd and k-th subarray starts must be within dist. Minimise the cost.

## Key insight
The first start is index 0. The other k − 1 starts lie in a window of dist + 1 indices; we want its k − 1 smallest values. Two ordered sets (chosen + rest) with a running sum slide in O(log n).

## Approach: Two TreeSets
```java
// Inserts index i into the chosen set and pushes the largest out if it holds more than k-1
static void add(int i, int[] nums, int k, TreeSet<Integer> chosen, TreeSet<Integer> rest, long[] sum) {
    chosen.add(i);
    sum[0] += nums[i];
    if (chosen.size() > k - 1) {
        int big = chosen.pollLast();
        sum[0] -= nums[big];
        rest.add(big);
    }
}

// Window of dist + 1 candidate starts; two TreeSets keep the k-1 smallest (with their sum) and the rest
public long minimumCost(int[] nums, int k, int dist) {
    int n = nums.length;
    Comparator<Integer> byValue = (a, b) -> nums[a] != nums[b] ? Integer.compare(nums[a], nums[b]) : Integer.compare(a, b);
    TreeSet<Integer> chosen = new TreeSet<>(byValue), rest = new TreeSet<>(byValue);
    long[] sum = {0};
    long result = Long.MAX_VALUE;
    int i = 1;
    for (; i - dist < 1; i++) add(i, nums, k, chosen, rest, sum);
    for (; i < n; i++) {
        add(i, nums, k, chosen, rest, sum);
        result = Math.min(result, sum[0]);
        int out = i - dist;
        if (chosen.remove(out)) {
            sum[0] -= nums[out];
            if (!rest.isEmpty()) {
                int m = rest.pollFirst();
                chosen.add(m);
                sum[0] += nums[m];
            }
        } else {
            rest.remove(out);
        }
    }
    return nums[0] + result;
}
```

| Approach | Time | Space |
|---|---|---|
| Two TreeSets | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against all sets of start indices on random small arrays.

## Recall before you reveal
<details><summary>Why compare (value, index)?</summary>

TreeSet drops equal keys; the index keeps duplicates apart.

</details>


<details><summary>Same trick elsewhere?</summary>

Find X-Sum II, sliding median.

</details>


## Connected
- [Find X-Sum of All K-Long Subarrays II](Find%20X-Sum%20of%20All%20K-Long%20Subarrays%20II.md)
