---
topic: Heap
pattern: [Greedy + heap]
source: LeetCode 1405
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Longest Happy String

> [!TIP]
> **🧠 Memory hook**
> Speak with the letter that has the most left, but never three in a row.
> **Mantra: MAX-HEAP, AVOID 3-RUN WITH RUNNER-UP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=12) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Longest string with at most a/b/c copies of each letter and no three equal letters in a row.

## Key insight
Use the most plentiful letter unless the last two characters are that letter; then use the runner-up once.

## Approach: Greedy max-heap
```java
// Always try the letter with the most left; if it would make three in a row, use the second most instead
public String longestDiverseString(int a, int b, int c) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> y[0] - x[0]);
    if (a > 0) pq.offer(new int[]{a, 'a'});
    if (b > 0) pq.offer(new int[]{b, 'b'});
    if (c > 0) pq.offer(new int[]{c, 'c'});
    StringBuilder sb = new StringBuilder();
    while (!pq.isEmpty()) {
        int[] first = pq.poll();
        int n = sb.length();
        if (n >= 2 && sb.charAt(n - 1) == first[1] && sb.charAt(n - 2) == first[1]) {
            if (pq.isEmpty()) break;
            int[] second = pq.poll();
            sb.append((char) second[1]);
            if (--second[0] > 0) pq.offer(second);
            pq.offer(first);
        } else {
            sb.append((char) first[1]);
            if (--first[0] > 0) pq.offer(first);
        }
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy max-heap | O(a + b + c) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked happy, within limits and of optimal length for all a, b, c ≤ 5 (exhaustive search).

## Recall before you reveal
<details><summary>Stop condition?</summary>

The top is blocked and nothing else remains.

</details>


## Connected
- [Reorganize String](Reorganize%20String.md)
