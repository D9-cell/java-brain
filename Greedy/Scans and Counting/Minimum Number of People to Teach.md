---
topic: Scans and Counting
pattern: [Choose one language, Count the sad users]
source: LeetCode 1733
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Number of People to Teach

> [!TIP]
> **🧠 Memory hook**
> Only users in a friendship that **cannot talk** matter; teach them the language most of them already know.
> **Mantra: SAD USERS, TEACH THE MOST COMMON LANGUAGE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=12) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Choose one language to teach to some users so that every pair of friends can communicate. Return the minimum users to teach.

## Key insight
Find users in friendships with no common language ("sad" users). Count how many sad users know each language; teaching the most known one costs `|sad| - mostKnown`.

## Approach 1: Most known language
```java
// Only friends who cannot talk matter. Pick the language known by most of those users and teach it to the rest
public int minimumTeachings(int n, int[][] languages, int[][] friendships) {
    Set<Integer> sad = new HashSet<>();
    for (int[] f : friendships) {
        int u = f[0] - 1, v = f[1] - 1;
        Set<Integer> known = new HashSet<>();
        for (int l : languages[u]) known.add(l);
        boolean canTalk = false;
        for (int l : languages[v]) if (known.contains(l)) canTalk = true;
        if (!canTalk) { sad.add(u); sad.add(v); }
    }
    int[] count = new int[n + 1];
    int most = 0;
    for (int u : sad) for (int l : languages[u]) most = Math.max(most, ++count[l]);
    return sad.size() - most;
}
```

## Approach 2: Try every language
```java
// Try every language: count the sad users who do not know it
public int minimumTeachingsTryAll(int n, int[][] languages, int[][] friendships) {
    Set<Integer> sad = new HashSet<>();
    for (int[] f : friendships) {
        int u = f[0] - 1, v = f[1] - 1;
        boolean ok = false;
        for (int a : languages[u]) for (int b : languages[v]) if (a == b) ok = true;
        if (!ok) { sad.add(u); sad.add(v); }
    }
    int best = Integer.MAX_VALUE;
    for (int l = 1; l <= n; l++) {
        int need = 0;
        for (int u : sad) { boolean knows = false; for (int x : languages[u]) if (x == l) knows = true; if (!knows) need++; }
        best = Math.min(best, need);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Most known language | O(F · L) | O(n + users) |
| Try every language | O(F · L + n · |sad| · L) | O(users) |

> [!WARNING]
> **Java gotcha**
> Checked against every (language, subset of people) choice. Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can the same language be used for all?</summary>

Teaching a single language to every sad user is enough and cheaper than mixing.

</details>


## Connected
- [Greatest Sum Divisible by Three](Greatest%20Sum%20Divisible%20by%20Three.md)
