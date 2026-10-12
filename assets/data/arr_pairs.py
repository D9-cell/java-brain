def P(title, java, src, diff, pats, hook, mantra, statement, insight, approaches, recall, connected=(), companies=None, gotcha=None, url=None):
    return dict(title=title, java=java, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra, statement=statement, insight=insight,
                approaches=approaches, recall=recall, connected=list(connected), companies=companies, gotcha=gotcha, url=url)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
CHK = 'Checked against a brute-force version on random inputs when it was written.'
TOPIC = {
    'name': 'Hash Map Pair Counting', 'dir': 'Arrays/Hash Map Pair Counting', 'tag': 'arrays', 'anim': 'Hash Map Pair Counting Animations.html',
    'hook': 'To count pairs with a property, **turn the property into a key** (a complement, a remainder, a digit sum, a product) and count how many earlier items have the matching key.\n1. **Complements**: a + b = 0, c + d looks up −(c + d) (4Sum II, Fair Candy Swap, Swapping Pairs).\n2. **Remainder classes**: r pairs with (m − r) mod m (Pairs of Songs, Pairs Divisible by 4).\n3. **Group by a derived key**: equal product, equal digit sum, square equals product (Tuple with Same Product, Equal Digit Sum, Square Equal to Product).\n4. **Fix the middle**: left counts × right counts (Count Number of Teams).',
    'toolkit': '''| Need | Java |
|---|---|
| Count a key | `map.merge(key, 1, Integer::sum)` |
| Matching earlier items | `count += map.getOrDefault(target, 0)` before adding the current one |
| Remainder partner | `(m - r) % m` |
| Pairs inside a group of c | `c * (c - 1) / 2` |
| Products as keys | `(long) a * b` to avoid overflow |
| Membership | `HashSet.contains(x)` |''',
    'mermaid': '''graph LR
  D((Pair Counting)) --> C[Complements<br/>4Sum II, Fair Candy Swap, Swapping Pairs]
  D --> R[Remainder classes<br/>Pairs of Songs, Pairs Divisible by 4]
  D --> K[Derived keys<br/>Tuple with Same Product, Equal Digit Sum, Square Equal to Product]
  D --> M[Fix the middle<br/>Count Number of Teams]''',
    'order': '1. [[Pairs of Songs With Total Durations Divisible by 60]] ⭐, [[Pairs which are Divisible by 4]], [[Fair Candy Swap]], [[Swapping pairs make sum equal]]\n2. [[4Sum II]] ⭐, [[Max Sum of a Pair With Equal Sum of Digits]], [[Tuple with Same Product]]\n3. [[Number of Ways Where Square of Number Is Equal to Product of Two Numbers]], [[Count Number of Teams]]',
    'cross': ['[[Prefix Sum and HashMap - Pattern Map]] for counting subarrays with a map', '[[HashMap - Pattern Map]] for more map counting', '[[Count Good Triplets in an Array]] for triple counting with a Fenwick tree'],
    'problems': [
        P('4Sum II', 'FourSumII', 'LeetCode 454', 'Medium', ['Complements', 'Meet in the middle'],
          'Split the four arrays into two halves: **count every a + b**, then for each c + d add the count of **−(c + d)**.', 'map[a + b]++ · count += map[−(c + d)]',
          'Count tuples (i, j, k, l) with nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0.',
          'Four nested loops are n⁴. Pairing the arrays turns it into two n² passes, the meet-in-the-middle idea.',
          [A('Pair sums + map', ['fourSumCount'], 'O(n²)', 'O(n²)')],
          [('Why split in halves?', 'n² + n² beats n⁴.'), ('Same idea elsewhere?', 'Meet in the middle for subset sums.')],
          ['[[Tuple with Same Product]]', '[[Meet In The Middle - Pattern Map]]'], companies=['Amazon'], gotcha=CHK),
        P('Tuple with Same Product', 'TupleWithSameProduct', 'LeetCode 1726', 'Medium', ['Derived key'],
          'Count pairs by **product**. Every two pairs with the same product give **8 ordered tuples** (2 pair orders × 2 × 2 inner orders).', 'FOR pairs: count += 8 · seen[product] · seen[product]++',
          'nums has distinct positive integers. Count tuples (a, b, c, d) of distinct elements with a · b = c · d.',
          'With distinct values, two different pairs with the same product never share an element. Each such unordered pair of pairs gives 8 tuples.',
          [A('Products in a map', ['tupleSameProduct'], 'O(n²)', 'O(n²)')],
          [('Why 8?', '(a,b,c,d) can swap within each pair and swap the pairs: 2·2·2.'), ('Why can pairs not share an element?', 'a·b = a·c with distinct values forces b = c.')],
          ['[[4Sum II]]'], gotcha=CHK),
        P('Max Sum of a Pair With Equal Sum of Digits', 'MaxSumOfAPairWithEqualSumOfDigits', 'LeetCode 2342', 'Medium', ['Derived key', 'Best per group'],
          'Group by **digit sum** and keep only the **largest** number per group; each new number pairs with that best.', 'best[ds] → answer = max(best + x) · keep the larger',
          'Return the maximum nums[i] + nums[j] over i ≠ j with equal digit sums, or -1.',
          'The best partner for x in its group is the largest other value, so one stored value per digit sum is enough.',
          [A('Best per digit sum', ['maximumSum'], 'O(n · digits)', 'O(1) (at most 82 keys)')],
          [('Why keep only the maximum?', 'It is always the best partner.'), ('Key range?', 'Digit sums are at most 81.')],
          ['[[Pairs of Songs With Total Durations Divisible by 60]]'], gotcha=CHK),
        P('Pairs of Songs With Total Durations Divisible by 60', 'PairsOfSongsWithTotalDurationsDivisibleBy60', 'LeetCode 1010', 'Medium', ['Remainder classes'],
          'A song with remainder **r** pairs with earlier songs of remainder **(60 − r) % 60**. Count as you go.', 'r = t % 60 · pairs += count[(60 − r) % 60] · count[r]++',
          'Return the number of pairs of songs whose total duration is divisible by 60.',
          'The % 60 on the partner makes remainder 0 pair with itself instead of looking for remainder 60.',
          [A('Remainder counts', ['numPairsDivisibleBy60'], 'O(n)', 'O(60)')],
          [('Why (60 − r) % 60?', 'r = 0 must pair with 0, not 60.'), ('Why count before adding?', 'A song cannot pair with itself.')],
          ['[[Pairs which are Divisible by 4]]', '[[Subarray Sums Divisible by K]]'], companies=['Amazon'], gotcha=CHK),
        P('Pairs which are Divisible by 4', 'PairsWhichAreDivisibleBy4', 'GfG Pairs which are Divisible by 4', 'Easy', ['Remainder classes'],
          'Count remainders mod 4. Valid pairs: **(0, 0)**, **(2, 2)** within a class and **(1, 3)** across.', 'C(c0, 2) + C(c2, 2) + c1 · c3',
          'Count pairs (i < j) whose sum is divisible by 4.',
          'A sum is divisible by 4 iff the remainders add to 0 or 4.',
          [A('Remainder counts', ['count4Divisibles'], 'O(n)', 'O(1)')],
          [('Why C(c, 2) for 0 and 2?', 'Both elements come from the same class.'), ('Why c1 · c3?', 'One from each class.')],
          ['[[Pairs of Songs With Total Durations Divisible by 60]]'], gotcha=CHK, url='https://www.geeksforgeeks.org/problems/pairs-which-are-divisible-by-4/0'),
        P('Number of Ways Where Square of Number Is Equal to Product of Two Numbers', 'NumberOfWaysWhereSquareOfNumberIsEqualToProductOfTwoNumbers', 'LeetCode 1577', 'Medium', ['Derived key'],
          'Count the **squares** of one array in a map, then look up **every pair product** of the other array. Do it both ways.', 'squares of a · FOR j < k in b: total += squares[b[j]·b[k]] · swap roles',
          'Count triplets of type 1 (nums1[i]² = nums2[j] · nums2[k], j < k) plus type 2 (the same with the arrays swapped).',
          'Use long: values up to 10⁵ square to 10¹⁰. Pairs dominate the cost at O(m²).',
          [A('Squares map + pair products', ['numTriplets', 'count'], 'O(n² + m²)', 'O(n + m)')],
          [('Why long?', '10⁵² overflows int.'), ('Why count both ways?', 'Type 1 and type 2 swap the arrays.')],
          ['[[Tuple with Same Product]]'], gotcha=CHK),
        P('Fair Candy Swap', 'FairCandySwap', 'LeetCode 888', 'Easy', ['Complements', 'Set lookup'],
          'Alice gives x and gets y; equal totals need **y = x + (sumB − sumA)/2**. Look y up in a set of Bob\'s boxes.', 'delta = (sb − sa)/2 · x with x + delta in Bob → [x, x + delta]',
          'Alice and Bob each have candy boxes. Swap one box each so both end with the same total. Return [Alice\'s box, Bob\'s box] (an answer is guaranteed).',
          'After the swap Alice has sa − x + y and Bob sb − y + x. Setting them equal gives y − x = (sb − sa)/2.',
          [A('Set lookup', ['fairCandySwap'], 'O(n + m)', 'O(m)')],
          [('Where does delta come from?', 'sa − x + y = sb − y + x.'), ('Odd difference?', 'No swap exists; the problem guarantees one.')],
          ['[[Swapping pairs make sum equal]]'], gotcha=CHK),
        P('Swapping pairs make sum equal', 'SwappingPairsMakeSumEqual', 'GfG Swapping pairs make sum equal', 'Medium', ['Complements', 'Set lookup'],
          'Same equation as Fair Candy Swap: needs **y = x + (sumB − sumA)/2**, which is impossible if the difference is **odd**.', 'odd difference → −1 · any x with x + delta in b → 1',
          'Given arrays a and b, return 1 if swapping one element from each makes their sums equal, otherwise -1.',
          'The parity check comes first because half of an odd difference is not an integer.',
          [A('Set lookup', ['findSwapValues'], 'O(n + m)', 'O(m)')],
          [('Why check parity?', '2(y − x) must equal sb − sa.'), ('Sorted two-pointer version?', 'Sort both and walk with two pointers on y − x.')],
          ['[[Fair Candy Swap]]'], gotcha=CHK, url='https://www.geeksforgeeks.org/problems/swapping-pairs-make-sum-equal4142/1'),
        P('Count Number of Teams', 'CountNumberOfTeams', 'LeetCode 1395', 'Medium', ['Fix the middle'],
          'Fix the **middle soldier j**: increasing teams = smaller on the left × bigger on the right, decreasing = bigger on the left × smaller on the right.', 'FOR j: lessL·moreR + moreL·lessR',
          'Ratings are distinct. Count triples i < j < k with rating strictly increasing or strictly decreasing.',
          'Fixing the middle turns a triple loop into two counts per j. A Fenwick tree makes the counts O(log n) each.',
          [A('Middle counting', ['numTeams'], 'O(n²)', 'O(1)')],
          [('Why fix the middle?', 'Left and right choices become independent.'), ('Faster?', 'Binary indexed trees over ratings: O(n log n).')],
          ['[[Count Good Triplets in an Array]]'], gotcha=CHK),
    ]
}
