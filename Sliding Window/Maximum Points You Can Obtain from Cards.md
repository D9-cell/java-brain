---
topic: Sliding Window
pattern: [Fixed window, Flip the view]
source: LeetCode 1423
difficulty: Medium
companies: [Media.net, Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Maximum Points You Can Obtain from Cards

> [!TIP]
> **🧠 Memory hook**
> What you leave behind is one block in the middle.
> **Mantra: TOTAL − MIN WINDOW OF n − k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=37) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Take exactly k cards from either end; maximise their sum.

## Key insight
The untaken cards form one contiguous block of n − k. Minimise its sum.

## Approach 1: Min middle window
```java
// Taking k from the ends leaves a middle block of n - k: minimise that block with a fixed window
public int maxScore(int[] cardPoints, int k) {
    int n = cardPoints.length, l = n - k, total = 0, cur = 0, minSum = Integer.MAX_VALUE;
    for (int i = 0, j = 0; j < n; j++) {
        total += cardPoints[j];
        cur += cardPoints[j];
        if (j - i + 1 == l) {
            minSum = Math.min(minSum, cur);
            cur -= cardPoints[i++];
        }
    }
    return minSum == Integer.MAX_VALUE ? total : total - minSum;
}
```

## Approach 2: Front + back split
```java
// Prefix sums from the front and back: try i cards from the front and k - i from the back
public int maxScoreSplit(int[] cardPoints, int k) {
    int n = cardPoints.length, front = 0, back = 0;
    for (int t = 0; t < k; t++) front += cardPoints[t];
    int best = front;
    for (int i = k - 1; i >= 0; i--) {
        front -= cardPoints[i];
        back += cardPoints[n - k + i];
        best = Math.max(best, front + back);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Min middle window | O(n) | O(1) |
| Front + back split | O(k) | O(1) |

> [!WARNING]
> **Java gotcha**
> C++ approach 1 reads an undeclared `nums` (the parameter is `cardPoints`) and does not compile. Verified against exhaustive search.

## Recall before you reveal
<details><summary>n == k?</summary>

Empty block: take everything.

</details>


## Connected
- [Take K of Each Character From Left and Right](Take%20K%20of%20Each%20Character%20From%20Left%20and%20Right.md)
