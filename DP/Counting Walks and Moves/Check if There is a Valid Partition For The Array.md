---
topic: Counting Walks and Moves
pattern: [Last block argument, Boolean DP]
source: LeetCode 2369
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Check if There is a Valid Partition For The Array

> [!TIP]
> **🧠 Memory hook**
> Read the array as **blocks of 2 or 3**: "xx", "xxx" or "x, x+1, x+2".
> **Mantra: ok[i] = (ok[i−2] AND pair) OR (ok[i−3] AND triple)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=8) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Return true if nums can be cut into contiguous blocks, each being two equal numbers, three equal numbers, or three consecutive increasing numbers.

## Key insight
Like Decode Ways with booleans: the last block is 2 or 3 long, so the prefix of length i is valid if a valid shorter prefix ends right before a valid last block.

## Approach 1: Prefix booleans
```java
// ok[i] = the first i elements can be split into valid blocks
public boolean validPartition(int[] nums) {
    int n = nums.length;
    boolean[] ok = new boolean[n + 1];
    ok[0] = true;
    for (int i = 2; i <= n; i++) {
        if (nums[i - 1] == nums[i - 2] && ok[i - 2]) ok[i] = true;
        if (i >= 3 && ok[i - 3]) {
            int a = nums[i - 3], b = nums[i - 2], c = nums[i - 1];
            if ((a == b && b == c) || (b == a + 1 && c == b + 1)) ok[i] = true;
        }
    }
    return ok[n];
}
```

## Approach 2: Top-down memo
```java
// Top-down: from index i try a 2-block or a 3-block
public boolean validPartitionMemo(int[] nums) {
    return can(nums, 0, new Boolean[nums.length + 1]);
}

// Whether nums[i..] can be split into valid blocks
private boolean can(int[] a, int i, Boolean[] memo) {
    if (i == a.length) return true;
    if (memo[i] != null) return memo[i];
    boolean res = false;
    if (i + 1 < a.length && a[i] == a[i + 1]) res = can(a, i + 2, memo);
    if (!res && i + 2 < a.length && ((a[i] == a[i + 1] && a[i + 1] == a[i + 2]) || (a[i + 1] == a[i] + 1 && a[i + 2] == a[i + 1] + 1)))
        res = can(a, i + 3, memo);
    return memo[i] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix booleans | O(n) | O(n) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Space O(1)?</summary>

Only ok[i−1], ok[i−2], ok[i−3] are read: keep three booleans.

</details>


<details><summary>Why not greedy?</summary>

[4,4,4,5,6] needs "4,4" + "4,5,6", not "4,4,4".

</details>


## Connected
- [Decode Ways](../Stairs%20and%20Robbers/Decode%20Ways.md)
- [Solving Questions With Brainpower](Solving%20Questions%20With%20Brainpower.md)
