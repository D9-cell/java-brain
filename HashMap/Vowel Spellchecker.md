---
topic: HashMap
pattern: [Several lookup maps]
source: LeetCode 966
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Vowel Spellchecker

> [!TIP]
> **🧠 Memory hook**
> Three sieves of decreasing strictness.
> **Mantra: EXACT, LOWERCASE, DEVOWEL — FIRST MATCH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=44) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Correct each query: exact match, else case-insensitive, else vowel-insensitive, else "".

## Key insight
Build a set and two maps keyed by lowercase and devowelled forms, keeping the first word per key.

## Approach: Set + two maps
```java
// Replaces every vowel with '*'
static String devowel(String s) {
    return s.toLowerCase().replaceAll("[aeiou]", "*");
}

// Three lookups in priority order: exact (set), case-insensitive (first word per lower key), vowel-insensitive
public String[] spellchecker(String[] wordlist, String[] queries) {
    Set<String> exact = new HashSet<>(Arrays.asList(wordlist));
    Map<String, String> lower = new HashMap<>(), vowel = new HashMap<>();
    for (String w : wordlist) {
        lower.putIfAbsent(w.toLowerCase(), w);
        vowel.putIfAbsent(devowel(w), w);
    }
    String[] res = new String[queries.length];
    for (int i = 0; i < queries.length; i++) {
        String q = queries[i];
        if (exact.contains(q)) res[i] = q;
        else if (lower.containsKey(q.toLowerCase())) res[i] = lower.get(q.toLowerCase());
        else res[i] = vowel.getOrDefault(devowel(q), "");
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Set + two maps | O(total length) | O(total length) |

## Recall before you reveal
<details><summary>Which word per key?</summary>

The first one (putIfAbsent).

</details>

