---
topic: Digits and Powers
pattern: [Base 1000 bands]
source: LeetCode 3871
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Commas in Range II

> [!TIP]
> **🧠 Memory hook**
> Numbers in **[1000^k, 1000^(k+1))** carry **k commas**. Add each band clipped at n.
> **Mantra: FOR lower = 1000, ×1000: count(lower..min(n, 1000·lower − 1)) · k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=17) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Same as part I but n can be up to 10¹⁵: count all commas written from 1 to n.

## Key insight
Group numbers by how many commas they have. Each band is a contiguous range, so its size is upper − lower + 1. Stop multiplying lower before it overflows a long.

## Approach: Band counting
```java
// Numbers in [1000^k, 1000^(k+1)) carry k commas; add each band clipped at n
public long countCommas(long n) {
    long result = 0;
    long lower = 1000;
    for (int commas = 1; lower <= n; commas++) {
        long upper = Math.min(n, lower * 1000 - 1);
        result += (upper - lower + 1) * commas;
        if (lower > n / 1000) break;
        lower *= 1000;
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Band counting | O(log₁₀₀₀ n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>How many commas does 10¹⁵ have?</summary>

Five: it has 16 digits and (16 − 1) / 3 = 5.

</details>


<details><summary>Why the early break?</summary>

lower · 1000 would overflow long past 10¹⁸.

</details>


## Connected
- [Count Commas in Range](Count%20Commas%20in%20Range.md)
- [Excel Sheet Column Title](Excel%20Sheet%20Column%20Title.md)
