def P(title, java, src, diff, pats, hook, mantra, statement, insight, approaches, recall, connected=(), companies=None, gotcha=None, url=None):
    return dict(title=title, java=java, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra, statement=statement, insight=insight,
                approaches=approaches, recall=recall, connected=list(connected), companies=companies, gotcha=gotcha, url=url)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
CHK = 'Verified against a brute-force enumeration on small random inputs when it was written.'
TOPIC = {
    'name': 'Scheduling and Partitions', 'dir': 'DP/Scheduling and Partitions', 'tag': 'dp', 'anim': 'Scheduling and Partitions Animations.html',
    'hook': 'Cut a sequence into **consecutive blocks** and charge each block by a rule; dp[i] = best cost of the first i items.\n1. **Last block of bounded size**: `dp[i] = best over len ≤ k of dp[i−len] + cost(block)` (Partition for Maximum Sum, Bookcase Shelves).\n2. **Blocks counted in days or groups**: add a dimension for how many blocks were used (Job Schedule Difficulty, Dividing Array).\n3. **Last block chosen by a condition**: the valid starts form a window, tracked by deques and prefix sums (Count Partitions).\n4. **Intervals in time order**: sort, binary search the next compatible one (Job Scheduling, Non-overlapping Intervals).\n5. **Match two sorted lists**: robots to factory slots (Total Distance).',
    'toolkit': '''| Need | Java |
|---|---|
| Last block loop | `for (int len = 1; len <= k && len <= i; len++) { mx = Math.max(mx, a[i - len]); dp[i] = Math.max(dp[i], dp[i - len] + mx * len); }` |
| Sort indexes | `Integer[] order = ...; Arrays.sort(order, (a, b) -> Integer.compare(end[a], end[b]));` |
| Binary search last fit | `while (lo < hi) { int mid = (lo + hi + 1) >>> 1; if (end[order[mid - 1]] <= start) lo = mid; else hi = mid - 1; }` |
| Window max and min | two `Deque<Integer>` of indexes, one decreasing and one increasing |
| Prefix sums mod | `ways[i] = ((prefix[i] - prefix[left]) % MOD + MOD) % MOD;` |
| Running AND groups | `Map<Integer,Integer>`: AND value → best dp, merged with `e.getKey() & x` |''',
    'mermaid': '''graph LR
  D((Scheduling and Partitions)) --> B[Bounded last block<br/>Partition for Maximum Sum, Bookcase Shelves]
  D --> K[Blocks counted<br/>Job Schedule Difficulty, Dividing Array]
  D --> W[Valid starts form a window<br/>Count Partitions]
  D --> T[Time order<br/>Job Scheduling, Non-overlapping Intervals]
  D --> M[Two sorted lists<br/>Total Distance]''',
    'order': '1. [[Partition Array for Maximum Sum]] ⭐, [[Filling Bookcase Shelves]], [[Minimum Difficulty of a Job Schedule]]\n2. [[Maximum Profit in Job Scheduling]], [[Maximum Score of Non-overlapping Intervals]]\n3. [[Count Partitions With Max-Min Difference at Most K]], [[Minimum Sum of Values by Dividing Array]]\n4. [[Minimum Total Distance Traveled]]',
    'cross': ['[[Strings and Subsequences - Pattern Map]] for DP over two sequences', '[[Palindromes and Word Splits - Pattern Map]] for cutting a string into pieces', '[[Furthest Building You Can Reach]] (Heap) for a greedy twist on resource scheduling'],
    'problems': [
        P('Partition Array for Maximum Sum', 'PartitionArrayForMaximumSum', 'LeetCode 1043', 'Medium', ['Bounded last block', 'Prefix DP'],
          'Look at the **last block** (length up to k): it turns into len copies of its maximum.', 'dp[i] = max over len ≤ k of dp[i − len] + len · max(last len)',
          'Partition arr into contiguous subarrays of length at most k, then replace every value by its subarray\'s maximum. Return the largest possible sum.',
          'dp[i] is the best for the first i numbers. For each i try every block length, growing the maximum as the block extends left.',
          [A('Prefix DP', ['maxSumAfterPartitioning'], 'O(n · k)', 'O(n)')],
          [('Why track the maximum while extending?', 'The block value depends on its maximum, which only grows as the block grows.'), ('Base?', 'dp[0] = 0.')],
          ['[[Filling Bookcase Shelves]]', '[[Minimum Difficulty of a Job Schedule]]'], companies=['Amazon', 'Google'], gotcha=CHK),
        P('Filling Bookcase Shelves', 'FillingBookcaseShelves', 'LeetCode 1105', 'Medium', ['Bounded last block', 'Prefix DP'],
          'The last shelf holds books j..i−1 **as long as the width fits**; its height is the tallest of them.', 'dp[i] = min over valid j of dp[j] + max height of books j..i−1',
          'Place books in the given order on shelves of width shelfWidth. Return the minimum total height of the bookcase.',
          'Walk j backwards from i adding thicknesses and stop when the shelf overflows, tracking the tallest book.',
          [A('Prefix DP', ['minHeightShelves'], 'O(n²)', 'O(n)')],
          [('Why break on overflow?', 'Adding more books on the left only makes the shelf wider.'), ('Why not sort books?', 'The order is fixed by the statement.')],
          ['[[Partition Array for Maximum Sum]]', '[[Word Break]]'], companies=['Amazon'], gotcha=CHK),
        P('Minimum Difficulty of a Job Schedule', 'MinimumDifficultyOfAJobSchedule', 'LeetCode 1335', 'Hard', ['Blocks counted', 'Prefix DP'],
          'Add a **day dimension**: dp[day][i] splits the first i jobs into exactly `day` blocks.', 'dp[day][i] = min over j of dp[day − 1][j − 1] + max(jobs j..i)',
          'Jobs must be done in order over exactly d days, at least one per day. A day\'s difficulty is its hardest job. Return the minimum total difficulty, or −1.',
          'If there are fewer jobs than days it is impossible. Otherwise the last day does jobs j..i, costing the maximum of that range, after the previous days handled the first j − 1 jobs.',
          [A('Day layers', ['minDifficulty'], 'O(d · n²)', 'O(d · n)')],
          [('Why -1?', 'Each day needs at least one job, so n < d is impossible.'), ('Optimise?', 'A monotonic stack brings it to O(d · n).')],
          ['[[Partition Array for Maximum Sum]]'], companies=['Amazon'], gotcha=CHK),
        P('Maximum Profit in Job Scheduling', 'MaximumProfitInJobScheduling', 'LeetCode 1235', 'Hard', ['Time order', 'Binary search'],
          'Sort by **end time**; a job either adds to the best that finished before it starts or is skipped.', 'best[i] = max(best[i − 1], best[last compatible] + profit)',
          'Jobs have start, end and profit. Choose non-overlapping jobs (a job may start when another ends) for maximum profit.',
          'Sorted by end time, best[i] covers the first i jobs. A binary search finds how many jobs end by the current job\'s start. Sorting by start and solving backwards is the mirror image.',
          [A('Sort by end', ['jobScheduling'], 'O(n log n)', 'O(n)'), A('Sort by start, backwards', ['jobSchedulingByStart'], 'O(n log n)', 'O(n)')],
          [('Why end ≤ start is allowed?', 'The statement lets a job start at the moment another ends.'), ('Why not greedy?', 'Profits differ, so earliest-finish greedy is wrong.')],
          ['[[Maximum Score of Non-overlapping Intervals]]', '[[Non-overlapping Intervals]]'], companies=['Google', 'Amazon', 'Microsoft'], gotcha=CHK),
        P('Maximum Score of Non-overlapping Intervals', 'MaximumScoreOfNonOverlappingIntervals', 'LeetCode 3414', 'Hard', ['Time order', 'At most k picks'],
          'Job scheduling with a **pick limit of 4** and a **lexicographic tie-break**: store the index list next to each score.', 'best[i][k] = better of (skip i, take i then jump to next compatible)',
          'Choose at most 4 non-overlapping intervals (they overlap if they share a point) with maximum total weight. Return the lexicographically smallest array of chosen original indices.',
          'Sort by start and find each interval\'s next compatible one by binary search. For every (position, picks left) keep the best score and, among ties, the smallest sorted index list. Taking interval i merges its original index into the list from the next state.',
          [A('Memo with index lists', ['maximumWeight', 'compare'], 'O(n log n + 4 n log 4)', 'O(n)')],
          [('Why store lists?', 'Ties must be broken by the smallest list, which cannot be recovered from the score alone.'), ('Why is a prefix smaller?', 'Fewer picks with the same score is lexicographically smaller.')],
          ['[[Maximum Profit in Job Scheduling]]'], companies=['Google'], gotcha=CHK),
        P('Count Partitions With Max-Min Difference at Most K', 'CountPartitionsWithMaxMinDifferenceAtMostK', 'LeetCode 3578', 'Medium', ['Window of starts', 'Deques + prefix sums'],
          'The valid last-block starts form a **contiguous window**; their dp values are summed with a prefix array.', 'ways[i] = prefix[i] − prefix[left]',
          'Count the ways to split nums into contiguous subarrays where max − min ≤ k in each. Return the count mod 10⁹ + 7.',
          'For each end i the allowed block starts are j in [left, i − 1]. As i grows, left only moves right. Two monotonic deques track the window\'s max and min, and a prefix sum gives the total of ways[j] over the window.',
          [A('Two deques + prefix', ['countPartitions'], 'O(n)', 'O(n)'), A('Plain O(n²)', ['countPartitionsQuadratic'], 'O(n²)', 'O(n)')],
          [('Why monotonic left?', 'A longer block never has a smaller range.'), ('Why prefix sums?', 'A window sum is two lookups.')],
          ['[[Constrained Subsequence Sum]]', '[[Partition Array for Maximum Sum]]'], companies=['Google'], gotcha=CHK),
        P('Minimum Sum of Values by Dividing Array', 'MinimumSumOfValuesByDividingArray', 'LeetCode 3117', 'Hard', ['Blocks counted', 'Running AND groups'],
          'The AND of a block as its start moves left takes only **~17 distinct values**: group starts by that value.', 'dp[j][i] = (best dp[j−1][start] with AND == target) + nums[i − 1]',
          'Split nums into m contiguous subarrays so the j-th subarray\'s AND equals andValues[j]. A subarray\'s value is its last element. Return the minimum total value, or −1.',
          'For each block index j, sweep i and keep a map from "AND of the current block if it started at s" to the best dp[j − 1][s] among those starts. Extending the block ANDs every key with the new element. Reading the map at the target AND gives dp[j][i].',
          [A('Layered DP + AND groups', ['minimumValueSum'], 'O(m · n · log V)', 'O(n)')],
          [('Why few distinct ANDs?', 'AND only clears bits, so it changes at most log V times.'), ('Why a map and not a start index?', 'Starts with the same AND behave identically.')],
          ['[[Minimum Difficulty of a Job Schedule]]', '[[Partition Array for Maximum Sum]]'], companies=['Google'], gotcha=CHK),
        P('Minimum Total Distance Traveled', 'MinimumTotalDistanceTraveled', 'LeetCode 2463', 'Hard', ['Match sorted lists', 'Expanded slots'],
          'Sort robots and factories; **repeat each factory by its limit** and each robot takes the next slot in order.', 'dp[i][j] = min(dp[i][j − 1], dp[i − 1][j − 1] + |robot_i − slot_j|)',
          'Robots and factories lie on a line; each factory repairs at most `limit` robots. Return the minimum total distance for all robots to reach a factory.',
          'With robots and slots sorted, an optimal matching never crosses. dp[i][j] is the cost for the first i robots using the first j slots: skip slot j or give it to robot i.',
          [A('Slot expansion', ['minimumTotalDistance'], 'O(R · S)', 'O(R · S)')],
          [('Why no crossing?', 'Swapping two crossed assignments never increases the total distance.'), ('Why long?', 'Distances can reach 10⁹ per robot.')],
          ['[[Minimum Number of Taps to Open to Water a Garden]]'], companies=['Google'], gotcha=CHK),
    ]
}
