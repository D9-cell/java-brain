---
topic: Strings and Digits
pattern: [Two pointers, Bubble the match]
source: CodeChef, LeetCode 2193
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Min Swaps to Make Palindrome

> [!TIP]
> **🧠 Memory hook**
> Fix the string from the **outside in**: for the left letter find its twin from the right and bubble it to the end.
> **Mantra: LEFT LETTER ← NEAREST EQUAL FROM THE RIGHT, BUBBLE TO THE END**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=13) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of adjacent swaps that turn the string into a palindrome, or −1.

## Key insight
If more than one letter has an odd count it is impossible. Otherwise for the left pointer find the nearest equal letter on the right and swap it step by step to the right pointer. If the left letter is the unique odd one, push it one step towards the middle and retry.

## Approach: Two pointers
```java
// Match the left end with the nearest equal letter from the right and bubble it to the right end; the odd letter is handled at the end. -1 when impossible
public int minSwaps(String str) {
    char[] s = str.toCharArray();
    int n = s.length, swaps = 0;
    int[] cnt = new int[128];
    for (char c : s) cnt[c]++;
    int odd = 0;
    for (int c : cnt) odd += c % 2;
    if (odd > 1) return -1;
    for (int left = 0, right = n - 1; left < right; left++) {
        int k = right;
        while (k > left && s[k] != s[left]) k--;
        if (k == left) {
            char t = s[left]; s[left] = s[left + 1]; s[left + 1] = t;
            swaps++;
            left--;
            continue;
        }
        for (; k < right; k++) { char t = s[k]; s[k] = s[k + 1]; s[k + 1] = t; swaps++; }
        right--;
    }
    return swaps;
}
```

| Approach | Time | Space |
|---|---|---|
| Two pointers | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against BFS over adjacent swaps. Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the nearest twin optimal?</summary>

It needs the fewest adjacent swaps, and moving the farther twin instead cannot reduce the later work.

</details>


## Connected
- [Minimum Swaps to Make Strings Equal](Minimum%20Swaps%20to%20Make%20Strings%20Equal.md)
