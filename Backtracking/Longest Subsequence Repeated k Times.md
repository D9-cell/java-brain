---
topic: Backtracking
pattern: [BFS/backtracking over candidates]
source: LeetCode 2014
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Longest Subsequence Repeated k Times

> [!TIP]
> **🧠 Memory hook**
> Only popular letters (count ≥ k) can be in the chant; grow chants letter by letter.
> **Mantra: FILTER LETTERS, BFS BY LENGTH, Z→A**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=13) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Longest subsequence seq such that seq repeated k times is a subsequence of s (ties: lexicographically largest).

## Key insight
Answer length ≤ n/k ≤ 7 and only letters with count ≥ k qualify. Extend valid candidates (a valid string's prefixes are valid) and check with a greedy scan.

## Approach: BFS over candidates
```java
// Is seq repeated k times a subsequence of s?
static boolean ok(String s, String seq, int k) {
    int j = 0, rep = 0;
    if (seq.isEmpty()) return true;
    for (char c : s.toCharArray()) {
        if (c == seq.charAt(j) && ++j == seq.length()) { j = 0; if (++rep == k) return true; }
    }
    return false;
}

// Only letters with count >= k can appear; BFS by length, trying letters from 'z' down so the first longest is largest
public String longestSubsequenceRepeatedK(String s, int k) {
    int[] cnt = new int[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    List<Character> letters = new ArrayList<>();
    for (int c = 25; c >= 0; c--) if (cnt[c] >= k) letters.add((char) ('a' + c));
    String best = "";
    Deque<String> q = new ArrayDeque<>(List.of(""));
    while (!q.isEmpty()) {
        String cur = q.poll();
        for (char c : letters) {
            String nx = cur + c;
            if (ok(s, nx, k)) {
                if (nx.length() > best.length()) best = nx;
                q.offer(nx);
            }
        }
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS over candidates | O(n · (n/k)!) | O((n/k)!) |

> [!WARNING]
> **Java gotcha**
> Verified against enumerating every string up to length n/k.

## Recall before you reveal
<details><summary>Pruning fact?</summary>

If seq fails, every extension fails.

</details>

