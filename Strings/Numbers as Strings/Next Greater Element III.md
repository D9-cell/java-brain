---
topic: Numbers as Strings
pattern: [Next permutation]
source: LeetCode 556
difficulty: Medium
companies: [Amazon, Bloomberg]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Next Greater Element III

> [!TIP]
> **🧠 Memory hook**
> **Next permutation** of the digits: find the drop from the right, swap with the next bigger digit to its right, reverse the tail. Reject if > int max.
> **Mantra: i = last d[i] < d[i+1] · j = last d[j] > d[i] · swap · reverse(i+1..)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=6) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
Return the smallest integer greater than n that uses exactly the same digits, or -1 if none exists or it does not fit in 32 bits.

## Key insight
The suffix after i is non-increasing (the largest arrangement). Raising d[i] by the smallest possible amount and sorting the suffix ascending (reversing it) gives the next arrangement.

## Approach: Next permutation
```java
// Next permutation of the digits, rejected if it leaves the int range
public int nextGreaterElement(int n) {
    char[] d = String.valueOf(n).toCharArray();
    int i = d.length - 2;
    while (i >= 0 && d[i] >= d[i + 1]) i--;
    if (i < 0) return -1;
    int j = d.length - 1;
    while (d[j] <= d[i]) j--;
    char t = d[i];
    d[i] = d[j];
    d[j] = t;
    for (int l = i + 1, r = d.length - 1; l < r; l++, r--) {
        t = d[l];
        d[l] = d[r];
        d[r] = t;
    }
    long v = Long.parseLong(new String(d));
    return v > Integer.MAX_VALUE ? -1 : (int) v;
}
```

| Approach | Time | Space |
|---|---|---|
| Next permutation | O(log n) | O(log n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why reverse instead of sort?</summary>

The suffix is already non-increasing, so reversing sorts it.

</details>


<details><summary>Why parse as long?</summary>

The result can exceed Integer.MAX_VALUE.

</details>


## Connected
- [Maximum Swap](Maximum%20Swap.md)
