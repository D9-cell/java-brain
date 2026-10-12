---
topic: Subsequences Stacks and Greedy
pattern: [Backward scan, Skip counter]
source: LeetCode 844
difficulty: Easy
companies: [Google, Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Backspace String Compare

> [!TIP]
> **🧠 Memory hook**
> Read **from the end**: a # adds a pending skip, a letter is eaten while skips remain. Compare the surviving letters one by one.
> **Mantra: nextKept(i): # → skip++ · letter with skip → skip−− · compare survivors**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=3) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
In s and t, # is a backspace. Return true if both type the same text.

## Key insight
A backspace only affects letters before it, so scanning backwards knows immediately whether a letter survives. That avoids building the typed strings.

## Approach: Two backward pointers
```java
// Walk both strings from the end, skipping characters erased by later #s
public boolean backspaceCompare(String s, String t) {
    int i = s.length() - 1, j = t.length() - 1;
    while (true) {
        i = nextKept(s, i);
        j = nextKept(t, j);
        if (i < 0 || j < 0) return i < 0 && j < 0;
        if (s.charAt(i) != t.charAt(j)) return false;
        i--;
        j--;
    }
}

// Index of the next surviving character at or before i, or -1
int nextKept(String s, int i) {
    int skip = 0;
    while (i >= 0) {
        if (s.charAt(i) == '#') skip++;
        else if (skip > 0) skip--;
        else break;
        i--;
    }
    return i;
}
```

| Approach | Time | Space |
|---|---|---|
| Two backward pointers | O(n + m) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Stack version?</summary>

Build both typed strings with a stack, O(n) space.

</details>


<details><summary>Backspace on empty text?</summary>

It does nothing; the skip just runs out.

</details>


## Connected
- [Make The String Great](Make%20The%20String%20Great.md)
