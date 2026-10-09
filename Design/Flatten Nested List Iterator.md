---
topic: Design
pattern: [Stack, Lazy iterator]
source: LeetCode 341
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Flatten Nested List Iterator

> [!TIP]
> **🧠 Memory hook**
> A box of boxes: open boxes only when you need the next item.
> **Mantra: STACK, UNPACK IN hasNext()**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=19) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
Iterate over all integers in a nested list.

## Key insight
Push items in reverse. hasNext() pops lists and pushes their contents until an integer is on top.

## Approach: Stack of NestedInteger
```java
// Minimal stand-in for LeetCode's NestedInteger interface
static class NestedInteger {
    private final Integer value;
    private final List<NestedInteger> list;

    NestedInteger(int v) { value = v; list = null; }

    NestedInteger(List<NestedInteger> l) { value = null; list = l; }

    // True if this holds a single integer
    public boolean isInteger() { return value != null; }

    // The single integer
    public Integer getInteger() { return value; }

    // The nested list
    public List<NestedInteger> getList() { return list; }
}

// Lazy stack: hasNext() unpacks lists until an integer is on top
static class NestedIterator implements Iterator<Integer> {
    private final Deque<NestedInteger> st = new ArrayDeque<>();

    // Push in reverse so the first element is on top
    NestedIterator(List<NestedInteger> list) { pushAll(list); }

    // Pushes a list's items in reverse order
    private void pushAll(List<NestedInteger> list) { for (int i = list.size() - 1; i >= 0; i--) st.push(list.get(i)); }

    // Expand lists on top until an integer (or nothing) remains
    @Override
    public boolean hasNext() {
        while (!st.isEmpty() && !st.peek().isInteger()) pushAll(st.pop().getList());
        return !st.isEmpty();
    }

    // hasNext() guarantees the top is an integer
    @Override
    public Integer next() {
        hasNext();
        return st.pop().getInteger();
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Stack of NestedInteger | O(1) amortised | O(depth + items) |

## Recall before you reveal
<details><summary>Why in hasNext?</summary>

Empty lists must be skipped before answering.

</details>

