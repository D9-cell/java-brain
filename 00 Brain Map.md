---
type: brain-map
tags: [java-brain]
---
# 🧠 Java Brain: DS & Algo in Java

**All animations hub:** [▶ Open in browser](https://d9-cell.github.io/java-brain/index.html) (every topic page links back here and to its previous/next topic; each problem has a *Solve on LeetCode/GfG/CSES* button)

Each topic is rebuilt in **Java**. Once a topic is finished its C++ folder is removed (recoverable from git history), and its notes do not link to C++, wired around how memory works:

| Brain principle | What it looks like here |
|---|---|
| **Dual coding** (picture + words beat words alone) | Every approach has a step-by-step animation with the Java line highlighted in sync |
| **Elaborative encoding** (a story beats a fact) | A 🧠 memory hook and a short **mantra** per problem |
| **Chunking / schemas** (experts remember patterns) | Each topic has a *Pattern Map*; problems link to patterns and to cousins in other folders. Open Graph view. |
| **Retrieval practice** (recalling > rereading) | Collapsed *Recall before you reveal* questions + *Predict mode* in animations |
| **Spaced repetition** (review just before you forget) | `next_review` in each note + [Review Dashboard](Review%20Dashboard.md) |
| **Interleaving** (mixing builds "which pattern?") | The dashboard mixes due problems from all topics |

## How to study one problem (≈15 min)
1. Read the hook + mantra. Close your eyes and picture it.
2. Open the animation and turn on **Predict mode**. Guess each step before revealing it.
3. Write the Java from memory in a blank editor. Then compare with the Java in the note.
4. Answer the recall questions **out loud**.
5. Bump `review_stage` and set `next_review` (stages: 1 → 3 → 7 → 21 → 60 days). If you failed recall, reset to stage 0 (tomorrow).

## Topics
### Small folders (≤ 25 problems): ✅ all done
| Topic | Problems | Animations |
|---|---|---|
| Queue | 2 | `Queue/Queue Animations.html` |
| Binary Lifting | 3 | `Binary Lifting/Binary Lifting Animations.html` |
| Meet In The Middle (CSES) | 4 | `Meet In The Middle/Meet In The Middle Animations.html` |
| Line Sweep | 8 | `Line Sweep/Line Sweep Animations.html` |
| Trie | 10 | `Trie/Trie Animations.html` |
| Segment Tree | 14 | `Segment Tree/Segment Tree Animations.html` |
| HashSet | 16 | `HashSet/HashSet Animations.html` |
| Recursion | 23 | `Recursion/Recursion Animations.html` |

### Medium folders (26–60): ✅ all done
Each topic folder has `<Topic> Animations.html`; the Java lives in each problem note.

| Topic                                        | Problems | Status |
| -------------------------------------------- | -------- | ------ |
| Design             | 33       | ✅      |
| Heap                 | 35       | ✅      |
| Backtracking | 36       | ✅      |
| Stack               | 37       | ✅      |
| Linked List   | 39       | ✅      |
| HashMap           | 46       | ✅      |
| Bit Magic       | 52       | ✅      |
| Sliding Window | 58       | ✅      |

### Large folders (> 60)
**Graph: ✅ done** (148 distinct problems, split into 7 pages; the C++ `Graph/` folder was removed). Duplicates across sub-folders (e.g. *Find the City*, *Max Area of Island*, *Most Stones Removed*) are one note with all approaches.

| Topic | Problems | Page |
| --- | --- | --- |
| Graph Basics | 31 | `Graph/Graph Basics/Graph Basics Animations.html` |
| Grid and BFS | 27 | `Graph/Grid and BFS/Grid and BFS Animations.html` |
| Trees and Advanced Graphs | 22 | `Graph/Trees and Advanced Graphs/…` |
| Shortest Paths | 30 | `Graph/Shortest Paths/…` |
| Disjoint Set | 18 | `Graph/Disjoint Set/…` |
| Topological Sort | 12 | `Graph/Topological Sort/…` |
| Spanning Trees and Euler | 8 | `Graph/Spanning Trees and Euler/…` |

**Tree: ✅ done** (106 notes in 4 pages). Binary-tree problems that appear in several variants (Vertical, Diagonal, Boundary, LCA, Views) are one note with all approaches.

| Topic | Problems | Page |
| --- | --- | --- |
| Traversals and Views | 27 | `Tree/Traversals and Views/Traversals and Views Animations.html` |
| DFS and Recursion | 42 | `Tree/DFS and Recursion/DFS and Recursion Animations.html` |
| LCA Distance and Tree Graphs | 13 | `Tree/LCA Distance and Tree Graphs/…` |
| BST and Construction | 24 | `Tree/BST and Construction/…` |

**Greedy: ✅ done** (80 notes in 4 pages). Problems with variants (Rope Colorful, Rounds of Tasks, Cutting Cake I and II, Greater Tree) are one note with all approaches. Every solution was checked against brute force.

| Topic | Problems | Page |
| --- | --- | --- |
| Sorting and Matching | 23 | `Greedy/Sorting and Matching/Sorting and Matching Animations.html` |
| Intervals and Scheduling | 14 | `Greedy/Intervals and Scheduling/…` |
| Scans and Counting | 17 | `Greedy/Scans and Counting/…` |
| Strings and Digits | 26 | `Greedy/Strings and Digits/…` |

**DP: ✅ done** (211 notes in 14 pages). Problems that Greedy, Heap, Graph or Recursion already cover are not repeated here (Furthest Building, Fractional Knapsack, Freedom Trail, Constrained Subsequence Sum, Minimum Number of Taps, Maximum Length of a Concatenated String). Every solution was checked against a brute-force search or the published samples.

| Topic | Problems | Page |
| --- | --- | --- |
| Stairs and Robbers | 21 | `DP/Stairs and Robbers/…` |
| Counting Walks and Moves | 24 | `DP/Counting Walks and Moves/…` |
| Jumps and Reach | 15 | `DP/Jumps and Reach/…` |
| Stock and Kadane States | 14 | `DP/Stock and Kadane States/…` |
| Knapsack Series | 19 | `DP/Knapsack Series/…` |
| Strings and Subsequences | 16 | `DP/Strings and Subsequences/…` |
| Palindromes and Word Splits | 13 | `DP/Palindromes and Word Splits/…` |
| LIS and Variants | 21 | `DP/LIS and Variants/…` |
| Grid Paths | 19 | `DP/Grid Paths/…` |
| Grid Shapes and Colorings | 9 | `DP/Grid Shapes and Colorings/…` |
| Interval DP | 12 | `DP/Interval DP/…` |
| Game DP | 11 | `DP/Game DP/…` |
| Scheduling and Partitions | 8 | `DP/Scheduling and Partitions/…` |
| Bitmask Digit and Tree DP | 9 | `DP/Bitmask Digit and Tree DP/…` |

**Mathematical: ✅ done** (88 notes in 5 pages). Range Sum Query - Mutable already lives in Segment Tree, and the two copies of Calculate Money in Leetcode Bank became one note. Every solution was checked against a brute-force version or the published samples; the random-sampling classes were checked statistically.

| Topic | Problems | Page |
| --- | --- | --- |
| Digits and Powers | 22 | `Mathematical/Digits and Powers/…` |
| Primes Divisors and Remainders | 16 | `Mathematical/Primes Divisors and Remainders/…` |
| Counting and Modular Combinatorics | 18 | `Mathematical/Counting and Modular Combinatorics/…` |
| Formulas and Observations | 19 | `Mathematical/Formulas and Observations/…` |
| Geometry and Randomness | 13 | `Mathematical/Geometry and Randomness/…` |

### Still to do ⏳
strings 112 · Arrays 383 · Design (33 C++ files, check overlap with the Design topic)

## Bugs found in the originals while porting
- **Array Pair Sum Divisibility** (HashSet): the set-based approach returns false for `[1,1,3,3], k=4`. Fixed with remainder counts.
- **Number of Ways to Assign Edge Weights II** (Binary Lifting): a recursive DFS would overflow Java's stack on a 1e5-node path. Uses BFS.
- **Reverse First K of Queue**: the Java TLE came from `java.util.Stack`. Uses `ArrayDeque`.
- **Calculate ⌈7n/8⌉** (Bit Magic): the question asks for the ceiling but the code computes the floor (`n = 9` gives 7 instead of 8). The Java note has both; the ceiling adds 7 before `>> 3`.
- **Frequency of the Most Frequent Element** (Sliding Window): the binary-search approach keeps the cost in `int ops`, which overflows. 99,995 values 11/12/13 plus five 66086, k = 13713 gives 65008 instead of 47045. The Java uses `long`.
- **Minimum Swaps to Group All 1's Together** (Sliding Window): does not compile (`n` and `arr` are undeclared; the parameter is `data`), and returns −1 when there are no 1s, where the answer is 0.
- **Maximum Points You Can Obtain from Cards** (Sliding Window): approach 1 reads an undeclared `nums` and does not compile.
- **Vowels in Even Counts** (Sliding Window): approaches 1 and 2 use an undeclared `stateMap` and do not compile.
- **Find whether path exists (grid)** (Graph): both originals never set `source_found`/`dest_found`, so they take the *last* 1 and 2; the BFS marks cells when polled, and the DFS un-marks cells after use, which makes it exponential.
- **DFS Traversal (iterative)** (Graph): the original pushes neighbours forward, so its iterative order (2 3 0 1) differs from the recursive one (2 0 1 3).
- **Euler Circuit in an Undirected Graph** (Graph): checks only that all degrees are even, so two disjoint triangles are accepted; connectivity is also required.
- **The Maze II** (Graph): the C++ BFS function has no return statement (undefined behaviour); the result only works through the side effect on the table.
- **Minimum Cost to Make at Least One Valid Path** (Graph): the backtracking DFS in the original is exponential and times out; the Java uses 0-1 BFS and Dijkstra.
