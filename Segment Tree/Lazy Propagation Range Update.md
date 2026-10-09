---
topic: Segment Tree
pattern: [Lazy propagation, Range add + range sum]
source: GFG
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Lazy Propagation Range Update

> [!TIP]
> **🧠 Memory hook**
> A team raise: apply it to the team total and leave IOU notes for sub-managers, cashed on the next visit.
> **Mantra: PUSH FIRST, FULL → TAG + STOP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=3) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Support adding `val` to every element in `[l, r]` and querying range sums, both in O(log n).

## Key insight
A fully covered node gets `tree += len·val` and its children get `lazy += val`. Every visit starts with `push()`, so pending values are applied before a node is used.

## Approach: Lazy sum tree
```java
// Applies a pending add to node i and hands it down to its children
private void push(int i, int l, int r) {
    if (lazy[i] == 0) return;
    tree[i] += (r - l + 1) * lazy[i];
    if (l != r) {
        lazy[2 * i + 1] += lazy[i];
        lazy[2 * i + 2] += lazy[i];
    }
    lazy[i] = 0;
}

// Adds val to every index in [ql, qr]; fully covered nodes only get a lazy tag
private void update(int i, int l, int r, int ql, int qr, long val) {
    push(i, l, r);
    if (r < ql || l > qr) return;
    if (ql <= l && r <= qr) {
        lazy[i] += val;
        push(i, l, r);
        return;
    }
    int mid = (l + r) >>> 1;
    update(2 * i + 1, l, mid, ql, qr, val);
    update(2 * i + 2, mid + 1, r, ql, qr, val);
    tree[i] = tree[2 * i + 1] + tree[2 * i + 2];
}

// Range sum; pushes pending tags before reading a node
private long query(int i, int l, int r, int ql, int qr) {
    push(i, l, r);
    if (r < ql || l > qr) return 0;
    if (ql <= l && r <= qr) return tree[i];
    int mid = (l + r) >>> 1;
    return query(2 * i + 1, l, mid, ql, qr) + query(2 * i + 2, mid + 1, r, ql, qr);
}
```

| Approach | Time | Space |
|---|---|---|
| Lazy sum tree | O(log n) per op | O(8n) |

## Recall before you reveal
<details><summary>Why push at the start of query too?</summary>

The node may still hold an unapplied IOU.

</details>


<details><summary>Leaf check in push?</summary>

Only pass to children if `l != r`.

</details>


## Connected
- [Longest Balanced Subarray II](Longest%20Balanced%20Subarray%20II.md)
- [My Calendar III](../Line%20Sweep/My%20Calendar%20III.md)
