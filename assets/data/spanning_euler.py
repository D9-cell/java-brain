def P(title, java, src, diff, pats, hook, mantra, statement, insight, approaches, recall, anims, connected=(), companies=None, gotcha=None):
    return dict(title=title, cpp=None, java=java, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra, statement=statement,
                insight=insight, approaches=approaches, recall=recall, anims=anims, connected=list(connected), companies=companies, gotcha=gotcha)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
W = lambda code, fn, name='Walkthrough': (name, code, fn)
TOPIC = {
    'name': 'Spanning Trees and Euler', 'dir': 'Graph/Spanning Trees and Euler', 'tag': 'spanning-euler', 'anim': 'Spanning Trees and Euler Animations.html', 'title': 'Spanning Trees and Euler Animations',
    'sub': 'A <b>minimum spanning tree</b> connects every vertex at the lowest total weight with V − 1 edges and no cycle. <b>Kruskal</b>: take edges cheapest first unless they close a cycle (Union-Find). <b>Prim</b>: grow one tree, always adding the cheapest edge leaving it (heap, or an array for dense graphs). An <b>Euler path</b> uses every <i>edge</i> exactly once: it exists when degrees are even (or exactly two are odd) and the edges are connected; <b>Hierholzer</b> builds it by walking until stuck and splicing detours.',
    'hook': 'Two classic tours.\n1. **MST = cheapest road network** that keeps every town connected: no loops, V − 1 roads.\n2. **Kruskal** buys the cheapest road anywhere that links two still-separate regions.\n3. **Prim** grows a single region outward, always buying the cheapest road leaving it.\n4. **Euler** = a postman who walks every street exactly once: odd intersections can only be the start and the end.\n5. **Hierholzer**: walk until stuck, then backtrack and splice in the side loops.',
    'toolkit': '''| Need | Java |
|---|---|
| Sort edges by weight | `Arrays.sort(edges, (a, b) -> a[2] - b[2])` |
| Cycle test for Kruskal | Union-Find: `find(a) == find(b)` means skip |
| Prim heap | `PriorityQueue<int[]>` of `{cost, node}`; skip nodes already in the tree |
| Dense Prim | `best[]` array and an O(n²) scan, no edge list |
| MST complete? | `used == V - 1` edges, else the graph is disconnected |
| Euler degrees | `adj.get(v).size() % 2` for undirected; `out - in` for directed |
| Hierholzer | stack of nodes, `poll` an unused edge, otherwise pop into the path, reverse at the end |
| Smallest-first edges | `PriorityQueue<String>` per airport (itinerary) |''',
    'mermaid': '''graph LR
  ST((Spanning Trees and Euler)) --> MST[Minimum spanning tree<br/>Kruskal, Prim, Connect All Points]
  ST --> CRIT[Which edges matter<br/>Critical and Pseudo-Critical Edges]
  ST --> EUL[Euler existence<br/>Euler Circuit Undirected, Circuit and Path]
  ST --> HIER[Euler construction<br/>Valid Arrangement of Pairs, Reconstruct Itinerary]''',
    'order': "1. MST: [[Minimum Spanning Tree (Kruskal's Algorithm)]] ⭐, [[Minimum Spanning Tree (Prim's Algorithm)]] ⭐, [[Min Cost to Connect All Points]] ⭐\n2. Which edges matter: [[Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree]]\n3. Euler existence: [[Euler Circuit in an Undirected Graph]], [[Euler Circuit and Path]]\n4. Euler construction: [[Valid Arrangement of Pairs]] ⭐, [[Reconstruct Itinerary]] ⭐",
    'cross': ['Union-Find (the engine of Kruskal): [[Disjoint Set - Pattern Map|Disjoint Set]]', 'Shortest paths versus spanning trees: [[Shortest Paths - Pattern Map|Shortest Paths]]', 'Hamiltonian-style subset search lives in [[Bit Magic - Pattern Map|Bit Magic]] and [[Backtracking - Pattern Map|Backtracking]]'],
    'problems': [
        P("Minimum Spanning Tree (Kruskal's Algorithm)", 'KruskalMst', 'GfG', 'Medium', ['Kruskal', 'Union-Find', 'Greedy'], 'Buy the cheapest road anywhere, as long as it links two towns that are not yet connected.', 'SORT EDGES; TAKE IF find(a) != find(b)',
          'Find the minimum total weight of edges that connect all vertices of a weighted undirected graph.', 'Greedy by edge: sort edges by weight and take each edge that joins two different components, using Union-Find to test it. It is correct by the cut property: the cheapest edge crossing any cut is in some MST. If fewer than V − 1 edges are taken the graph is disconnected.',
          [A('Kruskal with Union-Find', ['spanningTree', 'find'], 'O(E log E)', 'O(V)')],
          [('How do you know the graph has no MST?', 'Fewer than V − 1 edges were taken: it is disconnected.'), ('Why does skipping cycle edges stay optimal?', 'An edge inside one component is never the cheapest crossing edge of a cut.')],
          [W('C_KRU', 'kruskal')], ['[[Minimum Spanning Tree (Prim\'s Algorithm)]]', '[[Redundant Connection]]'], ['Amazon', 'Cisco', 'Samsung']),
        P("Minimum Spanning Tree (Prim's Algorithm)", 'PrimMst', 'GfG', 'Medium', ['Prim', 'Min-heap'], 'Grow one region: always buy the cheapest road that leaves it.', 'CHEAPEST EDGE LEAVING THE TREE',
          'Same problem as Kruskal, solved by growing a single tree from vertex 0.', 'Keep a min-heap of candidate edges leaving the tree. Pop the cheapest one that reaches a new vertex, add the vertex and push its edges. On a dense graph an array of "cheapest edge to each outside vertex" scanned in O(V) per round is simpler and O(V²) overall.',
          [A('Prim with a heap', ['primHeap'], 'O(E log V)', 'O(V + E)'), A('Prim with an array (dense graphs)', ['primArray'], 'O(V²)', 'O(V)')],
          [('Prim or Kruskal?', 'Prim for dense graphs (array version), Kruskal when edges come as a sorted list or the graph is sparse.'), ('How does Prim differ from Dijkstra?', 'It compares a single edge weight, not a path length from the source.')],
          [W('C_PRIM', 'prim')], ['[[Minimum Spanning Tree (Kruskal\'s Algorithm)]]', "[[Dijkstra's Algorithm]]"], ['Amazon', 'Cisco', 'Samsung']),
        P('Min Cost to Connect All Points', 'MinCostConnectPoints', 'LeetCode 1584', 'Medium', ['Prim', 'Kruskal', 'Complete graph'], 'Wire up every point; any two points can be joined, so use Prim without building the n² edges.', 'PRIM WITH best[] ARRAY, O(n²)',
          'Points on a plane; the cost to connect two is their Manhattan distance. Connect all points at minimum total cost.', 'The graph is complete, so the MST problem applies directly. Prim with an array of cheapest connections is O(n²) and needs no edge list; Kruskal over all pairs works too but sorts n² edges.',
          [A('Prim with an array', ['minCostConnectPointsPrim', 'dist'], 'O(n²)', 'O(n)'), A('Kruskal over all pairs', ['minCostConnectPointsKruskal', 'find'], 'O(n² log n)', 'O(n²)')],
          [('Why not Dijkstra?', 'We want a connecting tree of minimum total edge weight, not shortest paths.'), ('Why is Prim O(n²) here?', 'Each round scans n points and updates n costs.')],
          [W('C_PTS', 'points')], ["[[Minimum Spanning Tree (Prim's Algorithm)]]", '[[Minimum Spanning Tree (Kruskal\'s Algorithm)]]'], ['Google']),
        P('Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree', 'CriticalPseudoCriticalEdges', 'LeetCode 1489', 'Hard', ['Kruskal', 'MST variants'], 'Some roads are indispensable; others are interchangeable twins.', 'CRITICAL: WITHOUT IT THE MST GETS HEAVIER. PSEUDO: FORCED IN STILL EQUALS THE MST.',
          'Return the edges that appear in every MST (critical) and those that appear in some but not all (pseudo-critical).', 'Compute the MST weight with Kruskal. For each edge: exclude it and recompute; a heavier (or impossible) result means it is critical. Otherwise force it in first and recompute; if the weight is still the MST weight, it is pseudo-critical.',
          [A('Kruskal with skip / force', ['findCriticalAndPseudoCriticalEdges', 'mst'], 'O(E² α)', 'O(V + E)')],
          [('Why test excluding first?', 'An edge that cannot be skipped is critical; only then does "forced in" make sense for the rest.'), ('Are heavier-than-needed edges ever pseudo-critical?', 'No: forcing them raises the weight.')],
          [W('C_CRIT', 'critical')], ["[[Minimum Spanning Tree (Kruskal's Algorithm)]]"], ['Google']),
        P('Euler Circuit in an Undirected Graph', 'EulerCircuitUndirected', 'GfG', 'Medium', ['Euler circuit', 'Degrees'], 'A postman who must walk every street once and end where he began: every junction needs an even number of streets.', 'ALL DEGREES EVEN AND ALL EDGES CONNECTED',
          'Does an undirected graph have a closed walk that uses every edge exactly once?', 'Each time the walk passes through a vertex it uses two edges, so every degree must be even; and the edges must form one connected piece. The C++/Java original checks only the degrees, so two separate cycles pass wrongly.',
          [A('Degree parity + connectivity', ['isEulerCircuitExist', 'edgesConnected'], 'O(V + E)', 'O(V)'), A('Degrees only (the original)', ['degreesOnly'], 'O(V)', 'O(1)', 'Wrong when the graph has two or more separate cycles.')],
          [('Why must the edges be connected?', 'A single walk cannot jump between components.'), ('Directed graphs?', 'Need in-degree = out-degree for every vertex, plus connectivity.')],
          [W('C_EUL1', 'euler1')], ['[[Euler Circuit and Path]]'], None, 'The original code returns true for two disjoint triangles because it checks degrees only.'),
        P('Euler Circuit and Path', 'EulerCircuitAndPath', 'GfG', 'Medium', ['Euler path', 'Degrees'], 'Odd junctions can only be the start and the finish of the tour.', '0 ODD ⇒ CIRCUIT; 2 ODD ⇒ PATH; ELSE NONE',
          'Return 2 if an Euler circuit exists, 1 if only an Euler path exists, else 0.', 'Check that all edges are in one component. Then count odd-degree vertices: none means a circuit, exactly two means a path from one to the other, anything else means neither (an Euler walk has at most two odd ends).',
          [A('Connectivity + odd-degree count', ['isEulerCircuitExist', 'connected'], 'O(V + E)', 'O(V)')],
          [('Why at most 2 odd vertices?', 'Only the start and end of a walk can have an odd number of edges used.'), ('Is the number of odd vertices always even?', 'Yes, by the handshake lemma.')],
          [W('C_EUL2', 'euler2')], ['[[Euler Circuit in an Undirected Graph]]'], ['Google']),
        P('Valid Arrangement of Pairs', 'ValidArrangementOfPairs', 'LeetCode 2097', 'Hard', ['Euler path', 'Hierholzer', 'Directed graph'], 'Domino chain: line up the pieces so each piece\'s right end matches the next piece\'s left end.', 'START AT out − in = 1; WALK UNTIL STUCK; REVERSE',
          'Each pair [start, end] is an edge. Rearrange all pairs into one chain where each pair\'s end equals the next pair\'s start. An arrangement is guaranteed to exist.', 'It is an Euler path in a directed graph. Start at the node with out-degree − in-degree = 1 (any node if it is a circuit). Hierholzer: push the start, repeatedly follow an unused edge; when a node has no unused edge, pop it into the answer. The reversed answer is the path.',
          [A('Iterative Hierholzer (stack)', ['validArrangement'], 'O(V + E)', 'O(V + E)'), A('Recursive Hierholzer', ['validArrangementRecursive', 'visit'], 'O(V + E)', 'O(V + E)')],
          [('Why reverse?', 'Nodes are finalised from the end of the path backwards.'), ('Why start at out − in = 1?', 'In an Euler path that is the starting vertex.')],
          [W('C_HIER', 'hierholzer')], ['[[Reconstruct Itinerary]]'], None, 'Recursion depth equals the number of edges (10⁵), which can overflow the Java stack; prefer the iterative form.'),
        P('Reconstruct Itinerary', 'ReconstructItinerary', 'LeetCode 332', 'Hard', ['Euler path', 'Hierholzer', 'Lexicographic order'], 'Spend tickets smallest first; the airport where you get stuck goes last, and the rest is spliced in front.', 'SMALLEST TICKET FIRST; ADD AIRPORT TO THE FRONT AFTER ALL ITS TICKETS ARE USED',
          'Tickets [from, to]. Use every ticket exactly once starting at JFK and return the lexicographically smallest itinerary.', 'It is an Euler path in a directed multigraph. Keep each airport\'s destinations in a min-heap. Recursively visit the smallest destination until an airport has no tickets, then add that airport to the front of the route. Dead ends end up at the back, which is exactly where they belong.',
          [A('Hierholzer with sorted destinations', ['findItinerary', 'visit'], 'O(E log E)', 'O(E)')],
          [('Why not greedy smallest-first with a simple path?', 'It can use the ticket that leads to a dead end too early and strand other tickets.'), ('Why addFirst?', 'Airports are finalised from the end of the trip backwards.')],
          [W('C_ITIN', 'itinerary')], ['[[Valid Arrangement of Pairs]]'], ['Google', 'Uber', 'Facebook']),
    ],
}
