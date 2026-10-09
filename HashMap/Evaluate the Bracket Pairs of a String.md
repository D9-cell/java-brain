---
topic: HashMap
pattern: [Lookup table]
source: LeetCode 1807
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Evaluate the Bracket Pairs of a String

> [!TIP]
> **🧠 Memory hook**
> Fill in a form letter from a dictionary.
> **Mantra: MAP, REPLACE (key) WITH VALUE OR "?"**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=14) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Replace each (key) with its value from knowledge, or "?".

## Key insight
Put knowledge in a map, then build the result in one scan.

## Approach: Map + StringBuilder
```java
// Knowledge into a map; copy chars, and on "(key)" append the value or "?"
public String evaluate(String s, List<List<String>> knowledge) {
    Map<String, String> m = new HashMap<>();
    for (List<String> k : knowledge) m.put(k.get(0), k.get(1));
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) != '(') { sb.append(s.charAt(i)); continue; }
        int j = s.indexOf(')', i);
        sb.append(m.getOrDefault(s.substring(i + 1, j), "?"));
        i = j;
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Map + StringBuilder | O(n + k) | O(k) |

## Recall before you reveal
<details><summary>Missing key?</summary>

"?".

</details>

