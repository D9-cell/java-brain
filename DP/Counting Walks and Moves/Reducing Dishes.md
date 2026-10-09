---
topic: Counting Walks and Moves
pattern: [Sort then take or skip, Suffix greedy]
source: LeetCode 1402
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Reducing Dishes

> [!TIP]
> **🧠 Memory hook**
> Cook the **tastiest dishes last**: adding one more dish at the front shifts every later dish one minute later.
> **Mantra: SORT; ADD SUFFIX SUM WHILE IT STAYS > 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=4) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Each dish has a satisfaction value; cooking it at time t (1, 2, 3, …) earns t × satisfaction. You may discard dishes and choose the order. Return the maximum total.

## Key insight
After sorting, the chosen dishes should be cooked in increasing order. Adding a dish in front raises the total by the sum of everything chosen (each moves one minute later). So walk from the best dish down and keep adding while that suffix sum is positive. The take/skip memo proves the same answer.

## Approach 1: Suffix greedy
```java
// Greedy: add dishes from the best down while the running suffix sum stays positive
public int maxSatisfaction(int[] satisfaction) {
    int[] a = satisfaction.clone();
    Arrays.sort(a);
    int total = 0, suffix = 0;
    for (int i = a.length - 1; i >= 0; i--) {
        suffix += a[i];
        if (suffix <= 0) break;
        total += suffix;
    }
    return total;
}
```

## Approach 2: Top-down take or skip
```java
// Top-down: after sorting, cook dish i at time t or skip it
public int maxSatisfactionMemo(int[] satisfaction) {
    int[] a = satisfaction.clone();
    Arrays.sort(a);
    Integer[][] memo = new Integer[a.length][a.length + 2];
    return best(a, 0, 1, memo);
}

// Best like-time total from dish i onward when the next cooked dish gets time t
private int best(int[] a, int i, int t, Integer[][] memo) {
    if (i == a.length) return 0;
    if (memo[i][t] != null) return memo[i][t];
    return memo[i][t] = Math.max(a[i] * t + best(a, i + 1, t + 1, memo), best(a, i + 1, t, memo));
}
```

| Approach | Time | Space |
|---|---|---|
| Suffix greedy | O(n log n) | O(n) |
| Top-down take or skip | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why ascending order?</summary>

Rearrangement inequality: the largest multiplier goes with the largest value.

</details>


<details><summary>Why stop when the suffix sum is ≤ 0?</summary>

Adding that dish (and any smaller one) can only lower the total.

</details>


## Connected
- [Maximum Alternating Subsequence Sum](Maximum%20Alternating%20Subsequence%20Sum.md)
- [Solving Questions With Brainpower](Solving%20Questions%20With%20Brainpower.md)
