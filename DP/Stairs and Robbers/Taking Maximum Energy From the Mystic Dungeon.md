---
topic: Stairs and Robbers
pattern: [Suffix DP with stride k]
source: LeetCode 3147
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Taking Maximum Energy From the Mystic Dungeon

> [!TIP]
> **🧠 Memory hook**
> Start anywhere and jump `k` steps until you leave: the total is a **suffix sum along stride k**.
> **Mantra: dp[i] = energy[i] + dp[i + k]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=19) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Magicians in a line give (or take) energy. After absorbing energy from magician i you teleport to i + k, until you fall off the end. Return the maximum total energy over all starting points.

## Key insight
The total from start i is `energy[i]` plus the total from i + k. Compute from the right and take the maximum of all `dp[i]`.

## Approach 1: Right-to-left DP
```java
// From a start magician you jump k at a time until you leave the line. dp[i] = energy[i] + dp[i + k]; the best start is the maximum dp
public int maximumEnergy(int[] energy, int k) {
    int n = energy.length, best = Integer.MIN_VALUE;
    int[] dp = new int[n];
    for (int i = n - 1; i >= 0; i--) {
        dp[i] = energy[i] + (i + k < n ? dp[i + k] : 0);
        best = Math.max(best, dp[i]);
    }
    return best;
}
```

## Approach 2: Residue classes
```java
// Sweep the k residue classes and keep the maximum suffix sum of each class
public int maximumEnergyClasses(int[] energy, int k) {
    int best = Integer.MIN_VALUE, n = energy.length;
    for (int r = 0; r < k && r < n; r++) {
        int sum = 0;
        int last = r + ((n - 1 - r) / k) * k;
        for (int i = last; i >= 0; i -= k) { sum += energy[i]; best = Math.max(best, sum); }
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Right-to-left DP | O(n) | O(n) |
| Residue classes | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why the maximum over all i?</summary>

You may start at any magician.

</details>


## Connected
- [House Robber](House%20Robber.md)
