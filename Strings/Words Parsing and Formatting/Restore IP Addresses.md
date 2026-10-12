---
topic: Words Parsing and Formatting
pattern: [Backtracking, Parse numbers]
source: LeetCode 93
difficulty: Medium
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Restore IP Addresses

> [!TIP]
> **🧠 Memory hook**
> Place **four parts** of 1 to 3 digits. A part must be **≤ 255** and have **no leading zero**.
> **Mantra: part = s[i..i+len] · leading 0 or > 255 → stop · 4 parts and end → add**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=13) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Given a string of digits, return all valid IPv4 addresses that can be formed by inserting three dots.

## Key insight
At most 3³ = 27 split choices exist, so backtracking is tiny. Breaking out of the length loop on a leading zero or a value over 255 prunes, because longer parts only get worse.

## Approach: Backtracking
```java
// Backtrack over four parts of 1 to 3 digits, each 0..255 without leading zeros
public List<String> restoreIpAddresses(String s) {
    List<String> out = new ArrayList<>();
    build(s, 0, new ArrayList<>(), out);
    return out;
}

// Places the next part starting at index i
void build(String s, int i, List<String> parts, List<String> out) {
    if (parts.size() == 4) {
        if (i == s.length()) out.add(String.join(".", parts));
        return;
    }
    for (int len = 1; len <= 3 && i + len <= s.length(); len++) {
        String part = s.substring(i, i + len);
        if (part.length() > 1 && part.charAt(0) == '0') break;
        if (Integer.parseInt(part) > 255) break;
        parts.add(part);
        build(s, i + len, parts, out);
        parts.remove(parts.size() - 1);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking | O(27) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why break and not continue?</summary>

A longer part keeps the same leading zero or a bigger value.

</details>


<details><summary>Length bounds?</summary>

Valid inputs have 4 to 12 digits.

</details>


## Connected
- [Compare Version Numbers](Compare%20Version%20Numbers.md)
- [Subsets](../../Recursion/Subsets.md)
