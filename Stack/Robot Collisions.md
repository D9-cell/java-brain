---
topic: Stack
pattern: [Stack simulation]
source: LeetCode 2751
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Robot Collisions

> [!TIP]
> **🧠 Memory hook**
> Sort by position; right-movers queue up; a left-mover fights from the nearest.
> **Mantra: SORT, STACK OF R, FIGHT WITH HEALTH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=30) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Return the health of surviving robots (in input order).

## Key insight
Process by position; push R robots; an L robot fights the stack top: the weaker dies, the winner loses 1 health; equal → both die.

## Approach: Sort + stack
```java
// Sort by position; a stack holds right-movers; a left-mover fights them from the top down
public List<Integer> survivedRobotsHealths(int[] positions, int[] healths, String directions) {
    int n = positions.length;
    Integer[] idx = new Integer[n];
    for (int i = 0; i < n; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> positions[a] - positions[b]);
    int[] h = healths.clone();
    Deque<Integer> st = new ArrayDeque<>();
    for (int i : idx) {
        if (directions.charAt(i) == 'R') { st.push(i); continue; }
        while (h[i] > 0 && !st.isEmpty()) {
            int j = st.peek();
            if (h[j] < h[i]) { h[j] = 0; st.pop(); h[i]--; }
            else if (h[j] > h[i]) { h[j]--; h[i] = 0; }
            else { h[j] = 0; h[i] = 0; st.pop(); }
        }
    }
    List<Integer> res = new ArrayList<>();
    for (int x : h) if (x > 0) res.add(x);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + stack | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a half-step time simulation.

## Recall before you reveal
<details><summary>Output order?</summary>

Original index order.

</details>


## Connected
- [Asteroid Collision](Asteroid%20Collision.md)
