---
topic: Design
pattern: [Tree traversal, Simulation]
source: LeetCode 1993
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Operations on Tree

> [!TIP]
> **🧠 Memory hook**
> A family vault: upgrade only if you are free, your elders are free and a descendant holds a key.
> **Mantra: CHECK UP, CHECK DOWN, CLEAR DOWN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=26) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
lock, unlock, upgrade(num, user) on a tree given by a parent array.

## Key insight
Walk up through parents for the ancestor check; DFS down through children to find and clear locked descendants.

## Approach: Parent array + children lists
```java
// lockedBy[v] = user or 0; children lists for the downward search
static class LockingTree {
    private final int[] parent, lockedBy;
    private final List<List<Integer>> kids = new ArrayList<>();

    LockingTree(int[] parent) {
        this.parent = parent;
        lockedBy = new int[parent.length];
        for (int i = 0; i < parent.length; i++) kids.add(new ArrayList<>());
        for (int i = 1; i < parent.length; i++) kids.get(parent[i]).add(i);
    }

    // Only an unlocked node can be locked
    public boolean lock(int num, int user) {
        if (lockedBy[num] != 0) return false;
        lockedBy[num] = user;
        return true;
    }

    // Only the same user can unlock
    public boolean unlock(int num, int user) {
        if (lockedBy[num] != user) return false;
        lockedBy[num] = 0;
        return true;
    }

    // Unlocks every locked descendant; returns whether any was locked
    private boolean unlockDescendants(int v) {
        boolean any = false;
        for (int c : kids.get(v)) {
            if (lockedBy[c] != 0) { lockedBy[c] = 0; any = true; }
            any |= unlockDescendants(c);
        }
        return any;
    }

    // Has a locked descendant (checked without changing anything)
    private boolean hasLockedDescendant(int v) {
        for (int c : kids.get(v)) if (lockedBy[c] != 0 || hasLockedDescendant(c)) return true;
        return false;
    }

    // Node unlocked, no locked ancestor, at least one locked descendant → lock it and clear the descendants
    public boolean upgrade(int num, int user) {
        if (lockedBy[num] != 0) return false;
        for (int a = parent[num]; a != -1; a = parent[a]) if (lockedBy[a] != 0) return false;
        if (!hasLockedDescendant(num)) return false;
        unlockDescendants(num);
        lockedBy[num] = user;
        return true;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Parent array + children lists | O(n) upgrade | O(n) |

## Recall before you reveal
<details><summary>Three conditions?</summary>

Unlocked node, no locked ancestor, ≥ 1 locked descendant.

</details>

