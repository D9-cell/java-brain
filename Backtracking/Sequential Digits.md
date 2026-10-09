---
topic: Backtracking
pattern: [Enumeration]
source: LeetCode 1291
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Sequential Digits

> [!TIP]
> **🧠 Memory hook**
> Slide a window over 123456789.
> **Mantra: WINDOWS OF "123456789"**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=26) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All numbers in [low, high] whose digits increase by 1.

## Key insight
Every such number is a substring of "123456789".

## Approach 1: BFS / backtracking
```java
// Approach 1: BFS/backtracking from each start digit, appending last+1
public List<Integer> sequentialDigitsBfs(int low, int high) {
    List<Integer> res = new ArrayList<>();
    Deque<Integer> q = new ArrayDeque<>();
    for (int d = 1; d <= 9; d++) q.offer(d);
    while (!q.isEmpty()) {
        int x = q.poll();
        if (x >= low && x <= high) res.add(x);
        int last = x % 10;
        if (last < 9 && x <= high / 10) q.offer(x * 10 + last + 1);
    }
    return res;
}
```

## Approach 2: Windows
```java
// Approach 2: every answer is a window of "123456789"; try each length and start
public List<Integer> sequentialDigits(int low, int high) {
    String s = "123456789";
    List<Integer> res = new ArrayList<>();
    for (int len = String.valueOf(low).length(); len <= String.valueOf(high).length(); len++)
        for (int st = 0; st + len <= 9; st++) {
            int v = Integer.parseInt(s.substring(st, st + len));
            if (v >= low && v <= high) res.add(v);
        }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS / backtracking | O(36) | O(1) |
| Windows | O(36) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both match a direct scan of 10..99999.

## Recall before you reveal
<details><summary>How many exist?</summary>

36.

</details>

