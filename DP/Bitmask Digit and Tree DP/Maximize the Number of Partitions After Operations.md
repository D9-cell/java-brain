---
topic: Bitmask Digit and Tree DP
pattern: [Letter set state, One free change]
source: LeetCode 3003
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximize the Number of Partitions After Operations

> [!TIP]
> **🧠 Memory hook**
> The state is **(position, letters in the open partition, change still available?)**. The change is tried at each position.
> **Mantra: solve(i, mask, can): place s[i] or, if can, any other letter**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Bitmask%20Digit%20and%20Tree%20DP/Bitmask%20Digit%20and%20Tree%20DP%20Animations.html#p=3) · **Pattern hub:** [Bitmask Digit and Tree DP - Pattern Map](Bitmask%20Digit%20and%20Tree%20DP%20-%20Pattern%20Map.md)

## Problem
Partition s greedily into the longest prefixes with at most k distinct letters. Before partitioning you may change at most one character to any letter. Return the maximum number of partitions.

## Key insight
Walk left to right. If adding the letter makes more than k distinct letters, the current partition ends and a new one starts with that letter. With the free change available, try every other letter at the current position too.

## Approach: Memo on (i, mask, can)
```java
public class MaximizeTheNumberOfPartitionsAfterOperations {
    private String s;
    private int k;
    private Map<Long, Integer> memo;

    // Greedy partitions take the longest prefix with at most k distinct letters; one letter of s may be changed (canChange)
    public int maxPartitionsAfterOperations(String s, int k) {
        this.s = s;
        this.k = k;
        memo = new HashMap<>();
        return solve(0, 0, true) + 1;
    }

    // Partitions closed from position i on, with the open partition holding the letters in mask
    private int solve(int i, int mask, boolean canChange) {
        if (i == s.length()) return 0;
        long key = ((long) i << 27) | ((long) mask << 1) | (canChange ? 1 : 0);
        Integer cached = memo.get(key);
        if (cached != null) return cached;
        int best = step(i, mask, s.charAt(i) - 'a', canChange);
        if (canChange)
            for (int ch = 0; ch < 26; ch++)
                if (ch != s.charAt(i) - 'a') best = Math.max(best, step(i, mask, ch, false));
        memo.put(key, best);
        return best;
    }

    // Place letter ch at position i: either it still fits the open partition or it starts a new one
    private int step(int i, int mask, int ch, boolean canChange) {
        int next = mask | (1 << ch);
        if (Integer.bitCount(next) > k) return 1 + solve(i + 1, 1 << ch, canChange);
        return solve(i + 1, next, canChange);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Memo on (i, mask, can) | O(n · 26 · states) | O(n · states) |

> [!WARNING]
> **Java gotcha**
> Recursion depth is the string length (up to 10⁴); run it in a thread with a larger stack if the default overflows.

## Recall before you reveal
<details><summary>Why does the mask stay small?</summary>

Only reachable masks are visited and at most k letters are in it.

</details>


<details><summary>Greedy partitioning proof?</summary>

Taking the longest valid prefix leaves the most for later.

</details>


## Connected
- [Maximum Length of a Concatenated String with Unique Characters](../../Recursion/Maximum%20Length%20of%20a%20Concatenated%20String%20with%20Unique%20Characters.md)
