---
topic: HashMap
pattern: [Bijection]
source: LeetCode 290
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Word Pattern

> [!TIP]
> **🧠 Memory hook**
> A letter and its word must be introduced at the same moment.
> **Mantra: FIRST-SEEN INDEX MUST MATCH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=45) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Does s follow the pattern (bijection letters ↔ words)?

## Key insight
Record where each letter and each word was first seen; they must always agree.

## Approach 1: Map + used set
```java
// Approach 1: char → word map plus a set of already-used words
public boolean wordPatternMapSet(String pattern, String s) {
    String[] words = s.split(" ");
    if (words.length != pattern.length()) return false;
    Map<Character, String> m = new HashMap<>();
    Set<String> used = new HashSet<>();
    for (int i = 0; i < words.length; i++) {
        char c = pattern.charAt(i);
        if (m.containsKey(c)) { if (!m.get(c).equals(words[i])) return false; }
        else { if (!used.add(words[i])) return false; m.put(c, words[i]); }
    }
    return true;
}
```

## Approach 2: First-seen index
```java
// Approach 2: map each letter and each word to the index where it was first seen; they must always agree
public boolean wordPattern(String pattern, String s) {
    String[] words = s.split(" ");
    if (words.length != pattern.length()) return false;
    Map<Object, Integer> first = new HashMap<>();
    for (int i = 0; i < words.length; i++) {
        Integer a = first.putIfAbsent(pattern.charAt(i), i), b = first.putIfAbsent(words[i], i);
        if (!Objects.equals(a, b)) return false;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Map + used set | O(n) | O(n) |
| First-seen index | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on 1000 random inputs.

## Recall before you reveal
<details><summary>Length mismatch?</summary>

false.

</details>


## Connected
- [Isomorphic Strings](Isomorphic%20Strings.md)
