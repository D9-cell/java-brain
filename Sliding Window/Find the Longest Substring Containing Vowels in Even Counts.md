---
topic: Sliding Window
pattern: [Prefix state, Bitmask]
source: LeetCode 1371
difficulty: Medium
companies: [Yogiyo]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Find the Longest Substring Containing Vowels in Even Counts

> [!TIP]
> **🧠 Memory hook**
> A 5-switch light panel: the same panel twice means every switch toggled an even number of times in between.
> **Mantra: PARITY MASK, FIRST INDEX PER MASK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=19) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Longest substring where each vowel appears an even number of times.

## Key insight
Not a sliding window (no direction to shrink). Track vowel parities as a 5-bit mask; equal masks at two positions ⇒ even counts between. Keep the first index of each mask.

## Approach 1: String state + map
```java
// Parity state as a string like "01001"; the same state twice means even counts in between
public int findTheLongestSubstringString(String s) {
    Map<String, Integer> first = new HashMap<>();
    int[] parity = new int[5];
    first.put("00000", -1);
    int maxLen = 0;
    for (int i = 0; i < s.length(); i++) {
        int v = "aeiou".indexOf(s.charAt(i));
        if (v >= 0) parity[v] ^= 1;
        StringBuilder sb = new StringBuilder();
        for (int p : parity) sb.append(p);
        String state = sb.toString();
        if (first.containsKey(state)) maxLen = Math.max(maxLen, i - first.get(state));
        else first.put(state, i);
    }
    return maxLen;
}
```

## Approach 2: Bitmask + array
```java
// Same idea with a 5-bit mask: XOR flips a vowel's parity, first[mask] remembers its earliest index
public int findTheLongestSubstring(String s) {
    int[] first = new int[32];
    Arrays.fill(first, -2);
    first[0] = -1;
    int mask = 0, maxLen = 0;
    for (int i = 0; i < s.length(); i++) {
        int v = "aeiou".indexOf(s.charAt(i));
        if (v >= 0) mask ^= 1 << v;
        if (first[mask] == -2) first[mask] = i;
        maxLen = Math.max(maxLen, i - first[mask]);
    }
    return maxLen;
}
```

| Approach | Time | Space |
|---|---|---|
| String state + map | O(n) | O(1) |
| Bitmask + array | O(n) | O(32) |

> [!WARNING]
> **Java gotcha**
> C++ approaches 1 and 2 use an undeclared `stateMap` (should be `mp`) and do not compile. Verified against brute force.

## Recall before you reveal
<details><summary>Why the FIRST index?</summary>

To get the longest substring.

</details>


<details><summary>Initial state?</summary>

first[0] = −1.

</details>


## Connected
- [Longest Sub-Array with Sum K](Longest%20Sub-Array%20with%20Sum%20K.md)
- [Number of Wonderful Substrings](../Bit_Magic/Number%20of%20Wonderful%20Substrings.md)
