---
topic: HashMap
pattern: [Value → positions, Waiting buckets]
source: LeetCode 792
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Number of Matching Subsequences

> [!TIP]
> **🧠 Memory hook**
> Words wait in line for the letter they need next.
> **Mantra: BUCKETS BY NEXT LETTER, ONE PASS OF s**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=36) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
How many words are subsequences of s?

## Key insight
Bucket words by the next letter they need; each letter of s advances its whole bucket. Or binary-search positions per letter.

## Approach 1: Waiting buckets
```java
// Approach 2: buckets of "waiting" words keyed by the next letter they need; one scan of s advances them
public int numMatchingSubseq(String s, String[] words) {
    List<List<int[]>> waiting = new ArrayList<>();
    for (int c = 0; c < 26; c++) waiting.add(new ArrayList<>());
    for (int i = 0; i < words.length; i++) waiting.get(words[i].charAt(0) - 'a').add(new int[]{i, 0});
    int done = 0;
    for (char c : s.toCharArray()) {
        List<int[]> bucket = waiting.get(c - 'a');
        waiting.set(c - 'a', new ArrayList<>());
        for (int[] w : bucket) {
            if (++w[1] == words[w[0]].length()) done++;
            else waiting.get(words[w[0]].charAt(w[1]) - 'a').add(w);
        }
    }
    return done;
}
```

## Approach 2: Positions + binary search
```java
// Approach 3: positions of each letter in s; binary-search the next position for every letter of a word
public int numMatchingSubseqBinary(String s, String[] words) {
    List<List<Integer>> pos = new ArrayList<>();
    for (int c = 0; c < 26; c++) pos.add(new ArrayList<>());
    for (int i = 0; i < s.length(); i++) pos.get(s.charAt(i) - 'a').add(i);
    int cnt = 0;
    for (String w : words) {
        int prev = -1;
        boolean ok = true;
        for (char c : w.toCharArray()) {
            List<Integer> p = pos.get(c - 'a');
            int k = Collections.binarySearch(p, prev + 1);
            if (k < 0) k = -k - 1;
            if (k == p.size()) { ok = false; break; }
            prev = p.get(k);
        }
        if (ok) cnt++;
    }
    return cnt;
}
```

| Approach | Time | Space |
|---|---|---|
| Waiting buckets | O(|s| + Σ|w|) | O(#words) |
| Positions + binary search | O(Σ|w| log |s|) | O(|s|) |

> [!WARNING]
> **Java gotcha**
> Both approaches verified against the two-pointer check.

## Recall before you reveal
<details><summary>Why clear the bucket first?</summary>

Words that move back into the same bucket must wait for the next copy.

</details>


## Connected
- [Closest Equal Element Queries](Closest%20Equal%20Element%20Queries.md)
