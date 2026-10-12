---
topic: Simulation and Encoding
pattern: [Net displacement]
source: LeetCode 657
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Robot Return to Origin

> [!TIP]
> **🧠 Memory hook**
> Order does not matter, only the **net x and y**. Back home iff both are 0.
> **Mantra: U/D change y · L/R change x · x == 0 && y == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=0) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Given moves made of U, D, L, R, return true if the robot ends at the origin.

## Key insight
Each move adds a fixed vector, and vector addition is order-independent, so counting is enough.

## Approach: Track x and y
```java
// Back at the origin iff U and D balance and L and R balance
public boolean judgeCircle(String moves) {
    int x = 0, y = 0;
    for (char c : moves.toCharArray()) {
        if (c == 'U') y++;
        else if (c == 'D') y--;
        else if (c == 'L') x--;
        else x++;
    }
    return x == 0 && y == 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Track x and y | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does order not matter?</summary>

The final position is the sum of the move vectors.

</details>


<details><summary>Counting version?</summary>

count(U) == count(D) and count(L) == count(R).

</details>


## Connected
- [Furthest Point From Origin](Furthest%20Point%20From%20Origin.md)
