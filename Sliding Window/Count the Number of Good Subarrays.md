---
topic: Sliding Window
pattern: [At least: add n − j, HashMap]
source: LeetCode 2537
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Count the Number of Good Subarrays

> [!TIP]
> **🧠 Memory hook**
> Each newcomer shakes hands with every twin already inside.
> **Mantra: pairs += copies; pairs ≥ k ⇒ ADD n − j**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=13) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count subarrays with at least k pairs (i < j) of equal values.

## Key insight
Adding x creates count(x) new pairs; removing x destroys count(x) − 1. Pairs only grow when extending, so add n − j while pairs ≥ k.

## Approach: Window, add n − j
```java
// A new copy of x adds (copies already in window) pairs; once pairs >= k, add n - j and shrink
public long countGood(int[] nums, int k) {
    int n = nums.length;
    Map<Integer, Integer> win = new HashMap<>();
    long result = 0, pairs = 0;
    for (int i = 0, j = 0; j < n; j++) {
        pairs += win.getOrDefault(nums[j], 0);
        win.merge(nums[j], 1, Integer::sum);
        while (pairs >= k) {
            result += n - j;
            pairs -= win.merge(nums[i], -1, Integer::sum);
            i++;
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window, add n − j | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> pairs can exceed int: long. Verified against O(n²).

## Recall before you reveal
<details><summary>How many pairs vanish when x leaves?</summary>

The copies of x left after removing it.

</details>


## Connected
- [Count Subarrays Where Max Element Appears at Least K Times](Count%20Subarrays%20Where%20Max%20Element%20Appears%20at%20Least%20K%20Times.md)
