---
topic: Backtracking
pattern: [Permutations with duplicates]
source: LeetCode 47
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Permutations II

> [!TIP]
> **🧠 Memory hook**
> Seat families: choose a family, not a specific twin.
> **Mantra: COUNT MAP, BRANCH ON DISTINCT VALUES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=24) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All unique permutations of a list with duplicates.

## Key insight
Branch over distinct values with remaining counts (or swap with a per-level set).

## Approach 1: Count map
```java
// Approach 1: work on value COUNTS; each distinct value is one branch, so duplicates never arise
private void solve(Map<Integer, Integer> cnt, int n, List<Integer> cur, List<List<Integer>> res) {
    if (cur.size() == n) { res.add(new ArrayList<>(cur)); return; }
    for (Map.Entry<Integer, Integer> e : cnt.entrySet()) {
        if (e.getValue() == 0) continue;
        e.setValue(e.getValue() - 1);
        cur.add(e.getKey());
        solve(cnt, n, cur, res);
        cur.remove(cur.size() - 1);
        e.setValue(e.getValue() + 1);
    }
}

// Count-based entry point
public List<List<Integer>> permuteUnique(int[] nums) {
    Map<Integer, Integer> cnt = new TreeMap<>();
    for (int x : nums) cnt.merge(x, 1, Integer::sum);
    List<List<Integer>> res = new ArrayList<>();
    solve(cnt, nums.length, new ArrayList<>(), res);
    return res;
}
```

## Approach 2: Swap + per-level set
```java
// Approach 2: swap technique; a per-level HashSet skips values already placed at position i
private void swapPerm(int[] a, int i, List<List<Integer>> res) {
    if (i == a.length) { List<Integer> l = new ArrayList<>(); for (int x : a) l.add(x); res.add(l); return; }
    Set<Integer> seen = new HashSet<>();
    for (int j = i; j < a.length; j++) {
        if (!seen.add(a[j])) continue;
        int t = a[i]; a[i] = a[j]; a[j] = t;
        swapPerm(a, i + 1, res);
        t = a[i]; a[i] = a[j]; a[j] = t;
    }
}

// Swap-based entry point
public List<List<Integer>> permuteUniqueSwap(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    swapPerm(nums.clone(), 0, res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Count map | O(n·n!) | O(n) |
| Swap + per-level set | O(n·n!) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Both approaches return exactly the distinct permutations on random inputs.

## Recall before you reveal
<details><summary>Third way?</summary>

Sort + twin rule.

</details>


## Connected
- [All Unique Permutations of an array](All%20Unique%20Permutations%20of%20an%20array.md)
- [Permutations](Permutations.md)
