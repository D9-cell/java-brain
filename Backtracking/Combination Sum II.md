---
topic: Backtracking
pattern: [Subsets with duplicates, Pruning]
source: LeetCode 40
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Combination Sum II

> [!TIP]
> **🧠 Memory hook**
> Coins in a jar, each usable once; equal coins are interchangeable.
> **Mantra: SORT, SKIP EQUAL SIBLINGS, BREAK ON OVERSHOOT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=3) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Unique combinations of candidates (each used once) summing to target.

## Key insight
Sort; skip equal values at the same depth; break once a candidate exceeds the remaining target.

## Approach: Sorted backtracking
```java
// Sorted candidates; at one depth skip repeated values (i > idx && c[i] == c[i-1]); stop when c[i] > remaining
private void solve(int[] c, int idx, int target, List<Integer> cur, List<List<Integer>> res) {
    if (target == 0) { res.add(new ArrayList<>(cur)); return; }
    for (int i = idx; i < c.length && c[i] <= target; i++) {
        if (i > idx && c[i] == c[i - 1]) continue;
        cur.add(c[i]);
        solve(c, i + 1, target - c[i], cur, res);
        cur.remove(cur.size() - 1);
    }
}

// Entry point
public List<List<Integer>> combinationSum2(int[] candidates, int target) {
    int[] c = candidates.clone();
    Arrays.sort(c);
    List<List<Integer>> res = new ArrayList<>();
    solve(c, 0, target, new ArrayList<>(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted backtracking | O(2^n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration (bitmasks / all assignments) on random inputs when it was written.

## Recall before you reveal
<details><summary>break vs continue on overshoot?</summary>

break — the array is sorted.

</details>


## Connected
- [Subsets II](Subsets%20II.md)
