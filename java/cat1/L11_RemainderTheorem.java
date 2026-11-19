public class RemainderTheorem {

    // Fast modular exponentiation: base^exp % mod
    static long powMod(long base, long exp, long mod) {
        long result = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) result = result * base % mod;
            base = base * base % mod;
            exp >>= 1;
        }
        return result;
    }

    // Modular inverse through Fermat (mod must be prime)
    static long inverse(long a, long prime) { return powMod(a, prime - 2, prime); }

    // Chinese Remainder Theorem for pairwise coprime moduli
    // smallest x >= 0 with x % m[i] == r[i]
    static long crt(long[] r, long[] m) {
        long x = r[0], step = m[0];
        for (int i = 1; i < m.length; i++) {
            while (x % m[i] != r[i]) x += step;
            step *= m[i];
        }
        return x;
    }

    public static void main(String[] args) {
        System.out.println(powMod(2, 10, 1000));          // 24
        System.out.println(powMod(3, 200, 13));
        System.out.println(inverse(3, 11));               // 4
        System.out.println(crt(new long[]{2, 3, 2}, new long[]{3, 5, 7}));  // 23
    }
}
