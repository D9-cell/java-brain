---
topic: Numbers as Strings
pattern: [Diagonal argument]
source: LeetCode 1980
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find Unique Binary String

> [!TIP]
> **🧠 Memory hook**
> **Flip the i-th bit of the i-th string**. The result differs from every string in at least one place.
> **Mantra: ans[i] = nums[i][i] == '0' ? '1' : '0'**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=11) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
nums holds n distinct binary strings of length n. Return any binary string of length n that is not in nums.

## Key insight
Cantor's diagonal argument: the answer differs from nums[i] at position i, so it cannot equal any of them.

## Approach: Diagonal flip
```java
// Cantor diagonal: differ from the i-th string at position i
public String findDifferentBinaryString(String[] nums) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < nums.length; i++) sb.append(nums[i].charAt(i) == '0' ? '1' : '0');
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Diagonal flip | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why exactly n strings of length n?</summary>

There is one diagonal position per string.

</details>


<details><summary>Alternative?</summary>

Put the values in a set and try 0..n.

</details>


## Connected
- [Gray Code](../../Bit_Magic/Gray%20Code.md)
