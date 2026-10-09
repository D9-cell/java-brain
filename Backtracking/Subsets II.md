---
topic: Backtracking
pattern: [Subsets with duplicates]
source: LeetCode 90
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Subsets II

> [!TIP]
> **🧠 Memory hook**
> A buffet with identical dishes: one copy may start a branch per decision point.
> **Mantra: SORT, RECORD EVERY NODE, SKIP EQUAL SIBLINGS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=28) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All unique subsets of a list with duplicates.

## Key insight
Sort; every node is a subset; skip a[i] equal to a[i−1] at the same depth.

## Approach: For-loop template
```java
// Sort; record every node; at one depth skip a value equal to the previous sibling
private void solve(int[] a, int idx, List<Integer> cur, List<List<Integer>> res) {
    res.add(new ArrayList<>(cur));
    for (int i = idx; i < a.length; i++) {
        if (i > idx && a[i] == a[i - 1]) continue;
        cur.add(a[i]);
        solve(a, i + 1, cur, res);
        cur.remove(cur.size() - 1);
    }
}

// Entry point
public List<List<Integer>> subsetsWithDup(int[] nums) {
    int[] a = nums.clone();
    Arrays.sort(a);
    List<List<Integer>> res = new ArrayList<>();
    solve(a, 0, new ArrayList<>(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| For-loop template | O(n·2^n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration (bitmasks / all assignments) on random inputs when it was written.

## Recall before you reveal
<details><summary>Skip condition?</summary>

i > idx && a[i] == a[i−1].

</details>


## Connected
- [Subsets](../Recursion/Subsets.md)
- [Combination Sum II](Combination%20Sum%20II.md)
