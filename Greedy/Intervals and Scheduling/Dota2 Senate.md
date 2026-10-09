---
topic: Intervals and Scheduling
pattern: [Queues of indexes, Ban the next opponent]
source: LeetCode 649
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Dota2 Senate

> [!TIP]
> **🧠 Memory hook**
> Each senator, when it is their turn, **bans the next opposing senator** who would act.
> **Mantra: TWO QUEUES, SMALLER INDEX WINS AND RETURNS +n**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=11) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Radiant (R) and Dire (D) senators act in rounds; each may ban an opponent or announce victory when only their party remains. Return the winning party.

## Key insight
Keep the indexes of each party in a queue. Compare the fronts: the smaller index acts first and bans the other; it re-enters the queue as `index + n` for the next round.

## Approach 1: Two queues
```java
// Each senator bans the next opposing senator who would act. Two queues of indexes; the earlier index acts and re-enters the next round
public String predictPartyVictory(String senate) {
    int n = senate.length();
    Queue<Integer> r = new LinkedList<>(), d = new LinkedList<>();
    for (int i = 0; i < n; i++) if (senate.charAt(i) == 'R') r.add(i); else d.add(i);
    while (!r.isEmpty() && !d.isEmpty()) {
        int a = r.poll(), b = d.poll();
        if (a < b) r.add(a + n); else d.add(b + n);
    }
    return r.isEmpty() ? "Dire" : "Radiant";
}
```

## Approach 2: Round by round with ban counters
```java
// Counting version: carry how many bans each side still owes while scanning circularly
public String predictPartyVictoryCounting(String senate) {
    StringBuilder cur = new StringBuilder(senate);
    int rBans = 0, dBans = 0;
    while (true) {
        StringBuilder next = new StringBuilder();
        int r = 0, d = 0;
        for (char c : cur.toString().toCharArray()) {
            if (c == 'R') { if (dBans > 0) dBans--; else { next.append('R'); r++; rBans++; } }
            else { if (rBans > 0) rBans--; else { next.append('D'); d++; dBans++; } }
        }
        if (r == 0) return "Dire";
        if (d == 0) return "Radiant";
        cur = next;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Two queues | O(n) | O(n) |
| Round by round with ban counters | O(n²) worst | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why ban the next opponent and not the first one?</summary>

The next opponent is the one who would act soonest and hurt your party most.

</details>


## Connected
- [Split Array into Consecutive Subsequences](Split%20Array%20into%20Consecutive%20Subsequences.md)
