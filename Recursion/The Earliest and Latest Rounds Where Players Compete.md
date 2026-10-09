---
topic: Recursion
pattern: [Shrink and renumber, Memoised recursion]
source: LeetCode 1900
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# The Earliest and Latest Rounds Where Players Compete

> [!TIP]
> **🧠 Memory hook**
> A tournament director who decides every other match: only the counts left of and between the two stars matter.
> **Mantra: MIRROR, ENUMERATE SURVIVOR COUNTS, MIN/MAX + 1, MEMO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=22) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Players i and n+1−i fight each round; the two best players always win until they meet. Return the earliest and latest rounds they can meet.

## Key insight
Normalise so P1 is closer to the front. Enumerate how many survive left of P1 and between them; recurse on the next round size (n+1)/2.

## Approach: Enumeration + memo
```java
// Positions of the two players among n; enumerate how many survive on each side and recurse
public int[] earliestAndLatest(int n, int first, int second) {
    int left = first, right = second;
    if (left == n - right + 1) return new int[]{1, 1};
    if (left > n - right + 1) {
        int t = n - left + 1;
        left = n - right + 1;
        right = t;
    }
    long key = ((long) n * 64 + left) * 64 + right;
    if (memo.containsKey(key)) return memo.get(key);
    int lo = Integer.MAX_VALUE, hi = 0, next = (n + 1) / 2;
    if (right <= next) {
        for (int sl = 0; sl < left; sl++)
            for (int sm = 0; sm < right - left; sm++) {
                int[] r = earliestAndLatest(next, sl + 1, sl + sm + 2);
                lo = Math.min(lo, r[0] + 1);
                hi = Math.max(hi, r[1] + 1);
            }
    } else {
        int mirror = n - right + 1, midCount = mirror - left - 1, rest = right - mirror - 1;
        for (int sl = 0; sl < left; sl++)
            for (int sm = 0; sm <= midCount; sm++) {
                int[] r = earliestAndLatest(next, sl + 1, sl + 1 + sm + (rest + 1) / 2 + 1);
                lo = Math.min(lo, r[0] + 1);
                hi = Math.max(hi, r[1] + 1);
            }
    }
    int[] res = {lo, hi};
    memo.put(key, res);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Enumeration + memo | small (n ≤ 28) | O(n³) memo |

> [!WARNING]
> **Java gotcha**
> Memoisation added (the C++ recomputes). Verified for every n ≤ 10 and every player pair against a literal tournament simulation.

## Recall before you reveal
<details><summary>Base case?</summary>

left == n − right + 1 → [1, 1].

</details>


## Connected
- [Find the Winner of the Circular Game](Find%20the%20Winner%20of%20the%20Circular%20Game.md) (renumbering)
