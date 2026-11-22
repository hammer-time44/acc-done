import java.util.Scanner;
public class Main {
    static void leftRotate(int arr[], int d, int n) {
        if (d == 0 || d == n)
            return;
        if (d > n)
            d = d % n;

        int i = d, j = n - d;
        while (i != j) {
            if (i < j) {
                swap(arr, d - i, d + j - i, i);
                j -= i;
            } else {
                swap(arr, d - i, d, j);
                i -= j;
            }
        }
        swap(arr, d - i, d, i);
    }

    public static void printArray(int arr[], int size) {
        for (int i = 0; i < size; i++)
            System.out.print(arr[i] + " ");
        System.out.println();
    }

    public static void swap(int arr[], int fi, int si, int d) {
        for (int i = 0; i < d; i++) {
            int temp = arr[fi + i];
            arr[fi + i] = arr[si + i];
            arr[si + i] = temp;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input array size
        System.out.print("Enter the size of the array: ");
        int n = scanner.nextInt();

        // Input array elements
        int[] arr = new int[n];
        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // Input rotation value
        System.out.print("Enter the number of positions to rotate: ");
        int d = scanner.nextInt();

        // Perform rotation and print the result
        leftRotate(arr, d, n);
        System.out.println("Array after rotation:");
        printArray(arr, n);

        scanner.close();
    }
}
