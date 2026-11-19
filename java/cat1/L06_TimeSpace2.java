public class TimeSpace2 {

    static long calls = 0;

    // Recursion: T(n) = T(n-1) + O(1)  ->  O(n) time, O(n) stack space
    static int factorial(int n) {
        calls++;
        return n <= 1 ? 1 : n * factorial(n - 1);
    }

    // T(n) = 2T(n-1)  ->  O(2^n)
    static int fibSlow(int n) {
        calls++;
        return n < 2 ? n : fibSlow(n - 1) + fibSlow(n - 2);
    }

    // Memoised: O(n) time, O(n) space
    static long fibFast(int n, long[] memo) {
        calls++;
        if (n < 2) return n;
        if (memo[n] != 0) return memo[n];
        return memo[n] = fibFast(n - 1, memo) + fibFast(n - 2, memo);
    }

    // T(n) = T(n/2) + O(1)  ->  O(log n)
    static int binarySearch(int[] a, int lo, int hi, int t) {
        calls++;
        if (lo > hi) return -1;
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == t) return mid;
        return a[mid] < t ? binarySearch(a, mid + 1, hi, t) : binarySearch(a, lo, mid - 1, t);
    }

    // Loop with i += i/2 style: O(n log n) total work
    static long nLogN(int n) {
        long c = 0;
        for (int i = 0; i < n; i++)
            for (int j = 1; j < n; j *= 2) c++;
        return c;
    }

    public static void main(String[] args) {
        calls = 0; factorial(15);              System.out.println("factorial calls  : " + calls);
        calls = 0; fibSlow(20);                System.out.println("fibSlow calls    : " + calls);
        calls = 0; fibFast(20, new long[21]);  System.out.println("fibFast calls    : " + calls);
        int[] a = new int[1024];
        for (int i = 0; i < a.length; i++) a[i] = i * 2;
        calls = 0; binarySearch(a, 0, a.length - 1, 2046);
        System.out.println("binary search    : " + calls);
        System.out.println("n log n work     : " + nLogN(1024));
    }
}
