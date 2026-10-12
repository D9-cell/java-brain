---
topic: Game DP
pattern: [Bitmask game, BFS distances]
source: LeetCode 3283
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Number of Moves to Kill All Pawns

> [!TIP]
> **🧠 Memory hook**
> Precompute **knight distances** between all points, then play a minimax game over (where the knight is, pawns left).
> **Mantra: Alice: max of d + play(next) · Bob: min of d + play(next)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=10) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
A knight and up to 15 pawns sit on a 50 × 50 board. Players alternate; the mover picks any remaining pawn and captures it by a shortest knight path (other pawns passed on the way stay). Alice maximises the total number of moves, Bob minimises it. Return the total with optimal play.

## Key insight
Distances come from a BFS from the knight and from each pawn. The state is (current position, mask of pawns left). The mover is determined by how many pawns are gone, so the memo needs no extra flag.

## Approach: BFS + mask minimax
```java
public class MaximumNumberOfMovesToKillAllPawns {
    private static final int[][] KNIGHT = {{2, 1}, {2, -1}, {-2, 1}, {-2, -1}, {1, 2}, {1, -2}, {-1, 2}, {-1, -2}};
    private int[][] dist;
    private int[][] memo;
    private int n;

    // Knight at index 0, pawns at 1..n; Alice maximises total moves, Bob minimises, each capture uses the shortest knight path
    public int maxMoves(int kx, int ky, int[][] positions) {
        n = positions.length;
        int[][] pts = new int[n + 1][];
        pts[0] = new int[]{kx, ky};
        for (int i = 0; i < n; i++) pts[i + 1] = positions[i];
        dist = new int[n + 1][n + 1];
        for (int i = 0; i <= n; i++) bfs(pts, i);
        memo = new int[n + 1][1 << n];
        for (int[] row : memo) Arrays.fill(row, -1);
        return play(0, (1 << n) - 1);
    }

    // Knight distances from point src to every point of interest on the 50 x 50 board
    private void bfs(int[][] pts, int src) {
        int[][] d = new int[50][50];
        for (int[] row : d) Arrays.fill(row, -1);
        Deque<int[]> q = new ArrayDeque<>();
        q.add(pts[src]);
        d[pts[src][0]][pts[src][1]] = 0;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] mv : KNIGHT) {
                int x = cur[0] + mv[0], y = cur[1] + mv[1];
                if (x >= 0 && x < 50 && y >= 0 && y < 50 && d[x][y] < 0) {
                    d[x][y] = d[cur[0]][cur[1]] + 1;
                    q.add(new int[]{x, y});
                }
            }
        }
        for (int j = 0; j <= n; j++) dist[src][j] = d[pts[j][0]][pts[j][1]];
    }

    // Best remaining total with the knight on point at and the pawns in mask alive; the mover is Alice when an even number of pawns are gone
    private int play(int at, int mask) {
        if (mask == 0) return 0;
        if (memo[at][mask] >= 0) return memo[at][mask];
        boolean alice = (n - Integer.bitCount(mask)) % 2 == 0;
        int best = alice ? -1 : Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            if ((mask >> i & 1) == 0) continue;
            int total = dist[at][i + 1] + play(i + 1, mask ^ (1 << i));
            best = alice ? Math.max(best, total) : Math.min(best, total);
        }
        return memo[at][mask] = best;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| BFS + mask minimax | O(n² · 2ⁿ) | O(n · 2ⁿ) |

> [!WARNING]
> **Java gotcha**
> Checked against the three LeetCode samples.

## Recall before you reveal
<details><summary>Why does the mask give the turn?</summary>

Each turn removes exactly one pawn, so the parity of removed pawns is the turn.

</details>


<details><summary>Why a BFS per point?</summary>

The board is fixed at 50 × 50 and there are at most 16 points.

</details>


## Connected
- [Smallest Sufficient Team](../Bitmask%20Digit%20and%20Tree%20DP/Smallest%20Sufficient%20Team.md)
- [Stone Game III](Stone%20Game%20III.md)
