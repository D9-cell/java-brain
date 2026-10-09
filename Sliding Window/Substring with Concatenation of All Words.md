---
topic: Sliding Window
pattern: [Window over words]
source: LeetCode 30
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Substring with Concatenation of All Words

> [!TIP]
> **🧠 Memory hook**
> Cut s into word tiles; on each of the w tile grids it is a normal window.
> **Mantra: w OFFSETS × WINDOW OVER WORDS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=54) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
All start indices where s contains every word exactly once, concatenated in any order (all words have the same length).

## Key insight
For each offset 0..w−1, read s in steps of w. On that grid it is a window over words with counts; evict from the left when a word is over-used, reset on unknown words.

## Approach 1: Check every start
```java
// From every start, read words one by one against a copy of the word counts
public List<Integer> findSubstringBrute(String s, String[] words) {
    int w = words[0].length(), total = words.length * w;
    Map<String, Integer> need = new HashMap<>();
    for (String x : words) need.merge(x, 1, Integer::sum);
    List<Integer> result = new ArrayList<>();
    for (int i = 0; i + total <= s.length(); i++) {
        Map<String, Integer> left = new HashMap<>(need);
        int seen = 0;
        for (int p = i; p < i + total; p += w) {
            String part = s.substring(p, p + w);
            if (left.getOrDefault(part, 0) == 0) break;
            left.merge(part, -1, Integer::sum);
            seen++;
        }
        if (seen == words.length) result.add(i);
    }
    return result;
}
```

## Approach 2: Window per offset
The C++ file only has the brute force ("sliding window: coming soon"); this is that window.

```java
// For each offset 0..w-1, slide a window one word at a time; evict from the left when a word is over-used
public List<Integer> findSubstring(String s, String[] words) {
    int w = words[0].length(), cnt = words.length, n = s.length();
    Map<String, Integer> need = new HashMap<>();
    for (String x : words) need.merge(x, 1, Integer::sum);
    List<Integer> result = new ArrayList<>();
    for (int off = 0; off < w; off++) {
        Map<String, Integer> have = new HashMap<>();
        int used = 0;
        for (int i = off, j = off; j + w <= n; j += w) {
            String word = s.substring(j, j + w);
            if (!need.containsKey(word)) {
                have.clear();
                used = 0;
                i = j + w;
                continue;
            }
            have.merge(word, 1, Integer::sum);
            used++;
            while (have.get(word) > need.get(word)) {
                have.merge(s.substring(i, i + w), -1, Integer::sum);
                used--;
                i += w;
            }
            if (used == cnt) result.add(i);
        }
    }
    Collections.sort(result);
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Check every start | O(n · m · w) | O(m) |
| Window per offset | O(n · w) | O(m) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on random inputs with repeated words.

## Recall before you reveal
<details><summary>Why w offsets?</summary>

A match can start at any index mod w.

</details>

