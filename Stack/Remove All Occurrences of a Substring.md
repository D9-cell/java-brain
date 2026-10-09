---
topic: Stack
pattern: [Stack with suffix check]
source: LeetCode 1910
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Remove All Occurrences of a Substring

> [!TIP]
> **🧠 Memory hook**
> After each letter, check if the tail spells part.
> **Mantra: PUSH, TAIL == part → CUT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=25) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Remove the leftmost occurrence of part repeatedly.

## Key insight
Build the result as a stack; whenever it ends with part, cut it.

## Approach 1: Brute force
```java
// Approach 1: find the leftmost occurrence and cut it out, repeat
public String removeOccurrencesBrute(String s, String part) {
    int i;
    while ((i = s.indexOf(part)) != -1) s = s.substring(0, i) + s.substring(i + part.length());
    return s;
}
```

## Approach 2: Stack
```java
// Approach 2: StringBuilder as a stack; after each push, if the top ends with part, pop it
public String removeOccurrences(String s, String part) {
    StringBuilder st = new StringBuilder();
    int m = part.length();
    for (char c : s.toCharArray()) {
        st.append(c);
        if (st.length() >= m && st.substring(st.length() - m).equals(part)) st.setLength(st.length() - m);
    }
    return st.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n²/m) | O(n) |
| Stack | O(n·m) | O(n) |

> [!WARNING]
> **Java gotcha**
> Stack and brute versions agree on random inputs.

## Recall before you reveal
<details><summary>Linear?</summary>

Store the KMP state per position.

</details>

