---
topic: Backtracking
pattern: [Merge-two backtracking]
source: LeetCode 679
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# 24 Game

> [!TIP]
> **🧠 Memory hook**
> A blender: throw two numbers in with an operator until one is left.
> **Mantra: MERGE TWO, ALL OPS, RECURSE, UNDO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=0) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Can four cards (1–9) make 24 with + − × ÷ and parentheses?

## Key insight
Any expression tree = repeatedly replacing two numbers by their result. Try every ordered pair and operator.

## Approach: Merge backtracking
```java
// Pick any two numbers, replace them by every result of +, -, *, /, recurse until one number is left
private boolean solve(List<Double> nums) {
    if (nums.size() == 1) return Math.abs(nums.get(0) - 24) < 1e-6;
    for (int i = 0; i < nums.size(); i++)
        for (int j = 0; j < nums.size(); j++) {
            if (i == j) continue;
            double a = nums.get(i), b = nums.get(j);
            List<Double> rest = new ArrayList<>();
            for (int k = 0; k < nums.size(); k++) if (k != i && k != j) rest.add(nums.get(k));
            List<Double> options = new ArrayList<>(List.of(a + b, a - b, a * b));
            if (Math.abs(b) > 1e-9) options.add(a / b);
            for (double v : options) {
                rest.add(v);
                if (solve(rest)) return true;
                rest.remove(rest.size() - 1);
            }
        }
    return false;
}

// Entry point
public boolean judgePoint24(int[] cards) {
    List<Double> l = new ArrayList<>();
    for (int c : cards) l.add((double) c);
    return solve(l);
}
```

| Approach | Time | Space |
|---|---|---|
| Merge backtracking | constant (4 cards) | O(1) |

## Recall before you reveal
<details><summary>Why doubles + epsilon?</summary>

Fractions such as 8/(3 − 8/3).

</details>

