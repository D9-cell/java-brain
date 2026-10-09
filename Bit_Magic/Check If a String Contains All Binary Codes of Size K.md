---
topic: Bit Magic
pattern: [Rolling mask]
source: LeetCode 1461
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Check If a String Contains All Binary Codes of Size K

> [!TIP]
> **🧠 Memory hook**
> A k-bit window slides along as an integer.
> **Mantra: ROLLING MASK, COUNT 2^k DISTINCT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=3) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Does s contain every binary string of length k?

## Key insight
Collect every length-k window; there must be 2^k distinct ones. As an int: shift in the new bit and mask.

## Approach 1: Set of substrings
```java
// Approach 1: collect every length-k substring in a set; need 2^k distinct ones
public boolean hasAllCodesSet(String s, int k) {
    Set<String> seen = new HashSet<>();
    for (int i = 0; i + k <= s.length(); i++) seen.add(s.substring(i, i + k));
    return seen.size() == (1 << k);
}
```

## Approach 2: Rolling bitmask
```java
// Rolling k-bit window as an integer: shift in the new bit, mask to k bits
public boolean hasAllCodes(String s, int k) {
    int need = 1 << k, mask = need - 1, cur = 0;
    boolean[] seen = new boolean[need];
    for (int i = 0; i < s.length(); i++) {
        cur = ((cur << 1) & mask) | (s.charAt(i) - '0');
        if (i >= k - 1 && !seen[cur]) { seen[cur] = true; if (--need == 0) return true; }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Set of substrings | O(n·k) | O(2^k · k) |
| Rolling bitmask | O(n) | O(2^k) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on random strings.

## Recall before you reveal
<details><summary>Quick reject?</summary>

n − k + 1 < 2^k.

</details>

