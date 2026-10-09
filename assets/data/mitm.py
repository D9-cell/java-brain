D = 'CSES/Meet In The Middle (MITM)/'
TOPIC = {
    'name': 'Meet In The Middle', 'dir': 'Meet In The Middle', 'tag': 'mitm', 'anim': 'Meet In The Middle Animations.html',
    'hook': 'Two friends dig a tunnel **from both ends** of a mountain and meet in the middle.\nn ≈ 40 → 2^40 is impossible, but 2 × 2^20 ≈ 2 million is easy. **Split, enumerate each half, sort one half, binary-search the other.**\nYour iPad notes: [[Meet In The Middle Introduction.pdf|MITM Introduction PDF]] · [[Meet In The Middle - Video 4 (Leetcode - 2035).pdf|LC 2035 PDF]]',
    'toolkit': '''| Need | Java |
|---|---|
| All subset sums of a half in O(2^h) | `sums[m] = sums[m & (m-1)] + a[from + Integer.numberOfTrailingZeros(m)]` |
| Subset size of a mask | `Integer.bitCount(mask)` |
| lower_bound | hand-written loop (`Arrays.binarySearch` gives no guarantee about which duplicate it finds) |
| Count of equal values in a sorted array | `lowerBound(a, x + 1) - lowerBound(a, x)` |
| Big sums | `long` (40 × 1e9 overflows int) |''',
    'mermaid': '''graph LR
  M((MITM<br/>split in half)) --> C[Exact count<br/>CSES 1628]
  M --> N[Closest value<br/>LC 1755]
  N --> P[Fixed size: bucket by size<br/>LC 2035]
  P --> A[Average condition<br/>LC 805]
  C -. equal range .- N
  N -. idx and idx-1 .- P''',
    'order': '1. [[CSES 1628 - Meet In The Middle]]: the raw technique.\n2. [[Closest Subsequence Sum]]: closest instead of exact.\n3. [[Partition Array Into Two Arrays to Minimize Sum Difference]]: adds size buckets.\n4. [[Split Array With Same Average]]: turns an average condition into a sum condition.',
    'cross': ['Subset enumeration with bitmasks: the `Bit_Magic` folder', 'The plain 2^n version: [[Recursion - Pattern Map|Recursion]] → Power Set / Subsets', 'Two halves + sorted search is also the core of 2-Sum: the `HashMap` and `Arrays` folders'],
    'problems': [
        {'title': 'CSES 1628 - Meet In The Middle', 'cpp': D + 'CSES-1628-Meet In The Middle.cpp', 'java': 'CsesMeetInTheMiddle', 'tab': 0,
         'src': 'CSES 1628', 'diff': 'Medium', 'companies': ['Google'], 'patterns': ['Meet in the middle', 'Binary search'],
         'hook': 'Dig the tunnel from both ends: each half enumerates 2^20 subsets, and binary search is the handshake where they meet.',
         'mantra': 'SPLIT, ENUMERATE, SORT ONE, SEARCH OTHER',
         'statement': 'Given n ≤ 40 numbers and x, count the subsets whose sum is exactly x.',
         'insight': 'Every subset = (a subset of the left half) + (a subset of the right half). For each left sum `s`, count the right sums equal to `x − s`. Sorting the right sums makes that count one equal-range binary search.',
         'approaches': [{'name': 'Meet in the middle', 'code': ['subsetSums', 'lowerBound', 'count'], 'time': 'O(2^(n/2) · n)', 'space': 'O(2^(n/2))'}],
         'gotcha': 'CSES is strict about time in Java. Use `BufferedReader` + `StringTokenizer` (see `solveFromStdin`), `long[]` arrays instead of `List<Long>`, and the O(2^h) lowest-bit trick for subset sums. Run with `java CsesMeetInTheMiddle cses` to read stdin.',
         'recall': [('What size n signals MITM?', 'Roughly 30–45, when you need all subsets.'),
                    ('Count of x in a sorted array?', '`lowerBound(x+1) − lowerBound(x)`.'),
                    ('Explain `sums[m] = sums[m & (m-1)] + a[tz(m)]`.', '`m & (m−1)` removes the lowest set bit, a smaller mask already computed. Then add that one element.')],
         'connected': ['[[Closest Subsequence Sum]] (closest instead of exact)', '[[Partition Array Into Two Arrays to Minimize Sum Difference]]']},
        {'title': 'Closest Subsequence Sum', 'cpp': D + 'Closest Subsequence Sum.cpp', 'java': 'ClosestSubsequenceSum', 'tab': 1,
         'src': 'LeetCode 1755', 'diff': 'Hard', 'patterns': ['Meet in the middle', 'Lower bound + neighbour'],
         'hook': 'The tunnel ends may not line up exactly. Check just past the target and just before it, and take the closer one.',
         'mantra': 'LOWER BOUND + ITS LEFT NEIGHBOUR',
         'statement': 'Pick a subsequence of `nums` (n ≤ 40) to minimise `|sum − goal|`.',
         'insight': 'Fix a left sum s. The best right sum is the one closest to `goal − s`. In a sorted array that is the first element ≥ need (`idx`) or the one right before it (`idx − 1`).',
         'approaches': [{'name': 'MITM + two-neighbour check', 'code': ['subsetSums', 'minAbsDifference'], 'time': 'O(2^(n/2) · n)', 'space': 'O(2^(n/2))'}],
         'recall': [('Why are exactly two candidates enough?', 'Everything left of idx−1 is smaller and further away; everything right of idx is bigger and further away.'),
                    ('Can sums overflow int here?', 'No: |nums[i]| ≤ 1e7 and n ≤ 40 gives at most 4e8, which fits.')],
         'connected': ['Exact version: [[CSES 1628 - Meet In The Middle]]', 'Same check with size buckets: [[Partition Array Into Two Arrays to Minimize Sum Difference]]']},
        {'title': 'Partition Array Into Two Arrays to Minimize Sum Difference', 'cpp': D + 'Partition Array Into Two Arrays to Minimize Sum Difference.cpp', 'java': 'PartitionArrayMinimizeSumDifference', 'tab': 2,
         'src': 'LeetCode 2035', 'diff': 'Hard', 'patterns': ['Meet in the middle', 'Bucket by subset size'],
         'hook': 'A tug-of-war with **exactly n players per team**. Taking k players from the left half forces n − k from the right half.',
         'mantra': 'BUCKET BY SIZE, k + (n−k), AIM AT S/2',
         'statement': 'Split `2n` numbers into two arrays of length n each, minimising the absolute difference of their sums.',
         'insight': '`|sum1 − sum2| = |S − 2·sum1|`, so we want sum1 ≈ S/2 **with exactly n elements**. Group subset sums of each half by size. For left size k, search only the right bucket of size n − k.',
         'approaches': [{'name': 'MITM with size buckets', 'code': ['sumsBySize', 'minimumDifference'], 'time': 'O(2^n · n), n = half length', 'space': 'O(2^n)'}],
         'recall': [('Why is plain MITM not enough?', 'Team sizes must be exactly n. Bucketing by size enforces that.'),
                    ('Which right bucket pairs with left size k?', 'Size n − k.'),
                    ('Quantity to minimise?', '|S − 2·(leftSum + rightSum)|.')],
         'connected': ['Neighbour check from [[Closest Subsequence Sum]]', 'Size buckets again in [[Split Array With Same Average]]']},
        {'title': 'Split Array With Same Average', 'cpp': D + 'Split Array With Same Average.cpp', 'java': 'SplitArrayWithSameAverage', 'tab': 3,
         'src': 'LeetCode 805', 'diff': 'Hard', 'patterns': ['Meet in the middle', 'Bucket by subset size', 'Math reformulation'],
         'hook': 'If two groups have the same average, both equal the **class average**. So find ONE group whose average is the class average.',
         'mantra': 'avg(A) = avg(ALL) ⇒ sum·N = size·S',
         'statement': 'Can `nums` (N ≤ 30) be split into two non-empty arrays with equal averages?',
         'insight': 'Find a proper non-empty subset A with `sum(A)·N == size(A)·S`. For each total size, the needed sum is `size·S/N` (it must be an integer). Combine a left (size k, sum ls) with a right bucket of size m, looking for `size·S/N − ls`.',
         'approaches': [{'name': 'MITM with size buckets (HashSet lookup)', 'code': ['sumsBySize', 'splitArraySameAverage'], 'time': 'O(2^(N/2) · N)', 'space': 'O(2^(N/2))',
                         'explain': 'The C++ sorts the buckets and binary-searches. In Java a `HashSet` per size gives O(1) exact lookups and simpler code.'}],
         'recall': [('Why may we look for just one subset?', 'If A has the overall average, the rest B automatically does too.'),
                    ('Which sizes can be skipped immediately?', 'Those where `size·S % N != 0`, plus 0 and N.'),
                    ('Exact match or closest?', 'Exact. So a HashSet works; no neighbour checks are needed.')],
         'connected': ['Size buckets first seen in [[Partition Array Into Two Arrays to Minimize Sum Difference]]']},
    ],
}
