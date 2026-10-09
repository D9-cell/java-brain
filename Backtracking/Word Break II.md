---
topic: Backtracking
pattern: [String partition + memo]
source: LeetCode 140
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Word Break II

> [!TIP]
> **🧠 Memory hook**
> Cut a sentence into dictionary words; remember results per start index.
> **Mantra: CUT WORD, RECURSE, MEMO BY INDEX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=34) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
All sentences formed by inserting spaces so every word is in the dictionary.

## Key insight
From index i, cut any dictionary prefix and combine with the sentences of the rest; memoise per i.

## Approach: Backtracking + memo
```java
// Cut a dictionary word off the front and recurse on the rest; memo by start index
private List<String> solve(String s, int i, Set<String> dict, Map<Integer, List<String>> memo) {
    if (i == s.length()) return List.of("");
    if (memo.containsKey(i)) return memo.get(i);
    List<String> res = new ArrayList<>();
    for (int j = i + 1; j <= s.length(); j++) {
        String w = s.substring(i, j);
        if (!dict.contains(w)) continue;
        for (String rest : solve(s, j, dict, memo)) res.add(rest.isEmpty() ? w : w + " " + rest);
    }
    memo.put(i, res);
    return res;
}

// Entry point
public List<String> wordBreak(String s, List<String> wordDict) { return solve(s, 0, new HashSet<>(wordDict), new HashMap<>()); }
```

| Approach | Time | Space |
|---|---|---|
| Backtracking + memo | output-bound | O(output) |

> [!WARNING]
> **Java gotcha**
> Verified against all cut masks.

## Recall before you reveal
<details><summary>Memo key?</summary>

Start index.

</details>


## Connected
- DP folder: Word Break
