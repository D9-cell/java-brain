def P(title, java, src, diff, pats, hook, mantra, statement, insight, approaches, recall, connected=(), companies=None, gotcha=None, url=None):
    return dict(title=title, java=java, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra, statement=statement, insight=insight,
                approaches=approaches, recall=recall, connected=list(connected), companies=companies, gotcha=gotcha, url=url)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
CHK = 'Verified against a brute-force recursion on small random inputs when it was written.'
GFG = 'https://practice.geeksforgeeks.org/problems/'
TOPIC = {
    'name': 'Interval DP', 'dir': 'DP/Interval DP', 'tag': 'dp', 'anim': 'Interval DP Animations.html',
    'hook': 'Solve every **range [i, j]** by choosing one special element inside it, then combine two smaller ranges.\n1. **Pick the LAST action**: the split point k is what happens last, so the two sides are independent (Burst Balloons, Cut a Stick, Matrix Chain, Triangulation).\n2. **Pick the first element and a partner**: merge i with a later equal value (Strange Printer, Remove Boxes).\n3. **Pick the root**: every value is a root, left and right are subproblems (Unique BSTs II, Full Binary Trees).\n4. **Evaluate both outcomes**: keep a table per result (true/false) and combine them (Boolean Parenthesization).\n5. **Interval by length**: loop `len` outwards so all shorter ranges are ready.\n6. **Other state shapes**: eggs and moves (Super Egg Drop), prefix operations (Multiplication Operations).',
    'toolkit': '''| Need | Java |
|---|---|
| Loop by length | `for (int len = 2; len <= n; len++) for (int i = 0; i + len <= n; i++) { int j = i + len; ... }` |
| Pad the ends | `int[] a = new int[n + 2]; a[0] = a[n + 1] = 1;` |
| Open interval | dp[l][r] covers l+1..r-1, so the answer sits at dp[0][n + 1] |
| Cost of a split | `dp[i][k] + dp[k][j] + cost(i, k, j)` |
| Rebuild the split | store `split[i][j] = k` while taking the min, then recurse on it |
| Mod arithmetic | `(a * b) % MOD` with ints small enough, otherwise cast to long |
| Third dimension | `int[][][] memo = new int[n][n][n];` with 0 meaning not yet computed |''',
    'mermaid': '''graph LR
  D((Interval DP)) --> L[Last action in range<br/>Burst Balloons, Cut a Stick, Matrix Chain, Brackets, Triangulation]
  D --> M[Merge with an equal partner<br/>Strange Printer, Remove Boxes]
  D --> T[Choose a root<br/>Unique BSTs II, Full Binary Trees]
  D --> B[Two results per range<br/>Boolean Parenthesization]
  D --> O[Other shapes<br/>Super Egg Drop, Multiplication Operations]''',
    'order': '1. [[Matrix Chain Multiplication]] ⭐, [[Burst Balloons]], [[Minimum Cost to Cut a Stick]], [[Minimum Score Triangulation of Polygon]]\n2. [[Brackets in Matrix Chain Multiplication]], [[Boolean Parenthesization]]\n3. [[Strange Printer]], [[Remove Boxes]]\n4. [[Unique Binary Search Trees II]], [[All Possible Full Binary Trees]]\n5. [[Maximum Score from Performing Multiplication Operations]], [[Super Egg Drop]]',
    'cross': ['[[Palindromes and Word Splits - Pattern Map]] for range DP on strings', '[[Game DP - Pattern Map]] for ranges played by two players', '[[Scramble String]] for a range DP with a swap choice'],
    'problems': [
        P('Matrix Chain Multiplication', 'MatrixChainMultiplication', 'GfG Matrix Chain Multiplication', 'Hard', ['Split point', 'Interval by length'],
          'The **last multiplication** splits the chain into two independent chains.', 'dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + arr[i−1]·arr[k]·arr[j]',
          'Matrix t has size arr[t−1] × arr[t]. Return the minimum number of scalar multiplications to multiply the whole chain.',
          'Whatever the order, the final multiplication joins a left chain (i..k) and a right chain (k+1..j) and costs arr[i−1]·arr[k]·arr[j]. Each side is the same problem on a shorter range, so try every k and keep the minimum.',
          [A('Top-down memo', ['mcmMemo', 'solve'], 'O(n³)', 'O(n²)'), A('Bottom-up by length', ['mcmBottomUp'], 'O(n³)', 'O(n²)')],
          [('Why length order?', 'dp[i][k] and dp[k+1][j] are shorter, so they are ready.'), ('Why n³?', 'n² intervals times n split points.')],
          ['[[Brackets in Matrix Chain Multiplication]]', '[[Burst Balloons]]', '[[Minimum Score Triangulation of Polygon]]'], companies=['Amazon', 'Microsoft'], gotcha=CHK, url=GFG + 'matrix-chain-multiplication0303/1'),
        P('Brackets in Matrix Chain Multiplication', 'BracketsInMatrixChainMultiplication', 'GfG Brackets in Matrix Chain Multiplication', 'Hard', ['Split point', 'Rebuild the choice'],
          'Same table as Matrix Chain, but **remember the best k** and print by recursion.', 'split[i][j] = best k · PRINT ( LEFT RIGHT )',
          'Print the bracketing of the cheapest matrix chain order, naming the matrices A, B, C, ...',
          'While taking the minimum over k, store the arg-min in split[i][j]. Printing a range writes the matrix letter for a single matrix, otherwise "(" + left part + right part + ")".',
          [A('Table + split + print', ['BracketsInMatrixChainMultiplication'], 'O(n³)', 'O(n²)')],
          [('Is the answer unique?', 'Not always; any order with the minimum cost is valid.'), ('Why n² extra space?', 'split mirrors the cost table.')],
          ['[[Matrix Chain Multiplication]]'], companies=['Microsoft'], gotcha=CHK, url=GFG + 'brackets-in-matrix-chain-multiplication/0'),
        P('Burst Balloons', 'BurstBalloons', 'LeetCode 312', 'Hard', ['Last action', 'Padded ends'],
          'Think backwards: pick the **last balloon to burst** in a range. Its neighbours are then the range ends.', 'dp[l][r] = max over k of dp[l][k] + a[l]·a[k]·a[r] + dp[k][r]',
          'Bursting balloon i gives nums[i−1]·nums[i]·nums[i+1] coins (outside is 1). Return the maximum coins for bursting all balloons.',
          'If k is the first burst, the left and right parts affect each other. If k is the LAST balloon in the open interval (l, r), its neighbours at that moment are exactly a[l] and a[r], and the two sides are independent subproblems.',
          [A('Interval DP', ['maxCoins'], 'O(n³)', 'O(n²)')],
          [('Why last and not first?', 'The last burst has fixed neighbours; the first one does not.'), ('Why pad with 1s?', 'It handles the boundary rule without special cases.')],
          ['[[Matrix Chain Multiplication]]', '[[Remove Boxes]]', '[[Minimum Cost to Cut a Stick]]'], companies=['Google', 'Amazon'], gotcha=CHK),
        P('Minimum Cost to Cut a Stick', 'MinimumCostToCutAStick', 'LeetCode 1547', 'Hard', ['Last action', 'Sorted cut points'],
          'Pick the **first cut** on a stick segment: it costs the segment length and leaves two independent segments.', 'dp[i][j] = (pts[j] − pts[i]) + min over k of dp[i][k] + dp[k][j]',
          'Cut a stick of length n at the given positions in any order; each cut costs the length of the piece being cut. Return the minimum total cost.',
          'Sort the cut points and add 0 and n at the ends. The first cut k on the piece between points i and j costs its length and splits it into (i, k) and (k, j), each solved on its own.',
          [A('Interval DP', ['minCost'], 'O(c³)', 'O(c²)')],
          [('Why sort?', 'A piece is then a contiguous range of cut indices.'), ('Compare to Burst Balloons?', 'Same shape, with "first cut" instead of "last burst".')],
          ['[[Burst Balloons]]', '[[Matrix Chain Multiplication]]'], companies=['Google'], gotcha=CHK),
        P('Minimum Score Triangulation of Polygon', 'MinimumScoreTriangulationOfPolygon', 'LeetCode 1039', 'Medium', ['Third corner', 'Interval by length'],
          'The edge (i, j) belongs to exactly one triangle: choose its **third corner k**.', 'dp[i][j] = min over k of dp[i][k] + dp[k][j] + v[i]·v[k]·v[j]',
          'Triangulate a convex polygon with the given vertex values; a triangle scores the product of its vertices. Return the minimum total score.',
          'In any triangulation of vertices i..j, the edge (i, j) lies in one triangle (i, k, j). That cuts the polygon into i..k and k..j, which are triangulated independently.',
          [A('Interval DP', ['minScoreTriangulation'], 'O(n³)', 'O(n²)')],
          [('Why is it Matrix Chain in disguise?', 'The same split structure and cost shape.'), ('Base case?', 'A range of two vertices has no triangle.')],
          ['[[Matrix Chain Multiplication]]'], companies=['Google'], gotcha=CHK),
        P('Boolean Parenthesization', 'BooleanParenthesization', 'GfG Boolean Parenthesization', 'Hard', ['Split at operator', 'Two tables'],
          'For every operand range keep **how many ways it is true and how many false**, then combine by the operator.', 'AND: T·T · OR: total − F·F · XOR: T·F + F·T',
          'Given a boolean expression of T, F with & | ^, count the parenthesizations that evaluate to true (mod 1003).',
          'Split at an operator between the ranges. Combining needs both true and false counts of both sides: AND is true only for T·T, OR is false only for F·F, XOR needs one of each.',
          [A('True / false tables', ['BooleanParenthesization'], 'O(n³)', 'O(n²)')],
          [('Why track false too?', 'OR and XOR results depend on the false counts of the sides.'), ('Why mod 1003?', 'The GfG statement asks for it.')],
          ['[[Matrix Chain Multiplication]]', '[[Unique Binary Search Trees II]]'], companies=['Amazon', 'Microsoft'], gotcha=CHK, url=GFG + 'boolean-parenthesization5610/1'),
        P('Strange Printer', 'StrangePrinter', 'LeetCode 664', 'Hard', ['Merge with an equal partner', 'Interval by length'],
          'The first letter may **share its stroke** with a later equal letter; whatever lies between is printed over it.', 'dp[i][j] = min(1 + dp[i+1][j], dp[i+1][k−1] + dp[k][j]) FOR s[k] = s[i]',
          'A printer prints a run of one letter per turn and can overprint. Return the minimum turns to print s.',
          'First collapse equal neighbours. For the range i..j the first letter either gets its own turn (1 + the rest) or one stroke also covers a later equal letter k, so the inside (i+1..k−1) is printed on top and the rest starts at k.',
          [A('Interval DP', ['strangePrinter'], 'O(n³)', 'O(n²)')],
          [('Why collapse duplicates first?', 'Adjacent equal letters never cost extra turns.'), ('Why does the inside cost dp[i+1][k−1]?', 'The long stroke is painted first, then the inside overwrites it.')],
          ['[[Remove Boxes]]', '[[Burst Balloons]]'], companies=['NetEase'], gotcha=CHK),
        P('Remove Boxes', 'RemoveBoxes', 'LeetCode 546', 'Hard', ['Merge with an equal partner', '3-D memo'],
          'Add a third dimension: **k extra boxes equal to boxes[l]** already glued to the left of the range.', 'dp[l][r][k] = max(remove the run now, or clear a gap and merge with a later equal box)',
          'Removing k contiguous equal boxes scores k². Return the maximum score for removing all boxes.',
          'Without the extra count, the left part cannot know how many equal boxes will join it later. State (l, r, k) says: boxes l..r, with k more boxes equal to boxes[l] attached on the left. Either remove the run now for (k + 1)², or pick a later equal box m, clear the gap l+1..m−1 first, and carry on from m with k + 1.',
          [A('3-D memo', ['removeBoxes', 'solve'], 'O(n⁴)', 'O(n³)')],
          [('Why the third dimension?', 'Merging boxes later changes the score of the group, so the group size must be in the state.'), ('Why shrink l while equal?', 'It folds adjacent equal boxes into k without extra branching.')],
          ['[[Burst Balloons]]', '[[Strange Printer]]'], companies=['Tencent'], gotcha=CHK),
        P('Unique Binary Search Trees II', 'UniqueBinarySearchTreesII', 'LeetCode 95', 'Medium', ['Choose a root', 'Generate all'],
          'Every value in the range can be the **root**; combine every left tree with every right tree.', 'trees(lo, hi) = ∪ root: left × right',
          'Return all structurally unique BSTs that store the values 1..n.',
          'For root r, the left subtree uses lo..r−1 and the right r+1..hi. An empty range gives a single null tree. Count equals the Catalan number.',
          [A('Recursion over ranges', ['generateTrees', 'build'], 'O(Catalan(n) · n)', 'O(Catalan(n) · n)')],
          [('How many trees?', 'Catalan(n): 1, 2, 5, 14, 42, ...'), ('Why one null for an empty range?', 'It keeps the double loop from producing zero combinations.')],
          ['[[All Possible Full Binary Trees]]', '[[Boolean Parenthesization]]'], companies=['Amazon'], gotcha='Subtrees are shared between results; treat the returned trees as read-only.'),
        P('All Possible Full Binary Trees', 'AllPossibleFullBinaryTrees', 'LeetCode 894', 'Medium', ['Choose a split', 'Memo by size'],
          'A full binary tree has an **odd** node count; the root splits the rest into odd left and odd right.', 'trees(n) = ∪ left (odd): trees(left) × trees(n − 1 − left)',
          'Return all full binary trees (every node has 0 or 2 children) with n nodes.',
          'Even n is impossible. For odd n the root takes one node and the remaining n − 1 are split as (1, n−2), (3, n−4), ... Memoise results by n.',
          [A('Memo by size', ['AllPossibleFullBinaryTrees'], 'O(Catalan(n/2))', 'O(Catalan(n/2))')],
          [('Why odd only?', 'Each internal node adds two children to the single root.'), ('Why memo?', 'trees(3) is rebuilt under many larger roots.')],
          ['[[Unique Binary Search Trees II]]'], companies=['Google', 'Amazon'], gotcha='Memoised trees are shared; do not mutate them after returning.'),
        P('Maximum Score from Performing Multiplication Operations', 'MaximumScoreFromPerformingMultiplicationOperations', 'LeetCode 1770', 'Hard', ['Prefix of operations', 'Two ends'],
          'After i operations you took **left from the front** and the rest from the back: the state is just (i, left).', 'dp[i][left] = max(nums[left]·m[i] + dp[i+1][left+1], nums[right]·m[i] + dp[i+1][left])',
          'On each of m operations take the leftmost or rightmost number x of nums, gain x · multipliers[i] and remove x. Return the maximum score.',
          'The right index is determined by i and left: right = n − 1 − (i − left). So there are only m² states, not n². Fill backwards with one array.',
          [A('2-D DP rolled into 1-D', ['maximumScore'], 'O(m²)', 'O(m)')],
          [('Why m² states?', 'The pair (i, left) fixes both ends of the remaining array.'), ('Why iterate i downwards?', 'The recurrence reads the next operation.')],
          ['[[Burst Balloons]]', '[[Stone Game]]'], companies=['Google'], gotcha=CHK),
        P('Super Egg Drop', 'SuperEggDrop', 'LeetCode 887', 'Hard', ['Moves instead of floors', 'Binary search on the DP'],
          'Flip the question: how many floors can I **settle with m moves and e eggs**?', 'floors(m, e) = floors(m−1, e−1) + floors(m−1, e) + 1',
          'With k eggs and a building of n floors, find the minimum number of moves that guarantees finding the critical floor.',
          'One drop from some floor: if the egg breaks, the floors below are covered with m − 1 moves and e − 1 eggs; if it survives, the floors above are covered with m − 1 moves and e eggs; plus the floor itself. Increase m until the covered floors reach n. The classic floors-based DP does the same with a binary search for the balanced drop floor.',
          [A('Moves DP', ['superEggDrop'], 'O(k · moves)', 'O(k)'), A('Floors DP + binary search', ['superEggDropBinary'], 'O(k · n log n)', 'O(k · n)')],
          [('Why binary search in approach 2?', 'The breaks value rises and the holds value falls with the drop floor; the best is at the crossing.'), ('Why is approach 1 faster?', 'It never loops over floors.')],
          ['[[Burst Balloons]]'], companies=['Amazon', 'Google'], gotcha=CHK),
    ]
}
