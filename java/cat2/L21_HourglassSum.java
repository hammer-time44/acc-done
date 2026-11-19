public class HourglassSum {

    // Hourglass:  a b c
    //               d
    //             e f g
    static int maxHourglass(int[][] g) {
        int best = Integer.MIN_VALUE;
        for (int r = 0; r + 2 < g.length; r++) {
            for (int c = 0; c + 2 < g[0].length; c++) {
                int sum = g[r][c] + g[r][c + 1] + g[r][c + 2]
                        + g[r + 1][c + 1]
                        + g[r + 2][c] + g[r + 2][c + 1] + g[r + 2][c + 2];
                best = Math.max(best, sum);
            }
        }
        return best;
    }

    public static void main(String[] args) {
        int[][] g = {
            {1, 1, 1, 0, 0, 0},
            {0, 1, 0, 0, 0, 0},
            {1, 1, 1, 0, 0, 0},
            {0, 0, 2, 4, 4, 0},
            {0, 0, 0, 2, 0, 0},
            {0, 0, 1, 2, 4, 0}
        };
        System.out.println(maxHourglass(g));   // 19
    }
}
