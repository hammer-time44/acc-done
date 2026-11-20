// Java code to Implement Josephus Problem
import java.io.*;

class GFG {
public static int Josephus(int N, int k) {

    // Initialize variables i and ans with 1 and 0 respectively.
    int i = 1, ans = 0;

    // Run a while loop till i <= N
    while (i <= N) {

    // Update the Value of ans and Increment i by 1
    ans = (ans + k) % i;
    i++;
    }

    // Return required answer
    return ans + 1;
}

// main function
public static void main (String[] args) {

    int N = 14, k = 2;
    int ans = Josephus(N, k);
    System.out.println(ans);
}
}

// This code is presented by Akash Mangal

// Java code for Josephus Problem using recursion

class JosephusRecursion {

    static int josephus(int n, int k)
    {
        if (n == 1)
            return 1;
        else
            /* The position returned by josephus(n - 1, k)
            is adjusted because the recursive call
            josephus(n - 1, k) considers the original
            position k%n + 1 as position 1 */
            return (josephus(n - 1, k) + k - 1) % n + 1;
    }

    // Driver Program to test above function
    public static void main(String[] args)
    {
        int n = 14;
        int k = 2;
        System.out.println("The chosen place is "
                        + josephus(n, k));
    }
}

// This code is contributed by Prerna Saini
