---
topic: Pattern Matching
pattern: [KMP, Two pointers]
source: LeetCode 3008
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find Beautiful Indices in the Given Array II

> [!TIP]
> **🧠 Memory hook**
> KMP gives both occurrence lists in **O(n)**. Walk the a-list with a **pointer into the b-list** that skips b-starts below i − k.
> **Mantra: kmp(s, a), kmp(s, b) · advance j while bs[j] < i − k · bs[j] ≤ i + k → keep i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Pattern%20Matching/Pattern%20Matching%20Animations.html#p=8) · **Pattern hub:** [Pattern Matching - Pattern Map](Pattern%20Matching%20-%20Pattern%20Map.md)

## Problem
Same as part I with s, a and b up to 5·10⁵ characters.

## Key insight
Both lists are sorted, so the first b-start that is not too far left is the only candidate to check, and that pointer only moves forward.

## Approach: KMP + two pointers
```java
// KMP finds both occurrence lists in O(n); a moving pointer into the b list checks the window
public List<Integer> beautifulIndices(String s, String a, String b, int k) {
    List<Integer> as = kmp(s, a), bs = kmp(s, b), out = new ArrayList<>();
    int j = 0;
    for (int i : as) {
        while (j < bs.size() && bs.get(j) < i - k) j++;
        if (j < bs.size() && bs.get(j) <= i + k) out.add(i);
    }
    return out;
}

// All start indexes of p in s with KMP
List<Integer> kmp(String s, String p) {
    int m = p.length();
    int[] lps = new int[m];
    for (int i = 1, len = 0; i < m; ) {
        if (p.charAt(i) == p.charAt(len)) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    List<Integer> out = new ArrayList<>();
    for (int i = 0, j = 0; i < s.length(); ) {
        if (s.charAt(i) == p.charAt(j)) {
            i++;
            j++;
            if (j == m) {
                out.add(i - m);
                j = lps[j - 1];
            }
        } else if (j > 0) j = lps[j - 1];
        else i++;
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| KMP + two pointers | O(n + |a| + |b|) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is one b enough to check?</summary>

It is the closest one not below i − k; if it is above i + k, all later ones are too.

</details>


<details><summary>Why not indexOf?</summary>

Worst case O(n · |a|).

</details>


## Connected
- [Find Beautiful Indices in the Given Array I](Find%20Beautiful%20Indices%20in%20the%20Given%20Array%20I.md)
- [Knuth-Morris-Pratt KMP String Matching Algorithm](Knuth-Morris-Pratt%20KMP%20String%20Matching%20Algorithm.md)
