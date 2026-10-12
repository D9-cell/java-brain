---
topic: Binary Strings and Substring Counting
pattern: [Invariant]
source: LeetCode 2211
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count Collisions on a Road

> [!TIP]
> **🧠 Memory hook**
> Cars driving **L off the left edge** and **R off the right edge** escape. **Every other moving car** eventually stops in a collision and adds 1.
> **Mantra: trim leading L and trailing R · count non-S in the middle**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=9) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
directions[i] is L, R or S. Opposite cars colliding add 2, a moving car hitting a stopped one adds 1; cars stop after colliding. Return the total collisions.

## Key insight
In the middle segment there is a stopped car or an R-L meeting somewhere, so every moving car eventually hits something and contributes exactly 1 for itself (an R-L crash is 1 + 1).

## Approach: Trim and count
```java
// Cars leaving on the far left (L) and far right (R) escape; every other moving car collides once
public int countCollisions(String directions) {
    int l = 0, r = directions.length() - 1;
    while (l <= r && directions.charAt(l) == 'L') l++;
    while (r >= l && directions.charAt(r) == 'R') r--;
    int count = 0;
    for (int i = l; i <= r; i++)
        if (directions.charAt(i) != 'S') count++;
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Trim and count | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>"RLRSLL"?</summary>

Nothing trimmed; moving cars R, L, R, L, L → 5.

</details>


<details><summary>Why do leading Ls escape?</summary>

Nothing is to their left.

</details>


## Connected
- [Asteroid Collision](../../Stack/Asteroid%20Collision.md)
- [Move Pieces to Obtain a String](Move%20Pieces%20to%20Obtain%20a%20String.md)
