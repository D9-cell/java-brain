---
topic: Stack
pattern: [Simulation]
source: LeetCode 1441
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Build an Array With Stack Operations

> [!TIP]
> **🧠 Memory hook**
> A conveyor belt: grab every number, throw away unwanted ones at once.
> **Mantra: PUSH ALL, POP UNWANTED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=3) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Operations (Push/Pop) that turn the stream 1..n into target.

## Key insight
Walk the stream up to target's last value: push everything, immediately pop the numbers not in target.

## Approach: Two pointers
```java
// Walk 1..target[last]: every number is pushed; numbers not in target are popped right away
public List<String> buildArray(int[] target, int n) {
    List<String> ops = new ArrayList<>();
    int cur = 1;
    for (int t : target) {
        while (cur < t) { ops.add("Push"); ops.add("Pop"); cur++; }
        ops.add("Push");
        cur++;
    }
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Two pointers | O(max target) | O(1) extra |

## Recall before you reveal
<details><summary>Stop when?</summary>

After the last target value.

</details>

