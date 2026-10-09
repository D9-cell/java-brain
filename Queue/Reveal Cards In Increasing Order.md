---
topic: Queue
pattern: [Queue rotation, Simulate indices not values]
source: LeetCode 950
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, queue]
---
# Reveal Cards In Increasing Order (LC 950)

> [!TIP]
> **🧠 Memory hook**
> Don't simulate the **cards**, simulate the **seats**. A cinema usher (the queue) calls seat numbers: the first seat called gets the smallest ticket, and every *next* seat is sent to the back of the line.
> **Mantra: TAKE A SEAT, NEXT SEAT TO BACK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Queue/Queue%20Animations.html) (tab "Reveal Cards". Watch "1 · Understand the game" first.)
**Pattern hub:** [Queue - Pattern Map](Queue%20-%20Pattern%20Map.md)

## Problem
Arrange the deck so that repeating *"reveal the top card, then move the next top card to the bottom"* reveals the cards in **increasing** order.
`[17,13,11,2,3,5,7]  →  [2,13,3,11,5,17,7]`

## Key insight
The **order in which positions get revealed** depends only on `n`, not on the card values. So:
1. Simulate the game on **indices** `0..n-1` using a queue.
2. The *i-th* index that comes out gets the *i-th smallest* card.

## Approach 1: Queue of seats (main, easiest to remember)
```java
// Queue of positions: take a seat for the next smallest card, send the next seat to the back
public int[] deckRevealedIncreasing(int[] deck) {
    int n = deck.length;
    Queue<Integer> que = new ArrayDeque<>();
    int[] result = new int[n];
    for (int i = 0; i < n; i++) que.offer(i);
    Arrays.sort(deck);
    for (int i = 0; i < n; i++) {
        result[que.poll()] = deck[i];
        if (!que.isEmpty()) que.offer(que.poll());
    }
    return result;
}
```

## Approach 2: Skip-alternate on the result array (O(1) extra space)
Walk `result` in a circle. Only **empty** seats are still "in the deck". Alternate between *place a card* and *skip* (that card went to the bottom).
```java
// Walks the result array circularly, fills an empty slot, skips the next empty slot
public int[] deckRevealedIncreasingSkip(int[] deck) {
    int n = deck.length;
    int[] result = new int[n];
    boolean skip = false;
    int i = 0, j = 0;
    Arrays.sort(deck);
    while (i < n) {
        if (result[j] == 0) {
            if (!skip) result[j] = deck[i++];
            skip = !skip;
        }
        j = (j + 1) % n;
    }
    return result;
}
```
| Approach | Time | Space |
|---|---|---|
| Queue of seats | O(n log n) | O(n) |
| Skip-alternate | O(n log n) | O(1) extra |

## Recall before you reveal
<details><summary>What goes in the queue: cards or indices? Why?</summary>

Indices. The reveal order of positions is fixed by `n` alone.

</details>


<details><summary>Write the loop body from memory.</summary>

`result[que.poll()] = deck[i];`
`if (!que.isEmpty()) que.offer(que.poll());`

</details>


<details><summary>Skip approach: why are filled seats ignored, and why can 0 mean "empty"?</summary>

Filled seats are cards already revealed, so they have left the deck. 0 is safe because `deck[i] >= 1`; otherwise use a `boolean[]`.

</details>


## Connected
- Same rotation move: [Reverse First K elements of Queue](Reverse%20First%20K%20elements%20of%20Queue.md)
- Circular elimination, same idea: [Find the Winner of the Circular Game](../Recursion/Find%20the%20Winner%20of%20the%20Circular%20Game.md) (Josephus)
- Deque power-up: [Sliding Window Maximum](../Sliding%20Window/Sliding%20Window%20Maximum.md)
