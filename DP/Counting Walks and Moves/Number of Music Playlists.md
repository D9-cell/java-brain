---
topic: Counting Walks and Moves
pattern: [Count by the last addition, 2-D counting]
source: LeetCode 920
difficulty: Hard
companies: [Coursera]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Number of Music Playlists

> [!TIP]
> **🧠 Memory hook**
> Each slot is either a **new song** or a **replay** of a song not heard in the last k slots.
> **Mantra: dp[i][j] = dp[i−1][j−1]·(n−j+1) + dp[i−1][j]·max(j−k, 0)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=17) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
You have n songs and want a playlist of `goal` songs where every song is played at least once and a song can be replayed only after k other songs. Count playlists modulo 1e9+7.

## Key insight
State: length i and distinct songs used j. A new song can be any of the n − (j − 1) unused ones. A replay can be any of the j used songs except the k most recent ones (all distinct), so j − k choices.

## Approach 1: Table over (length, distinct)
```java
// dp[i][j] = playlists of length i that use exactly j distinct songs
public int numMusicPlaylists(int n, int goal, int k) {
    long[][] dp = new long[goal + 1][n + 1];
    dp[0][0] = 1;
    for (int i = 1; i <= goal; i++)
        for (int j = 1; j <= Math.min(i, n); j++) {
            long fresh = dp[i - 1][j - 1] * (n - j + 1);
            long replay = dp[i - 1][j] * Math.max(j - k, 0);
            dp[i][j] = (fresh + replay) % MOD;
        }
    return (int) dp[goal][n];
}
```

## Approach 2: Top-down memo
```java
// Top-down over (slots left, distinct songs used)
public int numMusicPlaylistsMemo(int n, int goal, int k) {
    long[][] memo = new long[goal + 1][n + 1];
    for (long[] row : memo) Arrays.fill(row, -1);
    return (int) fill(goal, 0, n, k, memo);
}

// Playlists that complete left more slots after using used distinct songs
private long fill(int left, int used, int n, int k, long[][] memo) {
    if (left == 0) return used == n ? 1 : 0;
    if (memo[left][used] >= 0) return memo[left][used];
    long res = 0;
    if (used < n) res += fill(left - 1, used + 1, n, k, memo) * (n - used);
    if (used > k) res += fill(left - 1, used, n, k, memo) * (used - k);
    return memo[left][used] = res % MOD;
}
```

| Approach | Time | Space |
|---|---|---|
| Table over (length, distinct) | O(goal · n) | O(goal · n) |
| Top-down memo | O(goal · n) | O(goal · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why exactly j − k replay choices?</summary>

The last k songs are all different and all among the j used.

</details>


<details><summary>Where must the answer be read?</summary>

dp[goal][n]: all songs used.

</details>


## Connected
- [K Inverse Pairs Array](K%20Inverse%20Pairs%20Array.md)
- [Count Vowels Permutation](Count%20Vowels%20Permutation.md)
