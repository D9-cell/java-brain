---
topic: HashMap
pattern: [Frequency counting, Chains]
source: LeetCode 3020
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Find the Maximum Number of Elements in Subset

> [!TIP]
> **🧠 Memory hook**
> Climb a tower of squares: two copies per floor, one at the top.
> **Mantra: CLIMB x → x² WHILE COUNT ≥ 2, PEAK NEEDS 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=17) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Longest subset arrangeable as [x, x², x⁴, …, peak, …, x², x].

## Key insight
From every base, climb by squaring while two copies exist; the peak needs one copy. 1 is special: use an odd count of ones.

## Approach: Count map + climbing
```java
// Pattern x, x², x⁴, …, peak, …, x², x: climb by squaring while two copies exist; 1 is special (odd count of 1s)
public int maximumLength(int[] nums) {
    Map<Long, Integer> cnt = new HashMap<>();
    for (int x : nums) cnt.merge((long) x, 1, Integer::sum);
    int ones = cnt.getOrDefault(1L, 0), best = ones % 2 == 1 ? ones : Math.max(ones - 1, 0);
    for (long x : cnt.keySet()) {
        if (x == 1) continue;
        int len = 0;
        long cur = x;
        while (cnt.getOrDefault(cur, 0) >= 2) { len += 2; cur = cur * cur; }
        len += cnt.containsKey(cur) ? 1 : -1;
        best = Math.max(best, len);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Count map + climbing | O(n log log max) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a per-peak brute force.

## Recall before you reveal
<details><summary>Overflow?</summary>

Square in long.

</details>


<details><summary>If the peak is missing?</summary>

Drop one level: len − 1.

</details>

