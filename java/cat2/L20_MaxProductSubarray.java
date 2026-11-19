public class MaxProductSubarray {

    // A negative can turn the smallest product into the largest,
    // so track both the max and the min product ending at i.
    static int maxProduct(int[] a) {
        int max = a[0], min = a[0], best = a[0];
        for (int i = 1; i < a.length; i++) {
            int x = a[i];
            int c2 = max * x, c3 = min * x;
            max = Math.max(x, Math.max(c2, c3));
            min = Math.min(x, Math.min(c2, c3));
            best = Math.max(best, max);
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(maxProduct(new int[]{2, 3, -2, 4}));        // 6
        System.out.println(maxProduct(new int[]{-2, 0, -1}));          // 0
        System.out.println(maxProduct(new int[]{-2, 3, -4}));          // 24
        System.out.println(maxProduct(new int[]{2, -5, -2, -4, 3}));   // 24
    }
}
