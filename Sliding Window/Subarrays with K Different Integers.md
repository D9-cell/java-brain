---
topic: Sliding Window
pattern: [Exactly = atMost − atMost]
source: LeetCode 992
difficulty: Hard
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Subarrays with K Different Integers

> [!TIP]
> **🧠 Memory hook**
> "Exactly" is two "at most"s subtracted.
> **Mantra: atMost(k) − atMost(k − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=53) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count subarrays with exactly k distinct integers.

## Key insight
"Exactly k" is not monotone, but "at most k" is. Or in one pass: iBig is the earliest valid start, iSmall the latest; all starts between them count.

## Approach 1: atMost twice
```java
// Exactly k = atMost(k) - atMost(k - 1)
public int subarraysWithKDistinctTwice(int[] nums, int k) {
    return atMost(nums, k) - atMost(nums, k - 1);
}

// Number of subarrays with at most k distinct values: j - i + 1 per end
static int atMost(int[] nums, int k) {
    Map<Integer, Integer> win = new HashMap<>();
    int count = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        win.merge(nums[j], 1, Integer::sum);
        while (win.size() > k) {
            if (win.merge(nums[i], -1, Integer::sum) == 0) win.remove(nums[i]);
            i++;
        }
        count += j - i + 1;
    }
    return count;
}
```

## Approach 2: One pass (iBig, iSmall)
```java
// One pass: iBig is the earliest valid start, iSmall the latest; all starts between them count
public int subarraysWithKDistinct(int[] nums, int k) {
    Map<Integer, Integer> win = new HashMap<>();
    int result = 0;
    for (int iSmall = 0, iBig = 0, j = 0; j < nums.length; j++) {
        win.merge(nums[j], 1, Integer::sum);
        while (win.size() > k) {
            if (win.merge(nums[iSmall], -1, Integer::sum) == 0) win.remove(nums[iSmall]);
            iSmall++;
            iBig = iSmall;
        }
        while (win.get(nums[iSmall]) > 1) win.merge(nums[iSmall++], -1, Integer::sum);
        if (win.size() == k) result += iSmall - iBig + 1;
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| atMost twice | O(n) | O(n) |
| One pass (iBig, iSmall) | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Why not one window directly?</summary>

Shrinking can break "exactly k".

</details>


## Connected
- [Binary Subarrays With Sum](Binary%20Subarrays%20With%20Sum.md)
