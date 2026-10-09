---
topic: Sliding Window
pattern: [At least: add n − j]
source: LeetCode 2799
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Count Complete Subarrays in an Array

> [!TIP]
> **🧠 Memory hook**
> Once the stamp album is full, every bigger album is full too.
> **Mantra: ALL DISTINCT INSIDE ⇒ ADD n − j, SHRINK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=5) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count subarrays containing every distinct value of the array.

## Key insight
"Contains all" is monotone when extending to the right. While [i..j] is complete, all n − j extensions are complete; then shrink.

## Approach: Window, add n − j
```java
// Once [i..j] holds every distinct value, so does every extension to the right: add n - j and shrink
public int countCompleteSubarrays(int[] nums) {
    int n = nums.length, total = (int) Arrays.stream(nums).distinct().count(), res = 0;
    Map<Integer, Integer> win = new HashMap<>();
    for (int i = 0, j = 0; j < n; j++) {
        win.merge(nums[j], 1, Integer::sum);
        while (win.size() == total) {
            res += n - j;
            if (win.merge(nums[i], -1, Integer::sum) == 0) win.remove(nums[i]);
            i++;
        }
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Window, add n − j | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Why n − j and not j − i + 1?</summary>

We count windows that START at i: ends j..n−1.

</details>


## Connected
- [Number of Substrings Containing All Three Characters](Number%20of%20Substrings%20Containing%20All%20Three%20Characters.md)
