---
topic: Subsequences Stacks and Greedy
pattern: [First mismatch]
source: LeetCode 161
difficulty: Medium
companies: [Meta, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# One Edit Distance

> [!TIP]
> **🧠 Memory hook**
> Make s the shorter. At the **first mismatch**: same length → rest must match after a **replace**; else rest must match after **skipping one in t**.
> **Mantra: len diff > 1 → false · mismatch: replace or insert check · none: lengths differ by 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=12) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Return true if s and t are exactly one edit (insert, delete or replace one character) apart.

## Key insight
Before the first mismatch the strings agree. After it, exactly one edit must explain the difference. With no mismatch, t must be exactly one character longer.

## Approach: First mismatch
```java
// At the first mismatch the rest must match after a replace, an insert or a delete
public boolean isOneEditDistance(String s, String t) {
    if (s.length() > t.length()) return isOneEditDistance(t, s);
    if (t.length() - s.length() > 1) return false;
    for (int i = 0; i < s.length(); i++)
        if (s.charAt(i) != t.charAt(i)) {
            if (s.length() == t.length()) return s.substring(i + 1).equals(t.substring(i + 1));
            return s.substring(i).equals(t.substring(i + 1));
        }
    return s.length() + 1 == t.length();
}
```

| Approach | Time | Space |
|---|---|---|
| First mismatch | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Equal strings?</summary>

Zero edits, so false.

</details>


<details><summary>Why swap so s is shorter?</summary>

Delete from t is the same as insert into s.

</details>


## Connected
- [Words Within Two Edits of Dictionary](Words%20Within%20Two%20Edits%20of%20Dictionary.md)
- [Edit Distance](../../DP/Strings%20and%20Subsequences/Edit%20Distance.md)
