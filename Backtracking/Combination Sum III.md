---
topic: Backtracking
pattern: [Combinations, Pruning]
source: LeetCode 216
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Combination Sum III

> [!TIP]
> **🧠 Memory hook**
> Pick k different digits from 1..9 hitting a sum.
> **Mantra: DIGITS 1..9 ONCE, PRUNE ON COUNT OR SUM**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=4) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All combinations of k distinct digits 1..9 summing to n.

## Key insight
Increasing digits; prune when the count is full or the sum overshoots.

## Approach: Backtracking
```java
// Numbers 1..9 used at most once; stop early when the count or the sum is exceeded
private void solve(int start, int k, int n, List<Integer> cur, List<List<Integer>> res) {
    if (cur.size() == k && n == 0) { res.add(new ArrayList<>(cur)); return; }
    if (cur.size() == k || n <= 0) return;
    for (int i = start; i <= 9; i++) {
        cur.add(i);
        solve(i + 1, k, n - i, cur, res);
        cur.remove(cur.size() - 1);
    }
}

// Entry point
public List<List<Integer>> combinationSum3(int k, int n) {
    List<List<Integer>> res = new ArrayList<>();
    solve(1, k, n, new ArrayList<>(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking | O(C(9,k)) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified for every (k, n) against a 9-bit mask enumeration.

## Recall before you reveal
<details><summary>Max sum?</summary>

45.

</details>


## Connected
- [Combinations](Combinations.md)
