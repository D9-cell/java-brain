---
topic: Sliding Window
pattern: [Fixed window, Circular]
source: LeetCode 1652
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Defuse the Bomb

> [!TIP]
> **🧠 Memory hook**
> A window riding around the circle, one step ahead (k > 0) or behind (k < 0).
> **Mantra: START [1..k] OR [n+k..n−1], SLIDE BOTH ENDS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=56) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Replace each code[i] by the sum of the next k numbers (k > 0), the previous |k| (k < 0), or 0.

## Key insight
One window of |k| moves around the circle with i and j both stepping forward.

## Approach 1: Brute force
```java
// Sums |k| neighbours directly for each position
public int[] decryptBrute(int[] code, int k) {
    int n = code.length;
    int[] result = new int[n];
    if (k == 0) return result;
    for (int i = 0; i < n; i++) {
        if (k > 0) for (int j = i + 1; j <= i + k; j++) result[i] += code[j % n];
        else for (int j = i + k; j < i; j++) result[i] += code[(j + n) % n];
    }
    return result;
}
```

## Approach 2: Circular window
```java
// One window of |k| (after i for k > 0, before i for k < 0) slides around the circle
public int[] decrypt(int[] code, int k) {
    int n = code.length;
    int[] result = new int[n];
    if (k == 0) return result;
    int i = k > 0 ? 1 : n + k, j = k > 0 ? k : n - 1, sum = 0;
    for (int p = i; p <= j; p++) sum += code[p];
    for (int t = 0; t < n; t++) {
        result[t] = sum;
        sum -= code[i++ % n];
        sum += code[++j % n];
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n · |k|) | O(1) |
| Circular window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on random codes.

## Recall before you reveal
<details><summary>k < 0 start?</summary>

Window [n + k .. n − 1] for index 0.

</details>

