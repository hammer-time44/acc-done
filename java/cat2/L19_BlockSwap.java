import java.util.Arrays;

public class BlockSwap {

    static void swap(int[] a, int i, int j, int len) {
        for (int k = 0; k < len; k++) {
            int t = a[i + k]; a[i + k] = a[j + k]; a[j + k] = t;
        }
    }

    // Rotate left by d using the block swap algorithm: O(n) time, O(1) space
    static void rotate(int[] a, int d) {
        int n = a.length;
        if (n == 0) return;
        d %= n;
        if (d == 0) return;
        int i = d, j = n - d;
        while (i != j) {
            if (i < j) {                       // A is shorter than B
                swap(a, d - i, d + j - i, i);
                j -= i;
            } else {                           // B is shorter than A
                swap(a, d - i, d, j);
                i -= j;
            }
        }
        swap(a, d - i, d, i);
    }

    // Reversal method for comparison
    static void rotateReversal(int[] a, int d) {
        int n = a.length;
        d %= n;
        reverse(a, 0, d - 1); reverse(a, d, n - 1); reverse(a, 0, n - 1);
    }

    static void reverse(int[] a, int i, int j) {
        while (i < j) { int t = a[i]; a[i++] = a[j]; a[j--] = t; }
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5, 6, 7};
        rotate(a, 2);
        System.out.println(Arrays.toString(a));    // [3, 4, 5, 6, 7, 1, 2]
        int[] b = {1, 2, 3, 4, 5, 6, 7};
        rotateReversal(b, 2);
        System.out.println(Arrays.toString(b));
    }
}
