---
topic: Subsequences Stacks and Greedy
pattern: [Greedy by largest letter]
source: LeetCode 2182
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Construct String With Repeat Limit

> [!TIP]
> **🧠 Memory hook**
> Always use the **largest letter**, up to repeatLimit in a row, then insert **one of the next largest** as a separator and continue.
> **Mantra: take min(cnt, limit) of cur · cnt left → one of next · no next → stop**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=9) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Using characters of s (not necessarily all), build the lexicographically largest string with no letter repeated more than repeatLimit times in a row.

## Key insight
A larger letter earlier always wins, so spend the biggest letter as much as allowed. When forced to break the run, spend exactly one of the next letter to keep the big one available.

## Approach: Counts + greedy
```java
// Use the biggest letter up to the limit, then one of the next biggest as a separator
public String repeatLimitedString(String s, int repeatLimit) {
    int[] cnt = new int[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    StringBuilder sb = new StringBuilder();
    int cur = 25;
    while (cur >= 0) {
        if (cnt[cur] == 0) {
            cur--;
            continue;
        }
        int use = Math.min(cnt[cur], repeatLimit);
        for (int k = 0; k < use; k++) sb.append((char) ('a' + cur));
        cnt[cur] -= use;
        if (cnt[cur] == 0) continue;
        int next = cur - 1;
        while (next >= 0 && cnt[next] == 0) next--;
        if (next < 0) break;
        sb.append((char) ('a' + next));
        cnt[next]--;
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Counts + greedy | O(n + 26) | O(26) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why only one separator?</summary>

More would delay the larger letter.

</details>


<details><summary>When do we stop?</summary>

The largest letter still has copies but no other letter is left.

</details>


## Connected
- [Remove Duplicate Letters](Remove%20Duplicate%20Letters.md)
