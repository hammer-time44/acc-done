public class EulerPhi {

    // phi(n) = n * product of (1 - 1/p) over distinct primes p | n
    static long phi(long n) {
        long result = n;
        for (long p = 2; p * p <= n; p++) {
            if (n % p == 0) {
                while (n % p == 0) n /= p;
                result -= result / p;
            }
        }
        if (n > 1) result -= result / n;
        return result;
    }

    // phi for every number up to n with a sieve
    static int[] phiTable(int n) {
        int[] phi = new int[n + 1];
        for (int i = 0; i <= n; i++) phi[i] = i;
        for (int i = 2; i <= n; i++)
            if (phi[i] == i)
                for (int j = i; j <= n; j += i) phi[j] -= phi[j] / i;
        return phi;
    }

    public static void main(String[] args) {
        System.out.println(phi(10));
        System.out.println(phi(36));
        System.out.println(phi(97));
        System.out.println(java.util.Arrays.toString(phiTable(12)));
    }
}
