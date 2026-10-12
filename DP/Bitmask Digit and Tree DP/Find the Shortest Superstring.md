---
topic: Bitmask Digit and Tree DP
pattern: [TSP on words, Overlap matrix]
source: LeetCode 943
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Find the Shortest Superstring

> [!TIP]
> **🧠 Memory hook**
> Order the words so that **consecutive overlaps are as large as possible**: a travelling-salesman path.
> **Mantra: dp[mask][last] = max over prev of dp[mask minus last][prev] + overlap[prev][last]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Bitmask%20Digit%20and%20Tree%20DP/Bitmask%20Digit%20and%20Tree%20DP%20Animations.html#p=2) · **Pattern hub:** [Bitmask Digit and Tree DP - Pattern Map](Bitmask%20Digit%20and%20Tree%20DP%20-%20Pattern%20Map.md)

## Problem
Return the shortest string that contains every word as a substring (no word is a substring of another).

## Key insight
Precompute overlap[i][j] = longest suffix of i that is a prefix of j. dp[mask][last] is the maximum total overlap of an order of the words in mask ending with last. Track parents to rebuild the order and then append each word without its overlap.

## Approach: Bitmask TSP
```java
// Travelling-salesman over words: dp[mask][last] = largest total overlap of an order of mask ending with word last
public String shortestSuperstring(String[] words) {
    int n = words.length;
    int[][] overlap = new int[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            for (int k = Math.min(words[i].length(), words[j].length()); k >= 0; k--)
                if (words[i].endsWith(words[j].substring(0, k))) {
                    overlap[i][j] = k;
                    break;
                }
        }
    int[][] dp = new int[1 << n][n], parent = new int[1 << n][n];
    for (int[] row : dp) Arrays.fill(row, -1);
    for (int[] row : parent) Arrays.fill(row, -1);
    for (int i = 0; i < n; i++) dp[1 << i][i] = 0;
    for (int mask = 1; mask < (1 << n); mask++)
        for (int last = 0; last < n; last++) {
            if (dp[mask][last] < 0) continue;
            for (int next = 0; next < n; next++) {
                if ((mask >> next & 1) == 1) continue;
                int nm = mask | (1 << next), val = dp[mask][last] + overlap[last][next];
                if (val > dp[nm][next]) {
                    dp[nm][next] = val;
                    parent[nm][next] = last;
                }
            }
        }
    int full = (1 << n) - 1, last = 0;
    for (int i = 1; i < n; i++) if (dp[full][i] > dp[full][last]) last = i;
    LinkedList<Integer> order = new LinkedList<>();
    for (int mask = full, cur = last; cur >= 0; ) {
        order.addFirst(cur);
        int p = parent[mask][cur];
        mask ^= 1 << cur;
        cur = p;
    }
    StringBuilder sb = new StringBuilder(words[order.getFirst()]);
    for (int t = 1; t < order.size(); t++) sb.append(words[order.get(t)].substring(overlap[order.get(t - 1)][order.get(t)]));
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Bitmask TSP | O(2ⁿ · n²) | O(2ⁿ · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why maximise overlap?</summary>

Total length = sum of lengths − total overlap.

</details>


<details><summary>Why no word is a substring of another?</summary>

Otherwise it would just be absorbed and the model of "overlaps only" breaks.

</details>


## Connected
- [Maximize Score After N Operations](Maximize%20Score%20After%20N%20Operations.md)
