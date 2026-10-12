---
topic: LIS and Variants
pattern: [Map DP, Binary search]
source: LeetCode 1187
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Make Array Strictly Increasing

> [!TIP]
> **🧠 Memory hook**
> Keep a map **last value → fewest swaps**; each element is kept or replaced by the **next larger** arr2 value.
> **Mantra: KEEP IF x > last · REPLACE WITH upperBound(last)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=19) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
You may replace arr1[i] with any value of arr2 (reusable). Return the minimum replacements to make arr1 strictly increasing, or −1.

## Key insight
Greedy replacement is optimal: if you replace, pick the smallest arr2 value above the previous value. So each state has at most two successors, and the map has at most n + 1 entries per step.

## Approach: Map of states
```java
// Map from last kept value to the fewest swaps; each element is kept or replaced by the next larger arr2 value
public int makeArrayIncreasing(int[] arr1, int[] arr2) {
    int[] repl = Arrays.stream(arr2).distinct().sorted().toArray();
    TreeMap<Integer, Integer> dp = new TreeMap<>();
    dp.put(Integer.MIN_VALUE, 0);
    for (int x : arr1) {
        TreeMap<Integer, Integer> next = new TreeMap<>();
        for (Map.Entry<Integer, Integer> e : dp.entrySet()) {
            int last = e.getKey(), ops = e.getValue();
            if (x > last) next.merge(x, ops, Math::min);
            int pos = upperBound(repl, last);
            if (pos < repl.length) next.merge(repl[pos], ops + 1, Math::min);
        }
        dp = next;
        if (dp.isEmpty()) return -1;
    }
    return Collections.min(dp.values());
}

// First index whose value is greater than x
private int upperBound(int[] a, int x) {
    int lo = 0, hi = a.length;
    while (lo < hi) {
        int mid = (lo + hi) >>> 1;
        if (a[mid] <= x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Map of states | O(n · (n + m) log m) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why the smallest larger value?</summary>

A smaller last value leaves more room later.

</details>


<details><summary>When −1?</summary>

No state survives an element.

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
