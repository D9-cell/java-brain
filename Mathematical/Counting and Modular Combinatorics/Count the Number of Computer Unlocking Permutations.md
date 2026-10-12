---
topic: Counting and Modular Combinatorics
pattern: [Observation, Factorial]
source: LeetCode 3577
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count the Number of Computer Unlocking Permutations

> [!TIP]
> **🧠 Memory hook**
> If computer 0 is **strictly the smallest**, it can unlock every other directly, so any order works: **(n − 1)!**. Otherwise 0.
> **Mantra: any c[i] ≤ c[0] → 0 · ELSE (n − 1)!**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=6) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
Computer 0 starts unlocked. Computer i can be unlocked by an already unlocked j < i with complexity[j] < complexity[i]. Count the permutations of 0..n−1 (starting with 0) that unlock all computers in that order, mod 1e9+7.

## Key insight
A computer whose complexity is ≤ complexity[0] could only be unlocked through something smaller than it, and the smallest such one has nobody, so the answer is 0. Otherwise 0 alone unlocks everything, and the other n − 1 can come in any order.

## Approach: Check + factorial
```java
// Computer 0 must be strictly the simplest; then it unlocks everything in any order: (n - 1)!
public int countPermutations(int[] complexity) {
    long MOD = 1_000_000_007, ways = 1;
    for (int i = 1; i < complexity.length; i++) {
        if (complexity[i] <= complexity[0]) return 0;
        ways = ways * i % MOD;
    }
    return (int) ways;
}
```

| Approach | Time | Space |
|---|---|---|
| Check + factorial | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why ≤ and not <?</summary>

Unlocking needs a strictly smaller complexity.

</details>


<details><summary>Why any order afterwards?</summary>

Computer 0 is always available and smaller than everyone.

</details>


## Connected
- [Count Good Numbers](Count%20Good%20Numbers.md)
