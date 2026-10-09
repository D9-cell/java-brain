---
topic: Sliding Window
pattern: [Longest window, Flip the view]
source: LeetCode 2516
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Take K of Each Character From Left and Right

> [!TIP]
> **🧠 Memory hook**
> Taking from both ends = keeping one middle block.
> **Mantra: LONGEST KEPT WINDOW WITH OUTSIDE ≥ k EACH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=55) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Each minute take the leftmost or rightmost char. Minimum minutes to have at least k of each of a, b, c (−1 if impossible).

## Key insight
The kept chars are one middle window. Find the longest window whose outside still has ≥ k of each letter.

## Approach 1: Recursion
```java
// Explores both choices with copied counts
void solve(String s, int k, int i, int j, int minutes, int[] f) {
    if (f[0] >= k && f[1] >= k && f[2] >= k) {
        best = Math.min(best, minutes);
        return;
    }
    if (i > j) return;
    int[] l = f.clone(), r = f.clone();
    l[s.charAt(i) - 'a']++;
    solve(s, k, i + 1, j, minutes + 1, l);
    r[s.charAt(j) - 'a']++;
    solve(s, k, i, j - 1, minutes + 1, r);
}

// Recursion: take from the left or the right until every letter has k
public int takeCharactersBrute(String s, int k) {
    best = Integer.MAX_VALUE;
    solve(s, k, 0, s.length() - 1, 0, new int[3]);
    return best == Integer.MAX_VALUE ? -1 : best;
}
```

## Approach 2: Longest kept window
```java
// Flip it: keep the longest middle window whose removal still leaves k of each letter outside
public int takeCharacters(String s, int k) {
    int n = s.length();
    int[] cnt = new int[3];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    if (cnt[0] < k || cnt[1] < k || cnt[2] < k) return -1;
    int keep = 0;
    for (int i = 0, j = 0; j < n; j++) {
        cnt[s.charAt(j) - 'a']--;
        while (i <= j && (cnt[0] < k || cnt[1] < k || cnt[2] < k)) cnt[s.charAt(i++) - 'a']++;
        keep = Math.max(keep, j - i + 1);
    }
    return n - keep;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion | O(2^n) | O(n) |
| Longest kept window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the recursion.

## Recall before you reveal
<details><summary>Impossible when?</summary>

Some letter appears fewer than k times overall.

</details>


## Connected
- [Maximum Points You Can Obtain from Cards](Maximum%20Points%20You%20Can%20Obtain%20from%20Cards.md)
