---
topic: Stack
pattern: [Monotonic stack (next smaller-or-equal)]
source: LeetCode 1475
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Final Prices With a Special Discount in a Shop

> [!TIP]
> **🧠 Memory hook**
> Each item waits for the first cheaper-or-equal item after it.
> **Mantra: NEXT SMALLER-OR-EQUAL STACK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=18) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
price[i] minus the first later price ≤ it.

## Key insight
Indices wait on a stack; a cheaper-or-equal price discounts them.

## Approach 1: Brute force
```java
// Approach 1: for each item scan right for the first price <= it
public int[] finalPricesBrute(int[] p) {
    int[] res = p.clone();
    for (int i = 0; i < p.length; i++) for (int j = i + 1; j < p.length; j++) if (p[j] <= p[i]) { res[i] -= p[j]; break; }
    return res;
}
```

## Approach 2: Monotonic stack
```java
// Approach 2: monotonic stack of waiting indices; a cheaper-or-equal price discounts them
public int[] finalPrices(int[] p) {
    int[] res = p.clone();
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i < p.length; i++) {
        while (!st.isEmpty() && p[st.peek()] >= p[i]) res[st.pop()] -= p[i];
        st.push(i);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n²) | O(1) |
| Monotonic stack | O(n) | O(n) |

## Recall before you reveal
<details><summary>Pop condition?</summary>

p[top] >= p[i].

</details>


## Connected
- [Daily Temperatures](Daily%20Temperatures.md)
