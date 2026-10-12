---
topic: Subsequences Stacks and Greedy
pattern: [Memo DP, Keep one letter]
source: LeetCode 1531
difficulty: Hard
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# String Compression II

> [!TIP]
> **🧠 Memory hook**
> dp(i, k): best length of s[i..] with k deletions. Either **delete s[i]**, or **keep a run of s[i]'s letter**: scan j, deleting the other letters on the way.
> **Mantra: dp = min(dp(i+1, k−1), FOR j: enc(same) + dp(j+1, k − diff))**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=14) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Delete at most k characters from s so its run-length encoding (letter + count when count > 1) is as short as possible. Return that length.

## Key insight
If s[i] is kept, it starts a run of its letter; the run may jump over other letters by deleting them. Encoded length is 1, 2, 3 or 4 depending on the run size (1, 2–9, 10–99, 100).

## Approach: Top-down DP
```java
// dp(i, k): shortest encoding of s[i..] with k deletions left; keep a run of one letter starting at i or delete s[i]
public int getLengthOfOptimalCompression(String s, int k) {
    this.s = s;
    memo = new int[s.length()][k + 1];
    for (int[] row : memo) Arrays.fill(row, -1);
    return dp(0, k);
}

// Best length for the suffix from i with k deletions allowed
int dp(int i, int k) {
    if (k < 0) return 1 << 20;
    if (s.length() - i <= k) return 0;
    if (memo[i][k] != -1) return memo[i][k];
    int best = dp(i + 1, k - 1), same = 0, diff = 0;
    for (int j = i; j < s.length() && diff <= k; j++) {
        if (s.charAt(j) == s.charAt(i)) same++;
        else diff++;
        best = Math.min(best, encoded(same) + dp(j + 1, k - diff));
    }
    return memo[i][k] = best;
}

// Length of "c" plus its count: 1, 2, 3 or 4 characters
int encoded(int run) {
    return run == 1 ? 1 : run < 10 ? 2 : run < 100 ? 3 : 4;
}
```

| Approach | Time | Space |
|---|---|---|
| Top-down DP | O(n² · k) | O(n · k) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does the run absorb other letters?</summary>

Deleting them merges more copies into one run.

</details>


<details><summary>Base case?</summary>

If the rest fits in k deletions, delete it all: length 0.

</details>


## Connected
- [String Compression](../Simulation%20and%20Encoding/String%20Compression.md)
