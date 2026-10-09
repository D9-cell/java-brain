---
topic: Stack
pattern: [Stack merging]
source: LeetCode 2197
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Replace Non-Coprime Numbers in Array

> [!TIP]
> **🧠 Memory hook**
> Neighbours that share a factor fuse; the fused value may fuse again leftwards.
> **Mantra: STACK, MERGE WITH LCM WHILE gcd > 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=28) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Repeatedly replace adjacent non-coprime numbers by their LCM.

## Key insight
Push each number and keep merging with the top while gcd > 1.

## Approach: Stack
```java
// Euclid
static long gcd(long a, long b) { return b == 0 ? a : gcd(b, a % b); }

// List as a stack: push x, then keep merging the top two while they are not coprime (merge = lcm)
public List<Integer> replaceNonCoprimes(int[] nums) {
    List<Long> st = new ArrayList<>();
    for (int x : nums) {
        long cur = x;
        while (!st.isEmpty()) {
            long top = st.get(st.size() - 1), g = gcd(top, cur);
            if (g == 1) break;
            st.remove(st.size() - 1);
            cur = top / g * cur;
        }
        st.add(cur);
    }
    List<Integer> res = new ArrayList<>();
    for (long v : st) res.add((int) v);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n log V) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against repeated left-to-right merging.

## Recall before you reveal
<details><summary>LCM safely?</summary>

top / gcd * cur in long.

</details>

