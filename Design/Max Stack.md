---
topic: Design
pattern: [Two TreeSets]
source: LeetCode 716
difficulty: Hard
companies: [LinkedIn]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Max Stack

> [!TIP]
> **🧠 Memory hook**
> One pile of numbered plates, two catalogues: by arrival and by size.
> **Mantra: IDs + TREESET BY ID + TREESET BY (VAL, ID)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=24) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
push, pop, top, peekMax, popMax (remove the top-most maximum).

## Key insight
Tag each push with an id. byId orders the stack; byVal orders (value, id), so its last element is the top-most max.

## Approach: Two TreeSets
```java
// Each push gets an id; one TreeSet orders by id (stack), another by (value, id) (max, top-most on ties)
static class Stack {
    private final TreeSet<int[]> byId = new TreeSet<>((a, b) -> Integer.compare(a[1], b[1]));
    private final TreeSet<int[]> byVal = new TreeSet<>((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
    private int ids = 0;

    // Add to both orders
    public void push(int x) {
        int[] e = {x, ids++};
        byId.add(e);
        byVal.add(e);
    }

    // Newest id
    public int pop() {
        int[] e = byId.pollLast();
        byVal.remove(e);
        return e[0];
    }

    // Peek newest
    public int top() { return byId.last()[0]; }

    // Peek largest value
    public int peekMax() { return byVal.last()[0]; }

    // Largest value, top-most copy (largest id) because ties compare by id
    public int popMax() {
        int[] e = byVal.pollLast();
        byId.remove(e);
        return e[0];
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Two TreeSets | O(log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>DLL + TreeMap alternative?</summary>

TreeMap<value, list of nodes> + DLL; same complexity.

</details>

