---
topic: Binary Strings and Substring Counting
pattern: [Invariant, Two pointers]
source: LeetCode 2337
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Move Pieces to Obtain a String

> [!TIP]
> **🧠 Memory hook**
> Pieces never pass each other, so the **order of L and R must match**. Each L can only go **left** (i ≥ j), each R only **right** (i ≤ j).
> **Mantra: skip _ on both · same piece · L: i ≥ j · R: i ≤ j**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=20) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
start and target contain L, R and _. An L moves left into a blank, an R moves right into a blank. Return true if start can become target.

## Key insight
Match the k-th piece of start with the k-th piece of target. The directions bound where each can end up, and blanks between them make any such move reachable.

## Approach: Two pointers
```java
// Same pieces in the same order; L may only move left, R only right
public boolean canChange(String start, String target) {
    int n = start.length(), i = 0, j = 0;
    while (true) {
        while (i < n && start.charAt(i) == '_') i++;
        while (j < n && target.charAt(j) == '_') j++;
        if (i == n || j == n) return i == n && j == n;
        if (start.charAt(i) != target.charAt(j)) return false;
        if (start.charAt(i) == 'L' && i < j) return false;
        if (start.charAt(i) == 'R' && i > j) return false;
        i++;
        j++;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Two pointers | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why can pieces not pass?</summary>

They only move into blanks, one cell at a time.

</details>


<details><summary>Both pointers at the end?</summary>

All pieces matched.

</details>


## Connected
- [Count Collisions on a Road](Count%20Collisions%20on%20a%20Road.md)
