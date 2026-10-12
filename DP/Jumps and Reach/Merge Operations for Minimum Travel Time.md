---
topic: Jumps and Reach
pattern: [State = (sign, merges left, rate), Choose the next kept sign]
source: LeetCode 3538
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Merge Operations for Minimum Travel Time

> [!TIP]
> **🧠 Memory hook**
> Removing signs makes you **drive longer at the old rate**, while the removed rates pile up on the next kept sign.
> **Mantra: FROM SIGN i JUMP TO KEPT SIGN j; RATE(j) = time[j] + Σ REMOVED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=14) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
Signs at increasing positions (first at 0, last at l) give time[i] minutes per km for the segment starting there. A merge removes an interior sign and adds its time to the next sign. Do exactly k merges and return the minimum total travel time.

## Key insight
Walk from kept sign to kept sign. From sign i with its current rate, choose the next kept sign j; the signs in between are merged (j − i − 1 merges), the drive costs distance × rate, and sign j starts with time[j] plus the removed times.

## Approach: Memo over (i, merges, rate)
```java
// Top-down over (current sign, merges left, rate at the current sign)
public int minTravelTime(int l, int n, int k, int[] position, int[] time) {
    int sum = 0;
    for (int t : time) sum += t;
    Integer[][][] memo = new Integer[n][k + 1][sum + 1];
    return go(0, k, time[0], position, time, memo);
}

// Least time from sign i (driving at rate) to the end using exactly left merges
private int go(int i, int left, int rate, int[] pos, int[] time, Integer[][][] memo) {
    int n = pos.length;
    if (i == n - 1) return left == 0 ? 0 : Integer.MAX_VALUE;
    if (memo[i][left][rate] != null) return memo[i][left][rate];
    int best = Integer.MAX_VALUE, carried = 0;
    for (int j = i + 1; j < n && j - i - 1 <= left; j++) {
        int rest = go(j, left - (j - i - 1), time[j] + carried, pos, time, memo);
        if (rest != Integer.MAX_VALUE) best = Math.min(best, (pos[j] - pos[i]) * rate + rest);
        carried += time[j];
    }
    return memo[i][left][rate] = best;
}
```

| Approach | Time | Space |
|---|---|---|
| Memo over (i, merges, rate) | O(n² · k · Σtime) | O(n · k · Σtime) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the rate part of the state?</summary>

Merged times change the rate at the next kept sign.

</details>


<details><summary>Exactly k?</summary>

The base case rejects plans that end with merges left.

</details>


## Connected
- [Frog Jump](Frog%20Jump.md)
- [Minimum Cost to Cut a Stick](../Interval%20DP/Minimum%20Cost%20to%20Cut%20a%20Stick.md)
