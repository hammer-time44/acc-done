public class IntroToAlgorithms {

    // An algorithm: finite, unambiguous steps that turn input into output.
    // Example 1: find the maximum (one pass)
    static int max(int[] a) {
        int best = a[0];
        for (int i = 1; i < a.length; i++)
            if (a[i] > best) best = a[i];
        return best;
    }

    // Example 2: linear search
    static int linearSearch(int[] a, int target) {
        for (int i = 0; i < a.length; i++)
            if (a[i] == target) return i;
        return -1;
    }

    // Example 3: reverse an array in place
    static void reverse(int[] a) {
        for (int i = 0, j = a.length - 1; i < j; i++, j--) {
            int t = a[i]; a[i] = a[j]; a[j] = t;
        }
    }

    public static void main(String[] args) {
        int[] a = {4, 9, 1, 7, 3};
        System.out.println("max = " + max(a));
        System.out.println("index of 7 = " + linearSearch(a, 7));
        reverse(a);
        System.out.println(java.util.Arrays.toString(a));
    }
}
