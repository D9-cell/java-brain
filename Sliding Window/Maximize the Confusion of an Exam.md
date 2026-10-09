---
topic: Sliding Window
pattern: [Longest window]
source: LeetCode 2024
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Maximize the Confusion of an Exam

> [!TIP]
> **🧠 Memory hook**
> Paint over the minority: up to k flips.
> **Mantra: SHRINK WHILE min(T, F) > k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=34) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Longest run of equal answers after at most k flips.

## Key insight
A window can be made uniform if its rarer letter appears ≤ k times.

## Approach 1: Two passes
```java
// Two passes of "at most k of the other letter": once making all T, once making all F
public int maxConsecutiveAnswersTwoPass(String key, int k) {
    return Math.max(longestWithAtMost(key, k, 'F'), longestWithAtMost(key, k, 'T'));
}

// Longest window containing at most k copies of `flip`
static int longestWithAtMost(String key, int k, char flip) {
    int best = 0, cnt = 0;
    for (int i = 0, j = 0; j < key.length(); j++) {
        if (key.charAt(j) == flip) cnt++;
        while (cnt > k) if (key.charAt(i++) == flip) cnt--;
        best = Math.max(best, j - i + 1);
    }
    return best;
}
```

## Approach 2: One pass
```java
// One pass: a window is fixable while the rarer letter appears at most k times
public int maxConsecutiveAnswers(String key, int k) {
    int[] cnt = new int[2];
    int result = k;
    for (int i = 0, j = 0; j < key.length(); j++) {
        cnt[key.charAt(j) == 'T' ? 0 : 1]++;
        while (Math.min(cnt[0], cnt[1]) > k) cnt[key.charAt(i++) == 'T' ? 0 : 1]--;
        result = Math.max(result, j - i + 1);
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Two passes | O(n) | O(1) |
| One pass | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Related?</summary>

Max Consecutive Ones III.

</details>


## Connected
- [Longest Subarray of 1's After Deleting One Element](Longest%20Subarray%20of%201%27s%20After%20Deleting%20One%20Element.md)
