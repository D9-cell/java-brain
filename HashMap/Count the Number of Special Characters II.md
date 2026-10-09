---
topic: HashMap
pattern: [First / last index]
source: LeetCode 3121
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Count the Number of Special Characters II

> [!TIP]
> **🧠 Memory hook**
> All lowercase copies must leave before the first uppercase arrives.
> **Mantra: LAST LOWER < FIRST UPPER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=10) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Count letters whose every lowercase occurrence comes before the first uppercase one.

## Key insight
Record the last lowercase index and the first uppercase index per letter.

## Approach: Index arrays
```java
// Special: both cases appear and the LAST lowercase comes before the FIRST uppercase
public int numberOfSpecialChars(String word) {
    int[] lastLower = new int[26], firstUpper = new int[26];
    Arrays.fill(lastLower, -1);
    Arrays.fill(firstUpper, -1);
    for (int i = 0; i < word.length(); i++) {
        char c = word.charAt(i);
        if (Character.isLowerCase(c)) lastLower[c - 'a'] = i;
        else if (firstUpper[c - 'A'] == -1) firstUpper[c - 'A'] = i;
    }
    int cnt = 0;
    for (int c = 0; c < 26; c++) if (lastLower[c] != -1 && firstUpper[c] != -1 && lastLower[c] < firstUpper[c]) cnt++;
    return cnt;
}
```

| Approach | Time | Space |
|---|---|---|
| Index arrays | O(n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against the definition.

## Recall before you reveal
<details><summary>What to record?</summary>

Last lowercase and first uppercase.

</details>

