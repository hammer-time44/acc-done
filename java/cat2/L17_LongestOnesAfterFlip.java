import java.util.Scanner; // Import Scanner class for user input

public class Longafterflip {
    // Method to find the longest sequence of consecutive 1s after flipping one bit
    public static int longestConsecutiveOnes(int n) {
        // Convert the integer to its binary string representation
        String binary = Integer.toBinaryString(n);

        // Variables to track the maximum sequence length and intermediate lengths
        int maxLength = 0;
        int currentLength = 0;
        int previousLength = 0;

        // Iterate through each bit in the binary string
        for (char bit : binary.toCharArray()) {
            if (bit == '1') {
                // Increase the count of consecutive 1s
                currentLength++;
            } else {
                // Update maxLength by considering a possible flip
                maxLength = Math.max(maxLength, currentLength + previousLength + 1);

                // Store the current sequence length and reset it
                previousLength = currentLength;
                currentLength = 0;
            }
        }
        // Final update to maxLength after the loop ends
        maxLength = Math.max(maxLength, currentLength + previousLength + 1);
        return maxLength;
    }

    public static void main(String[] args) {
        // Create a Scanner object to take user input
        Scanner scanner = new Scanner(System.in);

        // Prompt user for an integer input
        System.out.print("Enter an integer: ");
        int n = scanner.nextInt();

        // Compute and display the longest consecutive ones after flipping one bit
        System.out.println("Longest consecutive ones after one flip: " +
            longestConsecutiveOnes(n));
        // Close the scanner to prevent resource leak
        scanner.close();
    }
}
