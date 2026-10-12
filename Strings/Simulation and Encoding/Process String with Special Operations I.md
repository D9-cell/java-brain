---
topic: Simulation and Encoding
pattern: [Builder simulation]
source: LeetCode 3612
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Process String with Special Operations I

> [!TIP]
> **🧠 Memory hook**
> Apply each symbol to a builder: **letter** appends, **\*** deletes last, **#** doubles, **%** reverses.
> **Mantra: letter → append · * → delete last · # → append copy · % → reverse**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=7) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Process s left to right, starting from an empty result: a letter is appended, * removes the last character (if any), # duplicates the result and appends it, % reverses the result. Return the result.

## Key insight
Lengths stay small in part I, so direct simulation with StringBuilder works.

## Approach: Simulate
```java
// Apply each symbol to a builder: * deletes, # doubles, % reverses, a letter appends
public String processStr(String s) {
    StringBuilder res = new StringBuilder();
    for (char c : s.toCharArray()) {
        if (c == '*') {
            if (res.length() > 0) res.deleteCharAt(res.length() - 1);
        } else if (c == '#') res.append(res.toString());
        else if (c == '%') res.reverse();
        else res.append(c);
    }
    return res.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Simulate | O(final length · n) | O(final length) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why copy before appending in #?</summary>

Appending a builder to itself while reading it is unsafe.

</details>


<details><summary>Huge results?</summary>

See part II: track only the length.

</details>


## Connected
- [Process String with Special Operations II](Process%20String%20with%20Special%20Operations%20II.md)
- [Decoded String at Index](Decoded%20String%20at%20Index.md)
