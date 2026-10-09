---
topic: HashSet
pattern: [HashSet, Boolean array, Bitmask]
source: LeetCode 1684
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Count the Number of Consistent Strings

> [!TIP]
> **🧠 Memory hook**
> A 26-light panel for allowed letters; a word is fine if it lights nothing outside the panel.
> **Mantra: MASK, (word & ~allowed) == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=3) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Count the words that use only characters from `allowed`.

## Key insight
The same membership test, three containers: HashSet → boolean[26] → one int bitmask.

## Approach 1: HashSet
```java
// Approach 1: HashSet of allowed characters
public int countConsistentStringsSet(String allowed, String[] words) {
    Set<Character> ok = new HashSet<>();
    for (char c : allowed.toCharArray()) ok.add(c);
    int count = 0;
    for (String w : words) {
        boolean all = true;
        for (char c : w.toCharArray()) if (!ok.contains(c)) { all = false; break; }
        if (all) count++;
    }
    return count;
}
```

## Approach 2: boolean[26]
```java
// Approach 2: boolean[26] lookup
public int countConsistentStringsArray(String allowed, String[] words) {
    boolean[] ok = new boolean[26];
    for (char c : allowed.toCharArray()) ok[c - 'a'] = true;
    int count = 0;
    for (String w : words) {
        boolean all = true;
        for (char c : w.toCharArray()) if (!ok[c - 'a']) { all = false; break; }
        if (all) count++;
    }
    return count;
}
```

## Approach 3: Bitmask
```java
// Approach 3: a 26-bit mask; a word is consistent if its mask has no bit outside the allowed mask
public int countConsistentStrings(String allowed, String[] words) {
    int mask = 0;
    for (char c : allowed.toCharArray()) mask |= 1 << (c - 'a');
    int count = 0;
    for (String w : words) {
        int wm = 0;
        for (char c : w.toCharArray()) wm |= 1 << (c - 'a');
        if ((wm & ~mask) == 0) count++;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| HashSet | O(total chars) | O(26) |
| boolean[26] | O(total chars) | O(26) |
| Bitmask | O(total chars) | O(1) |

## Recall before you reveal
<details><summary>Set bit for char c?</summary>

`mask |= 1 << (c - 'a')`.

</details>


<details><summary>Subset test of masks?</summary>

`(wm & ~mask) == 0`.

</details>


## Connected
- [Maximum Unique Subarray Sum After Deletion](Maximum%20Unique%20Subarray%20Sum%20After%20Deletion.md) (array instead of set)
