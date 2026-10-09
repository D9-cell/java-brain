---
topic: Segment Tree
pattern: [Lazy propagation, Min/max tree, Leftmost zero]
source: LeetCode 3721
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Longest Balanced Subarray II

> [!TIP]
> **🧠 Memory hook**
> For a fixed right end, keep a scoreboard for every start; lazy range adds update it, then find the first 0.
> **Mantra: RANGE ADD ±1, UNDO OLD COPY, LEFTMOST ZERO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=12) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Find the longest subarray where the number of distinct even values equals the number of distinct odd values.

## Key insight
value[l] = distinctEven − distinctOdd over nums[l..r]. When nums[r] arrives: subtract its contribution on [0, prev] (old copy), add on [0, r]. The answer for r is the leftmost l with value 0.

## Approach 1: Brute force (sets)
```java
// O(n^2) with sets, used only to verify
static int brute(int[] a) {
    int best = 0;
    for (int l = 0; l < a.length; l++) {
        Set<Integer> ev = new HashSet<>(), od = new HashSet<>();
        for (int r = l; r < a.length; r++) {
            (a[r] % 2 == 0 ? ev : od).add(a[r]);
            if (ev.size() == od.size()) best = Math.max(best, r - l + 1);
        }
    }
    return best;
}
```

## Approach 2: Lazy min/max tree
```java
// Applies a pending add to node i and passes it to the children
private void push(int i, int l, int r) {
    if (lazy[i] == 0) return;
    mn[i] += lazy[i];
    mx[i] += lazy[i];
    if (l != r) {
        lazy[2 * i + 1] += lazy[i];
        lazy[2 * i + 2] += lazy[i];
    }
    lazy[i] = 0;
}

// Adds val to every start index in [ql, qr]
private void add(int i, int l, int r, int ql, int qr, int val) {
    push(i, l, r);
    if (r < ql || l > qr) return;
    if (ql <= l && r <= qr) {
        lazy[i] += val;
        push(i, l, r);
        return;
    }
    int mid = (l + r) >>> 1;
    add(2 * i + 1, l, mid, ql, qr, val);
    add(2 * i + 2, mid + 1, r, ql, qr, val);
    mn[i] = Math.min(mn[2 * i + 1], mn[2 * i + 2]);
    mx[i] = Math.max(mx[2 * i + 1], mx[2 * i + 2]);
}

// Leftmost index whose value is 0; a segment can hold 0 only if min <= 0 <= max (values change by ±1)
private int leftmostZero(int i, int l, int r) {
    push(i, l, r);
    if (mn[i] > 0 || mx[i] < 0) return -1;
    if (l == r) return l;
    int mid = (l + r) >>> 1;
    int left = leftmostZero(2 * i + 1, l, mid);
    return left != -1 ? left : leftmostZero(2 * i + 2, mid + 1, r);
}

// value[l] = (#distinct evens − #distinct odds) in nums[l..r]; only the last occurrence of a value counts
public int longestBalanced(int[] nums) {
    int n = nums.length;
    mn = new int[4 * n];
    mx = new int[4 * n];
    lazy = new int[4 * n];
    Map<Integer, Integer> last = new HashMap<>();
    int best = 0;
    for (int r = 0; r < n; r++) {
        int val = nums[r] % 2 == 0 ? 1 : -1;
        Integer prev = last.get(nums[r]);
        if (prev != null) add(0, 0, n - 1, 0, prev, -val);
        add(0, 0, n - 1, 0, r, val);
        int l = leftmostZero(0, 0, n - 1);
        if (l != -1 && l <= r) best = Math.max(best, r - l + 1);
        last.put(nums[r], r);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force (sets) | O(n²) | O(n) |
| Lazy min/max tree | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Why can we descend on min ≤ 0 ≤ max?</summary>

Adjacent starts differ by at most 1 (one element), so the values are "continuous" and a zero must exist.

</details>


## Connected
- [Lazy Propagation Range Update](Lazy%20Propagation%20Range%20Update.md)
