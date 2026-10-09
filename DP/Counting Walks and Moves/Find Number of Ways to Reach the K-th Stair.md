---
topic: Counting Walks and Moves
pattern: [State with memory, Combinatorics]
source: LeetCode 3154
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Find Number of Ways to Reach the K-th Stair

> [!TIP]
> **🧠 Memory hook**
> Up-jumps double each time (1, 2, 4, …), so only about **31 ups** ever matter.
> **Mantra: j UPS LAND ON 2^j; CHOOSE 2^j − k DOWNS AMONG j + 1 GAPS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=10) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Alice starts on stair 1 with jump = 0. She may go down one stair (not twice in a row, not below 0) or go up 2^jump stairs and then increase jump. Count the operation sequences that end on stair k (sequences may pass k and come back).

## Key insight
Memo view: the state is (stair, jump, last move was down) and the stair can never usefully exceed k + 1. Counting view: after j ups she is on 1 + (1 + 2 + … + 2^(j−1)) = 2^j, so she needs d = 2^j − k downs, placed in the j + 1 gaps around the ups with at most one per gap: C(j + 1, d).

## Approach 1: Memo on (stair, jump, lastDown)
```java
// Top-down over (stair, jump, last move was down)
public int waysToReachStair(int k) {
    return (int) solve(1, 0, false, k, new HashMap<>());
}

// Ways to finish from stair i; counts 1 every time we stand on k
private long solve(long i, int jump, boolean lastDown, int k, Map<String, Long> memo) {
    if (i > k + 1) return 0;
    String key = i + "," + jump + "," + lastDown;
    Long hit = memo.get(key);
    if (hit != null) return hit;
    long ways = i == k ? 1 : 0;
    if (!lastDown && i > 0) ways += solve(i - 1, jump, true, k, memo);
    ways += solve(i + (1L << jump), jump + 1, false, k, memo);
    memo.put(key, ways);
    return ways;
}
```

## Approach 2: Closed form
```java
// Combinatorics: after j ups you stand on 2^j, so place 2^j - k downs into j + 1 gaps
public int waysToReachStairMath(int k) {
    long total = 0;
    for (int j = 0; j <= 31; j++) {
        long downs = (1L << j) - k;
        if (downs >= 0 && downs <= j + 1) total += choose(j + 1, (int) downs);
    }
    return (int) total;
}

// Binomial coefficient C(n, r)
private long choose(int n, int r) {
    long c = 1;
    for (int i = 1; i <= r; i++) c = c * (n - r + i) / i;
    return c;
}
```

| Approach | Time | Space |
|---|---|---|
| Memo on (stair, jump, lastDown) | O(log² k) | O(log² k) |
| Closed form | O(log² k) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can you stop above k + 1?</summary>

Downs come one at a time and never twice in a row, while ups only grow.

</details>


<details><summary>Why at most one down per gap?</summary>

Two downs in a row are forbidden.

</details>


## Connected
- [Climbing Stairs](../Stairs%20and%20Robbers/Climbing%20Stairs.md)
- [Number of Sets of K Non-Overlapping Line Segments](Number%20of%20Sets%20of%20K%20Non-Overlapping%20Line%20Segments.md)
