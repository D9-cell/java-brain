def P(title, java, src, diff, pats, hook, mantra, statement, insight, approaches, recall, connected=(), companies=None, gotcha=None, url=None):
    return dict(title=title, java=java, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra, statement=statement, insight=insight,
                approaches=approaches, recall=recall, connected=list(connected), companies=companies, gotcha=gotcha, url=url)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
CHK = 'Verified against a brute-force enumeration on small random grids when it was written.'
TOPIC = {
    'name': 'Grid Shapes and Colorings', 'dir': 'DP/Grid Shapes and Colorings', 'tag': 'dp', 'anim': 'Grid Shapes and Colorings Animations.html',
    'hook': 'The DP looks at a **shape or a pattern** at each cell, not at a path.\n1. **Square ending here**: `dp[i][j] = 1 + min(up, left, up-left)` (Maximal Square, Count Squares).\n2. **Four run lengths**: sweep in four directions and take the minimum (Plus Sign).\n3. **Direction and turn state**: `(cell, direction, turn left?)` (V-Shaped Diagonal).\n4. **Prefix sums on a grid**: inclusion-exclusion over four corners (Range Sum 2D, Pizza).\n5. **Row patterns as states**: classify a row or column coloring and count the compatible neighbours (Paint N × 3, Paint a Grid).\n6. **Column heights as states**: the DP walks over columns with the last two heights (Grid Operations).',
    'toolkit': '''| Need | Java |
|---|---|
| Rolling square DP | `int diag = 0; int up = dp[j]; dp[j] = 1 + Math.min(diag, Math.min(dp[j - 1], up)); diag = up;` |
| 2D prefix sum | `pre[i + 1][j + 1] = a[i][j] + pre[i][j + 1] + pre[i + 1][j] - pre[i][j];` |
| Rectangle query | `pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1]` |
| Directions in turn order | `int[][] DIRS = {{1, 1}, {1, -1}, {-1, -1}, {-1, 1}};` then `(d + 1) % 4` is a clockwise turn |
| Enumerate patterns | recursive `build(row, cur, out)` listing every valid column coloring |
| Compatible pairs | precompute `List<List<Integer>> next` once, then the DP only walks edges |''',
    'mermaid': '''graph LR
  D((Grid Shapes and Colorings)) --> SQ[Squares<br/>Maximal Square, Count Square Submatrices]
  D --> SH[Runs and directions<br/>Largest Plus Sign, V-Shaped Diagonal]
  D --> PS[Prefix sums<br/>Range Sum Query 2D, Cutting a Pizza]
  D --> CO[Pattern states<br/>Paint N x 3, Paint a Grid With Three Colors]
  D --> OP[Column heights<br/>Maximum Score From Grid Operations]''',
    'order': '1. [[Maximal Square]] ⭐, [[Count Square Submatrices with All Ones]], [[Largest Plus Sign]]\n2. [[Range Sum Query 2D - Immutable]], [[Number of Ways of Cutting a Pizza]]\n3. [[Number of Ways to Paint N × 3 Grid]], [[Painting a Grid With Three Different Colors]]\n4. [[Length of Longest V-Shaped Diagonal Segment]], [[Maximum Score From Grid Operations]]',
    'cross': ['[[Grid Paths - Pattern Map]] for DP along right/down walks', '[[Maximum Sum Rectangle]] for 2D Kadane over row pairs', '[[Domino and Tromino Tiling]] for the same "state per column" idea'],
    'problems': [
        P('Maximal Square', 'MaximalSquare', 'LeetCode 221', 'Medium', ['Square ending here', 'Rolling row'],
          'A square of side s ending at a cell needs squares of side s − 1 ending at its **three neighbours**.', 'dp[i][j] = 1 + min(dp[i−1][j], dp[i][j−1], dp[i−1][j−1]) IF cell = 1',
          'Find the largest square containing only 1s in a binary matrix and return its area.',
          'dp[i][j] is the side of the largest all-1 square whose bottom-right corner is (i, j). The three neighbours limit it: the smallest of the squares above, to the left and diagonal. One row of dp plus a saved diagonal value is enough.',
          [A('Rolling row', ['maximalSquare'], 'O(m · n)', 'O(n)')],
          [('Why min of three?', 'Any shorter arm breaks the square.'), ('Return?', 'The area: best × best.')],
          ['[[Count Square Submatrices with All Ones]]', '[[Largest Plus Sign]]'], companies=['Amazon', 'Google', 'Microsoft'], gotcha=CHK),
        P('Count Square Submatrices with All Ones', 'CountSquareSubmatricesWithAllOnes', 'LeetCode 1277', 'Medium', ['Square ending here', 'Sum of dp'],
          'The side of the largest square ending at a cell **is also the number of squares ending there**.', 'ANSWER = Σ dp[i][j]',
          'Count all square submatrices that contain only 1s.',
          'A cell with dp = s is the corner of exactly s squares, of sides 1 to s. Add every dp value.',
          [A('Table + sum', ['countSquares'], 'O(m · n)', 'O(m · n)')],
          [('Why is the side the count?', 'If a side-s square fits, so do squares of side 1..s − 1 at the same corner.'), ('Border cells?', 'dp is 1 for any 1 on the first row or column.')],
          ['[[Maximal Square]]'], companies=['Amazon', 'Meta'], gotcha=CHK),
        P('Largest Plus Sign', 'LargestPlusSign', 'LeetCode 764', 'Medium', ['Four runs', 'Min of arms'],
          'A plus is limited by its **shortest arm**: sweep the four directions and keep the minimum.', 'arm[i][j] = min(left, right, up, down) RUN OF 1s',
          'An n × n grid is all 1s except the given mines (0). Return the order (arm length including the centre) of the largest axis-aligned plus of 1s.',
          'For each cell the left, right, up and down runs of consecutive 1s come from running counters that reset on a mine. The plus order at that centre is the smallest of the four. The answer is the maximum over all cells.',
          [A('Four sweeps', ['orderOfLargestPlusSign'], 'O(n²)', 'O(n²)')],
          [('Why min of four?', 'All arms must have the same length.'), ('Order vs arm?', 'Order counts the centre, so a plus with arms of 1 has order 2.')],
          ['[[Maximal Square]]'], companies=['Amazon'], gotcha=CHK),
        P('Range Sum Query 2D - Immutable', 'RangeSumQuery2DImmutable', 'LeetCode 304', 'Medium', ['2D prefix sum', 'Inclusion-exclusion'],
          'pre[i][j] stores the sum of everything **above and to the left**; any rectangle is four corners.', 'sum = D − B − C + A',
          'Preprocess a matrix so that sumRegion(r1, c1, r2, c2) returns the sum of the rectangle in O(1).',
          'Build pre with one extra row and column of zeros. A rectangle equals the big corner at (r2, c2) minus the strips above and to the left, plus the doubly subtracted corner.',
          [A('Prefix table', ['RangeSumQuery2DImmutable'], 'O(m · n) build, O(1) query', 'O(m · n)')],
          [('Why add pre[r1][c1]?', 'The corner was subtracted twice.'), ('Why a padded row and column?', 'It removes the edge cases for r1 = 0 or c1 = 0.')],
          ['[[Number of Ways of Cutting a Pizza]]', '[[Maximum Sum Rectangle]]'], companies=['Amazon', 'Google'], gotcha=CHK),
        P('Number of Ways of Cutting a Pizza', 'NumberOfWaysOfCuttingAPizza', 'LeetCode 1444', 'Hard', ['Suffix 2D sums', 'Cuts DP'],
          'Each cut keeps the **bottom-right piece**, so the state is just its top-left corner plus the cuts left.', 'dp[cuts][r][c] = Σ dp[cuts−1][next corner] FOR EACH CUT THAT GIVES AN APPLE TO THE PIECE CUT OFF',
          'Cut a pizza with apples into k pieces using k − 1 horizontal or vertical cuts, giving the top or left part away each time. Count the ways so every piece has at least one apple (mod 10⁹ + 7).',
          'apples[r][c] counts apples in the rectangle from (r, c) to the bottom-right. A cut at row r hands away rows i..r−1, which has apples iff apples[i][j] − apples[r][j] > 0. The last piece must have an apple too, which is dp[0].',
          [A('Suffix sums + layered DP', ['ways'], 'O(k · m · n · (m + n))', 'O(k · m · n)')],
          [('Why only the bottom-right?', 'The piece you keep is always a bottom-right rectangle.'), ('Base layer?', 'One piece left: ways = 1 if the rectangle has an apple.')],
          ['[[Range Sum Query 2D - Immutable]]', '[[Palindrome Partitioning II]]'], companies=['Google'], gotcha=CHK),
        P('Number of Ways to Paint N × 3 Grid', 'NumberOfWaysToPaintNx3Grid', 'LeetCode 1411', 'Hard', ['Row type states', 'Counting'],
          'Only **two row shapes** matter: ABA (two colours) and ABC (three colours); counts per shape transition by fixed multipliers.', 'ABA\' = 3·ABA + 2·ABC · ABC\' = 2·ABA + 2·ABC',
          'Paint an n × 3 grid with 3 colours so no two adjacent cells (horizontally or vertically) share a colour. Return the count mod 10⁹ + 7.',
          'A row is ABA (6 colourings) or ABC (6). Counting the legal rows under each type gives: ABA can be followed by 3 ABA and 2 ABC; ABC by 2 ABA and 2 ABC. So two numbers carry the whole state.',
          [A('Two running counts', ['numOfWays'], 'O(n)', 'O(1)')],
          [('Why start at 6 and 6?', 'There are 6 colourings of each shape for the first row.'), ('Check n = 1?', '6 + 6 = 12 colourings of a single row.')],
          ['[[Painting a Grid With Three Different Colors]]', '[[Domino and Tromino Tiling]]'], gotcha=CHK),
        P('Painting a Grid With Three Different Colors', 'PaintingAGridWithThreeDifferentColors', 'LeetCode 1931', 'Hard', ['Column pattern states', 'Compatibility graph'],
          'm ≤ 5, so list every valid **column coloring** (at most 48) and count walks of length n over compatible columns.', 'dp[col][pattern] = Σ dp[col−1][compatible pattern]',
          'Paint an m × n grid with 3 colours so no two adjacent cells match. Return the count mod 10⁹ + 7.',
          'A valid column has no equal vertical neighbours: 3 · 2^(m−1) patterns. Two columns may be adjacent when they differ in every row. Precompute the compatible pairs once and run the DP over columns.',
          [A('Patterns + transitions', ['colorTheGrid', 'build', 'compatible'], 'O(n · P²)', 'O(P²)')],
          [('Why is P small?', 'm ≤ 5 gives at most 3 · 16 = 48 patterns.'), ('Starting vector?', 'Every pattern has 1 way for the first column.')],
          ['[[Number of Ways to Paint N × 3 Grid]]'], gotcha=CHK),
        P('Length of Longest V-Shaped Diagonal Segment', 'LengthOfLongestVShapedDiagonalSegment', 'LeetCode 3459', 'Hard', ['Direction + turn state', 'Memo'],
          'State = **(cell, direction, turn still available?)**. The required value is forced by the cell: 1 → 2 → 0 → 2 → 0.', 'KEEP GOING · OR TURN CLOCKWISE ONCE',
          'A V-shaped segment starts at a 1, follows 2, 0, 2, 0, ... along a diagonal and may make one clockwise 90° turn to another diagonal. Return the longest length (0 if no 1).',
          'From each 1 try the four diagonals. At each step either keep the direction or, if the turn is unused, turn clockwise. The next required value alternates 2, 0, 2, 0 and is known from the cell, so a memo on (r, c, direction, canTurn) is enough.',
          [A('Memoised walk', ['LengthOfLongestVShapedDiagonalSegment'], 'O(m · n · 8)', 'O(m · n · 8)')],
          [('Why memo shared across starts?', 'The future depends only on the cell, direction and turn flag.'), ('Why (d + 1) % 4?', 'DIRS are listed in clockwise order.')],
          ['[[Maximal Square]]'], gotcha=CHK),
        P('Maximum Score From Grid Operations', 'MaximumScoreFromGridOperations', 'LeetCode 3225', 'Hard', ['Column heights', 'Three-column window'],
          'Each column ends up black from the top down to some **height**. A white cell scores iff the column beside it is taller.', 'score(col) = Σ cells from h[col] to max(h[col−1], h[col+1]) − 1',
          'An n × n grid starts white. An operation blackens a column from row 0 down to a chosen row. A white cell scores its value if a left or right neighbour is black. Return the maximum score.',
          'Only the final heights matter. The score of column c depends on its own height and the heights on both sides, so DP over columns with state (previous height, current height) and a transition choosing the next height. Prefix sums per column give each score in O(1).',
          [A('Heights DP', ['maximumScore'], 'O(n⁴)', 'O(n²)')],
          [('Why not O(n³)?', 'A running maximum over the previous height shaves a factor, but O(n⁴) is fine for n ≤ 100.'), ('Why heights 0..n?', 'n means a fully black column, 0 means untouched.')],
          ['[[Domino and Tromino Tiling]]', '[[Largest Plus Sign]]'], gotcha=CHK),
    ]
}
