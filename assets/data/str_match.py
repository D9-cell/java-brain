def P(title, java, src, diff, pats, hook, mantra, statement, insight, approaches, recall, connected=(), companies=None, gotcha=None, url=None):
    return dict(title=title, java=java, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra, statement=statement, insight=insight,
                approaches=approaches, recall=recall, connected=list(connected), companies=companies, gotcha=gotcha, url=url)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
CHK = 'Checked against a brute-force version on random inputs when it was written.'
TOPIC = {
    'name': 'Pattern Matching', 'dir': 'Strings/Pattern Matching', 'tag': 'strings', 'anim': 'Pattern Matching Animations.html',
    'hook': 'Never re-read text you already matched. **KMP\'s lps array** (or the **Z-function**) records how much of the pattern still matches after a mismatch, giving **O(n + m)** search.\n1. **KMP search**: lps[i] = longest proper prefix of p[0..i] that is also its suffix (KMP, First Occurrence, Beautiful Indices II).\n2. **Doubling tricks**: rotations live in s + s, repetitions show up inside (s + s) without its ends (Rotate String, Repeated Substring Pattern).\n3. **Prefix = suffix questions**: lps of s + "#" + reverse(s) for palindromic prefixes, Z values for "suffix equals prefix" (Shortest Palindrome, Revert Word I and II).\n4. **Occurrence lists + window**: find every match, then pair them up with two pointers (Beautiful Indices I and II).',
    'toolkit': '''| Need | Java |
|---|---|
| lps build | `if (p[i] == p[len]) lps[i++] = ++len; else if (len > 0) len = lps[len - 1]; else lps[i++] = 0;` |
| KMP fallback on mismatch | `j = lps[j - 1]` (i stays) |
| After a full match | `j = lps[j - 1]` to keep finding overlaps |
| Z-box | `if (i < r) z[i] = Math.min(r - i, z[i - l]);` then extend |
| Library search | `s.indexOf(p, from)` (worst case O(n · m)) |
| Rotation test | `(s + s).contains(goal)` |''',
    'mermaid': '''graph LR
  D((Pattern Matching)) --> K[KMP search<br/>KMP, First Occurrence]
  D --> T[Doubling tricks<br/>Rotate String, Repeated Substring Pattern]
  D --> P[Prefix equals suffix<br/>Shortest Palindrome, Revert Word I and II]
  D --> O[Occurrence lists<br/>Beautiful Indices I and II]''',
    'order': '1. [[Knuth-Morris-Pratt KMP String Matching Algorithm]] ⭐, [[Find the Index of the First Occurrence in a String]]\n2. [[Rotate String]], [[Repeated Substring Pattern]]\n3. [[Minimum Time to Revert Word to Initial State I]], [[Minimum Time to Revert Word to Initial State II]], [[Shortest Palindrome]] ⭐\n4. [[Find Beautiful Indices in the Given Array I]], [[Find Beautiful Indices in the Given Array II]]',
    'cross': ['[[Trie - Pattern Map]] for many patterns at once', '[[Subsequences Stacks and Greedy - Pattern Map]] for substring checks on small inputs', '[[Palindromes and Word Splits - Pattern Map]] for palindrome DP'],
    'problems': [
        P('Knuth-Morris-Pratt KMP String Matching Algorithm', 'KnuthMorrisPratt', 'Classic (KMP)', 'Medium', ['KMP', 'lps array'],
          'lps[i] = longest **proper prefix of p[0..i] that is also a suffix**. On a mismatch jump **j = lps[j − 1]** instead of moving back in the text.', 'build lps · match → i++ and j++ · mismatch → j = lps[j−1] (or i++ when j = 0) · full match → record and j = lps[j−1]',
          'Find all occurrences of pattern p in text s in O(n + m) time.',
          'When j characters matched and the next one fails, the last lps[j − 1] text characters already equal the start of p, so matching resumes from there. The text index never moves backwards, so the scan is linear. Building lps is the same algorithm run on p against itself.',
          [A('lps table', ['buildLps'], 'O(m)', 'O(m)'), A('Search', ['search'], 'O(n + m)', 'O(m)')],
          [('Why proper prefix?', 'The whole string as its own prefix would make lps useless.'), ('Why does i never go back?', 'The fallback reuses what is known to match.')],
          ['[[Find the Index of the First Occurrence in a String]]', '[[Shortest Palindrome]]'], companies=['Google', 'Amazon', 'Microsoft'], gotcha=CHK),
        P('Find the Index of the First Occurrence in a String', 'FindTheIndexOfTheFirstOccurrenceInAString', 'LeetCode 28', 'Easy', ['KMP'],
          'KMP with an **early return** at the first full match.', 'lps(needle) · scan haystack · j == m → i − m',
          'Return the index of the first occurrence of needle in haystack, or -1.',
          'haystack.indexOf(needle) works and is fine in practice, but its worst case is O(n · m); KMP guarantees O(n + m).',
          [A('KMP', ['strStr'], 'O(n + m)', 'O(m)')],
          [('When does indexOf hurt?', 'Inputs like "aaaa…ab" with needle "aaab".'), ('Return value?', 'i − m, the start of the match.')],
          ['[[Knuth-Morris-Pratt KMP String Matching Algorithm]]', '[[Repeated Substring Pattern]]'], companies=['Meta', 'Microsoft', 'Apple'], gotcha=CHK),
        P('Repeated Substring Pattern', 'RepeatedSubstringPattern', 'LeetCode 459', 'Easy', ['Doubling trick', 'lps period'],
          's is a repetition iff s appears inside **(s + s) with the first and last characters removed**. KMP view: period **n − lps[n−1]** divides n.', '(s+s)[1..2n−1).contains(s) · OR lps > 0 && n % (n − lps) == 0',
          'Return true if s can be built by repeating one of its substrings several times.',
          'If s = u^k, shifting by |u| maps s onto itself, so s appears at that offset in s + s. Removing the ends rules out the trivial matches at 0 and n. The smallest period of s is n − lps[n − 1]; s is a repetition when that period divides n.',
          [A('Doubling', ['repeatedSubstringPattern'], 'O(n) with KMP search', 'O(n)'), A('lps period', ['repeatedSubstringPatternLps'], 'O(n)', 'O(n)')],
          [('Why remove the ends?', 'Otherwise s always occurs at index 0.'), ('"abab": lps?', 'lps[3] = 2, period 2 divides 4 → true.')],
          ['[[Rotate String]]', '[[Knuth-Morris-Pratt KMP String Matching Algorithm]]'], companies=['Amazon', 'Google'], gotcha=CHK),
        P('Rotate String', 'RotateString', 'LeetCode 796', 'Easy', ['Doubling trick'],
          'Every rotation of s is a **substring of s + s**. Check lengths, then containment.', '|s| == |goal| && (s + s).contains(goal)',
          'Return true if s can become goal after some number of left rotations.',
          'Rotating by k reads s from index k to the end and then from the start, which is exactly s + s from k to k + n.',
          [A('Doubling', ['rotateString'], 'O(n) with KMP, O(n²) with contains', 'O(n)')],
          [('Why compare lengths?', '"a" is in "aa" + … but "a" is not a rotation of "aa".'), ('Linear guarantee?', 'Use KMP for the containment check.')],
          ['[[Repeated Substring Pattern]]', '[[Reverse Words in a String II]]'], gotcha=CHK),
        P('Shortest Palindrome', 'ShortestPalindrome', 'LeetCode 214', 'Hard', ['lps on s#rev(s)'],
          'Find the **longest palindromic prefix** of s: it is the lps value at the end of **s + "#" + reverse(s)**. Put the reversed rest in front.', 'lps(s # rev) · keep = last lps · rev[0..n−keep) + s',
          'Add characters in front of s to make the shortest possible palindrome. Return it.',
          'A prefix of s is a palindrome iff it equals a suffix of reverse(s). The "#" stops the match from crossing into the other half. Everything after the palindromic prefix must be mirrored at the front.',
          [A('KMP on s#rev', ['shortestPalindrome'], 'O(n)', 'O(n)')],
          [('Why "#"?', 'It keeps the prefix-suffix match within one copy.'), ('Brute force?', 'Try every prefix as a palindrome: O(n²).')],
          ['[[Knuth-Morris-Pratt KMP String Matching Algorithm]]', '[[Find the Closest Palindrome]]'], companies=['Google', 'Amazon'], gotcha=CHK),
        P('Minimum Time to Revert Word to Initial State I', 'MinimumTimeToRevertWordToInitialStateI', 'LeetCode 3029', 'Medium', ['Suffix equals prefix'],
          'After t seconds the original **suffix from k·t** is all that remains of the word. Done when that suffix is a **prefix of word** (we choose the added letters), or when k·t ≥ n.', 't = 1.. · k·t ≥ n or word.startsWith(word[k·t..]) → t',
          'Every second remove the first k characters of word and append any k characters. Return the minimum time > 0 for word to return to its initial state.',
          'The appended letters are free, so only the surviving part must match. It is word[k·t..], sitting at the front, so it must equal the prefix of the same length. Once everything has been removed, any word can be rebuilt.',
          [A('Check each t', ['minimumTimeToInitialState'], 'O(n² / k)', 'O(n)')],
          [('Why ceil(n / k) at most?', 'After that every original letter was replaced.'), ('Faster?', 'Part II uses the Z-function.')],
          ['[[Minimum Time to Revert Word to Initial State II]]'], gotcha=CHK),
        P('Minimum Time to Revert Word to Initial State II', 'MinimumTimeToRevertWordToInitialStateII', 'LeetCode 3031', 'Hard', ['Z-function'],
          'Z[i] = longest common prefix of word and word[i..]. The suffix at k·t is a prefix iff **z[k·t] == n − k·t**.', 'z-function · first t with k·t ≥ n or z[k·t] == n − k·t',
          'Same as part I with n up to 10⁶.',
          'The Z-function answers "does the suffix at i match the prefix" for every i in O(n) total, by reusing the rightmost matched box [l, r).',
          [A('Z-function', ['minimumTimeToInitialState'], 'O(n)', 'O(n)')],
          [('What is the Z-box?', 'The segment [l, r) that matches the prefix and reaches furthest right.'), ('KMP alternative?', 'Follow lps from n − 1: those are exactly the borders.')],
          ['[[Minimum Time to Revert Word to Initial State I]]', '[[Knuth-Morris-Pratt KMP String Matching Algorithm]]'], gotcha=CHK),
        P('Find Beautiful Indices in the Given Array I', 'FindBeautifulIndicesInTheGivenArrayI', 'LeetCode 3006', 'Medium', ['Occurrence lists'],
          'List all starts of a and of b. Index i (an a-start) is beautiful if **some b-start j has |i − j| ≤ k**.', 'as = occ(a) · bs = occ(b) · keep i with a j within k',
          'Index i is beautiful if s starts with a at i and with b at some j with |i − j| ≤ k. Return the beautiful indexes in increasing order.',
          'Lengths are small (n ≤ 10⁵ with short patterns), so indexOf for occurrences plus a check per pair is enough here; part II needs KMP and two pointers.',
          [A('Occurrences + check', ['beautifulIndices', 'occurrences'], 'O(n · |a| + |as| · |bs|)', 'O(n)')],
          [('Why indexOf(p, i + 1)?', 'Occurrences may overlap.'), ('Already sorted?', 'Occurrences are found left to right.')],
          ['[[Find Beautiful Indices in the Given Array II]]'], gotcha=CHK),
        P('Find Beautiful Indices in the Given Array II', 'FindBeautifulIndicesInTheGivenArrayII', 'LeetCode 3008', 'Hard', ['KMP', 'Two pointers'],
          'KMP gives both occurrence lists in **O(n)**. Walk the a-list with a **pointer into the b-list** that skips b-starts below i − k.', 'kmp(s, a), kmp(s, b) · advance j while bs[j] < i − k · bs[j] ≤ i + k → keep i',
          'Same as part I with s, a and b up to 5·10⁵ characters.',
          'Both lists are sorted, so the first b-start that is not too far left is the only candidate to check, and that pointer only moves forward.',
          [A('KMP + two pointers', ['beautifulIndices', 'kmp'], 'O(n + |a| + |b|)', 'O(n)')],
          [('Why is one b enough to check?', 'It is the closest one not below i − k; if it is above i + k, all later ones are too.'), ('Why not indexOf?', 'Worst case O(n · |a|).')],
          ['[[Find Beautiful Indices in the Given Array I]]', '[[Knuth-Morris-Pratt KMP String Matching Algorithm]]'], gotcha=CHK),
    ]
}
