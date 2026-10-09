---
topic: Graph Basics
pattern: [BFS on numbers]
source: GfG
difficulty: Medium
companies: [Amazon, Google, Microsoft, Directi]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Jumping Numbers

> [!TIP]
> **🧠 Memory hook**
> Build numbers like a tree: each number sprouts at most two children, last digit minus one and plus one.
> **Mantra: APPEND last ± 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=18) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Print all jumping numbers (adjacent digits differ by 1) up to x.

## Key insight
Every jumping number is a one-digit start followed by "last digit ± 1" appended repeatedly: a BFS over a tree of numbers, stopping when a number exceeds x.

## Approach 1: BFS per start digit
```java
// BFS from each digit 1..9 (long so the next number cannot overflow), then sort across start digits
public List<Integer> jumpingBfs(int x) {
    List<Integer> result = new ArrayList<>();
    result.add(0);
    for (int start = 1; start <= 9 && start <= x; start++) {
        Queue<Long> que = new ArrayDeque<>();
        que.add((long) start);
        while (!que.isEmpty()) {
            long num = que.poll();
            if (num > x) continue;
            result.add((int) num);
            int last = (int) (num % 10);
            if (last > 0) que.add(num * 10 + last - 1);
            if (last < 9) que.add(num * 10 + last + 1);
        }
    }
    Collections.sort(result);
    return result;
}
```

## Approach 2: DFS into a TreeSet
```java
// DFS into a TreeSet so the numbers come out already sorted
public List<Integer> jumpingDfs(int x) {
    TreeSet<Integer> set = new TreeSet<>();
    set.add(0);
    for (int d = 1; d <= 9; d++) dfs(d, x, set);
    return new ArrayList<>(set);
}

// Adds num if it fits, then extends it with last digit ± 1 (long avoids overflow near the limit)
private void dfs(long num, int x, Set<Integer> set) {
    if (num > x) return;
    set.add((int) num);
    int last = (int) (num % 10);
    if (last > 0) dfs(num * 10 + last - 1, x, set);
    if (last < 9) dfs(num * 10 + last + 1, x, set);
}
```

| Approach | Time | Space |
|---|---|---|
| BFS per start digit | O(count of results) | O(count) |
| DFS into a TreeSet | O(count log count) | O(count) |

> [!WARNING]
> **Java gotcha**
> Use `long` inside the loop: `num * 10 + d` overflows `int` for large x.

## Recall before you reveal
<details><summary>Why sort at the end of the BFS version?</summary>

Each start digit is sorted, but 12 comes after 10 and before 2 only after merging all starts.

</details>


<details><summary>Overflow?</summary>

Appending a digit to a number near 2^31 overflows int; use long.

</details>


## Connected
- [BFS Traversal](BFS%20Traversal.md)
