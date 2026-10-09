---
topic: Backtracking
pattern: [Combinations]
source: LeetCode 77
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Combinations

> [!TIP]
> **🧠 Memory hook**
> Pick a team in jersey-number order.
> **Mantra: NEXT > LAST, LEAVE ROOM**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=2) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All combinations of k numbers from 1..n.

## Key insight
Increasing choices avoid reorderings; stop when too few numbers remain.

## Approach: Backtracking with bound
```java
// Choose the next number from start..n; prune when not enough numbers remain
private void solve(int start, int n, int k, List<Integer> cur, List<List<Integer>> res) {
    if (cur.size() == k) { res.add(new ArrayList<>(cur)); return; }
    for (int i = start; i <= n - (k - cur.size()) + 1; i++) {
        cur.add(i);
        solve(i + 1, n, k, cur, res);
        cur.remove(cur.size() - 1);
    }
}

// Entry point
public List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> res = new ArrayList<>();
    solve(1, n, k, new ArrayList<>(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking with bound | O(k·C(n,k)) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration (bitmasks / all assignments) on random inputs when it was written.

## Recall before you reveal
<details><summary>Loop bound?</summary>

i ≤ n − (k − size) + 1.

</details>


## Connected
- [Combination Sum III](Combination%20Sum%20III.md)
