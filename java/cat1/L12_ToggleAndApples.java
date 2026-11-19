public class ToggleAndApples {

    // Toggle the switch: n bulbs, round i toggles every i-th bulb.
    // Bulb k ends ON only if k has an odd number of divisors,
    // which happens only for perfect squares.
    static long bulbsOn(long n) {
        return (long) Math.sqrt(n);
    }

    // Alice's apple tree: smallest square plot (centred at the origin)
    // holding at least needed apples. Plot of half-side k holds
    // 2k(k+1)(2k+1) apples, perimeter is 8k.
    static long minPerimeter(long needed) {
        long lo = 1, hi = 100_000;
        while (lo < hi) {
            long mid = (lo + hi) / 2;
            if (2 * mid * (mid + 1) * (2 * mid + 1) >= needed) hi = mid;
            else lo = mid + 1;
        }
        return 8 * lo;
    }

    public static void main(String[] args) {
        System.out.println(bulbsOn(10));              // 3
        System.out.println(bulbsOn(100));             // 10
        System.out.println(minPerimeter(1));          // 8
        System.out.println(minPerimeter(13));         // 16
        System.out.println(minPerimeter(1_000_000_000L)); // 5040
    }
}
