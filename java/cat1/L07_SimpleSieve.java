import java.util.*;

public class SimpleSieve {

    static List<Integer> sieve(int n) {
        boolean[] composite = new boolean[n + 1];
        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i <= n; i++) {
            if (composite[i]) continue;
            primes.add(i);
            for (long j = (long) i * i; j <= n; j += i)
                composite[(int) j] = true;
        }
        return primes;
    }

    public static void main(String[] args) {
        System.out.println(sieve(50));
        System.out.println(sieve(100).size());
    }
}
