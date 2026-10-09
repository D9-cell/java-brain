---
topic: Strings and Digits
pattern: [Alternate by depth]
source: LeetCode 1111
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Nesting Depth of Two Valid Parentheses Strings

> [!TIP]
> **🧠 Memory hook**
> Deal brackets into two piles **by depth parity**, so every nested level switches pile.
> **Mantra: DEPTH PARITY DECIDES THE GROUP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=11) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Split a valid parentheses string into two valid subsequences A and B minimising max(depth(A), depth(B)). Return the group of every character.

## Key insight
Give a `(` and its matching `)` the group `depth % 2`. Every extra nesting level alternates between the groups, so the maximum depth halves (rounded up), which is optimal.

## Approach 1: Depth parity
```java
// Give '(' alternately to string 0 and string 1 by the current depth; the depths split evenly
public int[] maxDepthAfterSplit(String seq) {
    int[] res = new int[seq.length()];
    int depth = 0;
    for (int i = 0; i < seq.length(); i++) {
        if (seq.charAt(i) == '(') { depth++; res[i] = depth % 2; }
        else { res[i] = depth % 2; depth--; }
    }
    return res;
}
```

## Approach 2: Stack of opening indexes
```java
// Parity of the index of each parenthesis in an alternating pattern, same split by the position of the pair
public int[] maxDepthAfterSplitByIndex(String seq) {
    int[] res = new int[seq.length()];
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i < seq.length(); i++) {
        if (seq.charAt(i) == '(') { res[i] = st.size() % 2; st.push(i); }
        else { int j = st.pop(); res[i] = res[j]; }
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Depth parity | O(n) | O(n) |
| Stack of opening indexes | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> The test verifies both validity and optimality of the returned groups. Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Is the answer unique?</summary>

No; any assignment with the minimal max depth is accepted.

</details>


## Connected
- [Maximum Nesting Depth of the Parentheses](../../Stack/Maximum%20Nesting%20Depth%20of%20the%20Parentheses.md)
