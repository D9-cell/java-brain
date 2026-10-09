---
topic: Sliding Window
pattern: [Fixed window, Split into pieces]
source: LeetCode 2953
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Count Complete Substrings

> [!TIP]
> **🧠 Memory hook**
> Cut the string where neighbours jump by more than 2, then try every number of distinct letters.
> **Mantra: SPLIT; FOR c: FIXED WINDOW c·k, good == c**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=6) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count substrings where every letter appears exactly k times and adjacent letters differ by at most 2.

## Key insight
A substring never crosses a "jump" > 2, so split there. With c distinct letters the length is exactly c·k: one fixed window per c (1..26), tracking how many letters sit at exactly k.

## Approach: Split + fixed window per letter count
```java
// Split where neighbours differ by more than 2, then count each piece separately
public int countCompleteSubstrings(String word, int k) {
    int n = word.length(), result = 0, last = 0;
    for (int i = 1; i <= n; i++) {
        if (i == n || Math.abs(word.charAt(i) - word.charAt(i - 1)) > 2) {
            result += solve(word, last, i - 1, k);
            last = i;
        }
    }
    return result;
}

// For each number of distinct letters c, slide a fixed window of c*k and count windows with c letters at exactly k
int solve(String w, int start, int end, int k) {
    int result = 0;
    for (int chars = 1; chars <= 26 && chars * k <= end - start + 1; chars++) {
        int[] count = new int[26];
        int good = 0, len = chars * k;
        for (int i = start, j = start; j <= end; j++) {
            int c = w.charAt(j) - 'a';
            if (++count[c] == k) good++;
            else if (count[c] == k + 1) good--;
            if (j - i + 1 > len) {
                int d = w.charAt(i++) - 'a';
                if (count[d] == k) good--;
                else if (count[d] == k + 1) good++;
                count[d]--;
            }
            if (good == chars) result++;
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Split + fixed window per letter count | O(26 · n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against checking every substring.

## Recall before you reveal
<details><summary>Why can the window be fixed?</summary>

c letters × k each = c·k characters.

</details>


<details><summary>What is `good`?</summary>

Number of letters whose count is exactly k.

</details>

