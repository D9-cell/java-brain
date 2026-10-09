---
topic: Sliding Window
pattern: [Prefix state, Parity]
source: LeetCode 3445
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Maximum Difference Between Even and Odd Frequency II

> [!TIP]
> **🧠 Memory hook**
> Per digit pair, store the cheapest left door for each parity state.
> **Mantra: FOR (a, b): minPrev[state ^ 2]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=35) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Digits '0'–'4'. Maximise freq(a) − freq(b) over substrings of length ≥ k where freq(a) is odd and freq(b) is even and non-zero.

## Key insight
Fix the pair (a, b). Substring (l, r] = prefix(r) − prefix(l). Odd a and even b ⇔ l's a-parity differs and b-parity matches: state ^ 2. Keep the minimum (pa − pb) per state among left ends that are far enough and leave ≥ 1 a and ≥ 2 b inside.

## Approach: Pairs × prefix parity window
```java
// For each (a, b): prefix counts; the best left end has opposite a-parity, same b-parity, minimum (a - b)
public int maxDifference(String s, int k) {
    int n = s.length(), result = Integer.MIN_VALUE;
    for (char a = '0'; a <= '4'; a++) {
        for (char b = '0'; b <= '4'; b++) {
            if (a == b) continue;
            int[] minPrev = new int[4];
            Arrays.fill(minPrev, Integer.MAX_VALUE);
            int ca = 0, cb = 0, pa = 0, pb = 0;
            for (int l = -1, r = 0; r < n; r++) {
                if (s.charAt(r) == a) ca++;
                if (s.charAt(r) == b) cb++;
                while (r - l >= k && cb - pb >= 2 && ca - pa >= 1) {
                    int st = state(pa, pb);
                    minPrev[st] = Math.min(minPrev[st], pa - pb);
                    l++;
                    if (s.charAt(l) == a) pa++;
                    if (s.charAt(l) == b) pb++;
                }
                int best = minPrev[state(ca, cb) ^ 2];
                if (best != Integer.MAX_VALUE) result = Math.max(result, ca - cb - best);
            }
        }
    }
    return result;
}

// Two parity bits: (count_a odd) << 1 | (count_b odd)
static int state(int ca, int cb) {
    return (ca & 1) << 1 | (cb & 1);
}
```

| Approach | Time | Space |
|---|---|---|
| Pairs × prefix parity window | O(20 · n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against checking every substring and every pair.

## Recall before you reveal
<details><summary>Why state ^ 2?</summary>

Flip a's parity bit, keep b's.

</details>


<details><summary>How many pairs?</summary>

5 × 4 = 20.

</details>

