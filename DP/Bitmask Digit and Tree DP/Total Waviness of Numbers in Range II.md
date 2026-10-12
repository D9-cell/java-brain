---
topic: Bitmask Digit and Tree DP
pattern: [Digit DP, (count, total) pair]
source: LeetCode 3753
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Total Waviness of Numbers in Range II

> [!TIP]
> **🧠 Memory hook**
> Build the number digit by digit. Each state returns **how many numbers** and **their total waviness**; a new digit adds `count` whenever the middle digit becomes a peak or valley.
> **Mantra: ANSWER = f(num2) − f(num1 − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Bitmask%20Digit%20and%20Tree%20DP/Bitmask%20Digit%20and%20Tree%20DP%20Animations.html#p=5) · **Pattern hub:** [Bitmask Digit and Tree DP - Pattern Map](Bitmask%20Digit%20and%20Tree%20DP%20-%20Pattern%20Map.md)

## Problem
A digit is a peak (valley) if it is strictly greater (smaller) than both neighbours; the first and last digits are neither. Return the sum of the waviness of all numbers in [num1, num2], num ≤ 10¹⁵.

## Key insight
State: position, tight to the bound, still in leading zeros, and the last two digits. When the digit after (a, b) is d, the middle digit b is a peak if a < b > d and a valley if a > b < d; every completion of the suffix then counts once more. Memoise the non-tight, non-leading states.

## Approach: Digit DP
```java
public class TotalWavinessOfNumbersInRangeII {
    private int[] digits;
    private long[][][][] cnt, wav;

    // Total waviness in [num1, num2] = f(num2) - f(num1 - 1) with f a digit DP that carries (how many numbers, their total waviness)
    public long totalWaviness(long num1, long num2) {
        return total(num2) - total(num1 - 1);
    }

    // Sum of waviness over 0..n
    private long total(long n) {
        if (n < 100) return 0;
        String s = Long.toString(n);
        digits = new int[s.length()];
        for (int i = 0; i < s.length(); i++) digits[i] = s.charAt(i) - '0';
        cnt = new long[digits.length][11][11][2];
        wav = new long[digits.length][11][11][2];
        for (long[][][] a : cnt) for (long[][] b : a) for (long[] c : b) Arrays.fill(c, -1);
        return go(0, 10, 10, true, true)[1];
    }

    // Returns {numbers, waviness} for the suffix from pos; a = digit two back, b = previous digit (10 = none yet)
    private long[] go(int pos, int a, int b, boolean tight, boolean leading) {
        if (pos == digits.length) return new long[]{1, 0};
        int t = tight ? 1 : 0;
        if (!tight && !leading && cnt[pos][a][b][t] >= 0) return new long[]{cnt[pos][a][b][t], wav[pos][a][b][t]};
        long count = 0, total = 0;
        int limit = tight ? digits[pos] : 9;
        for (int d = 0; d <= limit; d++) {
            boolean nl = leading && d == 0;
            int na = nl ? 10 : b, nb = nl ? 10 : d;
            long[] sub = go(pos + 1, na, nb, tight && d == limit, nl);
            count += sub[0];
            total += sub[1];
            if (!nl && a < 10 && b < 10 && ((a < b && b > d) || (a > b && b < d))) total += sub[0];
        }
        if (!tight && !leading) {
            cnt[pos][a][b][t] = count;
            wav[pos][a][b][t] = total;
        }
        return new long[]{count, total};
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Digit DP | O(len · 10³) | O(len · 100) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why carry the count too?</summary>

Adding a peak at this step contributes once per completion of the suffix.

</details>


<details><summary>Why 10 as "none"?</summary>

It marks that fewer than two digits have been placed.

</details>


## Connected
- [Rotated Digits](../Stairs%20and%20Robbers/Rotated%20Digits.md)
