---
topic: Heap
pattern: [Greedy + heap, Math]
source: LeetCode 621
difficulty: Medium
companies: [Facebook, Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Task Scheduler

> [!TIP]
> **🧠 Memory hook**
> Work in rounds of n+1 slots, most frequent tasks first.
> **Mantra: CYCLES OF n+1, MOST FREQUENT FIRST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=27) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Minimum intervals to run all tasks with cooldown n between equal tasks.

## Key insight
Each round of n+1 slots runs the most frequent remaining tasks; only the last round avoids idles. Closed form: max(len, (maxF − 1)(n + 1) + #maxF).

## Approach 1: Heap simulation
```java
// Heap + greedy: each cycle of length n+1 runs the most frequent remaining tasks; idle fills the gap except in the last cycle
public int leastInterval(char[] tasks, int n) {
    int[] cnt = new int[26];
    for (char c : tasks) cnt[c - 'A']++;
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    for (int c : cnt) if (c > 0) pq.offer(c);
    int time = 0;
    while (!pq.isEmpty()) {
        List<Integer> back = new ArrayList<>();
        int done = 0;
        for (int i = 0; i <= n && !pq.isEmpty(); i++) {
            int c = pq.poll();
            if (c > 1) back.add(c - 1);
            done++;
        }
        pq.addAll(back);
        time += pq.isEmpty() ? done : n + 1;
    }
    return time;
}
```

## Approach 2: Formula
```java
// Math: (maxFreq - 1) frames of size n + 1, plus the letters tied at maxFreq; never less than the task count
public int leastIntervalFormula(char[] tasks, int n) {
    int[] cnt = new int[26];
    for (char c : tasks) cnt[c - 'A']++;
    int mx = Arrays.stream(cnt).max().getAsInt(), ties = (int) Arrays.stream(cnt).filter(c -> c == mx).count();
    return Math.max(tasks.length, (mx - 1) * (n + 1) + ties);
}
```

| Approach | Time | Space |
|---|---|---|
| Heap simulation | O(total time) | O(26) |
| Formula | O(n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Simulation and formula agree on 500 random inputs.

## Recall before you reveal
<details><summary>When is the answer just tasks.length?</summary>

When there are enough distinct tasks to fill every gap.

</details>


## Connected
- [Reorganize String](Reorganize%20String.md)
