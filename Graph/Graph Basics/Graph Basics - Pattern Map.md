---
topic: Graph Basics
type: pattern-map
tags: [java-brain, pattern-map]
---
# Graph Basics: Pattern Map

> [!TIP]
> **🧠 One picture to keep**
> Picture a **city map**. Streets are edges, intersections are nodes.
> 1. **BFS** is a ripple on a pond: it spreads ring by ring (shortest hops).
> 2. **DFS** is a rat in a maze: it dives to a dead end, then backs up.
> 3. **Components**: one flood-fill per island; count the fills.
> 4. **Cycles**: directed = meet yourself *on the current path*; undirected = meet a visited node that is *not your parent*.
> 5. **Colouring**: two paint colours, neighbours must differ; a conflict means an odd cycle.
> 6. **In-degree / out-degree** answers questions about sources, champions and safe nodes without any search.

**All animations:** [▶ Graph Basics Animations](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html) · ⬆ [00 Brain Map](../../00%20Brain%20Map.md)

## Java toolkit
| Need | Java |
|---|---|
| Adjacency list | `List<List<Integer>> adj = new ArrayList<>(); for (...) adj.add(new ArrayList<>());` |
| Weighted edge | `new int[]{to, weight}` in the list |
| Visited | `boolean[] visited = new boolean[n]` (mark when queued for BFS) |
| BFS queue | `Queue<Integer> que = new ArrayDeque<>()` (not `LinkedList`, not `Stack`) |
| DFS stack | `Deque<Integer> stack = new ArrayDeque<>(); stack.push(x); stack.pop()` |
| Component count | one `dfs` call per unvisited node, `count++` each time |
| Union-Find | `parent[]` + `find` with path compression |
| Deep recursion | n ≈ 1e5 chain can overflow the Java stack: switch to BFS or an explicit stack |

## Patterns in this folder
```mermaid
graph LR
  GB((Graph Basics)) --> TR[Traverse<br/>BFS, DFS, Path Exists, Keys and Rooms, Mother Vertex, Clone Graph, All Paths]
  GB --> CMP[Components<br/>Connected Components, Provinces, Count Unreachable Pairs, Min Score of Path, Most Stones]
  GB --> CYC[Cycles<br/>Directed, Undirected, Leads To Destination, Safe States, Longest Cycle]
  GB --> COL[2-colouring<br/>Is Bipartite, Possible Bipartition]
  GB --> DEG[Degree tricks<br/>Min Vertices, Champion II, Star Center, Network Rank, Max Importance, Celebrity]
  GB --> TREE[Tree views<br/>Throne Inheritance, Same Path (tin/tout), Reorder Routes, All Ancestors, Jumping Numbers]
```

