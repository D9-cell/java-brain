---
topic: Strings and Digits
pattern: [Runs of zeros, Count ones to the left]
source: LeetCode 3228
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Number of Operations to Move Ones to the End

> [!TIP]
> **🧠 Memory hook**
> Each **block of zeros** is jumped once by every `1` standing to its left.
> **Mantra: AT EACH ZERO BLOCK ADD THE ONES SEEN SO FAR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=12) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
In one operation choose i with `s[i] = 1`, `s[i+1] = 0` and move that 1 to the right until it hits another 1 or the end. Return the maximum number of operations.

## Key insight
Process ones from the right so each one jumps over every zero block exactly once. Scanning left to right, whenever a block of zeros starts, add the number of ones before it.

## Approach 1: Scan
```java
// An operation moves a '1' that is followed by '0' to the right until the next '1' or the end. Move ones one at a time from the right; each group of zeros adds the number of ones to its left
public int maxOperations(String s) {
    int n = s.length(), ones = 0, ops = 0;
    for (int i = 0; i < n; ) {
        if (s.charAt(i) == '0') {
            ops += ones;
            while (i < n && s.charAt(i) == '0') i++;
        } else { ones++; i++; }
    }
    return ops;
}
```

## Approach 2: Zero-block starts
```java
// Count per '0' that has a '1' somewhere before it, but only the first zero of each block of zeros
public int maxOperationsPerBlock(String s) {
    int ones = 0, ops = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == '1') ones++;
        else if (i > 0 && s.charAt(i - 1) == '1') ops += ones;
    }
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Scan | O(n) | O(1) |
| Zero-block starts | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why only the first zero of a block?</summary>

The whole block is crossed in one operation.

</details>


## Connected
- [Maximum Manhattan Distance After K Changes](Maximum%20Manhattan%20Distance%20After%20K%20Changes.md)
