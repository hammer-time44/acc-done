public class MaxEquilibriumSum {

    // Index i is an equilibrium when sum(a[0..i]) == sum(a[i..n-1]).
    // Return the largest such prefix sum, or null when none exists.
    static Long maxEquilibrium(int[] a) {
        long total = 0;
        for (int x : a) total += x;

        long prefix = 0;
        Long best = null;
        for (int i = 0; i < a.length; i++) {
            prefix += a[i];
            long suffix = total - prefix + a[i];
            if (prefix == suffix && (best == null || prefix > best)) best = prefix;
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(maxEquilibrium(new int[]{-1, 2, 3, 0, 3, 2, -1}));  // 4
        System.out.println(maxEquilibrium(new int[]{1, 2, 3}));                // null
        System.out.println(maxEquilibrium(new int[]{2, 2, 2, 2, 2}));          // 6
    }
}