| #   | Problem                                                     | Pattern                           | Mantra                                          | Level        | Complete |
| --- | ----------------------------------------------------------- | --------------------------------- | ----------------------------------------------- | ------------ | -------- |
| 1   | [BFS Traversal](BFS%20Traversal.md)                                           | BFS                               | MARK WHEN QUEUED, VISIT WHEN POLLED             | ==🟢Easy==   |          |
| 2   | [DFS Traversal](DFS%20Traversal.md)                                           | DFS                               | MARK, RECORD, RECURSE ON UNVISITED              | ==🟢Easy==   |          |
| 3   | [Find if Path Exists in Graph](Find%20if%20Path%20Exists%20in%20Graph.md)                            | DFS, BFS, Connectivity            | WALK FROM SOURCE; TOUCH TARGET ⇒ TRUE           | ==🟢Easy==   |          |
| 4   | [Find Whether Path Exist in a Grid](Find%20Whether%20Path%20Exist%20in%20a%20Grid.md)                       | Grid BFS, Grid DFS                | MARK ON PUSH; NEVER UN-MARK                     | ==🟠Medium== |          |
| 5   | [Find Mother Vertex in Directed Graph](Find%20Mother%20Vertex%20in%20Directed%20Graph.md)                    | DFS, Kosaraju idea                | LAST DFS START ⇒ CANDIDATE; VERIFY ONCE         | ==🟠Medium== |          |
| 6   | [Keys and Rooms](Keys%20and%20Rooms.md)                                          | DFS, BFS, Reachability            | START AT 0, FOLLOW KEYS, COUNT ROOMS            | ==🟠Medium== |          |
| 7   | [Number of Connected Components in an Undirected Graph](Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)   | Union-Find, DFS, Components       | n − SUCCESSFUL UNIONS                           | ==🟠Medium== |          |
| 8   | [Number of Provinces](Number%20of%20Provinces.md)                                     | DFS, BFS, Components              | NEW START ⇒ COUNT++, FLOOD THE REST             | ==🟠Medium== |          |
| 9   | [Clone Graph](Clone%20Graph.md)                                             | DFS, BFS, HashMap                 | MAP ORIGINAL → CLONE; REGISTER BEFORE RECURSING | ==🟠Medium== |          |
| 10  | [All Paths From Source to Target](All%20Paths%20From%20Source%20to%20Target.md)                         | DFS backtracking, DAG             | ADD, RECURSE, REMOVE                            | ==🟠Medium== |          |
| 11  | [All Paths from Source Lead to Destination](All%20Paths%20from%20Source%20Lead%20to%20Destination.md)               | DFS, Cycle detection              | DEAD END = DEST; BACK EDGE ⇒ FALSE              | ==🟠Medium== |          |
| 12  | [Minimum Number of Vertices to Reach All Nodes](Minimum%20Number%20of%20Vertices%20to%20Reach%20All%20Nodes.md)           | In-degree                         | INDEGREE 0 ⇒ MUST START THERE                   | ==🟠Medium== |          |
| 13  | [Find Champion II](Find%20Champion%20II.md)                                        | In-degree, DAG                    | EXACTLY ONE INDEGREE-0 NODE                     | ==🟠Medium== |          |
| 14  | [Find Center of Star Graph](Find%20Center%20of%20Star%20Graph.md)                               | Degree trick                      | SHARED ENDPOINT OF ANY TWO EDGES                | ==🟢Easy==   | Done     |
| 15  | [Find the Celebrity](Find%20the%20Celebrity.md)                                      | Elimination, Two pass             | ELIMINATE, THEN VERIFY                          | ==🟠Medium== |          |
| 16  | [Maximal Network Rank](Maximal%20Network%20Rank.md)                                    | Degree, Pairs                     | deg(a) + deg(b) − shared                        | ==🟠Medium== |          |
| 17  | [Maximum Total Importance of Roads](Maximum%20Total%20Importance%20of%20Roads.md)                       | Degree, Greedy                    | SORT BY DEGREE, LABEL 1..n                      | ==🟠Medium== |          |
| 18  | [Throne Inheritance](Throne%20Inheritance.md)                                      | Tree DFS, Design                  | PRE-ORDER DFS, SKIP THE DEAD                    | ==🟠Medium== |          |
| 19  | [Jumping Numbers](Jumping%20Numbers.md)                                         | BFS on numbers                    | APPEND last ± 1                                 | ==🟠Medium== |          |
| 20  | [Detect Cycle in a Directed Graph](Detect%20Cycle%20in%20a%20Directed%20Graph.md)                        | DFS, Kahn, Colouring              | BACK EDGE = NODE ON CURRENT PATH                | ==🟠Medium== |          |
| 21  | [Detect Cycle in an Undirected Graph](Detect%20Cycle%20in%20an%20Undirected%20Graph.md)                     | DFS, BFS, Union-Find              | VISITED AND NOT MY PARENT ⇒ CYCLE               | ==🟠Medium== |          |
| 22  | [Is Graph Bipartite](Is%20Graph%20Bipartite.md)                                      | 2-colouring, DFS, BFS, Union-Find | NEIGHBOUR = OPPOSITE COLOUR                     | ==🟠Medium== |          |
| 23  | [Possible Bipartition](Possible%20Bipartition.md)                                    | 2-colouring, BFS                  | DISLIKE EDGE ⇒ DIFFERENT GROUP                  | ==🟠Medium== |          |
| 24  | [Check If Two Nodes Are On Same Path In A Graph](Check%20If%20Two%20Nodes%20Are%20On%20Same%20Path%20In%20A%20Graph.md)          | DFS, Tree, Euler times            | NESTED TIN/TOUT ⇒ SAME PATH                     | ==🟠Medium== |          |
| 25  | [Find Eventual Safe States](Find%20Eventual%20Safe%20States.md)                               | DFS, Kahn on reverse graph        | REVERSE GRAPH, PEEL OUTDEGREE 0                 | ==🟠Medium== |          |
| 26  | [All Ancestors of a Node in a Directed Acyclic Graph](All%20Ancestors%20of%20a%20Node%20in%20a%20Directed%20Acyclic%20Graph.md)     | Topological order, DFS            | CHILD GETS PARENT + PARENT'S ANCESTORS          | ==🟠Medium== |          |
| 27  | [Longest Cycle in a Graph](Longest%20Cycle%20in%20a%20Graph.md)                                | Functional graph, DFS             | STAMP WALK + STEP; LENGTH = t − walk[u]         | ==🔴Hard==   |          |
| 28  | [Reorder Routes to Make All Paths Lead to the City Zero](Reorder%20Routes%20to%20Make%20All%20Paths%20Lead%20to%20the%20City%20Zero.md)  | Tree DFS, Edge direction          | EDGE POINTS AWAY FROM 0 ⇒ FLIP                  | ==🟠Medium== |          |
| 29  | [Count Unreachable Pairs of Nodes in an Undirected Graph](Count%20Unreachable%20Pairs%20of%20Nodes%20in%20an%20Undirected%20Graph.md) | Components, DFS, BFS, Union-Find  | size × REMAINING                                | ==🟠Medium== |          |
| 30  | [Minimum Score of a Path Between Two Cities](Minimum%20Score%20of%20a%20Path%20Between%20Two%20Cities.md)              | Components, DFS, Union-Find       | MIN ROAD IN CITY 1'S COMPONENT                  | ==🟠Medium== |          |
| 31  | [Most Stones Removed with Same Row or Column](Most%20Stones%20Removed%20with%20Same%20Row%20or%20Column.md)             | Union-Find, DFS, Components       | n − COMPONENTS                                  | ==🟠Medium== |          |

