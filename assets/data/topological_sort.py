def P(title, java, src, diff, pats, hook, mantra, statement, insight, approaches, recall, anims, connected=(), companies=None, gotcha=None):
    return dict(title=title, cpp=None, java=java, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra, statement=statement,
                insight=insight, approaches=approaches, recall=recall, anims=anims, connected=list(connected), companies=companies, gotcha=gotcha)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
W = lambda code, fn, name='Walkthrough': (name, code, fn)
TOPIC = {
    'name': 'Topological Sort', 'dir': 'Graph/Topological Sort', 'tag': 'topological-sort', 'anim': 'Topological Sort Animations.html', 'title': 'Topological Sort Animations',
    'sub': 'A <b>topological order</b> lists the nodes of a directed acyclic graph so every edge points forward. <b>Kahn</b>: count prerequisites (in-degree), queue the nodes with none, remove them and lower their successors; fewer nodes removed than exist means a <b>cycle</b>. <b>DFS</b>: push a node after all its successors, read the stack backwards. Process Kahn <i>by waves</i> for "minimum rounds", carry a value for "longest path" DP, and run it on the reversed graph for "who is safe".',
    'hook': 'Getting dressed: **socks before shoes**.\n1. **Kahn** = repeatedly pick something with nothing left to wait for.\n2. **A leftover** that never reaches zero means two things wait for each other: a cycle.\n3. **Waves** of Kahn = rounds / semesters; the number of waves is the longest chain.\n4. **DP on the order**: finish[v] = max(finish[u]) + cost: the longest path in a DAG.\n5. **DFS version**: put a node down only after everything that depends on it.\n6. **Peeling leaves** (degree 1) is Kahn on a tree: it finds the centre.',
    'toolkit': '''| Need | Java |
|---|---|
| In-degree | `int[] indegree = new int[n]; for (edge u -> v) indegree[v]++;` |
| Queue of ready nodes | `Queue<Integer> que = new ArrayDeque<>()` |
| Kahn loop | `u = que.poll(); order.add(u); for (v : adj[u]) if (--indegree[v] == 0) que.add(v);` |
| Cycle test | `order.size() != n` |
| By waves | `for (int size = que.size(); size > 0; size--)` inside `while` |
| Longest path DP | `finish[v] = Math.max(finish[v], finish[u] + time[v])` while relaxing |
| DFS order | three states (0 new, 1 on path, 2 done), `stack.push(u)` after the loop |
| Names as nodes | `Map<String, List<String>>` and `Map<String, Integer>` for in-degree |''',
    'mermaid': '''graph LR
  TS((Topological Sort)) --> CORE[Core<br/>Kahn and DFS, Course Schedule, Course Schedule II]
  TS --> WAVES[Waves and DP<br/>Parallel Courses, Parallel Courses III, Largest Color Value]
  TS --> REACH[Reachability<br/>Course Schedule IV, Recipes]
  TS --> BUILD[Build an order<br/>Alien Dictionary, Build a Matrix, Sort Items by Groups]
  TS --> TREE[On trees<br/>Minimum Height Trees]''',
    'order': "1. Core: [[Topological Sort (BFS - Kahn's Algorithm)]] ⭐, [[Course Schedule]] ⭐, [[Course Schedule II]] ⭐\n2. Waves and DP: [[Parallel Courses]], [[Parallel Courses III]] ⭐, [[Largest Color Value in a Directed Graph]]\n3. Reachability and names: [[Course Schedule IV]], [[Find All Possible Recipes from Given Supplies]]\n4. Build an order: [[Alien Dictionary]] ⭐, [[Build a Matrix With Conditions]], [[Sort Items by Groups Respecting Dependencies]]\n5. On trees: [[Minimum Height Trees]]",
    'cross': ['Directed cycle detection by DFS colours: [[Graph Basics - Pattern Map|Graph Basics]]', 'Safe nodes via Kahn on the reversed graph: [[Find Eventual Safe States]]', 'Ancestors via topological order: [[All Ancestors of a Node in a Directed Acyclic Graph]]', 'Longest path / DP on DAGs: [[Shortest Paths - Pattern Map|Shortest Paths]]'],
    'problems': [
        P("Topological Sort (BFS - Kahn's Algorithm)", 'TopologicalSort', 'GfG', 'Medium', ['Kahn', 'DFS finish order'], 'Getting dressed: put on socks before shoes; keep doing whatever has nothing left to wait for.', 'INDEGREE 0 ⇒ GO; LOWER THE REST',
          'Given a directed acyclic graph, list the vertices so that every edge u → v has u before v.', 'Kahn: count incoming edges, queue the vertices with none, and as each is removed lower the counts of its successors. If fewer than V vertices come out, a cycle remains. DFS alternative: push a vertex after all its successors are finished; the stack, read from the top, is a topological order.',
          [A("Kahn's algorithm (BFS)", ['topoKahn'], 'O(V + E)', 'O(V)'), A('DFS finish order', ['topoDfs', 'finish'], 'O(V + E)', 'O(V)')],
          [('How does Kahn detect a cycle?', 'Nodes on a cycle never reach in-degree 0, so fewer than V are removed.'), ('Is the order unique?', 'No; any order that respects all edges is valid.')],
          [W('C_KAHN', 'topoKahn', 'Kahn'), W('C_TDFS', 'topoDfs', 'DFS')], ['[[Course Schedule]]', '[[Detect Cycle in a Directed Graph]]'], ['Accolite', 'Amazon', 'Flipkart', 'Microsoft', 'Moonfrog Labs', 'OYO Rooms', 'Morgan Stanley']),
        P('Course Schedule', 'CourseSchedule', 'LeetCode 207', 'Medium', ['Kahn', 'Cycle check'], 'Can you finish every course, or are two courses each waiting for the other?', 'ALL COURSES REMOVED ⇔ NO CYCLE',
          'Prerequisites [a, b] mean b before a. Can all courses be finished?', 'It is cycle detection in a directed graph. Kahn: if all courses can be removed in order, there is no cycle. A DFS with an on-path flag gives the same answer.',
          [A("Kahn's algorithm", ['canFinishKahn'], 'O(V + E)', 'O(V + E)'), A('DFS with path flags', ['canFinishDfs', 'hasCycle'], 'O(V + E)', 'O(V + E)')],
          [('Why does a leftover course mean impossible?', 'It waits for something that waits (eventually) for it.'), ('Edge direction?', 'b → a for the pair [a, b].')],
          [W('C_CS', 'courseOk', 'Possible'), W('C_CS', 'courseBad', 'Cycle')], ['[[Course Schedule II]]', '[[Detect Cycle in a Directed Graph]]'], ['Apple', 'Twitter', 'Meta', 'Accolite', 'Amazon', 'Flipkart', 'Microsoft']),
        P('Course Schedule II', 'CourseScheduleII', 'LeetCode 210', 'Medium', ['Kahn', 'DFS'], 'Not just "can you finish" but "in which order": the order courses leave the queue is the study plan.', 'REMOVAL ORDER = STUDY ORDER',
          'Return a valid order of the courses, or an empty array if impossible.', 'Same as Course Schedule, but keep the removal order from Kahn (or reverse the DFS finish order). An empty array signals a cycle.',
          [A("Kahn's algorithm", ['findOrderKahn'], 'O(V + E)', 'O(V + E)'), A('DFS finish order', ['findOrderDfs', 'visit'], 'O(V + E)', 'O(V + E)')],
          [('Why reverse the DFS finish order?', 'A course finishes after everything that depends on it, so the last finisher goes first.'), ('Many valid answers?', 'Yes, any valid order is accepted.')],
          [W('C_CS2', 'courseOrder')], ['[[Course Schedule]]'], ['Accolite', 'Amazon', 'Flipkart', 'Microsoft', 'Moonfrog Labs', 'OYO Rooms']),
        P('Course Schedule IV', 'CourseScheduleIV', 'LeetCode 1462', 'Medium', ['Reachability', 'Kahn', 'Floyd-Warshall'], 'Is course A a hidden ancestor of course B? Let every course inherit the prerequisites of its parents.', 'CHILD INHERITS PARENT + PARENT\'S PREREQUISITES',
          'Answer queries "is u a prerequisite (direct or indirect) of v?" for a prerequisite DAG.', 'The question is reachability. Precompute it once: DFS from every node, Floyd-Warshall on a boolean matrix, or Kahn where each course absorbs its parent and the parent\'s prerequisite set. Queries are then lookups.',
          [A('DFS from every node', ['checkIfPrerequisiteDfs', 'mark'], 'O(n · (n + E))', 'O(n²)'), A('Floyd-Warshall closure', ['checkIfPrerequisiteFloyd'], 'O(n³)', 'O(n²)'), A('Kahn with inherited sets', ['checkIfPrerequisiteKahn'], 'O(n · (n + E))', 'O(n²)')],
          [('Which is simplest for n ≤ 100?', 'Floyd-Warshall on booleans.'), ('Why topological order helps?', 'A parent\'s set is final before it is passed to children.')],
          [W('C_CS4', 'courseIV')], ['[[Course Schedule II]]', '[[All Ancestors of a Node in a Directed Acyclic Graph]]'], ['Amazon']),
        P('Alien Dictionary', 'AlienDictionary', 'LeetCode 269', 'Hard', ['Build the graph', 'Kahn', 'DFS'], 'A dictionary in an unknown language: the first letter where two neighbouring words differ reveals one ordering rule.', 'FIRST DIFFERING LETTER ⇒ EDGE; PREFIX TRAP ⇒ ""',
          'Words are sorted in an alien alphabet. Return a valid letter order, or "" if the list is inconsistent.', 'Compare adjacent words only: the first differing letters a, b give the edge a → b; stop at the first difference. If a longer word comes before its own prefix, return "". Then topologically sort the letters; a leftover means a contradiction.',
          [A('Kahn on letters', ['alienOrderKahn'], 'O(total letters)', 'O(1) alphabet'), A('DFS with three states', ['alienOrderDfs', 'visit'], 'O(total letters)', 'O(1) alphabet')],
          [('Why only adjacent words?', 'Sortedness is transitive: adjacent pairs imply the rest.'), ('Why stop after the first difference?', 'Later letters carry no information about the alphabet.')],
          [W('C_ALIEN', 'alien')], ['[[Course Schedule II]]'], ['Airbnb', 'Amazon', 'Apple', 'Bloomberg', 'Facebook', 'Flipkart', 'Google', 'Microsoft', 'Oracle', 'Pinterest'], 'The "abc" before "ab" case must return "" explicitly, because the first-difference loop finds no difference.'),
        P('Build a Matrix With Conditions', 'BuildMatrixConditions', 'LeetCode 2392', 'Hard', ['Two topological sorts'], 'Rows and columns are independent puzzles: solve each as an ordering and read positions off.', 'SORT ROWS, SORT COLUMNS, PLACE v AT (rowPos, colPos)',
          'Place 1..k in a k × k matrix so that listed numbers are above / left of others. Return the matrix or an empty one.', 'The conditions on rows and on columns do not interact. Topologically sort the numbers for rows and again for columns; if either sort fails (cycle) it is impossible. Number v goes to row = its position in the row order, column = its position in the column order.',
          [A('Kahn twice', ['buildMatrix', 'topo'], 'O(k + conditions)', 'O(k²)'), A('DFS twice', ['buildMatrixDfs', 'topoDfs', 'visit'], 'O(k + conditions)', 'O(k²)')],
          [('Why can rows and columns be solved separately?', 'A number has one row and one column and the conditions mention only one of them at a time.'), ('Does every number get its own row and column?', 'Yes, the matrix is k × k with each of 1..k once, a permutation matrix.')],
          [W('C_BM', 'buildMatrix')], ['[[Course Schedule II]]'], ['Apple']),
        P('Find All Possible Recipes from Given Supplies', 'PossibleRecipes', 'LeetCode 2115', 'Medium', ['Kahn', 'Named nodes'], 'A recipe becomes available once every ingredient is on the shelf, and recipes can be ingredients too.', 'MISSING-INGREDIENT COUNT IS THE INDEGREE',
          'Given recipes with ingredients and initial supplies, return all recipes that can be made.', 'Treat each ingredient → recipe as an edge, with a recipe\'s in-degree being the number of ingredients it needs. Start the queue with the supplies; when an item is processed, lower the counts of the recipes using it, and a recipe that reaches 0 becomes available (and enters the queue).',
          [A('Kahn from the supplies', ['findAllRecipesKahn'], 'O(V + E)', 'O(V + E)'), A('Sweep until stable', ['findAllRecipesSweep'], 'O(R² · I)', 'O(R)')],
          [('Why start from supplies, not zero in-degree?', 'Supplies are available items; recipes only become available when their ingredients are.'), ('What about cyclic recipes?', 'They never reach 0 and are never made.')],
          [W('C_RCP', 'recipes')], ['[[Course Schedule]]'], None),
        P('Largest Color Value in a Directed Graph', 'LargestColorValue', 'LeetCode 1857', 'Hard', ['Kahn + DP', 'Cycle check'], 'Walk the DAG in dependency order carrying a tally of colours: each node keeps the best tally over all paths ending there.', 'count[v][c] = max over parents; ADD OWN COLOUR WHEN PROCESSED',
          'Each node has a colour. Return the largest number of same-coloured nodes on any path, or −1 if the graph has a cycle.', 'In topological order, every parent is processed before its child, so count[v][c] can be filled as the maximum over incoming paths. A node adds its own colour when it is processed. If Kahn removes fewer than n nodes there is a cycle: −1.',
          [A('Kahn with per-node colour counts', ['largestPathValue'], 'O(26 · (V + E))', 'O(26 · V)'), A('DFS with memo', ['largestPathValueDfs', 'dfs'], 'O(26 · (V + E))', 'O(26 · V)')],
          [('Why not enumerate paths?', 'There can be exponentially many; the DP shares work.'), ('Why does Kahn also give the cycle test?', 'Nodes on a cycle are never processed.')],
          [W('C_COLOR', 'colorValue')], ['[[Parallel Courses III]]', '[[Detect Cycle in a Directed Graph]]'], ['Meta']),
        P('Minimum Height Trees', 'MinHeightTrees', 'LeetCode 310', 'Medium', ['Leaf peeling', 'Tree centre'], 'Peel the tree like an onion: the last one or two nodes in the middle are the best roots.', 'REMOVE ALL LEAVES UNTIL ≤ 2 NODES REMAIN',
          'Among all rootings of an undirected tree, return the roots that give the minimum height.', 'The best roots are the centres of the tree (the middle of its longest path), and there are one or two. Remove all leaves layer by layer until at most two nodes remain: this is Kahn applied to degrees instead of in-degrees.',
          [A('Peel leaves', ['findMinHeightTrees'], 'O(n)', 'O(n)')],
          [('Why at most two answers?', 'A longest path has either one middle node or two.'), ('Why stop at 2 nodes?', 'Peeling further would remove the answer.')],
          [W('C_MHT', 'mht')], ['[[Tree Diameter]]'], ['Google']),
        P('Parallel Courses', 'ParallelCourses', 'LeetCode 1136', 'Medium', ['Kahn by waves'], 'Take everything you can each semester; the number of semesters is the length of the longest prerequisite chain.', 'ONE KAHN WAVE = ONE SEMESTER',
          'Courses with prerequisites; any number can be taken per semester once their prerequisites were finished in earlier semesters. Return the minimum semesters, or −1.', 'Run Kahn one layer at a time: the queue at the start of a wave holds the courses available this semester. The number of waves equals the longest chain. If some course is never taken there is a cycle: −1. A memoised DFS computes the chain length directly.',
          [A('Kahn by layers', ['minimumSemesters'], 'O(V + E)', 'O(V + E)'), A('DFS with memo', ['minimumSemestersDfs', 'semester'], 'O(V + E)', 'O(V + E)')],
          [('Why layers and not the plain order?', 'Courses in the same layer can be studied together, so they count as one semester.'), ('What is the answer in graph terms?', 'The number of nodes on the longest path.')],
          [W('C_PC', 'pc1')], ['[[Parallel Courses III]]', '[[Course Schedule]]'], ['Uber']),
        P('Parallel Courses III', 'ParallelCoursesIII', 'LeetCode 2050', 'Hard', ['Kahn + longest path', 'DP on a DAG'], 'Unlimited parallel study: a course ends when its slowest prerequisite ends plus its own length.', 'finish[v] = max(finish[u]) + time[v]',
          'Each course takes time[i] months; courses with no dependency run in parallel. Return the minimum months to finish all.', 'It is the longest weighted path in a DAG. In topological order, finish[v] = max over prerequisites u of finish[u], plus time[v]. The answer is the largest finish time. A memoised DFS gives the same.',
          [A('Kahn with finish times', ['minimumTime'], 'O(V + E)', 'O(V + E)'), A('DFS with memo', ['minimumTimeDfs', 'finish'], 'O(V + E)', 'O(V + E)')],
          [('Why max over prerequisites?', 'You can only start when all of them are done.'), ('Where does the answer come from?', 'The maximum finish time over all courses.')],
          [W('C_PC3', 'pc3')], ['[[Parallel Courses]]', '[[Largest Color Value in a Directed Graph]]'], ['Uber']),
        P('Sort Items by Groups Respecting Dependencies', 'SortItemsByGroups', 'LeetCode 1203', 'Hard', ['Two-level topological sort'], 'Sort the teams first, then sort the people inside each team.', 'TOPO THE GROUPS, TOPO THE ITEMS, GROUP BY GROUP',
          'Items belong to groups (or none). Items of a group must be contiguous, and beforeItems[i] must come before item i. Return an order or an empty array.', 'Give each ungrouped item its own group. Build two graphs: item dependencies, and group dependencies (an edge between groups when an item depends on an item of another group). Topologically sort both; if either fails, return empty. Output the groups in group order and, inside each group, its items in item order.',
          [A('Two Kahn sorts', ['sortItems', 'topo'], 'O(n + edges)', 'O(n + edges)')],
          [('Why make ungrouped items singleton groups?', 'It lets every item live in the group graph.'), ('Why is item order enough inside a group?', 'The item sort already respects all dependencies; restricting it to one group keeps the relative order.')],
          [W('C_SORT', 'sortItems')], ['[[Course Schedule II]]', '[[Build a Matrix With Conditions]]'], None),
    ],
}
