---
topic: Numbers as Strings
pattern: [Greedy digits, Last occurrence]
source: LeetCode 670
difficulty: Medium
companies: [Meta, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Maximum Swap

> [!TIP]
> **🧠 Memory hook**
> Find the **first digit** that has a **bigger digit later**. Swap it with the **last copy** of the biggest such digit.
> **Mantra: last[d] = last index · FOR i: FOR k = 9 > d[i]: last[k] > i → swap, done**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=5) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
Swap at most two digits of num once to get the maximum value.

## Key insight
The leftmost position that can be improved matters most. Among bigger digits to its right take the largest, and its last occurrence so a smaller digit moves as far right as possible.

## Approach: Last index table
```java
// Swap the first digit that has a larger digit later with the last copy of the largest such digit
public int maximumSwap(int num) {
    char[] d = String.valueOf(num).toCharArray();
    int[] last = new int[10];
    for (int i = 0; i < d.length; i++) last[d[i] - '0'] = i;
    for (int i = 0; i < d.length; i++)
        for (int k = 9; k > d[i] - '0'; k--)
            if (last[k] > i) {
                char t = d[i];
                d[i] = d[last[k]];
                d[last[k]] = t;
                return Integer.parseInt(new String(d));
            }
    return num;
}
```

| Approach | Time | Space |
|---|---|---|
| Last index table | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the last copy?</summary>

1993 → swap with the second 9: 9913 beats 9193.

</details>


<details><summary>No improvement?</summary>

Digits are non-increasing; return num.

</details>


## Connected
- [Next Greater Element III](Next%20Greater%20Element%20III.md)
