---
topic: Sliding Window
pattern: [At least: add n − j]
source: LeetCode 2962
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Count Subarrays Where Max Element Appears at Least K Times

> [!TIP]
> **🧠 Memory hook**
> Count the crowns (copies of the max) in the window.
> **Mantra: countMax ≥ k ⇒ ADD n − j, SHRINK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=8) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count subarrays in which the maximum of the whole array appears at least k times.

## Key insight
"At least k crowns" survives extending to the right, so add n − j for each start while it holds.

## Approach 1: Window, add n − j
```java
// While the window holds k copies of the max, every extension to the right counts: add n - j and shrink
public long countSubarrays(int[] nums, int k) {
    int maxE = Arrays.stream(nums).max().getAsInt(), n = nums.length, countMax = 0;
    long result = 0;
    for (int i = 0, j = 0; j < n; j++) {
        if (nums[j] == maxE) countMax++;
        while (countMax >= k) {
            result += n - j;
            if (nums[i++] == maxE) countMax--;
        }
    }
    return result;
}
```

## Approach 2: Positions of the max
For end i, a valid start is at or before the k-th last max position.

```java
// Store max positions; a subarray ending at i is valid if it starts at or before the k-th last one
public long countSubarraysIndices(int[] nums, int k) {
    int maxE = Arrays.stream(nums).max().getAsInt();
    List<Integer> pos = new ArrayList<>();
    long result = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == maxE) pos.add(i);
        if (pos.size() >= k) result += pos.get(pos.size() - k) + 1;
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window, add n − j | O(n) | O(1) |
| Positions of the max | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Return long. Verified against O(n²).

## Recall before you reveal
<details><summary>No-window formula?</summary>

Add `pos[size − k] + 1` for each end.

</details>


## Connected
- [Count the Number of Good Subarrays](Count%20the%20Number%20of%20Good%20Subarrays.md)
