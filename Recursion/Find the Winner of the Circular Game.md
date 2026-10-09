---
topic: Recursion
pattern: [Josephus, Shrink and renumber]
source: LeetCode 1823 / GFG
difficulty: Medium
companies: [Amazon, Goldman Sachs]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Find the Winner of the Circular Game

> [!TIP]
> **🧠 Memory hook**
> After each elimination it is the same game with fewer players, with name tags shifted by k.
> **Mantra: w(1) = 0; w(n) = (w(n−1) + k) % n**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=7) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
n friends in a circle; every k-th leaves. Who wins?

## Key insight
Solve n−1, then map the winner's index back by adding k (mod n).

## Approach 1: List simulation
```java
// Approach 1: list simulation, remove index (i + k - 1) % size each round
public int findTheWinnerList(int n, int k) {
    List<Integer> arr = new ArrayList<>();
    for (int i = 1; i <= n; i++) arr.add(i);
    int i = 0;
    while (arr.size() > 1) {
        i = (i + k - 1) % arr.size();
        arr.remove(i);
    }
    return arr.get(0);
}
```

## Approach 2: Queue rotation
```java
// Approach 2: queue rotation, k-1 to the back, remove the k-th
public int findTheWinnerQueue(int n, int k) {
    Queue<Integer> q = new ArrayDeque<>();
    for (int i = 1; i <= n; i++) q.offer(i);
    while (q.size() > 1) {
        for (int c = 1; c < k; c++) q.offer(q.poll());
        q.poll();
    }
    return q.peek();
}
```

## Approach 3: Recursion
```java
// Winner index among n players (0-based): shift the answer for n-1 players by k
static int winnerIdx(int n, int k) {
    if (n == 1) return 0;
    return (winnerIdx(n - 1, k) + k) % n;
}

// Approach 3: recursion, O(n)
public int findTheWinner(int n, int k) {
    return winnerIdx(n, k) + 1;
}
```

## Approach 4: Iterative recurrence
```java
// Approach 4: the same recurrence bottom-up, O(1) space
public int findTheWinnerIterative(int n, int k) {
    int idx = 0;
    for (int m = 2; m <= n; m++) idx = (idx + k) % m;
    return idx + 1;
}
```

| Approach | Time | Space |
|---|---|---|
| List simulation | O(n²) | O(n) |
| Queue rotation | O(n·k) | O(n) |
| Recursion | O(n) | O(n) stack |
| Iterative recurrence | O(n) | O(1) |

## Recall before you reveal
<details><summary>Why + k?</summary>

The smaller game starts right after the removed person, k seats later.

</details>


## Connected
- Queue rotation: [Reveal Cards In Increasing Order](../Queue/Reveal%20Cards%20In%20Increasing%20Order.md)
