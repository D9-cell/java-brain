---
topic: Pattern Matching
pattern: [Doubling trick]
source: LeetCode 796
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Rotate String

> [!TIP]
> **🧠 Memory hook**
> Every rotation of s is a **substring of s + s**. Check lengths, then containment.
> **Mantra: |s| == |goal| && (s + s).contains(goal)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Pattern%20Matching/Pattern%20Matching%20Animations.html#p=3) · **Pattern hub:** [Pattern Matching - Pattern Map](Pattern%20Matching%20-%20Pattern%20Map.md)

## Problem
Return true if s can become goal after some number of left rotations.

## Key insight
Rotating by k reads s from index k to the end and then from the start, which is exactly s + s from k to k + n.

## Approach: Doubling
```java
// Every rotation of s is a substring of s + s
public boolean rotateString(String s, String goal) {
    return s.length() == goal.length() && (s + s).contains(goal);
}
```

| Approach | Time | Space |
|---|---|---|
| Doubling | O(n) with KMP, O(n²) with contains | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why compare lengths?</summary>

"a" is in "aa" + … but "a" is not a rotation of "aa".

</details>


<details><summary>Linear guarantee?</summary>

Use KMP for the containment check.

</details>


## Connected
- [Repeated Substring Pattern](Repeated%20Substring%20Pattern.md)
- [Reverse Words in a String II](../Words%20Parsing%20and%20Formatting/Reverse%20Words%20in%20a%20String%20II.md)
