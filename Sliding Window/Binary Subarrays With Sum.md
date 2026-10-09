---
topic: Sliding Window
pattern: [Variable window, Prefix sum]
source: LeetCode 930
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Binary Subarrays With Sum

> [!TIP]
> **🧠 Memory hook**
> Zeros are free passengers: each zero at the front is another valid start.
> **Mantra: DROP LEADING 0s, COUNT 1 + prefixZeros**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=2) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count non-empty subarrays of a binary array with sum = goal.

## Key insight
A plain window misses starts hidden behind leading zeros. Drop zeros (and excess ones) from the left, counting the dropped zeros since the last 1: each is another start.

## Approach 1: Prefix sum + map
```java
// Prefix sums: every earlier prefix equal to sum - goal closes a subarray here
public int numSubarraysWithSumPrefix(int[] nums, int goal) {
    Map<Integer, Integer> seen = new HashMap<>();
    seen.put(0, 1);
    int count = 0, sum = 0;
    for (int x : nums) {
        sum += x;
        count += seen.getOrDefault(sum - goal, 0);
        seen.merge(sum, 1, Integer::sum);
    }
    return count;
}
```

## Approach 2: Window with prefix zeros
```java
// Window that drops leading zeros but remembers how many it dropped since the last 1
public int numSubarraysWithSum(int[] nums, int goal) {
    int prefixZeros = 0, sum = 0, count = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        sum += nums[j];
        while (i < j && (nums[i] == 0 || sum > goal)) {
            prefixZeros = nums[i] == 1 ? 0 : prefixZeros + 1;
            sum -= nums[i];
            i++;
        }
        if (sum == goal) count += 1 + prefixZeros;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix sum + map | O(n) | O(n) |
| Window with prefix zeros | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²) on random binary arrays, including goal = 0.

## Recall before you reveal
<details><summary>Third way?</summary>

atMost(goal) − atMost(goal − 1).

</details>


<details><summary>goal = 0?</summary>

Works: every window of zeros counts.

</details>


## Connected
- [Subarrays with K Different Integers](Subarrays%20with%20K%20Different%20Integers.md)
