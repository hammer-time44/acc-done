import java.util.*;

public class SegmentedSieve {

    static List<Integer> simpleSieve(int n) {
        boolean[] c = new boolean[n + 1];
        List<Integer> p = new ArrayList<>();
        for (int i = 2; i <= n; i++) {
            if (c[i]) continue;
            p.add(i);
            for (long j = (long) i * i; j <= n; j += i) c[(int) j] = true;
        }
        return p;
    }

    // Primes in [lo, hi]
    static List<Long> segmented(long lo, long hi) {
        int r = (int) Math.sqrt(hi);
        List<Integer> small = simpleSieve(r);
        boolean[] isPrime = new boolean[(int) (hi - lo + 1)];
        Arrays.fill(isPrime, true);

        for (int p : small) {
            long start = Math.max((long) p * p, ((lo + p - 1) / p) * p);
            for (long j = start; j <= hi; j += p) isPrime[(int) (j - lo)] = false;
        }
        List<Long> out = new ArrayList<>();
        for (int i = 0; i < isPrime.length; i++)
            if (isPrime[i] && lo + i >= 2) out.add(lo + i);
        return out;
    }

    // Incremental sieve: keep a map of the next multiple of each prime
    static List<Integer> incremental(int count) {
        Map<Integer, List<Integer>> next = new HashMap<>();
        List<Integer> primes = new ArrayList<>();
        for (int n = 2; primes.size() < count; n++) {
            List<Integer> factors = next.remove(n);
            if (factors == null) {
                primes.add(n);
                next.computeIfAbsent(n * n, k -> new ArrayList<>()).add(n);
            } else {
                for (int p : factors)
                    next.computeIfAbsent(n + p, k -> new ArrayList<>()).add(p);
            }
        }
        return primes;
    }

    public static void main(String[] args) {
        System.out.println(segmented(100, 150));
        System.out.println(incremental(10));
    }
}
