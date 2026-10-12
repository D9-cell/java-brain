---
topic: Numbers as Strings
pattern: [Stack, Reverse D runs]
source: LeetCode 2375
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Construct Smallest Number From DI String

> [!TIP]
> **🧠 Memory hook**
> Write 1, 2, 3, … in order, but **reverse every run that ends in D**: push digits, flush the stack at each **I** and at the end.
> **Mantra: push i+1 · at I or end: append stack reversed**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=9) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
pattern has I (increase) and D (decrease). Return the lexicographically smallest number of length n + 1 using distinct digits 1..9 that follows the pattern.

## Key insight
Starting from the sorted order is smallest. A block of k Ds needs k + 1 decreasing digits; reversing the smallest available block gives the smallest such run.

## Approach: Stack flush
```java
// Push digits on a stack and flush it at every I and at the end, which reverses each D run
public String smallestNumber(String pattern) {
    StringBuilder sb = new StringBuilder(), stack = new StringBuilder();
    for (int i = 0; i <= pattern.length(); i++) {
        stack.append((char) ('1' + i));
        if (i == pattern.length() || pattern.charAt(i) == 'I') {
            sb.append(stack.reverse());
            stack.setLength(0);
        }
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Stack flush | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>"IIIDIDDD"?</summary>

123549876.

</details>


<details><summary>Why flush on I?</summary>

Everything before it can be finalized; the next digit must be bigger.

</details>


## Connected
- [Next Greater Element III](Next%20Greater%20Element%20III.md)
