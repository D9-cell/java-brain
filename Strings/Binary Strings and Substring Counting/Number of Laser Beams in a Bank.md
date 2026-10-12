---
topic: Binary Strings and Substring Counting
pattern: [Running count]
source: LeetCode 2125
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Number of Laser Beams in a Bank

> [!TIP]
> **🧠 Memory hook**
> Beams join **consecutive non-empty rows**: add **prev × cur** and skip empty rows.
> **Mantra: cur = devices in row · cur > 0 → total += prev · cur, prev = cur**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=10) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
Each row is a binary string of security devices. Beams connect every device in one non-empty row to every device in the next non-empty row. Count beams.

## Key insight
Empty rows are transparent, so only the last non-empty row matters.

## Approach: Previous non-empty row
```java
// Beams join consecutive non-empty rows: add prev * cur
public int numberOfBeams(String[] bank) {
    int prev = 0, total = 0;
    for (String row : bank) {
        int cur = 0;
        for (char c : row.toCharArray()) if (c == '1') cur++;
        if (cur == 0) continue;
        total += prev * cur;
        prev = cur;
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Previous non-empty row | O(cells) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why skip empty rows?</summary>

They do not block or create beams.

</details>


<details><summary>Rows 3, 0, 2, 1?</summary>

3·2 + 2·1 = 8.

</details>


## Connected
- [Separate Black and White Balls](Separate%20Black%20and%20White%20Balls.md)
