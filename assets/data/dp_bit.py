def P(title, java, src, diff, pats, hook, mantra, statement, insight, approaches, recall, connected=(), companies=None, gotcha=None, url=None):
    return dict(title=title, java=java, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra, statement=statement, insight=insight,
                approaches=approaches, recall=recall, connected=list(connected), companies=companies, gotcha=gotcha, url=url)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
CHK = 'Verified against a brute-force enumeration on small random inputs when it was written.'
TOPIC = {
    'name': 'Bitmask Digit and Tree DP', 'dir': 'DP/Bitmask Digit and Tree DP', 'tag': 'dp', 'anim': 'Bitmask Digit and Tree DP Animations.html',
    'hook': 'The state is something other than an index: **a set, a digit position, or a tree node**.\n1. **Bitmask over a small set** (skills, words, letters, elements): `dp[mask]` or `dp[mask][last]` (Smallest Sufficient Team, Score After N Operations, Shortest Superstring).\n2. **Letter set as state** while scanning: the mask of letters in the open partition (Partitions After Operations).\n3. **Digit DP**: position, tight flag, and the last digits seen, returning (count, total) (Total Waviness).\n4. **Count by carry**: build a sum bit by bit with a carry and a multinomial factor (Magical Sequences).\n5. **Position + residue**: counts per remainder (Find X Value).\n6. **Tree DP**: children first, state = what the ancestors did (halvings, boss bought, budget) (Coins From All Nodes, Stocks with Discounts).',
    'toolkit': '''| Need | Java |
|---|---|
| Subset loop | `for (int mask = 0; mask < (1 << n); mask++)` |
| Test and set a bit | `(mask >> i & 1) == 1` / `mask \\| (1 << i)` |
| Count bits | `Integer.bitCount(mask)`, `Long.bitCount(m)` |
| Letter mask | `mask \\|= 1 << (c - 'a');` |
| Tight digit DP | `int limit = tight ? digit[pos] : 9; ... go(pos + 1, tight && d == limit, ...)` |
| Memo key packing | `((long) i << 27) \\| ((long) mask << 1) \\| flag` in a `HashMap<Long, Integer>` |
| Binomials mod p | Pascal's triangle `C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD` |
| Tree order without recursion | BFS list from the root, then process it in reverse |''',
    'mermaid': '''graph LR
  D((Bitmask Digit and Tree DP)) --> M[Subset masks<br/>Smallest Sufficient Team, Score After N Operations, Superstring]
  D --> L[Letter set while scanning<br/>Partitions After Operations]
  D --> G[Digit DP<br/>Total Waviness, Magical Sequences]
  D --> P[Position and remainder<br/>Find X Value]
  D --> T[Tree DP<br/>Coins From All Nodes, Stocks with Discounts]''',
    'order': '1. [[Maximize Score After N Operations]] ⭐, [[Smallest Sufficient Team]]\n2. [[Find the Shortest Superstring]], [[Maximize the Number of Partitions After Operations]]\n3. [[Find X Value of Array I]]\n4. [[Total Waviness of Numbers in Range II]], [[Find Sum of Array Product of Magical Sequences]]\n5. [[Maximum Points After Collecting Coins From All Nodes]], [[Maximum Profit from Trading Stocks with Discounts]]',
    'cross': ['[[Knapsack Series - Pattern Map]] for the budget dimension used by the tree knapsack', '[[Game DP - Pattern Map]] for another bitmask minimax (Kill All Pawns)', '[[Rotated Digits]] for a simpler digit-by-digit count'],
    'problems': [
        P('Maximize Score After N Operations', 'MaximizeScoreAfterNOperations', 'LeetCode 1799', 'Hard', ['Mask of used elements', 'Pairing'],
          'The mask says which elements are used; its **popcount tells the operation number**.', 'dp[mask | i | j] = dp[mask] + op · gcd(a[i], a[j]), op = popcount / 2 + 1',
          'nums has 2n integers. In operation i (1-indexed) remove two elements x, y and score i · gcd(x, y). Return the maximum total score.',
          'dp[mask] is the best score after removing the elements in mask (an even count). The next operation number follows from the popcount, so no extra dimension is needed. Precompute the gcd table once.',
          [A('Forward mask DP', ['maxScore', 'gcd'], 'O(2ᵐ · m²)', 'O(2ᵐ)')],
          [('Why does popcount give the operation number?', 'Each operation removes exactly two elements.'), ('Why a gcd table?', 'The same gcds are needed across many masks.')],
          ['[[Smallest Sufficient Team]]', '[[Find the Shortest Superstring]]'], companies=['Meta'], gotcha=CHK),
        P('Smallest Sufficient Team', 'SmallestSufficientTeam', 'LeetCode 1125', 'Hard', ['Skill mask', 'Set cover'],
          'The state is **which skills are covered**; store the best team (as a person mask) per covered set.', 'team[covered | skills(p)] = smaller of (itself, team[covered] + p)',
          'Given required skills and each person\'s skills, return the indices of a smallest team covering all required skills.',
          'There are at most 2¹⁶ skill masks. For each person, update every reachable mask: adding the person gives a larger covered set with one more member. Keep the team with fewer people.',
          [A('Skill-mask DP', ['smallestSufficientTeam'], 'O(n · 2ᵐ)', 'O(2ᵐ)')],
          [('Why store the team and not just its size?', 'The problem asks for the members.'), ('Why a long for the team?', 'Up to 60 people fit in one 64-bit mask.')],
          ['[[Maximize Score After N Operations]]'], companies=['Google', 'Amazon'], gotcha=CHK),
        P('Find the Shortest Superstring', 'FindTheShortestSuperstring', 'LeetCode 943', 'Hard', ['TSP on words', 'Overlap matrix'],
          'Order the words so that **consecutive overlaps are as large as possible**: a travelling-salesman path.', 'dp[mask][last] = max over prev of dp[mask minus last][prev] + overlap[prev][last]',
          'Return the shortest string that contains every word as a substring (no word is a substring of another).',
          'Precompute overlap[i][j] = longest suffix of i that is a prefix of j. dp[mask][last] is the maximum total overlap of an order of the words in mask ending with last. Track parents to rebuild the order and then append each word without its overlap.',
          [A('Bitmask TSP', ['shortestSuperstring'], 'O(2ⁿ · n²)', 'O(2ⁿ · n)')],
          [('Why maximise overlap?', 'Total length = sum of lengths − total overlap.'), ('Why no word is a substring of another?', 'Otherwise it would just be absorbed and the model of "overlaps only" breaks.')],
          ['[[Maximize Score After N Operations]]'], companies=['Google'], gotcha=CHK),
        P('Maximize the Number of Partitions After Operations', 'MaximizeTheNumberOfPartitionsAfterOperations', 'LeetCode 3003', 'Hard', ['Letter set state', 'One free change'],
          'The state is **(position, letters in the open partition, change still available?)**. The change is tried at each position.', 'solve(i, mask, can): place s[i] or, if can, any other letter',
          'Partition s greedily into the longest prefixes with at most k distinct letters. Before partitioning you may change at most one character to any letter. Return the maximum number of partitions.',
          'Walk left to right. If adding the letter makes more than k distinct letters, the current partition ends and a new one starts with that letter. With the free change available, try every other letter at the current position too.',
          [A('Memo on (i, mask, can)', ['MaximizeTheNumberOfPartitionsAfterOperations'], 'O(n · 26 · states)', 'O(n · states)')],
          [('Why does the mask stay small?', 'Only reachable masks are visited and at most k letters are in it.'), ('Greedy partitioning proof?', 'Taking the longest valid prefix leaves the most for later.')],
          ['[[Maximum Length of a Concatenated String with Unique Characters]]'], companies=['Google'], gotcha='Recursion depth is the string length (up to 10⁴); run it in a thread with a larger stack if the default overflows.'),
        P('Find X Value of Array I', 'FindXValueOfArrayI', 'LeetCode 3524', 'Medium', ['Residue counts', 'Subarrays ending here'],
          'Keep **how many subarrays ending here have each product remainder**; extending multiplies every remainder.', 'cnt\'[x · v mod k] += cnt[x] · plus the single element v mod k',
          'Count, for every remainder x, the subarrays of nums whose product leaves remainder x when divided by k (k ≤ 5).',
          'A subarray ending at i is either the single element or an earlier subarray extended by nums[i]. Its remainder is the old remainder times nums[i] mod k. Add the new counts to the result after each element.',
          [A('Remainder table', ['resultArray'], 'O(n · k)', 'O(k)')],
          [('Why long?', 'There can be about n²/2 subarrays.'), ('Why not O(n²)?', 'Subarrays with the same remainder behave identically from then on.')],
          ['[[Paths in Matrix Whose Sum Is Divisible by K]]'], companies=['Rubrik'], gotcha=CHK),
        P('Total Waviness of Numbers in Range II', 'TotalWavinessOfNumbersInRangeII', 'LeetCode 3753', 'Hard', ['Digit DP', '(count, total) pair'],
          'Build the number digit by digit. Each state returns **how many numbers** and **their total waviness**; a new digit adds `count` whenever the middle digit becomes a peak or valley.', 'ANSWER = f(num2) − f(num1 − 1)',
          'A digit is a peak (valley) if it is strictly greater (smaller) than both neighbours; the first and last digits are neither. Return the sum of the waviness of all numbers in [num1, num2], num ≤ 10¹⁵.',
          'State: position, tight to the bound, still in leading zeros, and the last two digits. When the digit after (a, b) is d, the middle digit b is a peak if a < b > d and a valley if a > b < d; every completion of the suffix then counts once more. Memoise the non-tight, non-leading states.',
          [A('Digit DP', ['TotalWavinessOfNumbersInRangeII'], 'O(len · 10³)', 'O(len · 100)')],
          [('Why carry the count too?', 'Adding a peak at this step contributes once per completion of the suffix.'), ('Why 10 as "none"?', 'It marks that fewer than two digits have been placed.')],
          ['[[Rotated Digits]]'], companies=['Google'], gotcha=CHK),
        P('Find Sum of Array Product of Magical Sequences', 'FindSumOfArrayProductOfMagicalSequences', 'LeetCode 3539', 'Hard', ['Digit DP on bits', 'Multinomial counts'],
          'Choose **how many times each index is used**; the sum of powers of two is built bit by bit with a **carry**, and orderings come from a multinomial coefficient.', 'go(i, rem, onesLeft, carry) = Σ_t C(rem, t) · nums[i]^t · go(i + 1, rem − t, onesLeft − bit, carry\')',
          'A sequence of m indices into nums is magical if the sum of 2^index has exactly k set bits. Its product is the product of nums at those indices. Return the sum of products over all magical sequences, mod 10⁹ + 7.',
          'Process indices from 0 up. If index i is used t times, the running sum at bit i is carry + t: the low bit is the result bit (counted as a one or not) and the rest carries to the next bit. The t chosen positions among the remaining ones give C(rem, t) arrangements. After the last index the remaining carry contributes its own set bits.',
          [A('Memo on (i, rem, ones, carry)', ['FindSumOfArrayProductOfMagicalSequences'], 'O(n · m² · k · m)', 'O(n · m · k · m)')],
          [('Why a carry?', 'Using an index several times adds 2^i that many times, which spills into higher bits.'), ('Why binomials?', 'They count which of the remaining positions get this index.')],
          ['[[Total Waviness of Numbers in Range II]]', '[[Number of Music Playlists]]'], companies=['Google'], gotcha='Binomials and powers are precomputed mod 10⁹ + 7; the carry never exceeds m.'),
        P('Maximum Points After Collecting Coins From All Nodes', 'MaximumPointsAfterCollectingCoinsFromAllNodes', 'LeetCode 2920', 'Hard', ['Tree DP', 'Halvings as state'],
          'The only thing a node inherits from its ancestors is **how many times its coins were halved**, and after 14 halvings everything is 0.', 'dp[v][p] = max(coins>>p − k + Σ dp[child][p], coins>>(p+1) + Σ dp[child][p+1])',
          'On a tree rooted at 0, each node can be collected for coins − k points, or for floor(coins / 2) points while halving every coin in its subtree. Return the maximum points over all nodes.',
          'State (v, p): v is visited after p ancestors chose the halving option. Choosing "minus k" keeps p for the children; choosing "halve" raises p by one. coins ≤ 10⁴ means p can stop at 14. Process nodes in reverse BFS order to avoid deep recursion.',
          [A('Reverse BFS tree DP', ['maximumPoints'], 'O(n · 15)', 'O(n · 15)')],
          [('Why p ≤ 14?', '10⁴ < 2¹⁴, so the coin value is zero after 14 halvings.'), ('Why not recursion?', 'The tree can have 10⁵ nodes and be a long chain.')],
          ['[[Maximum Profit from Trading Stocks with Discounts]]'], companies=['Google'], gotcha=CHK),
        P('Maximum Profit from Trading Stocks with Discounts', 'MaximumProfitFromTradingStocksWithDiscounts', 'LeetCode 3562', 'Hard', ['Tree knapsack', 'Boss bought?'],
          'Each employee has two price tags depending on whether the **boss bought**; combine the children with a knapsack over the budget.', 'best[u][bossBought][b] = max(skip u: merge children, buy u: merge children (boss bought) + future − price)',
          'Employees form a hierarchy. Employee i can buy one stock at present[i] and sell at future[i]; if their direct boss bought, they pay floor(present[i] / 2). Return the maximum profit within the budget.',
          'The tables depend on whether the parent bought: that changes u\'s price. For each choice at u, merge the children\'s tables with a max-plus convolution over budget. The "bought" case uses the children\'s boss-bought tables, the "skip" case uses their other tables.',
          [A('Tree knapsack', ['MaximumProfitFromTradingStocksWithDiscounts'], 'O(n · budget²)', 'O(n · budget)')],
          [('Why two tables per node?', 'The node\'s price depends on its boss, and its children\'s on it.'), ('Why a convolution?', 'Each child spends part of the budget independently.')],
          ['[[Maximum Points After Collecting Coins From All Nodes]]', '[[0-1 Knapsack]]'], companies=['Google'], gotcha=CHK),
    ]
}
