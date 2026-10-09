---
topic: HashMap
pattern: [Fix the middle, Left/right maps]
source: LeetCode 3583
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Count Special Triplets

> [!TIP]
> **🧠 Memory hook**
> Stand in the middle; count the 2x twins on each side.
> **Mantra: LEFT MAP × RIGHT MAP AT EACH j**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=9) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Count i < j < k with nums[i] = nums[k] = 2·nums[j].

## Key insight
For each middle j, multiply the counts of 2·nums[j] on its left and right.

## Approach: One pass with two maps
```java
// Approach 2 (one pass): for each j as the middle, (# of 2·x on the left) × (# of 2·x on the right)
public int specialTriplets(int[] nums) {
    final long MOD = 1_000_000_007;
    Map<Integer, Integer> left = new HashMap<>(), right = new HashMap<>();
    for (int x : nums) right.merge(x, 1, Integer::sum);
    long res = 0;
    for (int x : nums) {
        right.merge(x, -1, Integer::sum);
        long target = 2L * x;
        if (target <= Integer.MAX_VALUE) res = (res + (long) left.getOrDefault((int) target, 0) * right.getOrDefault((int) target, 0)) % MOD;
        left.merge(x, 1, Integer::sum);
    }
    return (int) res;
}
```

| Approach | Time | Space |
|---|---|---|
| One pass with two maps | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n³).

## Recall before you reveal
<details><summary>Why remove x from the right first?</summary>

j itself must not count as k.

</details>

