---
topic: Sliding Window
pattern: [Fixed window, Two TreeSets]
source: LeetCode 3321
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Find X-Sum of All K-Long Subarrays II

> [!TIP]
> **🧠 Memory hook**
> A leaderboard with a VIP lounge of x seats and a waiting room.
> **Mantra: TOP / REST TREESETS OF (freq, value), RUNNING SUM**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=18) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
For every window of size k, sum freq·value over its x most frequent values (ties: larger value).

## Key insight
Each slide changes two counts. Re-file only those (freq, value) pairs between TOP (x best, with a running sum) and REST.

## Approach: Two TreeSets
```java
// Orders (freq, value) pairs: higher frequency, then higher value, ranks higher
static int cmp(int[] a, int[] b) {
    return a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]);
}

// Puts a pair into the top set if it beats the weakest member there, demoting the weakest when over x
void insert(int[] p, int x) {
    if (top.size() < x || cmp(p, top.first()) > 0) {
        sum += (long) p[0] * p[1];
        top.add(p);
        if (top.size() > x) {
            int[] weak = top.pollFirst();
            sum -= (long) weak[0] * weak[1];
            rest.add(weak);
        }
    } else {
        rest.add(p);
    }
}

// Removes a pair and promotes the strongest of the rest if a top seat opens
void remove(int[] p, int x) {
    if (top.remove(p)) {
        sum -= (long) p[0] * p[1];
        if (!rest.isEmpty()) {
            int[] strong = rest.pollLast();
            top.add(strong);
            sum += (long) strong[0] * strong[1];
        }
    } else {
        rest.remove(p);
    }
}

// Slide a frequency map; every count change re-files that value between the top-x set and the rest
public long[] findXSum(int[] nums, int k, int x) {
    int n = nums.length;
    long[] result = new long[n - k + 1];
    Map<Integer, Integer> freq = new HashMap<>();
    sum = 0;
    top.clear();
    rest.clear();
    for (int i = 0, j = 0; j < n; j++) {
        int f = freq.getOrDefault(nums[j], 0);
        if (f > 0) remove(new int[]{f, nums[j]}, x);
        freq.put(nums[j], f + 1);
        insert(new int[]{f + 1, nums[j]}, x);
        if (j - i + 1 == k) {
            result[i] = sum;
            int g = freq.get(nums[i]);
            remove(new int[]{g, nums[i]}, x);
            if (g == 1) freq.remove(nums[i]);
            else {
                freq.put(nums[i], g - 1);
                insert(new int[]{g - 1, nums[i]}, x);
            }
            i++;
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Two TreeSets | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> TreeSet<int[]> needs the comparator for both ordering and equality. Verified against per-window recomputation.

## Recall before you reveal
<details><summary>Part I?</summary>

Small n: rebuild with a heap per window (Heap folder).

</details>


## Connected
- [Find X-Sum of All K-Long Subarrays I](../Heap/Find%20X-Sum%20of%20All%20K-Long%20Subarrays%20I.md)
- [Divide an Array Into Subarrays With Minimum Cost II](Divide%20an%20Array%20Into%20Subarrays%20With%20Minimum%20Cost%20II.md)
