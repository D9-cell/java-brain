---
topic: Trees and Advanced Graphs
pattern: [BFS on counts, Ordered sets]
source: LeetCode 3666
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Minimum Operations to Equalize Binary String

> [!TIP]
> **🧠 Memory hook**
> You only ever need to know how many zeros are left, not which positions.
> **Mantra: STATE = NUMBER OF ZEROS; NEXT = z + k − 2f**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=17) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Each operation flips exactly k characters of a binary string. Return the minimum operations to make every character 1, or −1.

## Key insight
Positions are interchangeable, so the state is the number of zeros z. Flipping f zeros and k − f ones leads to z + k − 2f zeros, for f in a range. BFS over z works; to skip already visited states keep the unvisited ones in two ordered sets (by parity) and pull out the whole reachable range.

## Approach 1: BFS over the zero count
```java
// The state is just the number of zeros z. Flipping f zeros and k - f ones gives z + k - 2f zeros, so BFS over z
public int minOperationsBfs(String s, int k) {
    int n = s.length(), zeros = 0;
    for (char c : s.toCharArray()) if (c == '0') zeros++;
    if (zeros == 0) return 0;
    int[] ops = new int[n + 1];
    Arrays.fill(ops, -1);
    Queue<Integer> que = new ArrayDeque<>(List.of(zeros));
    ops[zeros] = 0;
    while (!que.isEmpty()) {
        int z = que.poll();
        int minF = Math.max(0, k - n + z), maxF = Math.min(k, z);
        for (int f = minF; f <= maxF; f++) {
            int next = z + k - 2 * f;
            if (ops[next] == -1) {
                ops[next] = ops[z] + 1;
                if (next == 0) return ops[next];
                que.add(next);
            }
        }
    }
    return -1;
}
```

## Approach 2: BFS with ordered sets (skip visited)
```java
// Same BFS but unvisited states live in two ordered sets (by parity), so each state is removed once instead of rescanned
public int minOperations(String s, int k) {
    int n = s.length(), zeros = 0;
    for (char c : s.toCharArray()) if (c == '0') zeros++;
    if (zeros == 0) return 0;
    int[] ops = new int[n + 1];
    Arrays.fill(ops, -1);
    TreeSet<Integer> even = new TreeSet<>(), odd = new TreeSet<>();
    for (int c = 0; c <= n; c++) (c % 2 == 0 ? even : odd).add(c);
    Queue<Integer> que = new ArrayDeque<>(List.of(zeros));
    ops[zeros] = 0;
    (zeros % 2 == 0 ? even : odd).remove(zeros);
    while (!que.isEmpty()) {
        int z = que.poll();
        int low = z + k - 2 * Math.min(k, z), high = z + k - 2 * Math.max(0, k - n + z);
        TreeSet<Integer> set = low % 2 == 0 ? even : odd;
        Integer val = set.ceiling(low);
        while (val != null && val <= high) {
            ops[val] = ops[z] + 1;
            if (val == 0) return ops[val];
            que.add(val);
            set.remove(val);
            val = set.ceiling(low);
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS over the zero count | O(n²) | O(n) |
| BFS with ordered sets (skip visited) | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Why parity sets?</summary>

All next states from z have the same parity (z + k − 2f), so they form a contiguous run of one parity.

</details>


<details><summary>Why can f only be in [max(0, k − n + z), min(k, z)]?</summary>

You cannot flip more zeros than exist, nor more ones than exist.

</details>


## Connected
- [Bit Magic](../../Bit_Magic/Bit%20Magic%20-%20Pattern%20Map.md)
