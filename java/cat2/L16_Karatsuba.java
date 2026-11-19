public class Karatsuba {

    // x * y with three recursive multiplications instead of four
    static long karatsuba(long x, long y) {
        if (x < 10 || y < 10) return x * y;

        int m = Math.max(Long.toString(x).length(), Long.toString(y).length()) / 2;
        long p = (long) Math.pow(10, m);

        long a = x / p, b = x % p;     // x = a*p + b
        long c = y / p, d = y % p;     // y = c*p + d

        long ac = karatsuba(a, c);
        long bd = karatsuba(b, d);
        long mid = karatsuba(a + b, c + d) - ac - bd;   // ad + bc

        return ac * p * p + mid * p + bd;
    }

    public static void main(String[] args) {
        System.out.println(karatsuba(12, 34));          // 408
        System.out.println(karatsuba(1234, 5678));      // 7006652
        System.out.println(karatsuba(9999999, 9999999));
        System.out.println(9999999L * 9999999L);
    }
}
