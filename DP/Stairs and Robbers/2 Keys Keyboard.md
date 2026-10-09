---
topic: Stairs and Robbers
pattern: [Divisors, Prime factors]
source: LeetCode 650
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# 2 Keys Keyboard

> [!TIP]
> **🧠 Memory hook**
> Copy All, then paste: reaching `i` from a divisor `d` costs `i / d` operations.
> **Mantra: dp[i] = min over divisors d of dp[d] + i / d**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=9) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Start with one `A`. In each step Copy All or Paste. Return the minimum steps to get exactly n `A`s.

## Key insight
To end at i letters, the last copy happened when the screen had d letters (d divides i) and then it was pasted `i/d − 1` times: `1 + (i/d − 1) = i/d` steps. The total equals the sum of the prime factors of n.

## Approach 1: DP over divisors
```java
// Once the clipboard holds a block, every paste adds it. dp[i] = min over divisors d of i of dp[d] + i / d (copy d letters, paste i/d - 1 times)
public int minSteps(int n) {
    int[] dp = new int[n + 1];
    for (int i = 2; i <= n; i++) {
        dp[i] = i;
        for (int d = 2; d < i; d++) if (i % d == 0) dp[i] = Math.min(dp[i], dp[d] + i / d);
    }
    return dp[n];
}
```

## Approach 2: Prime factors
```java
// The answer is the sum of the prime factors of n
public int minStepsPrimes(int n) {
    int sum = 0;
    for (int p = 2; n > 1; p++) while (n % p == 0) { sum += p; n /= p; }
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| DP over divisors | O(n²) | O(n) |
| Prime factors | O(√n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why the sum of prime factors?</summary>

Splitting a composite factor into smaller ones never increases the sum a + b ≤ a · b for a, b ≥ 2.

</details>


## Connected
- [4 Keys Keyboard](4%20Keys%20Keyboard.md)
