---
topic: Stack
pattern: [Matching with wildcards]
source: LeetCode 2116
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Check if a Parentheses String Can Be Valid

> [!TIP]
> **🧠 Memory hook**
> Unlocked characters are jokers: check both directions.
> **Mantra: TWO SWEEPS WITH JOKERS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=4) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Can the unlocked positions be changed so s becomes valid?

## Key insight
Even length is required. Left→right: jokers count as "(" and the balance must never drop below 0. Right→left: jokers count as ")" and likewise.

## Approach 1: Index stacks
```java
// Approach 1: stacks of indices for locked '(' and for free positions; match ')' with '(' first, then free; finally pair '(' with a later free
public boolean canBeValidStack(String s, String locked) {
    if (s.length() % 2 == 1) return false;
    Deque<Integer> open = new ArrayDeque<>(), free = new ArrayDeque<>();
    for (int i = 0; i < s.length(); i++) {
        if (locked.charAt(i) == '0') free.push(i);
        else if (s.charAt(i) == '(') open.push(i);
        else if (!open.isEmpty()) open.pop();
        else if (!free.isEmpty()) free.pop();
        else return false;
    }
    while (!open.isEmpty() && !free.isEmpty() && open.peek() < free.peek()) { open.pop(); free.pop(); }
    return open.isEmpty();
}
```

## Approach 2: Two sweeps
```java
// Approach 2: left-to-right, too many ')' cannot be fixed; right-to-left, too many '(' cannot be fixed
public boolean canBeValid(String s, String locked) {
    int n = s.length();
    if (n % 2 == 1) return false;
    int bal = 0;
    for (int i = 0; i < n; i++) { bal += (locked.charAt(i) == '0' || s.charAt(i) == '(') ? 1 : -1; if (bal < 0) return false; }
    bal = 0;
    for (int i = n - 1; i >= 0; i--) { bal += (locked.charAt(i) == '0' || s.charAt(i) == ')') ? 1 : -1; if (bal < 0) return false; }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Index stacks | O(n) | O(n) |
| Two sweeps | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both approaches verified against trying every assignment of the free positions.

## Recall before you reveal
<details><summary>Final stack check?</summary>

Every remaining locked "(" needs a joker after it.

</details>

