public class EuclidGCD {

    static long gcd(long a, long b) {
        while (b != 0) {
            long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }

    static long gcdRecursive(long a, long b) {
        return b == 0 ? a : gcdRecursive(b, a % b);
    }

    static long lcm(long a, long b) { return a / gcd(a, b) * b; }

    // Extended Euclid: returns {g, x, y} with a*x + b*y = g
    static long[] extended(long a, long b) {
        if (b == 0) return new long[]{a, 1, 0};
        long[] r = extended(b, a % b);
        return new long[]{r[0], r[2], r[1] - (a / b) * r[2]};
    }

    public static void main(String[] args) {
        System.out.println(gcd(12, 18));              // 6
        System.out.println(gcdRecursive(270, 192));   // 6
        System.out.println(lcm(4, 6));                // 12
        long[] e = extended(30, 18);
        System.out.println(e[0] + " = 30*" + e[1] + " + 18*" + e[2]);
    }
}
