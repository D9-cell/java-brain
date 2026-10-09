---
topic: Grid and BFS
pattern: [Implicit graph, DFS, BFS]
source: LeetCode 967
difficulty: Medium
companies: [Flipkart]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Numbers With Same Consecutive Differences

> [!TIP]
> **🧠 Memory hook**
> Build numbers digit by digit: every prefix sprouts at most two next digits.
> **Mantra: APPEND last ± k; SKIP DUPLICATE WHEN k = 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=22) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Return all n-digit numbers (no leading zero) where each pair of adjacent digits differs by exactly k.

## Key insight
A decision tree: from the last digit d you may append d + k or d − k (if within 0..9). With k = 0 both branches are the same, so only one is taken.

## Approach 1: DFS
```java
// DFS: extend a number digit by digit with last ± k until it has n digits
public int[] numsSameConsecDiffDfs(int n, int k) {
    List<Integer> result = new ArrayList<>();
    for (int first = 1; first <= 9; first++) dfs(first, 1, n, k, result);
    return result.stream().mapToInt(Integer::intValue).toArray();
}

// Appends the allowed next digits to num
private void dfs(int num, int len, int n, int k, List<Integer> result) {
    if (len == n) {
        result.add(num);
        return;
    }
    int last = num % 10;
    if (last + k <= 9) dfs(num * 10 + last + k, len + 1, n, k, result);
    if (k != 0 && last - k >= 0) dfs(num * 10 + last - k, len + 1, n, k, result);
}
```

## Approach 2: BFS by length
```java
// BFS by length: every queued number gets its valid one-digit extensions
public int[] numsSameConsecDiffBfs(int n, int k) {
    Queue<Integer> que = new ArrayDeque<>();
    for (int first = 1; first <= 9; first++) que.add(first);
    for (int len = 1; len < n; len++) {
        for (int size = que.size(); size > 0; size--) {
            int num = que.poll(), last = num % 10;
            if (last + k <= 9) que.add(num * 10 + last + k);
            if (k != 0 && last - k >= 0) que.add(num * 10 + last - k);
        }
    }
    int[] res = new int[que.size()];
    int i = 0;
    for (int v : que) res[i++] = v;
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(9 · 2ⁿ⁻¹) | O(n) |
| BFS by length | O(9 · 2ⁿ⁻¹) | O(9 · 2ⁿ⁻¹) |

## Recall before you reveal
<details><summary>Why guard k == 0?</summary>

Otherwise d + 0 and d − 0 add the same number twice.

</details>


<details><summary>Why start at 1..9?</summary>

No leading zeros (except the number 0 itself, which only n = 1 allows).

</details>


## Connected
- [Jumping Numbers](../Graph%20Basics/Jumping%20Numbers.md)
