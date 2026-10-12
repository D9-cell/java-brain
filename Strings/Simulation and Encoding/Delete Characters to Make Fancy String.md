---
topic: Simulation and Encoding
pattern: [Builder check]
source: LeetCode 1957
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Delete Characters to Make Fancy String

> [!TIP]
> **🧠 Memory hook**
> Append a character unless the **last two already equal it**.
> **Mantra: sb ends with c c → skip · ELSE append**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=12) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
A fancy string has no three consecutive equal characters. Delete the minimum number of characters to make s fancy.

## Key insight
Every run longer than 2 must shrink to 2, and keeping the first two of each run is optimal.

## Approach: Builder
```java
// Skip a character when it would be the third equal in a row
public String makeFancyString(String s) {
    StringBuilder sb = new StringBuilder();
    for (char c : s.toCharArray()) {
        int n = sb.length();
        if (n >= 2 && sb.charAt(n - 1) == c && sb.charAt(n - 2) == c) continue;
        sb.append(c);
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Builder | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why check the builder and not s?</summary>

The builder reflects what was kept.

</details>


<details><summary>Minimum?</summary>

Each run of length L loses exactly L − 2 characters.

</details>


## Connected
- [String Compression](String%20Compression.md)
