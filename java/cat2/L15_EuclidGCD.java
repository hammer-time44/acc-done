import java.util.Scanner;

public class Main {

    public static int findgcd(int a, int b) {
        if (a == 0) {
            return b;
        }
        return findgcd(b % a, a); // Recursively call with the new pair
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Get user input for two numbers
        System.out.print("Enter first number: ");
        int a = sc.nextInt();

        System.out.print("Enter second number: ");
        int b = sc.nextInt();

        // Find GCD using the findgcd method
        int g = findgcd(a, b);

        // Print the result
        System.out.println("GCD(" + a + "," + b + ") = " + g);

        sc.close(); // Close the scanner resource
    }
}
