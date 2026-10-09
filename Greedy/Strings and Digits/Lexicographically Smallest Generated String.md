---
topic: Strings and Digits
pattern: [Forced windows, Fix the Fs]
source: LeetCode 3474
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Lexicographically Smallest Generated String

> [!TIP]
> **🧠 Memory hook**
> Place `str2` wherever a `T` forces it, fill with `a`, and repair every accidental match of an `F`.
> **Mantra: T WRITES str2, FREE → a, F THAT MATCHES → BUMP THE LAST FREE LETTER TO b**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=3) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
For `str1` of T/F and `str2`, build the lexicographically smallest word of length n + m − 1 where window i equals `str2` exactly when `str1[i] == T`. Return "" if none exists.

## Key insight
Write `str2` at every T (conflicts mean impossible). Fill unforced positions with `a`. For each F whose window equals `str2`, change the rightmost free position inside it to `b` (rightmost keeps the word smallest). If no free position exists the answer is "".

## Approach: Write, fill, repair
```java
// Write str2 at every 'T'; fill the rest with 'a'. For every 'F' that accidentally equals str2, bump the last free position of that window to 'b'
public String generateString(String str1, String str2) {
    int n = str1.length(), m = str2.length(), len = n + m - 1;
    char[] w = new char[len];
    boolean[] free = new boolean[len];
    for (int i = 0; i < n; i++) if (str1.charAt(i) == 'T') {
        for (int j = 0; j < m; j++) {
            if (w[i + j] != 0 && w[i + j] != str2.charAt(j)) return "";
            w[i + j] = str2.charAt(j);
        }
    }
    for (int i = 0; i < len; i++) if (w[i] == 0) { w[i] = 'a'; free[i] = true; }
    for (int i = 0; i < n; i++) if (str1.charAt(i) == 'F' && same(w, str2, i)) {
        boolean changed = false;
        for (int k = i + m - 1; k >= i && !changed; k--) if (free[k]) { w[k] = 'b'; free[k] = false; changed = true; }
        if (!changed) return "";
    }
    return new String(w);
}

// True if the window starting at i equals str2
private boolean same(char[] w, String s2, int i) {
    for (int j = 0; j < s2.length(); j++) if (w[i + j] != s2.charAt(j)) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Write, fill, repair | O(n m) | O(n + m) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why the rightmost free position?</summary>

Changing a later letter makes the string smaller than changing an earlier one.

</details>


## Connected
- [Find the Lexicographically Smallest Valid Sequence](Find%20the%20Lexicographically%20Smallest%20Valid%20Sequence.md)
