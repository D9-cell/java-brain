---
topic: Counting Walks and Moves
pattern: [Take and jump, Group equal values]
source: LeetCode 3186
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Total Damage With Spell Casting

> [!TIP]
> **🧠 Memory hook**
> House Robber over **distinct damage values**; taking v blocks its neighbours within 2.
> **Mantra: SORT DISTINCT; dp[i] = max(dp[i−1], total(v) + dp[last v′ < v − 2])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=11) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Casting a spell of damage p forbids casting any spell with damage p − 2, p − 1, p + 1 or p + 2. Each spell is cast at most once. Return the maximum total damage.

## Key insight
Equal values never block each other, so take all copies of a value or none. Sort the distinct values; when you take v, the previous allowed value is the last one below v − 2, found with a moving pointer.

## Approach: Sorted House Robber
```java
// House Robber over the sorted distinct values: take all copies of v or skip it
public long maximumTotalDamage(int[] power) {
    TreeMap<Integer, Long> sum = new TreeMap<>();
    for (int p : power) sum.merge(p, (long) p, Long::sum);
    int m = sum.size();
    int[] v = new int[m];
    long[] tot = new long[m], dp = new long[m];
    int k = 0;
    for (Map.Entry<Integer, Long> e : sum.entrySet()) { v[k] = e.getKey(); tot[k++] = e.getValue(); }
    int j = 0;
    for (int i = 0; i < m; i++) {
        while (v[j] < v[i] - 2) j++;
        long take = tot[i] + (j > 0 ? dp[j - 1] : 0);
        dp[i] = Math.max(i > 0 ? dp[i - 1] : 0, take);
    }
    return dp[m - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted House Robber | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why group equal values?</summary>

Same damage is not forbidden, so taking one copy means taking all.

</details>


<details><summary>Similar problem?</summary>

Delete and Earn (gap 1 instead of 2).

</details>


## Connected
- [House Robber](../Stairs%20and%20Robbers/House%20Robber.md)
- [Solving Questions With Brainpower](Solving%20Questions%20With%20Brainpower.md)
