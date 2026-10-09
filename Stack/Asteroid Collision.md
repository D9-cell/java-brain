---
topic: Stack
pattern: [Stack simulation]
source: LeetCode 735
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Asteroid Collision

> [!TIP]
> **🧠 Memory hook**
> Right-moving cars queue up; a left-moving car smashes into the queue top.
> **Mantra: ONLY → ← COLLIDE, BIGGER SURVIVES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=1) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Return the asteroids left after all collisions.

## Key insight
Only a right-mover (stack top) followed by a left-mover can collide; resolve repeatedly against the top.

## Approach: Stack
```java
// Stack of survivors; a left-mover destroys smaller right-movers on top, dies on a bigger one, both die on equal
public int[] asteroidCollision(int[] asteroids) {
    Deque<Integer> st = new ArrayDeque<>();
    for (int a : asteroids) {
        boolean alive = true;
        while (alive && a < 0 && !st.isEmpty() && st.peek() > 0) {
            if (st.peek() < -a) st.pop();
            else { if (st.peek() == -a) st.pop(); alive = false; }
        }
        if (alive) st.push(a);
    }
    int[] res = new int[st.size()];
    for (int i = res.length - 1; i >= 0; i--) res[i] = st.pop();
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a pairwise collision simulation.

## Recall before you reveal
<details><summary>Equal sizes?</summary>

Both explode.

</details>


## Connected
- [Robot Collisions](Robot%20Collisions.md)
