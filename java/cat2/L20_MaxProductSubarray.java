import java.util.Scanner;

class Main {
    // Function to find the maximum product subarray
    static int maxSubarrayProduct(int arr[]) {
        int n = arr.length;

        // Initialize variables to keep track of the max, min, and overall max product
        int maxProduct = arr[0];
        int minProduct = arr[0];
        int result = arr[0];

        // Traverse the array from the 2nd element onward
        for (int i = 1; i < n; i++) {
            // If the current element is negative, swap the max and min
            if (arr[i] < 0) {
                int temp = maxProduct;
                maxProduct = minProduct;
                minProduct = temp;
            }

            // Update maxProduct and minProduct
            maxProduct = Math.max(arr[i], maxProduct * arr[i]);
            minProduct = Math.min(arr[i], minProduct * arr[i]);

            // Update the result with the maximum product so far
            result = Math.max(result, maxProduct);
        }

        return result;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input the size of the array
        System.out.print("Enter the number of elements in the array: ");
        int n = scanner.nextInt();

        // Input the array elements
        int[] arr = new int[n];
        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // Calculate and print the maximum subarray product
        int result = maxSubarrayProduct(arr);
        System.out.println("Maximum subarray product is = " + result);

        scanner.close();
    }
}
