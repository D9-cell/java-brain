def P(title, java, src, diff, pats, hook, mantra, statement, insight, approaches, recall, connected=(), companies=None, gotcha=None, url=None):
    return dict(title=title, java=java, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra, statement=statement, insight=insight,
                approaches=approaches, recall=recall, connected=list(connected), companies=companies, gotcha=gotcha, url=url)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
CHK = 'Verified against an explicit two-player minimax on small random inputs when it was written.'
TOPIC = {
    'name': 'Game DP', 'dir': 'DP/Game DP', 'tag': 'dp', 'anim': 'Game DP Animations.html',
    'hook': 'Two perfect players: define **dp = the mover\'s best result** and subtract the opponent\'s best from the rest.\n1. **Score lead**: `dp[state] = max over moves of (gain − dp[next state])`, one number for both players (Predict the Winner, Stone Games III/VII/VIII).\n2. **Own total**: `dp = suffix − dp[next]` when every stone ends up with someone (Stone Game II, GfG Optimal Strategy).\n3. **Win or lose**: a boolean per state, true if some move reaches a losing state (Stone Game IV).\n4. **Math shortcut**: find the invariant instead of searching (Stone Game, Stone Game IX).\n5. **Max vs min players**: one maximises, the other minimises the same total, so turn parity is part of the state (Kill All Pawns).',
    'toolkit': '''| Need | Java |
|---|---|
| Mover\'s lead | `dp[i][j] = Math.max(a[i] - dp[i + 1][j], a[j] - dp[i][j - 1]);` |
| Interval order | `for (int len = 2; len <= n; len++) for (int i = 0; i + len <= n; i++) { int j = i + len - 1; ... }` |
| Prefix and suffix sums | `pre[i + 1] = pre[i] + a[i];` / `suffix[i] = suffix[i + 1] + a[i];` |
| Win flag | `win[i] = !win[i - s * s]` for some move s |
| Turn from the mask | `boolean alice = (n - Integer.bitCount(mask)) % 2 == 0;` |
| Memo with a sentinel | `int[][] memo; Arrays.fill(row, -1)` when 0 is a legal answer |''',
    'mermaid': '''graph LR
  D((Game DP)) --> L[Lead from the ends<br/>Predict the Winner, Stone Game, Stone Game VII, Optimal Strategy]
  D --> P[Take from the front<br/>Stone Game II, III, VIII]
  D --> W[Win or lose flag<br/>Stone Game IV]
  D --> S[Split the row<br/>Stone Game V]
  D --> M[Math or mask<br/>Stone Game IX, Kill All Pawns]''',
    'order': '1. [[Predict the Winner]] ⭐, [[Stone Game]], [[Optimal Strategy For A Game]], [[Stone Game VII]]\n2. [[Stone Game III]], [[Stone Game II]], [[Stone Game VIII]]\n3. [[Stone Game IV]], [[Stone Game V]]\n4. [[Stone Game IX]], [[Maximum Number of Moves to Kill All Pawns]]',
    'cross': ['[[Interval DP - Pattern Map]] for the range tables used by the end-taking games', '[[Knapsack Series - Pattern Map]] for choices over a prefix', '[[Burst Balloons]] for another "last move" view of a range'],
    'problems': [
        P('Predict the Winner', 'PredictTheWinner', 'LeetCode 486', 'Medium', ['Lead from the ends', 'Interval DP'],
          'Track the **lead** (mover minus opponent). Taking an end gains it and gives the opponent the lead on what is left.', 'dp[i][j] = max(a[i] − dp[i+1][j], a[j] − dp[i][j−1])',
          'Two players alternately take a number from either end of nums. Player 1 starts. Return true if player 1 can win (a tie counts as a win).',
          'dp[i][j] is the best lead of the player to move on nums[i..j]. A move takes an end and then the opponent plays the same game on the rest, so their lead is subtracted. Player 1 wins iff dp[0][n−1] ≥ 0. One rolling array is enough.',
          [A('Lead DP', ['predictTheWinner'], 'O(n²)', 'O(n)')],
          [('Why subtract dp of the rest?', 'The opponent is the mover there, so their lead counts against us.'), ('Why ≥ 0?', 'A tied total goes to player 1 in this problem.')],
          ['[[Stone Game]]', '[[Stone Game VII]]', '[[Optimal Strategy For A Game]]'], companies=['Google', 'Amazon'], gotcha=CHK),
        P('Stone Game', 'StoneGame', 'LeetCode 877', 'Medium', ['Parity argument', 'Lead from the ends'],
          'With an **even number of piles and an odd total**, Alice can lock in all even-indexed or all odd-indexed piles. She picks the larger group.', 'RETURN true',
          'Alice and Bob take piles from either end; the number of piles is even and the total is odd. Alice starts. Return true if Alice wins.',
          'Alice can take every even-indexed pile (or every odd-indexed one) by always choosing the end that has the right parity. One group sums higher because the total is odd, so she always wins. The lead DP gives the same answer and works without the parity guarantee.',
          [A('Math: always true', ['stoneGame'], 'O(1)', 'O(1)'), A('Lead DP', ['stoneGameDp'], 'O(n²)', 'O(n²)')],
          [('What if the total could be even?', 'Then a tie is possible and the DP must be used.'), ('Why does Alice control parity?', 'After her pick the remaining ends have the same parity, so Bob always exposes the other parity.')],
          ['[[Predict the Winner]]'], gotcha='The shortcut relies on the statement\'s guarantees: an even pile count and an odd total.'),
        P('Optimal Strategy For A Game', 'OptimalStrategyForAGame', 'GfG Optimal Strategy For A Game', 'Medium', ['Own total', 'Interval DP'],
          'Take an end, then the opponent takes the **best** end of what is left, which leaves us the worse option.', 'dp[i][j] = max(a[i] + min(dp[i+2][j], dp[i+1][j−1]), a[j] + min(dp[i+1][j−1], dp[i][j−2]))',
          'Coins in a row, two players take from either end alternately. Return the maximum amount the first player can collect.',
          'After we take a[i], the opponent chooses between taking a[i+1] (we continue on i+2..j) and a[j] (we continue on i+1..j−1). They choose to leave us the smaller value, so we add the min of the two.',
          [A('Own-total DP', ['maxAmount'], 'O(n²)', 'O(n²)')],
          [('Why min?', 'The opponent plays perfectly, so we get the worse of the two leftovers.'), ('Same as lead DP?', 'Yes; total = (sum + lead) / 2.')],
          ['[[Predict the Winner]]', '[[Stone Game VII]]'], companies=['Amazon', 'Google', 'Microsoft'], gotcha=CHK, url='https://practice.geeksforgeeks.org/problems/optimal-strategy-for-a-game-1587115620/1'),
        P('Stone Game VII', 'StoneGameVII', 'LeetCode 1690', 'Medium', ['Lead from the ends', 'Prefix sums'],
          'Removing an end **scores the sum of what remains**, so the gain is a range sum.', 'dp[i][j] = max(sum(i+1..j) − dp[i+1][j], sum(i..j−1) − dp[i][j−1])',
          'Players alternately remove the leftmost or rightmost stone and score the sum of the remaining stones. Alice wants to maximise and Bob to minimise the score difference. Return Alice\'s best lead.',
          'The same lead recurrence as Predict the Winner, with the gain being the sum of the other stones, read from a prefix sum array.',
          [A('Lead DP + prefix sums', ['stoneGameVII'], 'O(n²)', 'O(n²)')],
          [('Why prefix sums?', 'Each gain is a range sum, needed in O(1).'), ('Why a lead and not a score?', 'Only the difference matters, which is one number per state.')],
          ['[[Predict the Winner]]', '[[Stone Game]]'], gotcha=CHK),
        P('Stone Game III', 'StoneGameIII', 'LeetCode 1406', 'Hard', ['Take from the front', 'Lead'],
          'Take 1, 2 or 3 stones from the front. The lead from here is the **best of three prefix gains minus the opponent\'s lead**.', 'dp[i] = max over k = 1..3 of (sum of k stones − dp[i+k])',
          'Stones in a row with values (possibly negative). Each turn take 1 to 3 stones from the front. Return "Alice", "Bob" or "Tie".',
          'dp[i] is the mover\'s best lead when stones i.. remain. Compare the sign of dp[0] at the end.',
          [A('1-D lead DP', ['stoneGameIII'], 'O(n)', 'O(n)')],
          [('Why track a lead?', 'It handles negative stones and ties with a single number.'), ('Base?', 'dp[n] = 0 with no stones left.')],
          ['[[Stone Game II]]', '[[Stone Game VIII]]'], companies=['Amazon', 'Google'], gotcha=CHK),
        P('Stone Game II', 'StoneGameII', 'LeetCode 1140', 'Medium', ['Take from the front', 'Own total'],
          'The state is **(start, M)**: the mover can take 1..2M piles and M becomes max(M, taken).', 'dp[i][M] = max over X ≤ 2M of suffix[i] − dp[i+X][max(M, X)]',
          'Piles in a row. On a turn a player takes the first X piles with 1 ≤ X ≤ 2M, then M = max(M, X); M starts at 1. Return the most stones Alice can collect.',
          'Whatever the mover leaves, the opponent gets dp[i+X][..] out of the remaining suffix. So the mover keeps suffix[i] minus that. If 2M covers everything left, take it all.',
          [A('2-D DP over (i, M)', ['stoneGameII'], 'O(n³)', 'O(n²)')],
          [('Why is M at most n?', 'More than n piles can never be taken.'), ('Why suffix sums?', 'The total that remains is needed to turn the opponent\'s take into ours.')],
          ['[[Stone Game III]]', '[[Predict the Winner]]'], companies=['Google'], gotcha=CHK),
        P('Stone Game VIII', 'StoneGameVIII', 'LeetCode 1872', 'Hard', ['Prefix sums', 'One pass'],
          'Taking x stones leaves their **prefix sum** as the new first stone, so a move is "jump to prefix i".', 'best = max(best, pre[i] − best), WALKING i FROM THE END',
          'Players alternately remove x > 1 stones from the left, score their sum and put a stone with that sum back on the left. The game ends with one stone. Return Alice\'s lead.',
          'After a move that took the first x stones the leftmost stone equals the prefix sum pre[x−1]; the score of that move is also pre[x−1]. So the game is a sequence of increasing prefix indexes, and the mover\'s best lead from index i is max(best from i+1, pre[i] − best from i+1).',
          [A('Prefix sums, one pass', ['stoneGameVIII'], 'O(n)', 'O(n)')],
          [('Why start from pre[n−1]?', 'The last allowed move takes everything and ends the game.'), ('Why is x > 1 shown as i ≥ 1?', 'pre[0] would mean taking just one stone.')],
          ['[[Stone Game III]]', '[[Stone Game VII]]'], gotcha=CHK),
        P('Stone Game IV', 'StoneGameIV', 'LeetCode 1510', 'Hard', ['Win flag', 'Perfect squares'],
          'A position is **winning** if some square move leaves the opponent in a losing one.', 'win[i] = ∃ s: !win[i − s²]',
          'Players alternately remove a non-zero square number of stones from a pile of n. A player who cannot move loses. Return true if Alice wins.',
          'win[0] is false. For each i try every square s² ≤ i; if any resulting win[i − s²] is false, then i is winning.',
          [A('Boolean DP', ['winnerSquareGame'], 'O(n√n)', 'O(n)')],
          [('Why is win[0] false?', 'The player to move has no stones to remove.'), ('Early exit?', 'The loop stops as soon as one winning move is found.')],
          ['[[Stone Game III]]'], companies=['Amazon'], gotcha=CHK),
        P('Stone Game V', 'StoneGameV', 'LeetCode 1563', 'Hard', ['Split the row', 'Interval DP'],
          'Alice splits, Bob throws the **larger** half; Alice keeps the smaller half\'s sum and continues on it.', 'dp[l][r] = max over k of min-half sum + dp[that half] (tie: either)',
          'Alice splits a row of stones into two non-empty parts. Bob discards the part with the larger sum (Alice chooses on a tie) and Alice scores the sum of the remaining part. The game continues on that part. Return Alice\'s maximum score.',
          'For each split k, the smaller side survives. If the sides are equal Alice picks the better continuation. dp[l][r] is the best over splits; a row of one stone scores 0.',
          [A('Interval DP', ['stoneGameV'], 'O(n³)', 'O(n²)')],
          [('Why no minimising player?', 'Bob\'s choice is forced by the rule, only ties give Alice a choice.'), ('Optimise?', 'Monotonic split points bring it to O(n²) or O(n log n).')],
          ['[[Burst Balloons]]', '[[Stone Game VII]]'], companies=['Google'], gotcha=CHK),
        P('Stone Game IX', 'StoneGameIX', 'LeetCode 2029', 'Medium', ['Math invariant', 'Counting'],
          'Only **stone % 3** matters. Zeros act as passes, so parity of the zero count decides the shape.', 'zeros even → need both 1s and 2s · zeros odd → |c1 − c2| ≥ 3',
          'Players remove stones in turn; whoever makes the sum of removed stones divisible by 3 loses. If all stones are gone Bob wins. Alice starts. Return true if Alice wins.',
          'After the first move the sequence of removed residues is forced to alternate (1, 2, 1, 2, ...) or (2, 1, 2, 1, ...). With an even number of zeros they cancel and Alice needs at least one 1 and one 2. With an odd number of zeros the parity flips and Alice needs one residue to outnumber the other by at least 3.',
          [A('Counting residues', ['stoneGameIX'], 'O(n)', 'O(1)')],
          [('Why do zeros matter only by parity?', 'A zero never changes the sum mod 3, only whose turn it is.'), ('How was it checked?', 'Against a full game search on small multisets.')],
          ['[[Stone Game IV]]'], companies=['Google'], gotcha=CHK),
        P('Maximum Number of Moves to Kill All Pawns', 'MaximumNumberOfMovesToKillAllPawns', 'LeetCode 3283', 'Hard', ['Bitmask game', 'BFS distances'],
          'Precompute **knight distances** between all points, then play a minimax game over (where the knight is, pawns left).', 'Alice: max of d + play(next) · Bob: min of d + play(next)',
          'A knight and up to 15 pawns sit on a 50 × 50 board. Players alternate; the mover picks any remaining pawn and captures it by a shortest knight path (other pawns passed on the way stay). Alice maximises the total number of moves, Bob minimises it. Return the total with optimal play.',
          'Distances come from a BFS from the knight and from each pawn. The state is (current position, mask of pawns left). The mover is determined by how many pawns are gone, so the memo needs no extra flag.',
          [A('BFS + mask minimax', ['MaximumNumberOfMovesToKillAllPawns'], 'O(n² · 2ⁿ)', 'O(n · 2ⁿ)')],
          [('Why does the mask give the turn?', 'Each turn removes exactly one pawn, so the parity of removed pawns is the turn.'), ('Why a BFS per point?', 'The board is fixed at 50 × 50 and there are at most 16 points.')],
          ['[[Smallest Sufficient Team]]', '[[Stone Game III]]'], companies=['Google'], gotcha='Checked against the three LeetCode samples.'),
    ]
}
