---
topic: Subsequences Stacks and Greedy
pattern: [All substrings, Ownership count]
source: LeetCode 3076
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Shortest Uncommon Substring in an Array

> [!TIP]
> **🧠 Memory hook**
> Count **in how many words** each substring appears (once per word). For each word take the **shortest, then smallest** substring owned only by it.
> **Mantra: owners[sub]++ per word · FOR len up: smallest sub with owners == 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=17) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
For each string in arr, return its shortest substring that occurs in no other string (smallest lexicographically on ties), or "".

## Key insight
Words are at most 20 characters, so each has at most 210 substrings. A per-word set avoids counting a substring twice in the same word.

## Approach: Substring counts
```java
// Count in how many words each substring appears; pick the shortest, smallest one owned by a single word
public String[] shortestSubstrings(String[] arr) {
    Map<String, Integer> owners = new HashMap<>();
    for (String w : arr) {
        Set<String> subs = new HashSet<>();
        for (int i = 0; i < w.length(); i++)
            for (int j = i + 1; j <= w.length(); j++) subs.add(w.substring(i, j));
        for (String x : subs) owners.merge(x, 1, Integer::sum);
    }
    String[] ans = new String[arr.length];
    for (int k = 0; k < arr.length; k++) {
        String w = arr[k], best = "";
        for (int len = 1; len <= w.length() && best.isEmpty(); len++)
            for (int i = 0; i + len <= w.length(); i++) {
                String x = w.substring(i, i + len);
                if (owners.get(x) == 1 && (best.isEmpty() || x.compareTo(best) < 0)) best = x;
            }
        ans[k] = best;
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Substring counts | O(n · L³) | O(n · L²) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why a set per word?</summary>

A repeated substring inside one word still has one owner.

</details>


<details><summary>Why scan lengths upward?</summary>

The first length with a hit is the shortest.

</details>


## Connected
- [String Matching in an Array](String%20Matching%20in%20an%20Array.md)
