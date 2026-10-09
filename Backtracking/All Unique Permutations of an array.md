---
topic: Backtracking
pattern: [Permutations with duplicates]
source: GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# All Unique Permutations of an array

> [!TIP]
> **🧠 Memory hook**
> Identical twins always stand in the same order.
> **Mantra: SORT, TWIN RULE: !used[i−1] → SKIP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=1) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Return all unique permutations, sorted.

## Key insight
Sort; skip a[i] when it equals a[i−1] and a[i−1] is unused at this point.

## Approach: used[] + twin rule
```java
// Sort; at each depth skip a value equal to the previous one when that previous copy is not in use
private void solve(int[] a, boolean[] used, List<Integer> cur, List<List<Integer>> res) {
    if (cur.size() == a.length) { res.add(new ArrayList<>(cur)); return; }
    for (int i = 0; i < a.length; i++) {
        if (used[i] || (i > 0 && a[i] == a[i - 1] && !used[i - 1])) continue;
        used[i] = true;
        cur.add(a[i]);
        solve(a, used, cur, res);
        cur.remove(cur.size() - 1);
        used[i] = false;
    }
}

// Returns unique permutations in sorted order
public List<List<Integer>> uniquePerms(int[] arr) {
    int[] a = arr.clone();
    Arrays.sort(a);
    List<List<Integer>> res = new ArrayList<>();
    solve(a, new boolean[a.length], new ArrayList<>(), res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| used[] + twin rule | O(n·n!) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration (bitmasks / all assignments) on random inputs when it was written.

## Recall before you reveal
<details><summary>Why !used[i−1]?</summary>

It forces equal values to be placed left-to-right only.

</details>


## Connected
- [Permutations II](Permutations%20II.md)
