D = 'Line Sweep Technique/'
def P(title, java, tab, src, diff, pats, hook, mantra, statement, insight, approaches, recall, connected, companies=None, gotcha=None):
    return dict(title=title, cpp=D + title + '.cpp', java=java, tab=tab, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra,
                statement=statement, insight=insight, approaches=approaches, recall=recall, connected=connected, companies=companies, gotcha=gotcha)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
TOPIC = {
    'name': 'Line Sweep', 'dir': 'Line Sweep', 'tag': 'line-sweep', 'anim': 'Line Sweep Animations.html',
    'hook': 'A **bus conductor\'s notebook**: write only the moments something changes (+k at a start, −k at an end). Read the notebook left to right with a running sum, and you know the count at every moment.\nTwo flavours: **difference array** (small coordinate range) and **TreeMap of events** (big or sparse coordinates).\n![[Line Sweep Wallpaper.png|300]]',
    'toolkit': '''| Need | Java |
|---|---|
| Sorted events with += | `TreeMap<Integer,Integer> ev; ev.merge(t, d, Integer::sum);` |
| Sweep in time order | `for (int d : ev.values())` (TreeMap iterates in key order) |
| Small range | `int[] diff = new int[MAX + 2]; diff[l] += x; diff[r + 1] -= x;` |
| Half-open [s, e) | −x at `e` |
| Closed [s, e] | −x at `e + 1` |
| Sort pairs with tie-break | `Arrays.sort(ev, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]))` |''',
    'mermaid': '''graph LR
  LS((Line Sweep<br/>+ at start, − at end)) --> DA[Difference array<br/>small range]
  LS --> TM[TreeMap events<br/>sparse/large]
  DA --> FB[Flight Bookings] & MP[Max Population] & PERM[Max Sum Permutation]
  DA --> CP[Car Pooling]
  TM --> CP
  TM --> MR[Meeting Rooms II] & PAINT[Describe Painting]
  TM --> C2[My Calendar II<br/>undo if >2] & C3[My Calendar III<br/>max overlap]
  MR -. offline twin .- C3''',
    'order': '1. [[Corporate Flight Bookings]]: pure difference array.\n2. [[Car Pooling]]: both flavours.\n3. [[Maximum Population Year]]: tie-breaking.\n4. [[Meeting Rooms II]]: max overlap.\n5. [[My Calendar III]] then [[My Calendar II]]: online versions.\n6. [[Describe the Painting]]: boundaries matter.\n7. [[Maximum Sum Obtained of Any Permutation]]: sweep + greedy.',
    'cross': ['Range updates in O(log n) when queries interleave: [[Segment Tree - Pattern Map|Segment Tree]] (lazy propagation)', 'Meeting Rooms II with a min-heap: the `Heap` folder', 'Prefix sums in general: the `Arrays` folder'],
    'problems': [
        P('Car Pooling', 'CarPooling', 0, 'LeetCode 1094', 'Medium', ['Line sweep', 'Difference array'],
          'A bus conductor writes "+2 at km 1, −2 at km 5". Reading the notebook in order gives the passenger count everywhere.', '+ AT START, − AT END, RUNNING SUM ≤ CAP',
          '`trips[i] = [numPassengers, from, to]`. The car only drives east. Can it serve all trips without exceeding `capacity`?',
          'The passenger count only changes at pickups and drop-offs. Store those deltas, then sweep in order of location.',
          [A('TreeMap events', ['carPoolingMap'], 'O(n log n)', 'O(n)'), A('Difference array (locations ≤ 1000)', ['carPooling'], 'O(n + 1000)', 'O(1000)')],
          [('Where does the minus go: `to` or `to+1`?', '`to`: passengers are already out at `to`.'), ('When do you prefer the array?', 'When the coordinate range is small and known.')],
          ['Same sweep: [[Meeting Rooms II]], [[My Calendar III]]'], companies=['ClearTrip', 'Goldman Sachs']),
        P('Corporate Flight Bookings', 'CorporateFlightBookings', 1, 'LeetCode 1109', 'Medium', ['Difference array'],
          'A water tap: open it at `first`, close it right after `last`. The prefix sum is the water flowing past each flight.', 'diff[l] += x; diff[r+1] −= x; PREFIX',
          '`bookings[i] = [first, last, seats]` books seats on every flight from first to last (1-indexed). Return the total per flight.',
          'A range update costs O(1) on a difference array; one prefix-sum pass at the end materialises all updates.',
          [A('Difference array', ['corpFlightBookings'], 'O(n + b)', 'O(n)')],
          [('Why n + 2?', '1-indexed flights plus the write at last + 1.'), ('What does the prefix sum of diff give?', 'The actual value at each index.')],
          ['Same trick for coverage counts: [[Maximum Sum Obtained of Any Permutation]]'], companies=['Goldman Sachs']),
        P('Describe the Painting', 'DescribeThePainting', 2, 'LeetCode 1943', 'Medium', ['Line sweep', 'TreeMap'],
          'Paint layers on a wall: every boundary starts a new strip, even when the colour sum looks unchanged.', 'BOUNDARIES CUT PIECES, SUM > 0 → EMIT',
          'Half-open segments `[start, end)` each have a unique colour. A mixed area is described by the **sum** of its colours. Return the painted pieces `[l, r, sum]`.',
          'Put +colour at start and −colour at end in a TreeMap. Between consecutive keys the mix is constant, so emit `[prevKey, key, sum]` whenever sum > 0. A key whose net delta is 0 is still a boundary (the colour set changed).',
          [A('TreeMap sweep', ['splitPainting'], 'O(n log n)', 'O(n)')],
          [('Why not merge neighbouring pieces with an equal sum?', 'Different colour sets can have the same sum; the problem treats them as different pieces.'), ('Type of the sum?', '`long`.')],
          ['Sweep basics: [[Car Pooling]]']),
        P('Maximum Population Year', 'MaximumPopulationYear', 3, 'LeetCode 1854', 'Easy', ['Difference array', 'Sorted events'],
          'A census clicker: +1 at a birth, −1 at a death; the first year with the highest count wins.', 'BIRTH +1, DEATH −1, FIRST MAX',
          '`logs[i] = [birth, death]`; a person is alive in `[birth, death − 1]`. Return the earliest year with the maximum population.',
          'Alive on the half-open range [birth, death), so −1 goes at `death`. Use strict `>` to keep the earliest year.',
          [A('Difference array over 1950..2050', ['maximumPopulation'], 'O(n + 100)', 'O(100)'), A('Sorted events (death before birth on ties)', ['maximumPopulationEvents'], 'O(n log n)', 'O(n)')],
          [('Tie-break when sorting events?', 'Smaller delta first: −1 before +1 in the same year.'), ('Why strict `>`?', 'To keep the earliest year on ties.')],
          ['[[Car Pooling]]'], companies=['Amazon', 'Adobe', 'Goldman Sachs', 'Atlassian']),
        P('Maximum Sum Obtained of Any Permutation', 'MaximumSumObtainedOfAnyPermutation', 4, 'LeetCode 1589', 'Medium', ['Difference array', 'Greedy sorting'],
          'A busy street: put the biggest shops where the most people walk. Line sweep measures the foot traffic.', 'COUNT COVERAGE, SORT BOTH, BIG×BIG',
          'Permute `nums` to maximise the total of all `sum(nums[l..r])` for the given requests (mod 1e9+7).',
          'Index i contributes `nums[i] × freq[i]`, where freq[i] = how many requests cover i. Get freq with a difference array, then pair sorted nums with sorted freq (rearrangement inequality).',
          [A('Difference array + greedy pairing', ['maxSumRangeQuery'], 'O(n log n + q)', 'O(n)')],
          [('Why sort both ascending and multiply index by index?', 'The largest value should pair with the largest frequency.'), ('Overflow?', 'Cast to long before multiplying, then take mod.')],
          ['Diff array from [[Corporate Flight Bookings]]']),
        P('Meeting Rooms II', 'MeetingRoomsII', 5, 'LeetCode 253 / GFG', 'Medium', ['Line sweep', 'Max overlap'],
          'A hotel receptionist counts room keys out (+1) and returned (−1). The most keys out at once = rooms needed.', 'MAX OVERLAP = ROOMS',
          'Given meeting start and end times, return the minimum number of rooms needed.',
          'Rooms needed = maximum number of simultaneous meetings = maximum running sum of +1/−1 events.',
          [A('TreeMap sweep', ['minMeetingRooms'], 'O(n log n)', 'O(n)')],
          [('Meeting ends at 10, another starts at 10?', 'They share a room: both deltas merge into key 10 and cancel.'), ('Heap alternative?', 'Sort by start; a min-heap of end times; pop if the earliest end ≤ the current start.')],
          ['Online version: [[My Calendar III]]', '[[Car Pooling]]'], companies=['Amazon', 'Uber', 'Meta']),
        P('My Calendar II', 'MyCalendarII', 6, 'LeetCode 731', 'Medium', ['Line sweep', 'Undo on failure'],
          'Booking in pencil: write it in, sweep for a triple clash, and erase it if there is one.', 'ADD, SWEEP, >2 → UNDO',
          '`book(start, end)` must return false (and not store the booking) if it would cause a triple booking.',
          'Tentatively apply the deltas, sweep the TreeMap, and if any running count exceeds 2, roll the deltas back.',
          [A('TreeMap sweep with rollback', ['MyCalendarTwo'], 'O(n) per book', 'O(n)')],
          [('Why roll back?', 'Rejected bookings must not affect later answers.'), ('What changes for My Calendar I?', 'The limit becomes 1.')],
          ['[[My Calendar III]]'], companies=['Google']),
        P('My Calendar III', 'MyCalendarIII', 7, 'LeetCode 732', 'Hard', ['Line sweep', 'Max overlap'],
          'A stadium counter that shows the biggest crowd ever after each new event is added.', 'ADD, SWEEP, RETURN MAX',
          'After every `book(start, end)` return the largest k such that some moment is covered by k bookings.',
          'Same as Meeting Rooms II, recomputed after each booking: add the deltas, then sweep for the maximum running sum.',
          [A('TreeMap sweep', ['MyCalendarThree'], 'O(n) per book', 'O(n)')],
          [('Faster for many calls?', 'Dynamic segment tree with lazy max: O(log C).'), ('Offline twin?', '[[Meeting Rooms II]].')],
          ['[[My Calendar II]]', '[[Meeting Rooms II]]'], companies=['Google']),
    ],
}
