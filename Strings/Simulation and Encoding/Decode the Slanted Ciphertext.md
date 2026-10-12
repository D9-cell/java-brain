---
topic: Simulation and Encoding
pattern: [Grid indexing, Diagonals]
source: LeetCode 2075
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Decode the Slanted Ciphertext

> [!TIP]
> **🧠 Memory hook**
> The text was written along **diagonals** of a rows × cols grid. Read diagonals from each column of row 0, then **trim trailing spaces**.
> **Mantra: cols = n / rows · FOR start col: (r, c) += (1, 1) · trim end**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=6) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
originalText was written diagonally into a matrix with a fixed number of rows (padding with spaces), then read row by row into encodedText. Recover originalText (it has no trailing spaces).

## Key insight
Cell (r, c) is encodedText[r · cols + c]. The original order visits diagonals starting at (0, 0), (0, 1), …; padding spaces end up at the tail.

## Approach: Read diagonals
```java
// Read diagonals of the rows x cols grid, starting at each column of row 0, then trim trailing spaces
public String decodeCiphertext(String encodedText, int rows) {
    int n = encodedText.length(), cols = n / rows;
    StringBuilder sb = new StringBuilder();
    for (int start = 0; start < cols; start++)
        for (int r = 0, c = start; r < rows && c < cols; r++, c++) sb.append(encodedText.charAt(r * cols + c));
    int end = sb.length();
    while (end > 0 && sb.charAt(end - 1) == ' ') end--;
    return sb.substring(0, end);
}
```

| Approach | Time | Space |
|---|---|---|
| Read diagonals | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against the four LeetCode samples.

## Recall before you reveal
<details><summary>Why trim?</summary>

The grid was padded with spaces after the text ended.

</details>


<details><summary>Why does each diagonal start in row 0?</summary>

Writing moved down-right and wrapped to a new column at the top.

</details>


## Connected
- [Shifting Letters](Shifting%20Letters.md)
