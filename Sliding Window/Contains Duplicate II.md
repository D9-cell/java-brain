---
topic: Sliding Window
pattern: [Fixed window, HashSet]
source: LeetCode 219
difficulty: Easy
companies: [Airbnb, Palantir]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Contains Duplicate II

> [!TIP]
> **🧠 Memory hook**
> A short-term memory of the last k numbers.
> **Mantra: SET OF LAST k; add() FAILS ⇒ TRUE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=3) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Is there a pair i ≠ j with nums[i] == nums[j] and |i − j| ≤ k?

## Key insight
Keep the last k values in a set. If the new value is already inside, the distance is at most k.

## Approach: Window set
```java
// Keep only the last k values in a set; a hit means a duplicate within distance k
public boolean containsNearbyDuplicate(int[] nums, int k) {
    Set<Integer> window = new HashSet<>();
    for (int i = 0, j = 0; j < nums.length; j++) {
        if (j - i > k) window.remove(nums[i++]);
        if (!window.add(nums[j])) return true;
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Window set | O(n) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against all pairs.

## Recall before you reveal
<details><summary>When do you evict?</summary>

When `j − i > k`, remove nums[i].

</details>


<details><summary>Also a value tolerance?</summary>

Contains Duplicate III: TreeSet ceiling.

</details>


## Connected
- [Contains Duplicate III](../HashSet/Contains%20Duplicate%20III.md)
