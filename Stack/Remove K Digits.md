---
topic: Stack
pattern: [Monotonic stack (greedy)]
source: LeetCode 402
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Remove K Digits

> [!TIP]
> **🧠 Memory hook**
> Smaller digits want to be early: a bigger earlier digit steps aside.
> **Mantra: INCREASING STACK, POP BIGGER WHILE k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=26) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Smallest number after removing k digits.

## Key insight
Keep digits increasing: pop a bigger previous digit while k > 0; drop leftovers from the tail; strip leading zeros.

## Approach: Monotonic stack
```java
// Monotonic increasing stack: drop a bigger previous digit while removals remain; trim the tail; strip leading zeros
public String removeKdigits(String num, int k) {
    StringBuilder st = new StringBuilder();
    for (char c : num.toCharArray()) {
        while (k > 0 && st.length() > 0 && st.charAt(st.length() - 1) > c) { st.deleteCharAt(st.length() - 1); k--; }
        st.append(c);
    }
    st.setLength(st.length() - k);
    int i = 0;
    while (i < st.length() - 1 && st.charAt(i) == '0') i++;
    String res = st.substring(i);
    return res.isEmpty() ? "0" : res;
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against every choice of kept digits.

## Recall before you reveal
<details><summary>Empty result?</summary>

"0".

</details>


## Connected
- Greedy folder: Remove Duplicate Letters
