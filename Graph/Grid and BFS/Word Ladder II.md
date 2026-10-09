---
topic: Grid and BFS
pattern: [BFS + backtracking]
source: LeetCode 126
difficulty: Hard
companies: [Amazon, Google, Facebook]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Word Ladder II

> [!TIP]
> **🧠 Memory hook**
> First find how far the summit is; then retrace only the trails that go straight up.
> **Mantra: BFS FOR LEVELS + PARENTS, DFS BACK FROM END**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=19) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Return all shortest transformation sequences from beginWord to endWord.

## Key insight
Run BFS recording each word's level and every predecessor on a shortest route. Then a DFS from the end word follows the predecessor lists back to the start, producing exactly the shortest paths and nothing else.

## Approach: BFS levels + parents, DFS paths
```java
// BFS from the begin word records each word's level and its shortest-path predecessors, then DFS rebuilds every path backwards
public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
    Set<String> words = new HashSet<>(wordList);
    List<List<String>> result = new ArrayList<>();
    if (!words.contains(endWord)) return result;
    Map<String, Integer> level = new HashMap<>();
    Map<String, List<String>> parents = new HashMap<>();
    Queue<String> que = new ArrayDeque<>(List.of(beginWord));
    level.put(beginWord, 0);
    while (!que.isEmpty()) {
        String cur = que.poll();
        if (cur.equals(endWord)) break;
        char[] c = cur.toCharArray();
        for (int i = 0; i < c.length; i++) {
            char old = c[i];
            for (char ch = 'a'; ch <= 'z'; ch++) {
                c[i] = ch;
                String next = new String(c);
                if (!words.contains(next)) continue;
                if (!level.containsKey(next)) {
                    level.put(next, level.get(cur) + 1);
                    que.add(next);
                }
                if (level.get(next) == level.get(cur) + 1) parents.computeIfAbsent(next, k -> new ArrayList<>()).add(cur);
            }
            c[i] = old;
        }
    }
    if (!level.containsKey(endWord)) return result;
    LinkedList<String> path = new LinkedList<>(List.of(endWord));
    build(endWord, beginWord, parents, path, result);
    return result;
}

// Walks parent links from the end back to the begin word, adding each full path in forward order
private void build(String word, String begin, Map<String, List<String>> parents, LinkedList<String> path, List<List<String>> result) {
    if (word.equals(begin)) {
        result.add(new ArrayList<>(path));
        return;
    }
    for (String p : parents.getOrDefault(word, List.of())) {
        path.addFirst(p);
        build(p, begin, parents, path, result);
        path.removeFirst();
    }
}
```

| Approach | Time | Space |
|---|---|---|
| BFS levels + parents, DFS paths | O(26 · L² · N + paths) | O(N · L + paths) |

> [!WARNING]
> **Java gotcha**
> The number of shortest paths can explode: build them from the end so every explored branch is useful.

## Recall before you reveal
<details><summary>Why store several parents?</summary>

A word can be reached in the minimum number of steps from several words.

</details>


<details><summary>Why DFS backwards?</summary>

Going forward would explore branches that never reach the end.

</details>


## Connected
- [Word Ladder](Word%20Ladder.md)
