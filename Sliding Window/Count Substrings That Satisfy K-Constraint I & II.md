---
topic: Sliding Window
pattern: [At most: add j − i + 1, Prefix sums]
source: LeetCode 3258 + 3261
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Count Substrings That Satisfy K-Constraint I & II

> [!TIP]
> **🧠 Memory hook**
> Valid while either digit stays within k; it breaks only when both overflow.
> **Mantra: SHRINK WHILE c0 > k AND c1 > k; ADD j − i + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=11) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Part I: count substrings with at most k zeros or at most k ones. Part II: answer that count for many ranges [l, r].

## Key insight
Validity is monotone, so Part I is the counting window. For Part II, `leftMost[j]` (smallest start for end j) and `rightMost[i]` (largest end for start i) plus a prefix sum of valid counts answer each query in O(1).

## Approach 1: Part I brute force
```java
// Part I brute force: extend from each start until both counts exceed k
public int countKConstraintSubstringsBrute(String s, int k) {
    int n = s.length(), result = 0;
    for (int i = 0; i < n; i++) {
        int c0 = 0, c1 = 0;
        for (int j = i; j < n; j++) {
            if (s.charAt(j) == '0') c0++; else c1++;
            if (c0 <= k || c1 <= k) result++;
            else break;
        }
    }
    return result;
}
```

## Approach 2: Part I window
```java
// Part I window: shrink while both counts exceed k, then all j - i + 1 substrings ending at j are valid
public int countKConstraintSubstrings(String s, int k) {
    int result = 0, c0 = 0, c1 = 0;
    for (int i = 0, j = 0; j < s.length(); j++) {
        if (s.charAt(j) == '0') c0++; else c1++;
        while (c0 > k && c1 > k) {
            if (s.charAt(i++) == '0') c0--; else c1--;
        }
        result += j - i + 1;
    }
    return result;
}
```

## Approach 3: Part II queries
Ends up to v = min(r, rightMost[l]) take every start in [l..j]: len·(len+1)/2. Later ends are limited by leftMost[j] (≥ l): cum[r] − cum[v].

```java
// Part II: leftMost[j] and rightMost[i] from two windows, plus a prefix sum of valid counts per end
public long[] countKConstraintSubstringsII(String s, int k, int[][] queries) {
    int n = s.length();
    int[] leftMost = new int[n], rightMost = new int[n], cnt = new int[2];
    for (int i = 0, j = 0; j < n; j++) {
        cnt[s.charAt(j) - '0']++;
        while (cnt[0] > k && cnt[1] > k) cnt[s.charAt(i++) - '0']--;
        leftMost[j] = i;
    }
    cnt = new int[2];
    for (int i = n - 1, j = n - 1; j >= 0; j--) {
        cnt[s.charAt(j) - '0']++;
        while (cnt[0] > k && cnt[1] > k) cnt[s.charAt(i--) - '0']--;
        rightMost[j] = i;
    }
    long[] cum = new long[n];
    for (int j = 0; j < n; j++) cum[j] = (j > 0 ? cum[j - 1] : 0) + (j - leftMost[j] + 1);
    long[] result = new long[queries.length];
    for (int q = 0; q < queries.length; q++) {
        int low = queries[q][0], high = queries[q][1], valid = Math.min(high, rightMost[low]);
        long len = valid - low + 1;
        result[q] = len * (len + 1) / 2 + cum[high] - cum[valid];
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Part I brute force | O(n²) | O(1) |
| Part I window | O(n) | O(1) |
| Part II queries | O(n + q) | O(n) |

> [!WARNING]
> **Java gotcha**
> Part II verified against brute force on random strings and 5 random queries each.

## Recall before you reveal
<details><summary>Why is leftMost[j] ≥ l for ends beyond rightMost[l]?</summary>

Start l cannot reach them, so the valid starts begin later.

</details>


<details><summary>Part I in one line?</summary>

result += j − i + 1 after shrinking.

</details>

