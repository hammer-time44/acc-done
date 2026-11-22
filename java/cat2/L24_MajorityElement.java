import java.util.Scanner;

public class MajorityElementFinder {

    // Function to find the majority element
    public static int findMajorityElement(int[] arr, int n) {
        // Phase 1: Find the candidate for the majority element
        int candidate = -1; // Use a valid placeholder for int
        int count = 0;

        for (int i = 0; i < n; i++) {
            if (count == 0) {
                candidate = arr[i];
                count = 1;
            } else if (candidate == arr[i]) {
                count++;
            } else {
                count--;
            }
        }

        // Phase 2: Verify if the candidate is the majority element
        count = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] == candidate) {
                count++;
            }
        }

        // Return the candidate if it is the majority element, otherwise return -1
        return (count > n / 2) ? candidate : -1; // Returning -1 if no majority found
    }

    public static void main(String[] args) {
        // Create a scanner object to take input from the user
        Scanner scanner = new Scanner(System.in);

        // Taking input for the size of the array
        System.out.print("Enter the number of elements in the array: ");
        int n = scanner.nextInt();

        // Initialize the array with the input size
        int[] arr = new int[n];

        // Taking array input from the user
        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // Finding and printing the majority element
        int result = findMajorityElement(arr, n);
        if (result != -1) {
            System.out.println("The majority element is: " + result);
        } else {
            System.out.println("There is no majority element.");
        }

        // Close the scanner
        scanner.close();
    }
}
