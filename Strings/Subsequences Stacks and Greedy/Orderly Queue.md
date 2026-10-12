---
topic: Subsequences Stacks and Greedy
pattern: [Case split]
source: LeetCode 899
difficulty: Hard
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Orderly Queue

> [!TIP]
> **🧠 Memory hook**
> **k = 1**: only rotations are reachable, try all. **k ≥ 2**: any two adjacent letters can be swapped, so **sort**.
> **Mantra: k > 1 → sorted · k == 1 → min rotation**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=11) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
You may move one of the first k letters to the end, any number of times. Return the lexicographically smallest string reachable.

## Key insight
With k ≥ 2 you can rotate while holding one letter back, which lets you swap any adjacent pair, so every permutation is reachable.

## Approach: Rotations or sort
```java
// k = 1 only rotates, so try every rotation; k >= 2 can reach any order, so sort
public String orderlyQueue(String s, int k) {
    if (k > 1) {
        char[] c = s.toCharArray();
        Arrays.sort(c);
        return new String(c);
    }
    String best = s;
    for (int i = 1; i < s.length(); i++) {
        String rot = s.substring(i) + s.substring(0, i);
        if (rot.compareTo(best) < 0) best = rot;
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Rotations or sort | O(n²) or O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does k ≥ 2 allow swaps?</summary>

Keep moving the second letter to the end to cycle past the first, effectively swapping.

</details>


<details><summary>Faster min rotation?</summary>

Booth's algorithm in O(n).

</details>


## Connected
- [Find the Lexicographically Largest String From the Box I](Find%20the%20Lexicographically%20Largest%20String%20From%20the%20Box%20I.md)
