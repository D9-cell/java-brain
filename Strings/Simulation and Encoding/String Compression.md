---
topic: Simulation and Encoding
pattern: [Run-length, Read and write pointers]
source: LeetCode 443
difficulty: Medium
companies: [Microsoft, Amazon, Goldman Sachs]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# String Compression

> [!TIP]
> **🧠 Memory hook**
> A **read pointer** finds each run; a **write pointer** stores the letter and, if the run is longer than 1, each digit of its length.
> **Mantra: run [i, j) · chars[w++] = letter · len > 1 → write digits**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=3) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Compress chars in place: each run becomes the letter followed by its length if > 1. Return the new length.

## Key insight
The compressed form is never longer than the input, so writing behind the read pointer never overwrites unread data.

## Approach: Two pointers
```java
// Read pointer finds each run, write pointer stores the letter and its count digits
public int compress(char[] chars) {
    int write = 0, i = 0;
    while (i < chars.length) {
        int j = i;
        while (j < chars.length && chars[j] == chars[i]) j++;
        chars[write++] = chars[i];
        if (j - i > 1)
            for (char d : String.valueOf(j - i).toCharArray()) chars[write++] = d;
        i = j;
    }
    return write;
}
```

| Approach | Time | Space |
|---|---|---|
| Two pointers | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Run of 12?</summary>

Write "a", "1", "2".

</details>


<details><summary>Why is in-place safe?</summary>

Write never passes read.

</details>


## Connected
- [Count and Say](Count%20and%20Say.md)
- [String Compression III](String%20Compression%20III.md)
- [String Compression II](../Subsequences%20Stacks%20and%20Greedy/String%20Compression%20II.md)
