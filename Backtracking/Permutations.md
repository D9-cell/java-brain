---
topic: Backtracking
pattern: [Permutations]
source: LeetCode 46
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Permutations

> [!TIP]
> **🧠 Memory hook**
> Seat n guests: each seat takes any unseated guest.
> **Mantra: USED[], CHOOSE, RECURSE, UNCHOOSE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=23) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All permutations of distinct integers.

## Key insight
Either swap into place, or use a used[] array (general template).

## Approach 1: Swapping
```java
// Approach 1: swap nums[i] with every j >= i, recurse on i + 1, swap back
private void swapPerm(int[] a, int i, List<List<Integer>> res) {
    if (i == a.length) { List<Integer> l = new ArrayList<>(); for (int x : a) l.add(x); res.add(l); return; }
    for (int j = i; j < a.length; j++) {
        int t = a[i]; a[i] = a[j]; a[j] = t;
        swapPerm(a, i + 1, res);
        t = a[i]; a[i] = a[j]; a[j] = t;
    }
}

// Approach 1 entry point
public List<List<Integer>> permuteSwap(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    swapPerm(nums.clone(), 0, res);
    return res;
}
```

## Approach 2: used[] template
```java
// Approach 2: general template with used[] (extends to Permutations II / Combination Sum)
private void solve(int[] a, boolean[] used, List<Integer> cur, List<List<Integer>> res) {
    if (cur.size() == a.length) { res.add(new ArrayList<>(cur)); return; }
    for (int i = 0; i < a.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        cur.add(a[i]);
        solve(a, used, cur, res);
        cur.remove(cur.size() - 1);
        used[i] = false;
    }
}

// Approach 2 entry point
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    solve(nums, new boolean[nums.length], new ArrayList<>(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Swapping | O(n·n!) | O(n) |
| used[] template | O(n·n!) | O(n) |

## Recall before you reveal
<details><summary>Which generalises to duplicates?</summary>

used[] + twin rule, or counts.

</details>


## Connected
- [Permutations II](Permutations%20II.md)
