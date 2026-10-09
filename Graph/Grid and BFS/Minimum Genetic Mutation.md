---
topic: Grid and BFS
pattern: [Implicit graph BFS]
source: LeetCode 433
difficulty: Medium
companies: [Twitter]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Minimum Genetic Mutation

> [!TIP]
> **🧠 Memory hook**
> Genes are rooms; a mutation is a door between genes one letter apart, and only genes in the bank exist.
> **Mantra: ONE LETTER CHANGE, MUST BE IN THE BANK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=17) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Fewest single-letter mutations from startGene to endGene using only genes in the bank, or −1.

## Key insight
It is Word Ladder on the alphabet A, C, G, T: BFS where a gene links to every bank gene one letter away. Generate the neighbours by trying 4 letters per position, or scan the bank for genes differing in exactly one place.

## Approach 1: Generate mutations
```java
// BFS where a mutation changes one letter to A, C, G or T and the result must be in the bank
public int minMutation(String startGene, String endGene, String[] bank) {
    Set<String> valid = new HashSet<>(Arrays.asList(bank));
    if (!valid.contains(endGene)) return -1;
    Set<String> visited = new HashSet<>(List.of(startGene));
    Queue<String> que = new ArrayDeque<>(List.of(startGene));
    int steps = 0;
    while (!que.isEmpty()) {
        for (int size = que.size(); size > 0; size--) {
            String cur = que.poll();
            if (cur.equals(endGene)) return steps;
            char[] c = cur.toCharArray();
            for (int i = 0; i < c.length; i++) {
                char old = c[i];
                for (char g : "ACGT".toCharArray()) {
                    c[i] = g;
                    String next = new String(c);
                    if (valid.contains(next) && visited.add(next)) que.add(next);
                }
                c[i] = old;
            }
        }
        steps++;
    }
    return -1;
}
```

## Approach 2: Scan the bank
```java
// BFS that scans the bank for genes exactly one letter away instead of generating mutations
public int minMutationScan(String startGene, String endGene, String[] bank) {
    List<String> genes = new ArrayList<>(Arrays.asList(bank));
    if (!genes.contains(endGene)) return -1;
    Set<String> visited = new HashSet<>(List.of(startGene));
    Queue<String> que = new ArrayDeque<>(List.of(startGene));
    int steps = 0;
    while (!que.isEmpty()) {
        for (int size = que.size(); size > 0; size--) {
            String cur = que.poll();
            if (cur.equals(endGene)) return steps;
            for (String g : genes) if (!visited.contains(g) && oneApart(cur, g)) { visited.add(g); que.add(g); }
        }
        steps++;
    }
    return -1;
}

// True when the two genes differ in exactly one position
private boolean oneApart(String a, String b) {
    int diff = 0;
    for (int i = 0; i < a.length(); i++) if (a.charAt(i) != b.charAt(i)) diff++;
    return diff == 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Generate mutations | O(8 · L · |bank|) | O(|bank|) |
| Scan the bank | O(|bank|² · L) | O(|bank|) |

> [!WARNING]
> **Java gotcha**
> The start gene need not be in the bank.

## Recall before you reveal
<details><summary>Why return −1 if the end is not in the bank?</summary>

It can never be reached.

</details>


<details><summary>Which neighbour method is better?</summary>

Generation, when the bank is large and the gene short.

</details>


## Connected
- [Word Ladder](Word%20Ladder.md)
- [Open the Lock](Open%20the%20Lock.md)
