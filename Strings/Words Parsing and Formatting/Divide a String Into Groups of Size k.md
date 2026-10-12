---
topic: Words Parsing and Formatting
pattern: [Chunking]
source: LeetCode 2138
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Divide a String Into Groups of Size k

> [!TIP]
> **🧠 Memory hook**
> **⌈n / k⌉** groups. Index i goes to group i / k; past the end, use **fill**.
> **Mantra: groups = (n + k − 1) / k · i < n ? s[i] : fill**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=5) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Split s into groups of size k; pad the last group with the fill character. Return the groups.

## Key insight
Ceiling division gives the number of groups. Each group reads k positions and substitutes fill beyond the string.

## Approach: Chunk and pad
```java
// Cut every k characters and pad the last group with fill
public String[] divideString(String s, int k, char fill) {
    int groups = (s.length() + k - 1) / k;
    String[] out = new String[groups];
    for (int g = 0; g < groups; g++) {
        StringBuilder sb = new StringBuilder();
        for (int i = g * k; i < (g + 1) * k; i++) sb.append(i < s.length() ? s.charAt(i) : fill);
        out[g] = sb.toString();
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Chunk and pad | O(n + k) | O(n + k) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Ceiling division?</summary>

(n + k − 1) / k.

</details>


<details><summary>How much padding?</summary>

At most k − 1 characters.

</details>


## Connected
- [Adding Spaces to a String](Adding%20Spaces%20to%20a%20String.md)
