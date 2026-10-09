---
topic: Stack
pattern: [Monotonic stack (contribution)]
source: LeetCode 907
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Sum of Subarray Minimums

> [!TIP]
> **🧠 Memory hook**
> In how many subarrays am I the minimum?
> **Mantra: PREV SMALLER × NEXT SMALLER-OR-EQUAL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=33) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Sum of min(b) over all subarrays (mod 1e9+7).

## Key insight
arr[i] is the minimum of left[i]·right[i] subarrays, where left uses strictly smaller and right uses smaller-or-equal (so ties are counted once).

## Approach: Contribution
```java
// arr[i] is the minimum of left[i] × right[i] subarrays (strictly smaller on the left, smaller-or-equal on the right to avoid double counting)
public int sumSubarrayMins(int[] arr) {
    int n = arr.length;
    long[] left = new long[n], right = new long[n];
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!st.isEmpty() && arr[st.peek()] > arr[i]) st.pop();
        left[i] = st.isEmpty() ? i + 1 : i - st.peek();
        st.push(i);
    }
    st.clear();
    for (int i = n - 1; i >= 0; i--) {
        while (!st.isEmpty() && arr[st.peek()] >= arr[i]) st.pop();
        right[i] = st.isEmpty() ? n - i : st.peek() - i;
        st.push(i);
    }
    long sum = 0;
    for (int i = 0; i < n; i++) sum = (sum + arr[i] * left[i] % 1_000_000_007 * right[i]) % 1_000_000_007;
    return (int) sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Contribution | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an O(n²) scan with many duplicates.

## Recall before you reveal
<details><summary>Variant?</summary>

Sum of subarray ranges = Σmax − Σmin.

</details>

