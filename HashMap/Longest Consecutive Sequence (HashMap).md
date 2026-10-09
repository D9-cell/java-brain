---
topic: HashMap
pattern: [Run starts]
source: LeetCode 128
difficulty: Medium
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Longest Consecutive Sequence (HashMap)

> [!TIP]
> **🧠 Memory hook**
> Only the first domino starts counting.
> **Mantra: START IF x − 1 MISSING, WALK UP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=27) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Length of the longest run of consecutive integers, in O(n).

## Key insight
Only numbers without a predecessor start a walk, so each number is visited at most twice.

## Approach 1: Sort
```java
// Approach 1: sort, then count runs while skipping duplicates
public int longestConsecutiveSort(int[] nums) {
    if (nums.length == 0) return 0;
    int[] a = nums.clone();
    Arrays.sort(a);
    int best = 1, run = 1;
    for (int i = 1; i < a.length; i++) {
        if (a[i] == a[i - 1]) continue;
        run = a[i] == a[i - 1] + 1 ? run + 1 : 1;
        best = Math.max(best, run);
    }
    return best;
}
```

## Approach 2: Map of run starts
```java
// Approach 2: map value → visited flag; expand only from numbers whose predecessor is missing
public int longestConsecutive(int[] nums) {
    Map<Integer, Boolean> seen = new HashMap<>();
    for (int x : nums) seen.put(x, true);
    int best = 0;
    for (int x : seen.keySet()) {
        if (seen.containsKey(x - 1)) continue;
        int len = 1;
        while (seen.containsKey(x + len)) len++;
        best = Math.max(best, len);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort | O(n log n) | O(n) |
| Map of run starts | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on 500 random arrays.

## Recall before you reveal
<details><summary>Duplicates?</summary>

Skip them when counting the run.

</details>


## Connected
- [Longest Consecutive Sequence](../HashSet/Longest%20Consecutive%20Sequence.md)
