---
topic: HashMap
pattern: [Frequency counting, Pairing]
source: LeetCode 2131
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Longest Palindrome by Concatenating Two Letter Words

> [!TIP]
> **🧠 Memory hook**
> Mirror pairs on both sides, one symmetric word in the middle.
> **Mantra: PAIR WITH REVERSE (+4), ONE "xx" IN THE MIDDLE (+2)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=28) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Longest palindrome formed by concatenating some of the two-letter words.

## Key insight
A word pairs with an unused reverse (+4). Afterwards, one leftover self-palindrome ("gg") can sit in the middle.

## Approach: Waiting map
```java
// Pair each word with an unused reverse (+4); one leftover "xx" word can sit in the middle (+2)
public int longestPalindrome(String[] words) {
    Map<String, Integer> waiting = new HashMap<>();
    int len = 0;
    for (String w : words) {
        String rev = "" + w.charAt(1) + w.charAt(0);
        if (waiting.getOrDefault(rev, 0) > 0) { len += 4; waiting.merge(rev, -1, Integer::sum); }
        else waiting.merge(w, 1, Integer::sum);
    }
    for (Map.Entry<String, Integer> e : waiting.entrySet())
        if (e.getValue() > 0 && e.getKey().charAt(0) == e.getKey().charAt(1)) return len + 2;
    return len;
}
```

| Approach | Time | Space |
|---|---|---|
| Waiting map | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against all arrangements on tiny inputs.

## Recall before you reveal
<details><summary>How many middle words?</summary>

At most one.

</details>


## Connected
- [Palindrome Pairs (HashMap)](Palindrome%20Pairs%20%28HashMap%29.md)
