---
topic: Numbers as Strings
pattern: [Digit walk, Prefix count]
source: LeetCode 2999
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count the Number of Powerful Integers

> [!TIP]
> **🧠 Memory hook**
> count(x) = numbers ≤ x that **end with s** and have **all digits ≤ limit**. Walk the free prefix digits of x: each smaller digit frees the rest as **(limit + 1)^rest**.
> **Mantra: answer = count(finish) − count(start − 1) · prefix digit d: add d·(limit+1)^rest · d > limit → add all and stop**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=10) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
A number is powerful if it ends with suffix s and each of its digits is at most limit. Count powerful integers in [start, finish].

## Key insight
Only the prefix in front of s is free. Compare position by position with x: a digit below x's digit leaves the rest free. If x's digit exceeds limit, every allowed digit is smaller, so all remaining combinations count. Reaching the end, include x's own prefix if its last |s| digits are ≥ s.

## Approach: Digit walk
```java
// count(x) = numbers <= x ending with s and with every digit <= limit; answer count(finish) - count(start - 1)
public long numberOfPowerfulInt(long start, long finish, int limit, String s) {
    return count(finish, limit, s) - count(start - 1, limit, s);
}

// Digit walk over the free prefix in front of the fixed suffix s
long count(long x, int limit, String s) {
    String t = String.valueOf(x);
    if (t.length() < s.length()) return 0;
    int pre = t.length() - s.length();
    long result = 0;
    for (int i = 0; i < pre; i++) {
        int d = t.charAt(i) - '0';
        if (d > limit) return result + (long) Math.pow(limit + 1, pre - i);
        result += d * (long) Math.pow(limit + 1, pre - i - 1);
    }
    if (t.substring(pre).compareTo(s) >= 0) result++;
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Digit walk | O(log finish) | O(log finish) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why subtract count(start − 1)?</summary>

Range counts are differences of prefix counts.

</details>


<details><summary>Why compare the suffix at the end?</summary>

With the prefix equal to x's, s must not exceed x's last digits.

</details>


## Connected
- [Numbers At Most N Given Digit Set](../../Mathematical/Counting%20and%20Modular%20Combinatorics/Numbers%20At%20Most%20N%20Given%20Digit%20Set.md)
