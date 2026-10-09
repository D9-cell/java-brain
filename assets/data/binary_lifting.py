TOPIC = {
    'name': 'Binary Lifting', 'dir': 'Binary Lifting', 'tag': 'binary-lifting', 'anim': 'Binary Lifting Animations.html',
    'hook': 'An **elevator with express buttons**: +1, +2, +4, +8. Every button is two presses of the one below it: `up[v][j] = up[ up[v][j-1] ][j-1]`.\nAny distance k is just the **set bits of k**, so it takes O(log n) jumps instead of O(n) steps.',
    'toolkit': '''| Need | Java |
|---|---|
| Number of columns (floor(log2 n) + 1) | `int LOG = 32 - Integer.numberOfLeadingZeros(n);` (exact; `Math.log` can round wrong) |
| Fill table with -1 | `for (int[] row : up) Arrays.fill(row, -1);` |
| Is bit j of k set? | `(k & (1 << j)) != 0` |
| Parent + depth on a big tree | BFS with `ArrayDeque`, not recursion (1e5 deep = StackOverflowError) |''',
    'mermaid': '''graph LR
  BL((Binary Lifting<br/>up v j)) --> K[Kth Ancestor<br/>read bits of k]
  BL --> L[LCA<br/>level up + jump while different]
  L --> E[Edge Weights II<br/>d = path length, 2^d-1]
  BL --> G[Greedy jump table<br/>on sorted array]
  G --> P[Path Existence II<br/>lift below target, +1]
  L -. same 'stay below' trick .- P''',
    'order': '1. [[Kth Ancestor of a Tree Node]]: learn the table.\n2. [[Number of Ways to Assign Edge Weights II]]: the table + LCA.\n3. [[Path Existence Queries in a Graph II]]: the same idea on an array, not a tree.',
    'cross': ['Trees and LCA: the `Tree` folder (LCA of Binary Tree problems use the recursive LCA, not lifting)',
              'Sparse Table / doubling ideas also show up in [[Segment Tree - Pattern Map|Segment Tree]] range queries',
              'Bit reading `k & (1 << j)`: see the `Bit_Magic` folder'],
    'problems': [
        {'title': 'Kth Ancestor of a Tree Node', 'cpp': 'Binary Lifting/Kth Ancestor of a Tree Node.cpp', 'java': 'KthAncestorOfTreeNode', 'tab': 0,
         'src': 'LeetCode 1483', 'diff': 'Hard', 'patterns': ['Binary lifting', 'Bit decomposition'],
         'hook': 'An **elevator with express buttons** +1, +2, +4, +8 floors. To go up 5: press +4 then +1.',
         'mantra': 'DOUBLE THE JUMP, READ THE BITS',
         'statement': 'A tree of `n` nodes is given as `parent[]` (root has -1). Answer many `getKthAncestor(node, k)` queries, returning -1 if it does not exist.',
         'insight': 'Walking up k parents is O(k), which is too slow for many queries. Precompute `up[v][j]` = the 2^j-th ancestor. Every k is a sum of powers of two (its binary form), so take one jump per set bit.',
         'approaches': [{'name': 'Binary lifting table', 'code': ['TreeAncestor'], 'time': 'build O(n log n), query O(log n)', 'space': 'O(n log n)',
                         'explain': '1. Column 0 = parent.\n2. Column j = jump 2^(j-1) twice.\n3. Query: for each set bit j of k, `node = up[node][j]`.'}],
         'gotcha': 'Compute LOG with `32 - Integer.numberOfLeadingZeros(n)`. `(int)(Math.log(n)/Math.log(2))` can give 2.9999 → 2 for exact powers of two.',
         'recall': [('What does `up[v][j]` store?', 'The 2^j-th ancestor of v, or -1.'),
                    ('Write the recurrence from memory.', '`up[v][j] = up[ up[v][j-1] ][j-1]` (guard against -1).'),
                    ('Loop order when building: j outside or v outside? Why?', 'j outside: column j needs the WHOLE column j-1 first.'),
                    ('Query for k = 13: which jumps?', '13 = 1101₂ → jumps of 8, 4 and 1.')],
         'connected': ['Uses this table + LCA: [[Number of Ways to Assign Edge Weights II]]', 'Same jump table on an array: [[Path Existence Queries in a Graph II]]']},
        {'title': 'Number of Ways to Assign Edge Weights II', 'cpp': 'Binary Lifting/Number of Ways to Assign Edge Weights II.cpp', 'java': 'NumberOfWaysToAssignEdgeWeightsII', 'tab': 1,
         'src': 'LeetCode 3559', 'diff': 'Hard', 'patterns': ['Binary lifting', 'LCA', 'Parity counting'],
         'hook': 'Two climbers on different branches. The lower one takes the **express elevator** to the same floor. Then both take the biggest jumps that keep them apart. They end up one floor below their meeting point.',
         'mantra': 'LEVEL UP, JUMP WHILE DIFFERENT, PARENT IS LCA',
         'statement': 'A tree with nodes 1..n is given. For each query (u, v), count the ways to set every edge on the u–v path to weight 1 or 2 so the path sum is **odd**, modulo 1e9+7.',
         'insight': '- Path length `d = depth[u] + depth[v] − 2·depth[lca]`.\n- Only parity matters. Choose d−1 edges freely; the last one is forced to fix the parity → **2^(d−1)** (0 if d = 0).\n- So the real work is **LCA per query** → binary lifting.',
         'approaches': [{'name': 'BFS depth + lifting LCA', 'code': ['bfs', 'lca', 'assignEdgeWeights'], 'time': 'O((n + q) log n)', 'space': 'O(n log n)',
                         'explain': 'Phase 1: lift the deeper node by the depth difference (read its bits).\nPhase 2: for j from high to low, jump both if `up[u][j] != up[v][j]`.\nThe LCA is `up[u][0]`.'}],
         'gotcha': 'The C++ uses a recursive DFS. In Java a path-shaped tree with 1e5 nodes throws StackOverflowError, so this version fills parent/depth with an iterative BFS.',
         'recall': [('Why only jump when ancestors differ?', 'Equal ancestors mean we would reach or overshoot the LCA. Jumping only while they differ stops exactly one level below it.'),
                    ('What if u == v after phase 1?', 'One was an ancestor of the other. Return it directly.'),
                    ('Why 2^(d−1)?', 'The first d−1 edges are free choices. The last edge has exactly one value that makes the sum odd.'),
                    ('Precompute what for fast answers?', '`pow2[i] = 2^i mod M` up to n.')],
         'connected': ['Table basics: [[Kth Ancestor of a Tree Node]]', 'Same stay-below-then-+1 trick: [[Path Existence Queries in a Graph II]]']},
        {'title': 'Path Existence Queries in a Graph II', 'cpp': 'Binary Lifting/Path Existence Queries in a Graph II.cpp', 'java': 'PathExistenceQueriesInAGraphII', 'tab': 2,
         'src': 'LeetCode 3534', 'diff': 'Hard', 'patterns': ['Binary lifting', 'Sorting + greedy', 'Binary search'],
         'hook': 'Stepping stones sorted along a river. Always leap to the **farthest** stone in reach. Then build express leaps (2, 4, 8 stones) and count hops like reading bits.',
         'mantra': 'SORT, FARTHEST HOP, LIFT BELOW TARGET, +1',
         'statement': 'Nodes i, j are connected if `|nums[i] − nums[j]| ≤ maxDiff`. For each query (u, v), return the minimum number of edges between them, or -1.',
         'insight': 'After sorting by value, the best single hop from position i goes to the **farthest** position j with `vals[j] ≤ vals[i] + maxDiff`. Hopping farther never hurts, so greedy works. Many queries → precompute `jump[i][j]` for 2^j greedy hops.',
         'approaches': [{'name': 'Sort + greedy jump table', 'code': ['lastAtMost', 'pathExistenceQueries'], 'time': 'O((n + q) log n)', 'space': 'O(n log n)',
                         'explain': 'For a query with sorted positions a < b, lift from high j to low while `jump[cur][j] < b`, adding 2^j each time. Then one more hop must reach b, otherwise return -1.'}],
         'recall': [('Why is "farthest reachable" the right one-hop target?', 'Values are sorted, so a farther start covers a superset of the next reach. Greedy is safe.'),
                    ('Why stop BELOW b and add 1 at the end?', 'This finds the maximum hops that do not reach b. If one more hop reaches b, that is the minimum; if not, b is unreachable.'),
                    ('How do you translate original nodes to sorted positions?', 'Sort the indices by value, then `pos[order[i]] = i`.'),
                    ('Answer when u == v?', '0.')],
         'connected': ['Same table idea on a tree: [[Kth Ancestor of a Tree Node]]', 'Same stay-below trick for LCA: [[Number of Ways to Assign Edge Weights II]]']},
    ],
}
