---
topic: Counting Walks and Moves
pattern: [Take and jump, Previous value in the state]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Count digit groupings of a number

> [!TIP]
> **🧠 Memory hook**
> Cut the digit string so the **group sums never go down**.
> **Mantra: STATE (start, previous sum); TRY EVERY NEXT GROUP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=12) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Given a string of digits, count the ways to split it into contiguous groups such that the sum of digits of each group is at least the sum of the group before it.

## Key insight
Choosing the next group only depends on where it starts and the previous group sum (at most 9n). Try every end of the next group and recurse if its sum keeps the order.

## Approach: Memo over (index, previous sum)
```java
// Top-down over (start index, sum of the previous group)
public int totalCount(String str) {
    int n = str.length();
    int[][] memo = new int[n][9 * n + 1];
    for (int[] row : memo) Arrays.fill(row, -1);
    return count(str, 0, 0, memo);
}

// Groupings of str[idx..] whose first group sum is at least prev
private int count(String s, int idx, int prev, int[][] memo) {
    if (idx == s.length()) return 1;
    if (memo[idx][prev] >= 0) return memo[idx][prev];
    int res = 0, cur = 0;
    for (int i = idx; i < s.length(); i++) {
        cur += s.charAt(i) - '0';
        if (cur >= prev) res += count(s, i + 1, cur, memo);
    }
    return memo[idx][prev] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Memo over (index, previous sum) | O(n² · 9n) | O(n · 9n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the previous sum bounded?</summary>

It is a digit sum: at most 9 × length.

</details>


<details><summary>Base case?</summary>

An empty rest counts as one finished grouping.

</details>


## Connected
- [Decode Ways](../Stairs%20and%20Robbers/Decode%20Ways.md)
- [Check if There is a Valid Partition For The Array](Check%20if%20There%20is%20a%20Valid%20Partition%20For%20The%20Array.md)