## Suggested learning order
1. Traversal: [BFS Traversal](BFS%20Traversal.md), [DFS Traversal](DFS%20Traversal.md), [Find if Path Exists in Graph](Find%20if%20Path%20Exists%20in%20Graph.md) ⭐, [Find Whether Path Exist in a Grid](Find%20Whether%20Path%20Exist%20in%20a%20Grid.md), [Keys and Rooms](Keys%20and%20Rooms.md)
2. Components: [Number of Connected Components in an Undirected Graph](Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md), [Number of Provinces](Number%20of%20Provinces.md) ⭐, [Count Unreachable Pairs of Nodes in an Undirected Graph](Count%20Unreachable%20Pairs%20of%20Nodes%20in%20an%20Undirected%20Graph.md), [Most Stones Removed with Same Row or Column](Most%20Stones%20Removed%20with%20Same%20Row%20or%20Column.md)
3. Degree tricks (no search): [Find Center of Star Graph](Find%20Center%20of%20Star%20Graph.md), [Find Champion II](Find%20Champion%20II.md), [Minimum Number of Vertices to Reach All Nodes](Minimum%20Number%20of%20Vertices%20to%20Reach%20All%20Nodes.md), [Maximal Network Rank](Maximal%20Network%20Rank.md), [Maximum Total Importance of Roads](Maximum%20Total%20Importance%20of%20Roads.md)
4. Cycles: [Detect Cycle in a Directed Graph](Detect%20Cycle%20in%20a%20Directed%20Graph.md) ⭐, [Detect Cycle in an Undirected Graph](Detect%20Cycle%20in%20an%20Undirected%20Graph.md) ⭐, [Find Eventual Safe States](Find%20Eventual%20Safe%20States.md), [Longest Cycle in a Graph](Longest%20Cycle%20in%20a%20Graph.md)
5. Colouring: [Is Graph Bipartite](Is%20Graph%20Bipartite.md) ⭐, [Possible Bipartition](Possible%20Bipartition.md)
6. Build and clone: [Clone Graph](Clone%20Graph.md) ⭐, [All Paths From Source to Target](All%20Paths%20From%20Source%20to%20Target.md), [Throne Inheritance](Throne%20Inheritance.md)
7. Harder moves: [All Paths from Source Lead to Destination](All%20Paths%20from%20Source%20Lead%20to%20Destination.md), [All Ancestors of a Node in a Directed Acyclic Graph](All%20Ancestors%20of%20a%20Node%20in%20a%20Directed%20Acyclic%20Graph.md), [Reorder Routes to Make All Paths Lead to the City Zero](Reorder%20Routes%20to%20Make%20All%20Paths%20Lead%20to%20the%20City%20Zero.md), [Find the Celebrity](Find%20the%20Celebrity.md), [Check If Two Nodes Are On Same Path In A Graph](Check%20If%20Two%20Nodes%20Are%20On%20Same%20Path%20In%20A%20Graph.md)

## Connections to other folders
- Grid versions of the same ideas: [Grid and BFS](../Grid%20and%20BFS/Grid%20and%20BFS%20-%20Pattern%20Map.md)
- Union-Find deep dive: [Disjoint Set](../Disjoint%20Set/Disjoint%20Set%20-%20Pattern%20Map.md)
- Cycle checks that return an order: [Topological Sort](../Topological%20Sort/Topological%20Sort%20-%20Pattern%20Map.md)
- Weighted versions: [Shortest Paths](../Shortest%20Paths/Shortest%20Paths%20-%20Pattern%20Map.md)
