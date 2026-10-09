---
topic: Intervals and Scheduling
pattern: [Frequency formula, Heap simulation]
source: LeetCode 621
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Task Scheduler

> [!TIP]
> **🧠 Memory hook**
> The most frequent task decides the **frame**: `(max − 1)` blocks of `n + 1` slots, plus the last row.
> **Mantra: (maxFreq − 1)·(n + 1) + tiesAtMax**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=6) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Identical tasks must be at least `n` intervals apart (idle slots allowed). Return the minimum number of intervals to run all tasks.

## Key insight
Arrange the most frequent task `max` times with gaps of `n`. That creates `max - 1` rows of width `n + 1`, plus a last row holding every task tied for the maximum. Other tasks fill idle slots; if the answer is smaller than the number of tasks, no idle time is needed.

## Approach 1: Formula
```java
// The most frequent task creates (max - 1) gaps of length n + 1; tasks tied for the maximum fill the last slot
public int leastInterval(char[] tasks, int n) {
    int[] cnt = new int[26];
    int max = 0;
    for (char c : tasks) max = Math.max(max, ++cnt[c - 'A']);
    int ties = 0;
    for (int c : cnt) if (c == max) ties++;
    return Math.max(tasks.length, (max - 1) * (n + 1) + ties);
}
```

## Approach 2: Heap simulation
```java
// Simulation: every cycle of n + 1 slots runs the most frequent available tasks, then waits
public int leastIntervalSimulation(char[] tasks, int n) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    int[] cnt = new int[26];
    for (char c : tasks) cnt[c - 'A']++;
    for (int c : cnt) if (c > 0) pq.add(c);
    int time = 0;
    while (!pq.isEmpty()) {
        List<Integer> back = new ArrayList<>();
        int slots = n + 1;
        while (slots > 0 && !pq.isEmpty()) {
            int c = pq.poll();
            if (c > 1) back.add(c - 1);
            slots--;
            time++;
        }
        pq.addAll(back);
        if (!pq.isEmpty()) time += slots;
    }
    return time;
}
```

| Approach | Time | Space |
|---|---|---|
| Formula | O(T) | O(1) |
| Heap simulation | O(T log 26) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a breadth-first search over (remaining counts, cooldowns). Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why `Math.max(tasks.length, …)`?</summary>

With many different tasks the frame has no idle slots and the answer equals the task count.

</details>


## Connected
- [Earliest Possible Day of Full Bloom](Earliest%20Possible%20Day%20of%20Full%20Bloom.md)
- [Reorganize String](../../Heap/Reorganize%20String.md)
