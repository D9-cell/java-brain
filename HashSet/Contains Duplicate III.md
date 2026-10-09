---
topic: HashSet
pattern: [TreeSet, Sliding window]
source: LeetCode 220
difficulty: Hard
companies: [Palantir, Airbnb]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Contains Duplicate III

> [!TIP]
> **🧠 Memory hook**
> A sorted window of the last k values; ask it "who is just above value − t?"
> **Mantra: WINDOW ≤ k, CEILING(v − t) ≤ v + t**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=2) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Is there a pair with index distance ≤ indexDiff and value distance ≤ valueDiff?

## Key insight
Keep the last `indexDiff` values in a TreeSet. For nums[i], the closest candidate from above is `ceiling(nums[i] − valueDiff)`; check that it is ≤ nums[i] + valueDiff.

## Approach: TreeSet sliding window
```java
// Sliding window of the last indexDiff values in a TreeSet; check the smallest value >= nums[i] - valueDiff
public boolean containsNearbyAlmostDuplicate(int[] nums, int indexDiff, int valueDiff) {
    TreeSet<Long> window = new TreeSet<>();
    for (int i = 0; i < nums.length; i++) {
        if (i > indexDiff) window.remove((long) nums[i - indexDiff - 1]);
        Long c = window.ceiling((long) nums[i] - valueDiff);
        if (c != null && c - nums[i] <= valueDiff) return true;
        window.add((long) nums[i]);
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| TreeSet sliding window | O(n log k) | O(k) |

## Recall before you reveal
<details><summary>Why long?</summary>

Avoid overflow in nums[i] − valueDiff.

</details>


<details><summary>O(n) idea?</summary>

Bucket by value / (valueDiff + 1) and check neighbouring buckets.

</details>


## Connected
- Sliding window family: [Sliding Window](../Sliding%20Window/Sliding%20Window%20-%20Pattern%20Map.md), [Contains Duplicate II](../Sliding%20Window/Contains%20Duplicate%20II.md)
