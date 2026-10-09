---
topic: Sliding Window
pattern: [Variable window, Kadane]
source: GfG
difficulty: Medium
companies: [Facebook, Paytm, Myntra]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Largest Sum Subarray of Size at least K

> [!TIP]
> **🧠 Memory hook**
> Always keep the last k; older elements stay only while they pay.
> **Mantra: TRAIL < 0 ⇒ CUT IT OFF**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=27) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Largest sum of a subarray with length at least k.

## Key insight
The window always contains its last k elements. The older part (trail) is Kadane-style: keep it while its sum is non-negative, drop it the moment it turns negative.

## Approach 1: Trail window
```java
// Window of at least k: the part that leaves on the left (trail) is dropped whenever its sum turns negative
public long maxSumWithK(long[] arr, int k) {
    long sum = 0, result = Long.MIN_VALUE, trail = 0;
    for (int i = 0, j = 0; j < arr.length; j++) {
        sum += arr[j];
        if (j - i + 1 == k) result = Math.max(result, sum);
        else if (j - i + 1 > k) {
            trail += arr[i++];
            if (trail < 0) {
                sum -= trail;
                trail = 0;
            }
            result = Math.max(result, sum);
        }
    }
    return result;
}
```

## Approach 2: Prefix minimum
best = max over j of pre[j] − min(pre[0..j−k]).

```java
// Prefix sums: best = pre[j] - min(pre[0..j-k]), the classic alternative
public long maxSumWithKPrefix(long[] arr, int k) {
    long[] pre = new long[arr.length + 1];
    for (int i = 0; i < arr.length; i++) pre[i + 1] = pre[i] + arr[i];
    long best = Long.MIN_VALUE, minPre = Long.MAX_VALUE;
    for (int j = k; j <= arr.length; j++) {
        minPre = Math.min(minPre, pre[j - k]);
        best = Math.max(best, pre[j] - minPre);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Trail window | O(n) | O(1) |
| Prefix minimum | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Start the result at Long.MIN_VALUE (all-negative arrays). Verified against O(n²).

## Recall before you reveal
<details><summary>What is the trail?</summary>

The elements before the last k.

</details>

