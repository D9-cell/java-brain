---
topic: Pattern Matching
pattern: [Occurrence lists]
source: LeetCode 3006
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find Beautiful Indices in the Given Array I

> [!TIP]
> **🧠 Memory hook**
> List all starts of a and of b. Index i (an a-start) is beautiful if **some b-start j has |i − j| ≤ k**.
> **Mantra: as = occ(a) · bs = occ(b) · keep i with a j within k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Pattern%20Matching/Pattern%20Matching%20Animations.html#p=7) · **Pattern hub:** [Pattern Matching - Pattern Map](Pattern%20Matching%20-%20Pattern%20Map.md)

## Problem
Index i is beautiful if s starts with a at i and with b at some j with |i − j| ≤ k. Return the beautiful indexes in increasing order.

## Key insight
Lengths are small (n ≤ 10⁵ with short patterns), so indexOf for occurrences plus a check per pair is enough here; part II needs KMP and two pointers.

## Approach: Occurrences + check
```java
// Collect occurrences of a and b, then for each a check whether some b lies within k
public List<Integer> beautifulIndices(String s, String a, String b, int k) {
    List<Integer> as = occurrences(s, a), bs = occurrences(s, b), out = new ArrayList<>();
    for (int i : as)
        for (int j : bs)
            if (Math.abs(i - j) <= k) {
                out.add(i);
                break;
            }
    return out;
}

// Start indexes where p occurs in s
List<Integer> occurrences(String s, String p) {
    List<Integer> out = new ArrayList<>();
    for (int i = s.indexOf(p); i >= 0; i = s.indexOf(p, i + 1)) out.add(i);
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Occurrences + check | O(n · |a| + |as| · |bs|) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why indexOf(p, i + 1)?</summary>

Occurrences may overlap.

</details>


<details><summary>Already sorted?</summary>

Occurrences are found left to right.

</details>


## Connected
- [Find Beautiful Indices in the Given Array II](Find%20Beautiful%20Indices%20in%20the%20Given%20Array%20II.md)
