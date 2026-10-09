---
topic: Linked List
pattern: [Reverse second half]
source: LeetCode 234
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# Palindrome Linked List

> [!TIP]
> **🧠 Memory hook**
> Fold the list; the halves must match.
> **Mantra: MIDDLE, REVERSE SECOND HALF, COMPARE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=24) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
Is the list a palindrome? Aim for O(1) space.

## Key insight
Find the middle, reverse the second half, compare with the first half.

## Approach 1: Copy to array
```java
// Approach 1: copy to a list and compare with two pointers
public boolean isPalindromeList(ListNode head) {
    List<Integer> v = ListNode.toList(head);
    for (int i = 0, j = v.size() - 1; i < j; i++, j--) if (!v.get(i).equals(v.get(j))) return false;
    return true;
}
```

## Approach 2: Reverse second half
```java
// Approach 2: reverse the second half (from the middle) and compare it with the first half
public boolean isPalindrome(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
    ListNode prev = null;
    while (slow != null) { ListNode nx = slow.next; slow.next = prev; prev = slow; slow = nx; }
    for (ListNode a = head, b = prev; b != null; a = a.next, b = b.next) if (a.val != b.val) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Copy to array | O(n) | O(n) |
| Reverse second half | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against the same operation done on a plain array (random inputs) when it was written.

## Recall before you reveal
<details><summary>Good manners?</summary>

Reverse it back afterwards.

</details>


## Connected
- [Maximum Twin Sum of a Linked List](Maximum%20Twin%20Sum%20of%20a%20Linked%20List.md)
