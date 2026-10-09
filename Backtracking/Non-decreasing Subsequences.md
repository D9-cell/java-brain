---
topic: Backtracking
pattern: [Subsets with order-preserving dedupe]
source: LeetCode 491
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Non-decreasing Subsequences

> [!TIP]
> **🧠 Memory hook**
> A per-floor guest list: the same value may enter each floor once.
> **Mantra: PER-DEPTH SET, NON-DECREASING CHECK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=17) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All distinct non-decreasing subsequences of length ≥ 2.

## Key insight
Cannot sort, so dedupe per recursion level with a local set.

## Approach: Backtracking + level set
```java
// At each depth, a local HashSet stops the same value from starting two identical branches
private void solve(int[] a, int idx, List<Integer> cur, List<List<Integer>> res) {
    if (cur.size() >= 2) res.add(new ArrayList<>(cur));
    Set<Integer> usedHere = new HashSet<>();
    for (int i = idx; i < a.length; i++) {
        if ((!cur.isEmpty() && a[i] < cur.get(cur.size() - 1)) || !usedHere.add(a[i])) continue;
        cur.add(a[i]);
        solve(a, i + 1, cur, res);
        cur.remove(cur.size() - 1);
    }
}

// Entry point
public List<List<Integer>> findSubsequences(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    solve(nums, 0, new ArrayList<>(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking + level set | O(2^n · n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration (bitmasks / all assignments) on random inputs when it was written.

## Recall before you reveal
<details><summary>Why local, not global set?</summary>

The same value may appear again at a deeper level.

</details>


## Connected
- [Subsets II](Subsets%20II.md)
