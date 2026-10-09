---
topic: HashMap
pattern: [Rearrange to equal keys, Prefix differences]
source: LeetCode 3714
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Longest Balanced Substring II

> [!TIP]
> **🧠 Memory hook**
> Same difference twice ⇒ the part between is balanced.
> **Mantra: 1 / 2 / 3 LETTER CASES, FIRST INDEX PER DIFFERENCE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=26) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Longest substring of a/b/c where every letter present appears equally often.

## Key insight
Split by which letters appear. One letter: longest run. Two letters: segments without the third, first index per (c1 − c2). Three letters: first index per (ca − cb, ca − cc).

## Approach: Three cases
```java
// Two letters only: segments without the third letter; equal counts ⇔ same (c1 − c2) seen before
static int twoLetters(String s, char a, char b) {
    Map<Integer, Integer> first = new HashMap<>();
    first.put(0, -1);
    int diff = 0, best = 0;
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        if (c != a && c != b) { first.clear(); first.put(0, i); diff = 0; continue; }
        diff += c == a ? 1 : -1;
        Integer j = first.putIfAbsent(diff, i);
        if (j != null) best = Math.max(best, i - j);
    }
    return best;
}

// Three cases: one letter (longest run), two letters (diff map per pair), three letters (pair of diffs as key)
public int longestBalanced(String s) {
    int n = s.length(), best = 0, run = 0;
    for (int i = 0; i < n; i++) { run = i > 0 && s.charAt(i) == s.charAt(i - 1) ? run + 1 : 1; best = Math.max(best, run); }
    best = Math.max(best, Math.max(twoLetters(s, 'a', 'b'), Math.max(twoLetters(s, 'a', 'c'), twoLetters(s, 'b', 'c'))));
    Map<Long, Integer> first = new HashMap<>();
    first.put(0L, -1);
    int ca = 0, cb = 0, cc = 0;
    for (int i = 0; i < n; i++) {
        char c = s.charAt(i);
        if (c == 'a') ca++; else if (c == 'b') cb++; else cc++;
        long key = (long) (ca - cb) * 1_000_003L + (ca - cc);
        Integer j = first.putIfAbsent(key, i);
        if (j != null) best = Math.max(best, i - j);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Three cases | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against all substrings on 1000 random strings.

## Recall before you reveal
<details><summary>Why separate cases?</summary>

An absent letter must not be forced to count 0 in the key.

</details>


<details><summary>Why reset at the third letter?</summary>

The substring must not contain it.

</details>


## Connected
- [Count Number of Bad Pairs](Count%20Number%20of%20Bad%20Pairs.md)
