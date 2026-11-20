import java.io.*;

// Program 1: recursion
//Maneuvering
public class Main {
// Returns count of possible paths to reach
// cell at row number m and column number n
// from the topmost leftmost cell (cell at 1, 1)
static int numberOfPaths(int m, int n)
{
// If either given row number is first or
// given column number is first
if (m == 1 || n == 1)
return 1;
// If diagonal movements are allowed then
// the last addition is required.
return numberOfPaths(m - 1, n) + numberOfPaths(m, n - 1);
// + numberOfPaths(m-1, n-1);
}
public static void main(String args[])
{
System.out.println(numberOfPaths(3, 3));
}
}

// Program 2: combinatorics
// Java program to count all possible paths from
// top left to top bottom using combinatorics

class GFG {

    static int numberOfPaths(int m, int n)
    {
        // We have to calculate m+n-2 C n-1 here
        // which will be (m+n-2)! / (n-1)! (m-1)!
        int path = 1;
        for (int i = n; i < (m + n - 1); i++) {
            path *= i;
            path /= (i - n + 1);
        }
        return path;
    }

    // Driver code
    public static void main(String[] args)
    {
        System.out.println(numberOfPaths(3, 3));
    }
}

// This code is contributed by Code_Mech.
