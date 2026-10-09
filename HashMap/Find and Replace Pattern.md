---
topic: HashMap
pattern: [Bijection, Normal form]
source: LeetCode 890
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Find and Replace Pattern

> [!TIP]
> **🧠 Memory hook**
> Rename letters by first appearance: same shape, same name.
> **Mantra: NORMAL FORM EQUALITY**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=15) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Return words that match pattern under some bijection of letters.

## Key insight
Either keep two maps consistent, or compare "first-seen index" normal forms.

## Approach 1: Two maps
```java
// Approach 1: two maps (word→pattern and pattern→word) must stay consistent: a bijection
static boolean matchTwoMaps(String w, String p) {
    Map<Character, Character> a = new HashMap<>(), b = new HashMap<>();
    for (int i = 0; i < w.length(); i++) {
        char x = w.charAt(i), y = p.charAt(i);
        if (a.getOrDefault(x, y) != y || b.getOrDefault(y, x) != x) return false;
        a.put(x, y);
        b.put(y, x);
    }
    return true;
}
```

## Approach 2: Normal form
```java
// Approach 2: normalise each string to "first-seen index" form; equal forms ⇔ same pattern
static String normal(String s) {
    Map<Character, Integer> first = new HashMap<>();
    StringBuilder sb = new StringBuilder();
    for (char c : s.toCharArray()) sb.append((char) ('a' + first.computeIfAbsent(c, k -> first.size())));
    return sb.toString();
}

// Keeps words whose normal form equals the pattern's
public List<String> findAndReplacePattern(String[] words, String pattern) {
    String key = normal(pattern);
    List<String> res = new ArrayList<>();
    for (String w : words) if (normal(w).equals(key)) res.add(w);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Two maps | O(n·L) | O(L) |
| Normal form | O(n·L) | O(L) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on 1000 random pairs.

## Recall before you reveal
<details><summary>Why two maps?</summary>

One map alone allows two letters to map to the same letter.

</details>


## Connected
- [Isomorphic Strings](Isomorphic%20Strings.md)
- [Word Pattern](Word%20Pattern.md)
