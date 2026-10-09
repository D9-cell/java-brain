---
topic: Sliding Window
pattern: [Sort + variable window]
source: LeetCode 1838
difficulty: Medium
companies: [Meta, Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Frequency of the Most Frequent Element

> [!TIP]
> **🧠 Memory hook**
> Raise the floor to the tallest item in the window; your budget is k.
> **Mantra: SORT; SHRINK WHILE len·nums[j] − sum > k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=22) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
With at most k increments (+1 to any element each), maximise the frequency of some value.

## Key insight
After sorting, the best target is some nums[j] and the raised elements are the ones just below it. Cost of a window = len·nums[j] − sum.

## Approach 1: Binary search per target
```java
// Sorted: for each target index, binary-search the leftmost start whose raise cost fits in k
public int maxFrequencyBinarySearch(int[] nums, int k) {
    Arrays.sort(nums);
    int n = nums.length, result = 0;
    long[] pre = new long[n + 1];
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
    for (int t = 0; t < n; t++) {
        int lo = 0, hi = t, best = t;
        while (lo <= hi) {
            int mid = (lo + hi) >>> 1;
            long ops = (long) (t - mid + 1) * nums[t] - (pre[t + 1] - pre[mid]);
            if (ops > k) lo = mid + 1;
            else {
                best = mid;
                hi = mid - 1;
            }
        }
        result = Math.max(result, t - best + 1);
    }
    return result;
}
```

## Approach 2: Shrinking window
```java
// Sorted window raised to nums[j]: cost = len * nums[j] - sum; shrink while cost > k
public int maxFrequencyWindow(int[] nums, int k) {
    Arrays.sort(nums);
    int result = 0;
    long sum = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        sum += nums[j];
        while ((long) (j - i + 1) * nums[j] - sum > k) sum -= nums[i++];
        result = Math.max(result, j - i + 1);
    }
    return result;
}
```

## Approach 3: Window that never shrinks
Use `if` instead of `while`: the window slides instead of shrinking, so its final length is the answer.

```java
// Window that never shrinks: an over-budget step slides it by one instead of shrinking
public int maxFrequency(int[] nums, int k) {
    Arrays.sort(nums);
    int i = 0;
    long sum = 0;
    for (int j = 0; j < nums.length; j++) {
        sum += nums[j];
        if ((long) (j - i + 1) * nums[j] - sum > k) sum -= nums[i++];
    }
    return nums.length - i;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search per target | O(n log n) | O(n) |
| Shrinking window | O(n log n) | O(1) |
| Window that never shrinks | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> **C++ bug:** approach 1 stores the cost in `int ops`, which overflows. On 99,995 values 11/12/13 plus five 66086 with k = 13713 it returns 65008; the answer is 47045. The Java test includes this case.

## Recall before you reveal
<details><summary>Why sort?</summary>

The cheapest values to raise to nums[j] are its nearest smaller neighbours.

</details>


<details><summary>Why long?</summary>

len·nums[j] reaches 1e10.

</details>

