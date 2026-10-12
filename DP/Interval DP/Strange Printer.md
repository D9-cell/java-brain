---
topic: Interval DP
pattern: [Merge with an equal partner, Interval by length]
source: LeetCode 664
difficulty: Hard
companies: [NetEase]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Strange Printer

> [!TIP]
> **🧠 Memory hook**
> The first letter may **share its stroke** with a later equal letter; whatever lies between is printed over it.
> **Mantra: dp[i][j] = min(1 + dp[i+1][j], dp[i+1][k−1] + dp[k][j]) FOR s[k] = s[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=6) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
A printer prints a run of one letter per turn and can overprint. Return the minimum turns to print s.

## Key insight
First collapse equal neighbours. For the range i..j the first letter either gets its own turn (1 + the rest) or one stroke also covers a later equal letter k, so the inside (i+1..k−1) is printed on top and the rest starts at k.

## Approach: Interval DP
```java
// dp[i][j] = fewest turns for t[i..j]; t[i] gets its own turn or shares one stroke with a later equal letter t[k]
public int strangePrinter(String s) {
    StringBuilder sb = new StringBuilder();
    for (char c : s.toCharArray()) if (sb.length() == 0 || sb.charAt(sb.length() - 1) != c) sb.append(c);
    String t = sb.toString();
    int n = t.length();
    int[][] dp = new int[n + 1][n + 1];
    for (int i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (int j = i + 1; j < n; j++) {
            dp[i][j] = 1 + dp[i + 1][j];
            for (int k = i + 2; k <= j; k++)
                if (t.charAt(k) == t.charAt(i)) dp[i][j] = Math.min(dp[i][j], dp[i + 1][k - 1] + dp[k][j]);
        }
    }
    return n == 0 ? 0 : dp[0][n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Interval DP | O(n³) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why collapse duplicates first?</summary>

Adjacent equal letters never cost extra turns.

</details>


<details><summary>Why does the inside cost dp[i+1][k−1]?</summary>

The long stroke is painted first, then the inside overwrites it.

</details>


## Connected
- [Remove Boxes](Remove%20Boxes.md)
- [Burst Balloons](Burst%20Balloons.md)
