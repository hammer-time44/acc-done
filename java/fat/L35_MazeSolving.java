public class RatMaze {
    final int N = 4; // Define the size of the maze
    // Print the solution path (if found)
    void printSolution(int sol[][]) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(" " + sol[i][j] + " ");
            System.out.println();
        }
    }

    // Check if maze[x][y] is a valid move (inside bounds and not blocked)
    boolean isSafe(int maze[][], int x, int y) {
        return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);
    }

    // Solve the maze and return true if there's a solution, false otherwise
    boolean solveMaze(int maze[][]) {
        int sol[][] = new int[N][N]; // Create a solution matrix initialized to 0

        // If solveMazeUtil returns false, there's no solution
        if (!solveMazeUtil(maze, 0, 0, sol)) {
            System.out.print("Solution doesn't exist");
            return false;
        }

        printSolution(sol); // Print the solution matrix
        return true;
    }
    // Utility function to solve the maze using backtracking
    boolean solveMazeUtil(int maze[][], int x, int y, int sol[][]) {
        // If we've reached the destination (bottom-right corner), mark it as part of the solution
        if (x == N - 1 && y == N - 1) {
            sol[x][y] = 1;
            return true;
        }

        // Check if the current position is safe
        if (isSafe(maze, x, y)) {
            // Mark the current cell as part of the solution path
            sol[x][y] = 1;

            // Move forward in the x direction (down)
            if (solveMazeUtil(maze, x + 1, y, sol))
                return true;

            // If moving down didn't work, try moving right
            if (solveMazeUtil(maze, x, y + 1, sol))
                return true;

            // If neither move works, backtrack: unmark this cell
            sol[x][y] = 0;
            return false;
        }

        return false; // If not a valid move, return false
    }

    public static void main(String[] args) {
        RatMaze ratMaze = new RatMaze();
        int maze[][] = {
            { 1, 0, 0, 0 },
                { 1, 1, 0, 1 },
                { 0, 1, 0, 0 },
                { 1, 1, 1, 1 }
        };

        ratMaze.solveMaze(maze); // Solve the maze and print the solution
    }
}
