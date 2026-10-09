---
topic: Heap
pattern: [Greedy arrangement]
source: LeetCode 767
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Reorganize String

> [!TIP]
> **🧠 Memory hook**
> Seat the biggest family on every other chair first.
> **Mantra: MAX ≤ (n+1)/2, EVEN SLOTS FIRST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=23) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Rearrange so no two adjacent characters match, or return "".

## Key insight
Impossible iff maxCount > (n+1)/2. Otherwise place the most frequent letter on even indices, then fill the remaining even slots, then the odd ones.

## Approach 1: Max-heap pairs
```java
// Approach 1: max-heap by count; place the top two different letters each round
public String reorganizeStringHeap(String s) {
    int[] cnt = new int[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[0] - a[0]);
    for (int c = 0; c < 26; c++) if (cnt[c] > 0) pq.offer(new int[]{cnt[c], c});
    StringBuilder sb = new StringBuilder();
    while (pq.size() >= 2) {
        int[] a = pq.poll(), b = pq.poll();
        sb.append((char) ('a' + a[1])).append((char) ('a' + b[1]));
        if (--a[0] > 0) pq.offer(a);
        if (--b[0] > 0) pq.offer(b);
    }
    if (!pq.isEmpty()) {
        int[] a = pq.poll();
        if (a[0] > 1) return "";
        sb.append((char) ('a' + a[1]));
    }
    return sb.toString();
}
```

## Approach 2: Even/odd placement
```java
// Approach 2: put the most frequent letter on even indices, then fill the remaining slots (even, then odd)
public String reorganizeString(String s) {
    int n = s.length();
    int[] cnt = new int[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    int top = 0;
    for (int c = 0; c < 26; c++) if (cnt[c] > cnt[top]) top = c;
    if (cnt[top] > (n + 1) / 2) return "";
    char[] res = new char[n];
    int i = 0;
    while (cnt[top]-- > 0) { res[i] = (char) ('a' + top); i += 2; }
    for (int c = 0; c < 26; c++)
        while (cnt[c] > 0) {
            if (i >= n) i = 1;
            res[i] = (char) ('a' + c);
            i += 2;
            cnt[c]--;
        }
    return new String(res);
}
```

| Approach | Time | Space |
|---|---|---|
| Max-heap pairs | O(n log 26) | O(26) |
| Even/odd placement | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Both outputs validated (no equal neighbours, same letters) on 500 random strings.

## Recall before you reveal
<details><summary>Why start with the most frequent?</summary>

It needs the most separated slots.

</details>


## Connected
- [Task Scheduler](Task%20Scheduler.md)
- [Longest Happy String](Longest%20Happy%20String.md)
