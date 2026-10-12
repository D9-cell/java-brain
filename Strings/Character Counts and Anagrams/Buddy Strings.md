---
topic: Character Counts and Anagrams
pattern: [Mismatch positions]
source: LeetCode 859
difficulty: Easy
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Buddy Strings

> [!TIP]
> **🧠 Memory hook**
> Equal strings need a **repeated letter** to swap. Otherwise there must be **exactly two mismatches that cross**.
> **Mantra: equal → has duplicate · ELSE 2 mismatches i, j with s[i]=g[j], s[j]=g[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=13) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Return true if swapping exactly two letters of s makes it equal to goal.

## Key insight
A swap must happen. If s already equals goal, swapping two equal letters is the only harmless swap. Otherwise the swap must fix exactly the mismatched positions.

## Approach: Mismatch scan
```java
// Equal strings need a repeated letter; otherwise exactly two crossed mismatches
public boolean buddyStrings(String s, String goal) {
    if (s.length() != goal.length()) return false;
    if (s.equals(goal)) {
        int[] cnt = new int[26];
        for (char c : s.toCharArray())
            if (++cnt[c - 'a'] > 1) return true;
        return false;
    }
    int first = -1, second = -1;
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == goal.charAt(i)) continue;
        if (first == -1) first = i;
        else if (second == -1) second = i;
        else return false;
    }
    return second != -1 && s.charAt(first) == goal.charAt(second) && s.charAt(second) == goal.charAt(first);
}
```

| Approach | Time | Space |
|---|---|---|
| Mismatch scan | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the duplicate rule?</summary>

"ab" vs "ab" must swap and would become "ba".

</details>


<details><summary>Three mismatches?</summary>

One swap fixes at most two.

</details>


## Connected
- [Check if One String Swap Can Make Strings Equal](Check%20if%20One%20String%20Swap%20Can%20Make%20Strings%20Equal.md)
