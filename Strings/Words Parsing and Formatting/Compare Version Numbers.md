---
topic: Words Parsing and Formatting
pattern: [Parse numbers, Two pointers]
source: LeetCode 165
difficulty: Medium
companies: [Apple, Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Compare Version Numbers

> [!TIP]
> **🧠 Memory hook**
> Read one revision from each side as a **number** (leading zeros vanish). A missing revision is **0**.
> **Mantra: parse until "." on both sides · differ → ±1 · end → 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=9) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Compare two version strings like "1.01" and "1.001.0". Return -1, 0 or 1.

## Key insight
Parsing digit by digit ignores leading zeros. Running until both strings are exhausted, with a side that has ended contributing 0, handles different lengths.

## Approach: Parse in place
```java
// Parse one revision at a time from both strings; a missing revision counts as 0
public int compareVersion(String version1, String version2) {
    int i = 0, j = 0;
    while (i < version1.length() || j < version2.length()) {
        int a = 0, b = 0;
        while (i < version1.length() && version1.charAt(i) != '.') a = a * 10 + (version1.charAt(i++) - '0');
        while (j < version2.length() && version2.charAt(j) != '.') b = b * 10 + (version2.charAt(j++) - '0');
        if (a != b) return a < b ? -1 : 1;
        i++;
        j++;
    }
    return 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Parse in place | O(n + m) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Is 1.0 equal to 1?</summary>

Yes, the missing revision is 0.

</details>


<details><summary>Why not split?</summary>

It works too, but the in-place parse needs no arrays.

</details>


## Connected
- [Restore IP Addresses](Restore%20IP%20Addresses.md)
