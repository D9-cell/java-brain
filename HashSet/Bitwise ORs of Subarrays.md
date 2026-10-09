---
topic: HashSet
pattern: [Set of generated values, Bit monotonicity]
source: LeetCode 898
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Bitwise ORs of Subarrays

> [!TIP]
> **🧠 Memory hook**
> OR only turns lights on, so subarrays ending here have at most ~32 different patterns.
> **Mantra: PREV ORs | x, PLUS x; COLLECT ALL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=1) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Return the number of distinct bitwise-OR values over all non-empty subarrays.

## Key insight
Let `cur` = ORs of subarrays ending at i = {x} ∪ {p | x for p in prev}. It has at most 32 elements because each extension only adds bits.

## Approach: Rolling sets
```java
// ORs of subarrays ending at i come from ORs ending at i-1 (at most ~32 distinct), each OR'd with arr[i]
public int subarrayBitwiseORs(int[] arr) {
    Set<Integer> prev = new HashSet<>(), result = new HashSet<>();
    for (int x : arr) {
        Set<Integer> cur = new HashSet<>();
        cur.add(x);
        for (int p : prev) cur.add(p | x);
        result.addAll(cur);
        prev = cur;
    }
    return result.size();
}
```

| Approach | Time | Space |
|---|---|---|
| Rolling sets | O(32·n) | O(32·n) |

## Recall before you reveal
<details><summary>Why is cur bounded by 32?</summary>

The values ending at i form a chain where each one adds bits.

</details>


## Connected
- Bit tricks: the `Bit_Magic` folder
