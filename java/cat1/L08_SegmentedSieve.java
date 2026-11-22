import java.util.Scanner;

public class Segmented {
    static void SegSieve(int l, int h) {
        // Step 1: Create a boolean array to mark numbers as prime or not
        boolean[] prime = new boolean[h + 1];

        // Step 2: Segmented Sieve algorithm
        for (int p = 2; p * p <= h; p++) {
            // Find the smallest multiple of p in the range [l, h]
            int sm = (l / p) * p;
            if (sm < l) {
                sm += p; // Make sure sm is in the range [l, h]
            }

            // Mark all multiples of p as non-prime
            for (int i = sm; i <= h; i += p) {
                prime[i] = true;
            }
        }

        // Step 3: Print all prime numbers in the range [l, h]
        for (int i = l; i <= h; i++) {
            if (!prime[i] && i > 1) { // Prime numbers are those that are not marked as true, and not
                System.out.print(i + " ");
            }
        }
        System.out.println(); // Move to a new line after printing primes
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Get user input for the lower and upper bounds of the range
        System.out.print("Enter the lower bound (l): ");
        int l = scanner.nextInt();
        System.out.print("Enter the upper bound (h): ");
        int h = scanner.nextInt();

        // Call the SegSieve function to print primes in the range [l, h]
        SegSieve(l, h);

        scanner.close(); // Close the scanner
    }
}
