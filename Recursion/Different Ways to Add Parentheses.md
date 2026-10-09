---
topic: Recursion
pattern: [Divide and conquer]
source: LeetCode 241
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Different Ways to Add Parentheses

> [!TIP]
> **🧠 Memory hook**
> Each operator takes a turn as the last operation; both sides list their possible values independently.
> **Mantra: SPLIT AT EACH OP, COMBINE ALL L × R**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=13) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Return all possible results from computing the expression with different groupings.

## Key insight
For each operator: all results of the left part × all results of the right part.

## Approach: Recursion
```java
// Every operator can be the LAST one applied: combine all results of its left and right sides
public List<Integer> diffWaysToCompute(String s) {
    List<Integer> res = new ArrayList<>();
    for (int i = 0; i < s.length(); i++) {
        char op = s.charAt(i);
        if (op != '+' && op != '-' && op != '*') continue;
        List<Integer> left = diffWaysToCompute(s.substring(0, i)), right = diffWaysToCompute(s.substring(i + 1));
        for (int x : left)
            for (int y : right) res.add(op == '+' ? x + y : op == '-' ? x - y : x * y);
    }
    if (res.isEmpty()) res.add(Integer.parseInt(s));
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion | Catalan-number many results | O(results) |

## Recall before you reveal
<details><summary>Memo key?</summary>

The substring (or (l, r) indices).

</details>


## Connected
- Matrix-chain style DP: the DP folder
