---
topic: Sliding Window
pattern: [At least: add n − j]
source: LeetCode 1358
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Number of Substrings Containing All Three Characters

> [!TIP]
> **🧠 Memory hook**
> Full set collected ⇒ every longer tail counts too.
> **Mantra: HAS a, b, c ⇒ ADD n − j, SHRINK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=45) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count substrings that contain at least one a, b and c.

## Key insight
While [i..j] has all three, every end from j to n − 1 works.

## Approach: Window, add n − j
```java
// While [i..j] has a, b and c, every end from j to n-1 works: add n - j and shrink
public int numberOfSubstrings(String s) {
    int n = s.length(), result = 0;
    int[] cnt = new int[3];
    for (int i = 0, j = 0; j < n; j++) {
        cnt[s.charAt(j) - 'a']++;
        while (cnt[0] > 0 && cnt[1] > 0 && cnt[2] > 0) {
            result += n - j;
            cnt[s.charAt(i++) - 'a']--;
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window, add n − j | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against brute force.

## Recall before you reveal
<details><summary>Last-seen alternative?</summary>

Per end j add 1 + min(last[a], last[b], last[c]).

</details>


## Connected
- [Count Complete Subarrays in an Array](Count%20Complete%20Subarrays%20in%20an%20Array.md)
