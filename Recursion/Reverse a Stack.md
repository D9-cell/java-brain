---
topic: Recursion
pattern: [Call stack as storage]
source: GFG
difficulty: Medium
companies: [Amazon, Swiggy]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Reverse a Stack

> [!TIP]
> **🧠 Memory hook**
> Hand the plates to a friend (the call stack), let them reverse the rest, then slide your plate under the pile.
> **Mantra: POP, REVERSE REST, INSERT AT BOTTOM**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=1) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Reverse a stack using recursion only.

## Key insight
reverse(st): pop top, reverse(st), insertAtBottom(top). insertAtBottom: pop until empty, push x, push the others back while unwinding.

## Approach 1: Temp stack for the bottom insert
```java
// Approach 1: pop top, reverse the rest, then put top at the bottom using a temp stack
static void reverseWithTemp(Deque<Integer> st) {
    if (st.isEmpty()) return;
    int top = st.pop();
    reverseWithTemp(st);
    Deque<Integer> temp = new ArrayDeque<>();
    while (!st.isEmpty()) temp.push(st.pop());
    st.push(top);
    while (!temp.isEmpty()) st.push(temp.pop());
}
```

## Approach 2: Pure recursion
```java
// Puts element at the bottom by holding every item on the call stack
static void insertAtBottom(Deque<Integer> st, int element) {
    if (st.isEmpty()) { st.push(element); return; }
    int top = st.pop();
    insertAtBottom(st, element);
    st.push(top);
}

// Approach 2: pop top, trust recursion to reverse the rest, insert top at the bottom
static void reverse(Deque<Integer> st) {
    if (st.isEmpty()) return;
    int top = st.pop();
    reverse(st);
    insertAtBottom(st, top);
}
```

| Approach | Time | Space |
|---|---|---|
| Temp stack for the bottom insert | O(n²) | O(n) |
| Pure recursion | O(n²) | O(n) stack |

## Recall before you reveal
<details><summary>Why O(n²)?</summary>

Each of n inserts walks the whole stack.

</details>


## Connected
- [Tower of Hanoi](Tower%20of%20Hanoi.md)
