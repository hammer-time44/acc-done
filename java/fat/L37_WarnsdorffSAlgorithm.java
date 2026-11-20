import java.util.Arrays;
public class Main {
    private static final int BOARD_SIZE = 8;
    private static final int[] ROW_MOVES = {2, 1, -1, -2, -2, -1, 1, 2};
    private static final int[] COL_MOVES = {1, 2, 2, 1, -1, -2, -2, -1};
    private static boolean isSafe(int[][] board, int row, int col) {
        return (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && board[row][col] == -1);
    }
    private static int countNeighbours(int[][] board, int row, int col) {
        int count = 0;
        for (int i = 0; i < 8; i++) {
            int newRow = row + ROW_MOVES[i];
            int newCol = col + COL_MOVES[i];
            if (isSafe(board, newRow, newCol)) {
                count++;
            }
        }
        return count;
    }
    private static boolean knightTour(int[][] board, int row, int col, int move) {
        if (move == BOARD_SIZE * BOARD_SIZE) {
            return true; // All squares have been visited
        }

        int minNeighbours = Integer.MAX_VALUE;
        int minIndex = -1;

        for (int i = 0; i < 8; i++) {
            int newRow = row + ROW_MOVES[i];
            int newCol = col + COL_MOVES[i];
            if (isSafe(board, newRow, newCol)) {
                int numNeighbours = countNeighbours(board, newRow, newCol);
                if (numNeighbours < minNeighbours) {
                    minNeighbours = numNeighbours;
                    minIndex = i;
                }
            }
        }

        if (minIndex != -1) {
            int newRow = row + ROW_MOVES[minIndex];
            int newCol = col + COL_MOVES[minIndex];
            board[newRow][newCol] = move;
            if (knightTour(board, newRow, newCol, move + 1)) {
                return true;
            } else {
                board[newRow][newCol] = -1; // Backtrack
            }
        }

        return false;
    }

    public static void main(String[] args) {
        int[][] board = new int[BOARD_SIZE][BOARD_SIZE];
        for (int i = 0; i < BOARD_SIZE; i++) {
            Arrays.fill(board[i], -1); // Initialize board with -1 (unvisited)
        }

        int startRow = 0;
        int startCol = 0;

        board[startRow][startCol] = 0; // Mark the starting square as visited

        if (knightTour(board, startRow, startCol, 1)) {
            System.out.println("Knight's Tour:");
            for (int i = 0; i < BOARD_SIZE; i++) {
                for (int j = 0; j < BOARD_SIZE; j++) {
                    System.out.printf("%2d ", board[i][j]);
                }
                System.out.println();
            }
        } else {
            System.out.println("No Knight's Tour found.");
 }
}
}
