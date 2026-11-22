import java.util.*;

public class CombinationExample {
    static int fact(int number) {
        int f = 1;
        int j = 1;
        while (j <= number) {
            f = f * j;
            j++;
        }
        return f;
    }

    public static void main(String args[]) {
        Scanner scanner = new Scanner(System.in);

        // Get the size of the list
        System.out.print("Enter the number of elements in the list: ");
        int n = scanner.nextInt();

        // Get the list of numbers from the user
        List<Integer> numbers = new ArrayList<>();
        System.out.println("Enter the numbers for the list:");
        for (int i = 0; i < n; i++) {
            System.out.print("Enter number " + (i + 1) + ": ");
            numbers.add(scanner.nextInt());
        }

        // Display the list
        System.out.println("Your numbers list: " + numbers);
        // Get the value of r from the user
        System.out.print("Enter the value of r: ");
        int r = scanner.nextInt();

        // Validate and calculate the combination value
        if (r > n) {
            System.out.println("The value of r cannot be greater than the size of the list.");
        } else {
            int result = fact(n) / (fact(r) * fact(n - r));
            System.out.println("The combination value for the numbers list is: " + result);
        }

        scanner.close();
    }
}
