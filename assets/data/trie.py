D = 'Trie/'
def P(title, java, tab, src, diff, pats, hook, mantra, statement, insight, approaches, recall, connected, companies=None, gotcha=None, cpp=None):
    return dict(title=title, cpp=D + (cpp or title) + '.cpp', java=java, tab=tab, src=src, diff=diff, patterns=pats, hook=hook, mantra=mantra,
                statement=statement, insight=insight, approaches=approaches, recall=recall, connected=connected, companies=companies, gotcha=gotcha)
A = lambda name, code, t, s, explain=None: dict(name=name, code=code, time=t, space=s, explain=explain)
TOPIC = {
    'name': 'Trie', 'dir': 'Trie', 'tag': 'trie', 'anim': 'Trie Animations.html',
    'hook': 'A **dictionary\'s thumb-index tabs**: first letter, then second letter… Words with the same start share the same path; a ★ marks where a real word ends.\nSuffix problems? **Reverse the strings** and they become prefix problems.\nExtra data on nodes is the superpower: `pass` counts (how many words go through), `best` index, `word` itself, palindrome lists.',
    'toolkit': '''| Need | Java |
|---|---|
| Node for lowercase letters | `static class Node { Node[] next = new Node[26]; boolean end; }` |
| Child index | `ch - 'a'` (digits: `ch - '0'`, 10 children) |
| Unknown or large alphabet / names | `TreeMap<String, Node> children` (sorted) or `HashMap` |
| Reverse a string | `new StringBuilder(s).reverse().toString()` |
| Count words through a node | `cur = cur.next[i]; cur.pass++;` (after moving down) |''',
    'mermaid': '''graph LR
  T((Trie)) --> B[Basic: insert/search/startsWith<br/>208]
  B --> C[pass counts<br/>2185 Prefix Count]
  C --> S[sum pass on path<br/>2416 Prefix Scores]
  B --> R[first end wins<br/>648 Replace Words]
  B --> D[digit trie<br/>3043 LCP]
  B --> REV[reverse strings]
  REV --> PS[3042 Prefix and Suffix Pairs]
  REV --> SQ[best index per node<br/>3093 Suffix Queries]
  REV --> PP[3 cases<br/>336 Palindrome Pairs]
  B --> WS[trie + DFS on grid<br/>212 Word Search II]
  B --> F[subtree signatures<br/>1948 Duplicate Folders]''',
    'order': '1. [[Implement Trie (Prefix Tree)]]\n2. [[Counting Words With a Given Prefix]] → [[Sum of Prefix Scores of Strings]]\n3. [[Replace Words]], [[Find the Length of the Longest Common Prefix]]\n4. Reverse trick: [[Count Prefix and Suffix Pairs I]] → [[Longest Common Suffix Queries]]\n5. Combine with DFS: [[Word Search II]]\n6. Hard: [[Palindrome Pairs]], [[Delete Duplicate Folders in System]]',
    'cross': ['Replace Words with a HashSet: [[Replace Words.cpp|HashSet/Replace Words]]',
              'Palindrome Pairs with a HashMap: [[Palindrome Pairs.cpp|HashMap/Palindrome Pairs]]',
              'Grid DFS + backtracking (Word Search I): the `Backtracking` folder',
              'Subtree serialisation (Find Duplicate Subtrees): the `Tree` folder'],
    'problems': [
        P('Implement Trie (Prefix Tree)', 'ImplementTrie', 0, 'LeetCode 208', 'Medium', ['Trie basics'],
          'Thumb-index tabs of a dictionary; a ★ sticker where a real word ends.', 'WALK, CREATE IF MISSING, ★ AT THE END',
          'Implement `insert`, `search` (whole word) and `startsWith` (prefix).',
          'Every path from the root spells a prefix. `search` and `startsWith` share the same walk; only `search` also checks the ★.',
          [A('Array-of-26 trie', ['Node', 'Trie'], 'O(L) per operation', 'O(total chars × 26)')],
          [('search vs startsWith?', 'Same walk; search also requires `end == true`.'), ('Why a shared `walk` helper?', 'DRY: both operations follow the same path.')],
          ['[[Counting Words With a Given Prefix]]', '[[Replace Words]]', '[[Word Search II]]'], companies=['Microsoft']),
        P('Counting Words With a Given Prefix', 'CountingWordsWithGivenPrefix', 1, 'LeetCode 2185', 'Easy', ['Trie', 'Pass counts'],
          'A turnstile at every node clicks as words pass. Read the click count at the prefix node.', 'PASS++ ON INSERT, READ AT PREFIX',
          'Return how many words have `pref` as a prefix.',
          'Store at each node how many inserted words pass through it. The answer for a prefix is one walk plus one read.',
          [A('Brute force', ['prefixCountBrute'], 'O(n·m)', 'O(1)'), A('Trie with pass counts', ['prefixCount'], 'O(total chars + m)', 'O(total chars)')],
          [('Increment pass before or after moving to the child?', 'After moving, so the node represents the prefix ending at that character.')],
          ['Sum along the path instead: [[Sum of Prefix Scores of Strings]]']),
        P('Count Prefix and Suffix Pairs I', 'CountPrefixAndSuffixPairsI', 2, 'LeetCode 3042', 'Easy', ['Trie', 'Reverse for suffix'],
          'A suffix is a prefix seen in a mirror: reverse both strings and reuse the prefix check.', 'PREFIX TRIE + REVERSED TRIE',
          'Count pairs `i < j` where `words[i]` is both a prefix and a suffix of `words[j]`.',
          'For each j, a prefix trie of `words[j]` answers the prefix check, and a trie of reversed `words[j]` answers the suffix check.',
          [A('Brute force', ['countPrefixSuffixPairsBrute'], 'O(n²·L)', 'O(1)'), A('Two tries per j', ['insert', 'hasPrefix', 'countPrefixSuffixPairs'], 'O(n²·L)', 'O(L)')],
          [('How do you test "suffix" with a trie?', 'Insert reversed strings and check reversed candidates as prefixes.'), ('Version II idea?', 'One trie keyed by (s[i], s[n−1−i]) pairs.')],
          ['Reversed trie again: [[Longest Common Suffix Queries]]']),
        P('Find the Length of the Longest Common Prefix', 'LongestCommonPrefixLength', 3, 'LeetCode 3043', 'Medium', ['Digit trie', 'HashSet of prefixes'],
          'A phone-number directory: dial digits and see how far the directory follows.', 'DIGIT TRIE, WALK UNTIL MISSING',
          'Longest common digit prefix over all pairs (x ∈ arr1, y ∈ arr2).',
          'Insert every arr1 number digit by digit. For each arr2 number, walk until a digit is missing; the walk length is that number\'s best LCP.',
          [A('HashSet of numeric prefixes', ['longestCommonPrefixSet'], 'O((m+n)·d)', 'O(m·d)'), A('Digit trie', ['longestCommonPrefix'], 'O((m+n)·d)', 'O(m·d)')],
          [('How do you get numeric prefixes without strings?', 'Repeated `v /= 10`.'), ('Children per node?', '10.')],
          ['[[Implement Trie (Prefix Tree)]]']),
        P('Replace Words', 'ReplaceWords', 4, 'LeetCode 648', 'Medium', ['Trie', 'Shortest prefix'],
          'A word-root detective: walk the word and stop at the first ★.', 'FIRST ★ WINS',
          'Replace every sentence word with the shortest dictionary root that is its prefix.',
          'Walking left to right, the first end-marker you meet is the shortest matching root.',
          [A('Trie + first end-marker', ['shortestRoot', 'replaceWords'], 'O(dict chars + sentence chars)', 'O(dict chars)')],
          [('Why is the first ★ the shortest root?', 'Prefixes are discovered in increasing length.'), ('Sentence joining in Java?', '`StringBuilder` with a space between words (or `String.join`).')],
          ['HashSet version: [[Replace Words.cpp|HashSet/Replace Words]]'], companies=['Uber']),
        P('Sum of Prefix Scores of Strings', 'SumOfPrefixScores', 5, 'LeetCode 2416', 'Hard', ['Trie', 'Pass counts'],
          'Each word pays a toll at every gate it passes; the toll = how many words pass that gate.', 'PASS++ ON INSERT, SUM PASS ALONG PATH',
          'For each word, sum over its non-empty prefixes the number of words having that prefix.',
          'Same pass counts as 2185. A word\'s answer is the sum of pass values along its own path.',
          [A('Trie with pass counts', ['sumPrefixScores'], 'O(total chars)', 'O(total chars)')],
          [('Relation to Prefix Count?', 'Read every node on the path instead of just the last one.')],
          ['[[Counting Words With a Given Prefix]]']),
        P('Longest Common Suffix Queries', 'LongestCommonSuffixQueries', 6, 'LeetCode 3093', 'Hard', ['Reversed trie', 'Best value per node'],
          'Every node is a notice board showing the best word that passed by (shortest, then earliest).', 'REVERSE, KEEP BEST AT EVERY NODE',
          'For each query, return the index of the container word with the longest common suffix; ties → shortest length → smallest index.',
          'Insert container words reversed. Each node (and the root) stores the best index among words passing through it. A query walks as far as it can, and the last node\'s best is the answer.',
          [A('Reversed trie with best index', ['Node', 'stringIndices'], 'O(total chars)', 'O(total chars × 26)')],
          [('Why update the root too?', 'A query with no common suffix returns the overall shortest word.'), ('Why strict < ?', 'To keep the earliest index on equal lengths.')],
          ['[[Count Prefix and Suffix Pairs I]]']),
        P('Palindrome Pairs', 'PalindromePairs', 7, 'LeetCode 336', 'Hard', ['Reversed trie', 'Palindrome check'],
          'Fold a paper strip: w1 forward meets w2 backward; whatever is left over must be a palindrome.', 'REVERSED TRIE, 3 CASES: END-EARLY, EXACT, PAL-REST',
          'Return all pairs (i, j), i ≠ j, such that `words[i] + words[j]` is a palindrome.',
          'Insert every word reversed. Walking `w` forward then matches another word from its end. Three cases:\n1. Another word ends **before** `w` does, and the rest of `w` is a palindrome.\n2. Exact reverse.\n3. `w` ends first and the other word\'s remaining front part is a palindrome (precomputed in `restIsPal`).',
          [A('Reversed trie', ['Node', 'isPal', 'add', 'search', 'palindromePairs'], 'O(n·k²)', 'O(n·k)')],
          [('What does restIsPal at a node mean?', 'Words that pass this node and whose unconsumed front part is a palindrome.'), ('Empty string handling?', '"" ends at the root: case 1 pairs it with palindromes, and root.restIsPal gives the reverse pairs.')],
          ['HashMap version: [[Palindrome Pairs.cpp|HashMap/Palindrome Pairs]]'], companies=['Airbnb'],
          gotcha='Verified against brute force on 400 random word lists, including the empty string.'),
        P('Word Search II', 'WordSearchII', 8, 'LeetCode 212', 'Hard', ['Trie', 'DFS backtracking on grid'],
          'A guided maze walk: the trie is the tour guide; no guide edge, no step.', 'ONE TRIE, ONE DFS, PRUNE BY TRIE, ERASE FOUND',
          'Return all words from the list that can be traced on the board using adjacent cells (no reuse within a word).',
          'Put all words in one trie. DFS from every cell, but only move to a neighbour whose letter is a child of the current trie node. Store the word at its end node and null it after finding it.',
          [A('Trie-guided backtracking', ['dfs', 'findWords'], 'O(cells · 4 · 3^(L−1))', 'O(total chars)')],
          [('Why null out `word` after adding it?', 'To avoid duplicate results.'), ('Visited marking?', 'Set the cell to \'$\' and restore it after exploring.')],
          ['Word Search I: the `Backtracking` folder', '[[Implement Trie (Prefix Tree)]]'], companies=['Google', 'Amazon', 'Meta', 'Microsoft']),
        P('Delete Duplicate Folders in System', 'DeleteDuplicateFolders', 9, 'LeetCode 1948', 'Hard', ['Trie of folders', 'Subtree serialisation'],
          'Fingerprint every folder by what is inside it; identical fingerprints mean demolish both.', 'TRIE, POST-ORDER SIGNATURE, COUNT, PRUNE',
          'Mark all folders with identical non-empty subfolder structures, delete them (and their subfolders), and return the remaining paths.',
          'Build a trie of folder names. In post-order, serialise each folder as the concatenation of `(childName + childSignature)` over **sorted** children. Count the signatures; remove children whose signature count is > 1.',
          [A('Trie + serialisation', ['Node', 'serialize', 'prune', 'collect', 'deleteDuplicateFolder'], 'O(N·L·log C)', 'O(N·L)')],
          [('Why sort children?', 'So that equal structures give equal strings.'), ('Why are empty signatures excluded?', 'Leaf folders are never duplicates by definition.')],
          ['Find Duplicate Subtrees: the `Tree` folder']),
    ],
}
