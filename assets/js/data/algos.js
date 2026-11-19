/* Syllabus topics with Java reference code. L1-L13 are CAT-1, L14-L26 are CAT-2. Optional extras per entry: `idea` and `keys` (regex checks for the mock exam). */
var ALGOS = [
{ id: "l1", lec: 1, name: "Java Introduction, Features, Structure, Data Types", cat: "CAT-1", pattern: "Theory",
  code: `public class JavaBasics {

    // Every Java program starts at main
    public static void main(String[] args) {
        // Primitive data types
        byte b = 127;
        short s = 32000;
        int i = 2_000_000_000;
        long l = 9_000_000_000L;
        float f = 3.14f;
        double d = 2.718281828;
        char c = 'A';
        boolean ok = true;

        System.out.println("byte    : " + b);
        System.out.println("short   : " + s);
        System.out.println("int     : " + i);
        System.out.println("long    : " + l);
        System.out.println("float   : " + f);
        System.out.println("double  : " + d);
        System.out.println("char    : " + c + " (code " + (int) c + ")");
        System.out.println("boolean : " + ok);

        // Reference type and type casting
        String name = "Java";
        int big = 130;
        byte narrowed = (byte) big;      // overflows to -126
        double widened = i;              // implicit widening
        System.out.println(name + " " + narrowed + " " + widened);

        // Ranges
        System.out.println(Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
    }
}` },
{ id: "l2", lec: 2, name: "Basic I/O, Operators", cat: "CAT-1", pattern: "Theory",
  code: `import java.util.Scanner;

public class IOAndOperators {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two integers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();

        // Arithmetic
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a % b = " + (a % b));

        // Relational and logical
        System.out.println("a > b  : " + (a > b));
        System.out.println("both positive : " + (a > 0 && b > 0));
        System.out.println("any zero      : " + (a == 0 || b == 0));

        // Bitwise
        System.out.println("a & b  = " + (a & b));
        System.out.println("a | b  = " + (a | b));
        System.out.println("a ^ b  = " + (a ^ b));
        System.out.println("a << 1 = " + (a << 1));
        System.out.println("b >> 1 = " + (b >> 1));

        // Increment, ternary, compound assignment
        int x = a;
        x++;
        x += 10;
        String bigger = (a > b) ? "a is bigger" : "b is bigger or equal";
        System.out.println("x = " + x + ", " + bigger);

        System.out.printf("Average: %.2f%n", (a + b) / 2.0);
    }
}` },
{ id: "l3", lec: 3, name: "Decision making and Control structures", cat: "CAT-1", pattern: "Theory",
  code: `public class ControlStructures {

    static String grade(int marks) {
        if (marks >= 90) return "A";
        else if (marks >= 75) return "B";
        else if (marks >= 50) return "C";
        return "F";
    }

    static String dayName(int d) {
        switch (d) {
            case 1: return "Mon";
            case 2: return "Tue";
            case 3: return "Wed";
            default: return "Other";
        }
    }

    public static void main(String[] args) {
        System.out.println(grade(82) + " " + dayName(2));

        // for loop
        int sum = 0;
        for (int i = 1; i <= 10; i++) sum += i;
        System.out.println("Sum 1..10 = " + sum);

        // while loop: digits of a number
        int n = 4096, digits = 0;
        while (n > 0) { digits++; n /= 10; }
        System.out.println("Digits = " + digits);

        // do-while runs at least once
        int k = 0;
        do { k += 3; } while (k < 10);
        System.out.println("k = " + k);

        // break and continue
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) continue;
            if (i > 7) break;
            System.out.print(i + " ");
        }
        System.out.println();
    }
}` },
{ id: "l4", lec: 4, name: "Introduction to Algorithms", cat: "CAT-1", pattern: "Theory",
  code: `public class IntroToAlgorithms {

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
}` },
{ id: "l5", lec: 5, name: "Time & Space complexity-1.1", cat: "CAT-1", pattern: "Theory",
  code: `public class TimeSpace1 {

    static long ops = 0;

    // O(1): constant time
    static int first(int[] a) { ops++; return a[0]; }

    // O(n): one loop
    static long sum(int[] a) {
        long s = 0;
        for (int x : a) { s += x; ops++; }
        return s;
    }

    // O(n^2): nested loops
    static int countPairs(int[] a) {
        int c = 0;
        for (int i = 0; i < a.length; i++)
            for (int j = i + 1; j < a.length; j++) {
                ops++;
                if (a[i] + a[j] == 10) c++;
            }
        return c;
    }

    // O(log n): the loop variable doubles
    static int log2Steps(int n) {
        int steps = 0;
        for (int i = 1; i < n; i *= 2) { steps++; ops++; }
        return steps;
    }

    // Space: O(1) extra vs O(n) extra
    static int[] copyOf(int[] a) {       // O(n) extra space
        int[] b = new int[a.length];
        for (int i = 0; i < a.length; i++) b[i] = a[i];
        return b;
    }

    public static void main(String[] args) {
        int[] a = new int[1000];
        for (int i = 0; i < a.length; i++) a[i] = i % 11;

        ops = 0; first(a);          System.out.println("O(1)     ops = " + ops);
        ops = 0; sum(a);            System.out.println("O(n)     ops = " + ops);
        ops = 0; countPairs(a);     System.out.println("O(n^2)   ops = " + ops);
        ops = 0; log2Steps(1000);   System.out.println("O(log n) ops = " + ops);
    }
}` },
{ id: "l6", lec: 6, name: "Time & Space complexity-1.2", cat: "CAT-1", pattern: "Theory",
  code: `public class TimeSpace2 {

    static long calls = 0;

    // Recursion: T(n) = T(n-1) + O(1)  ->  O(n) time, O(n) stack space
    static int factorial(int n) {
        calls++;
        return n <= 1 ? 1 : n * factorial(n - 1);
    }

    // T(n) = 2T(n-1)  ->  O(2^n)
    static int fibSlow(int n) {
        calls++;
        return n < 2 ? n : fibSlow(n - 1) + fibSlow(n - 2);
    }

    // Memoised: O(n) time, O(n) space
    static long fibFast(int n, long[] memo) {
        calls++;
        if (n < 2) return n;
        if (memo[n] != 0) return memo[n];
        return memo[n] = fibFast(n - 1, memo) + fibFast(n - 2, memo);
    }

    // T(n) = T(n/2) + O(1)  ->  O(log n)
    static int binarySearch(int[] a, int lo, int hi, int t) {
        calls++;
        if (lo > hi) return -1;
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == t) return mid;
        return a[mid] < t ? binarySearch(a, mid + 1, hi, t) : binarySearch(a, lo, mid - 1, t);
    }

    // Loop with i += i/2 style: O(n log n) total work
    static long nLogN(int n) {
        long c = 0;
        for (int i = 0; i < n; i++)
            for (int j = 1; j < n; j *= 2) c++;
        return c;
    }

    public static void main(String[] args) {
        calls = 0; factorial(15);              System.out.println("factorial calls  : " + calls);
        calls = 0; fibSlow(20);                System.out.println("fibSlow calls    : " + calls);
        calls = 0; fibFast(20, new long[21]);  System.out.println("fibFast calls    : " + calls);
        int[] a = new int[1024];
        for (int i = 0; i < a.length; i++) a[i] = i * 2;
        calls = 0; binarySearch(a, 0, a.length - 1, 2046);
        System.out.println("binary search    : " + calls);
        System.out.println("n log n work     : " + nLogN(1024));
    }
}` },
{ id: "l7", lec: 7, name: "Simple Sieve", cat: "CAT-1", pattern: "Theory",
  code: `import java.util.*;

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
}` },
{ id: "l8", lec: 8, name: "Segmented & Incremental Sieve", cat: "CAT-1", pattern: "Theory",
  code: `import java.util.*;

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
}` },
{ id: "l9", lec: 9, name: "Euler's phi Algorithm", cat: "CAT-1", pattern: "Theory",
  code: `public class EulerPhi {

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
}` },
{ id: "l10", lec: 10, name: "Strobogrammatic Number", cat: "CAT-1", pattern: "Theory",
  code: `import java.util.*;

public class Strobogrammatic {

    static boolean isStrobogrammatic(String s) {
        Map<Character, Character> m = Map.of('0', '0', '1', '1', '8', '8', '6', '9', '9', '6');
        int i = 0, j = s.length() - 1;
        while (i <= j) {
            Character t = m.get(s.charAt(i));
            if (t == null || t != s.charAt(j)) return false;
            i++;
            j--;
        }
        return true;
    }

    // All strobogrammatic numbers with n digits
    static List<String> generate(int n) { return build(n, n); }

    static List<String> build(int n, int total) {
        if (n == 0) return new ArrayList<>(List.of(""));
        if (n == 1) return new ArrayList<>(List.of("0", "1", "8"));
        List<String> inner = build(n - 2, total), out = new ArrayList<>();
        for (String s : inner) {
            if (n != total) out.add("0" + s + "0");
            out.add("1" + s + "1");
            out.add("6" + s + "9");
            out.add("8" + s + "8");
            out.add("9" + s + "6");
        }
        return out;
    }

    public static void main(String[] args) {
        System.out.println(isStrobogrammatic("69"));
        System.out.println(isStrobogrammatic("962"));
        System.out.println(generate(2));
        System.out.println(generate(3));
    }
}` },
{ id: "l11", lec: 11, name: "Remainder Theorem", cat: "CAT-1", pattern: "Theory",
  code: `public class RemainderTheorem {

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
}` },
{ id: "l12", lec: 12, name: "Toggle the switch & Alice Apple tree", cat: "CAT-1", pattern: "Theory",
  code: `public class ToggleAndApples {

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
}` },
{ id: "l13", lec: 13, name: "Binary Palindrome", cat: "CAT-1", pattern: "Theory",
  code: `public class BinaryPalindrome {

    // Reverse the bits of n (only its significant bits) and compare
    static boolean isPalindrome(int n) {
        int rev = 0, t = n;
        while (t > 0) {
            rev = (rev << 1) | (t & 1);
            t >>= 1;
        }
        return rev == n;
    }

    // Two pointers on the bit positions, no extra number
    static boolean isPalindromePointers(int n) {
        int hi = 31 - Integer.numberOfLeadingZeros(n), lo = 0;
        while (lo < hi) {
            if (((n >> lo) & 1) != ((n >> hi) & 1)) return false;
            lo++;
            hi--;
        }
        return true;
    }

    public static void main(String[] args) {
        int[] tests = {9, 5, 6, 1, 7, 585, 1000};
        for (int n : tests)
            System.out.println(n + " (" + Integer.toBinaryString(n) + ") -> "
                + isPalindrome(n) + " " + isPalindromePointers(n));
    }
}` },
{ id: "l14", lec: 14, name: "Booth's Algorithm", cat: "CAT-2", pattern: "Theory",
  code: `public class BoothMultiplication {

    // Booth's algorithm: scan the multiplier bits with the previous bit.
    //   pair (bit, prev) = 01 -> add      multiplicand << i
    //   pair (bit, prev) = 10 -> subtract multiplicand << i
    //   00 and 11             -> do nothing
    static long multiply(int m, int r) {
        long product = 0;
        int prev = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (r >> i) & 1;
            if (bit == 0 && prev == 1) product += (long) m << i;
            else if (bit == 1 && prev == 0) product -= (long) m << i;
            prev = bit;
        }
        return product;
    }

    public static void main(String[] args) {
        System.out.println(multiply(3, 4));       // 12
        System.out.println(multiply(7, -3));      // -21
        System.out.println(multiply(-6, -5));     // 30
        System.out.println(multiply(123, 456));   // 56088
    }
}` },
{ id: "l15", lec: 15, name: "Euclid's Algorithm", cat: "CAT-2", pattern: "Theory",
  code: `public class EuclidGCD {

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
}` },
{ id: "l16", lec: 16, name: "Karatsuba Algorithm", cat: "CAT-2", pattern: "Theory",
  code: `public class Karatsuba {

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
}` },
{ id: "l17", lec: 17, name: "Longest Sequence of 1 after flipping a bit", cat: "CAT-2", pattern: "Theory",
  code: `public class LongestOnesAfterFlip {

    // Treat n as 32 bits. Flip one 0 to 1 and return the longest run of 1s.
    static int longestOnes(int n) {
        if (n == -1) return 32;
        int cur = 0, prev = 0, best = 1;
        while (n != 0) {
            if ((n & 1) == 1) cur++;
            else {
                prev = ((n & 2) == 0) ? 0 : cur;   // next bit 0: nothing to join
                cur = 0;
            }
            best = Math.max(best, prev + cur + 1);
            n >>>= 1;
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(longestOnes(1775));   // 11011101111 -> 8
        System.out.println(longestOnes(15));     // 5
        System.out.println(longestOnes(0));      // 1
        System.out.println(longestOnes(5));      // 101 -> 3
    }
}` },
{ id: "l18", lec: 18, name: "Swap two nibbles in a byte", cat: "CAT-2", pattern: "Theory",
  code: `public class SwapNibbles {

    // A byte is 8 bits: high nibble and low nibble (4 bits each)
    static int swap(int b) {
        return ((b & 0x0F) << 4) | ((b & 0xF0) >> 4);
    }

    public static void main(String[] args) {
        int b = 100;                          // 0110 0100
        int s = swap(b);                      // 0100 0110 = 70
        System.out.println(b + " -> " + s);
        System.out.println(Integer.toBinaryString(b) + " -> " + Integer.toBinaryString(s));
        System.out.println(swap(0xAB) == 0xBA);
    }
}` },
{ id: "l19", lec: 19, name: "Block Swap Algorithm", cat: "CAT-2", pattern: "Theory",
  code: `import java.util.Arrays;

public class BlockSwap {

    static void swap(int[] a, int i, int j, int len) {
        for (int k = 0; k < len; k++) {
            int t = a[i + k]; a[i + k] = a[j + k]; a[j + k] = t;
        }
    }

    // Rotate left by d using the block swap algorithm: O(n) time, O(1) space
    static void rotate(int[] a, int d) {
        int n = a.length;
        if (n == 0) return;
        d %= n;
        if (d == 0) return;
        int i = d, j = n - d;
        while (i != j) {
            if (i < j) {                       // A is shorter than B
                swap(a, d - i, d + j - i, i);
                j -= i;
            } else {                           // B is shorter than A
                swap(a, d - i, d, j);
                i -= j;
            }
        }
        swap(a, d - i, d, i);
    }

    // Reversal method for comparison
    static void rotateReversal(int[] a, int d) {
        int n = a.length;
        d %= n;
        reverse(a, 0, d - 1); reverse(a, d, n - 1); reverse(a, 0, n - 1);
    }

    static void reverse(int[] a, int i, int j) {
        while (i < j) { int t = a[i]; a[i++] = a[j]; a[j--] = t; }
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5, 6, 7};
        rotate(a, 2);
        System.out.println(Arrays.toString(a));    // [3, 4, 5, 6, 7, 1, 2]
        int[] b = {1, 2, 3, 4, 5, 6, 7};
        rotateReversal(b, 2);
        System.out.println(Arrays.toString(b));
    }
}` },
{ id: "l20", lec: 20, name: "Max product subarray", cat: "CAT-2", pattern: "Coding",
  code: `public class MaxProductSubarray {

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
}` },
{ id: "l21", lec: 21, name: "Maximum sum of hour glass in matrix", cat: "CAT-2", pattern: "Coding",
  code: `public class HourglassSum {

    // Hourglass:  a b c
    //               d
    //             e f g
    static int maxHourglass(int[][] g) {
        int best = Integer.MIN_VALUE;
        for (int r = 0; r + 2 < g.length; r++) {
            for (int c = 0; c + 2 < g[0].length; c++) {
                int sum = g[r][c] + g[r][c + 1] + g[r][c + 2]
                        + g[r + 1][c + 1]
                        + g[r + 2][c] + g[r + 2][c + 1] + g[r + 2][c + 2];
                best = Math.max(best, sum);
            }
        }
        return best;
    }

    public static void main(String[] args) {
        int[][] g = {
            {1, 1, 1, 0, 0, 0},
            {0, 1, 0, 0, 0, 0},
            {1, 1, 1, 0, 0, 0},
            {0, 0, 2, 4, 4, 0},
            {0, 0, 0, 2, 0, 0},
            {0, 0, 1, 2, 4, 0}
        };
        System.out.println(maxHourglass(g));   // 19
    }
}` },
{ id: "l22", lec: 22, name: "Max Equilibrium Sum", cat: "CAT-2", pattern: "Coding",
  code: `public class MaxEquilibriumSum {

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
}` },
{ id: "l23", lec: 23, name: "Leaders in array", cat: "CAT-2", pattern: "Coding",
  code: `import java.util.*;

public class LeadersInArray {

    // A leader is >= every element to its right.
    static List<Integer> leaders(int[] a) {
        LinkedList<Integer> out = new LinkedList<>();
        int max = Integer.MIN_VALUE;
        for (int i = a.length - 1; i >= 0; i--) {
            if (a[i] >= max) {
                out.addFirst(a[i]);
                max = a[i];
            }
        }
        return out;
    }

    public static void main(String[] args) {
        System.out.println(leaders(new int[]{16, 17, 4, 3, 5, 2}));   // [17, 5, 2]
        System.out.println(leaders(new int[]{1, 2, 3, 4, 0}));        // [4, 0]
        System.out.println(leaders(new int[]{7, 7, 7}));              // [7, 7, 7]
    }
}` },
{ id: "l24", lec: 24, name: "Majority element", cat: "CAT-2", pattern: "Coding",
  code: `public class MajorityElement {

    // Boyer-Moore voting: O(n) time, O(1) space
    static int majority(int[] a) {
        int candidate = 0, count = 0;
        for (int x : a) {
            if (count == 0) candidate = x;
            count += (x == candidate) ? 1 : -1;
        }
        // verify: the candidate may not be a real majority
        int occurrences = 0;
        for (int x : a) if (x == candidate) occurrences++;
        return occurrences * 2 > a.length ? candidate : -1;
    }

    public static void main(String[] args) {
        System.out.println(majority(new int[]{3, 3, 4, 2, 4, 4, 2, 4, 4}));  // 4
        System.out.println(majority(new int[]{3, 3, 4, 2, 4, 4, 2, 4}));     // -1
        System.out.println(majority(new int[]{1}));                          // 1
    }
}` },
{ id: "l25", lec: 25, name: "Lexicographically first palindromic string", cat: "CAT-2", pattern: "Coding",
  code: `public class FirstPalindrome {

    // Rearrange s into the lexicographically smallest palindrome, or "-1".
    static String firstPalindrome(String s) {
        int[] cnt = new int[26];
        for (char ch : s.toCharArray()) cnt[ch - 'a']++;

        int odd = -1;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] % 2 == 1) {
                if (odd != -1) return "-1";       // two odd letters: impossible
                odd = i;
            }
        }

        StringBuilder half = new StringBuilder();
        for (int i = 0; i < 26; i++)
            for (int k = 0; k < cnt[i] / 2; k++) half.append((char) ('a' + i));

        StringBuilder res = new StringBuilder(half);
        if (odd != -1) res.append((char) ('a' + odd));
        res.append(half.reverse());
        return res.toString();
    }

    public static void main(String[] args) {
        System.out.println(firstPalindrome("aabb"));    // abba
        System.out.println(firstPalindrome("bbaaa"));   // ababa
        System.out.println(firstPalindrome("abc"));     // -1
        System.out.println(firstPalindrome("racecar")); // acrerca
    }
}` },
{ id: "l26", lec: 26, name: "Natural Sort order", cat: "CAT-2", pattern: "Coding",
  code: `import java.util.*;
import java.util.regex.*;

public class NaturalSort {

    // Split into digit and non-digit chunks, compare chunk by chunk
    static int compare(String x, String y) {
        List<String> a = chunks(x), b = chunks(y);
        for (int i = 0; i < Math.min(a.size(), b.size()); i++) {
            String p = a.get(i), q = b.get(i);
            if (p.equals(q)) continue;
            if (Character.isDigit(p.charAt(0)) && Character.isDigit(q.charAt(0)))
                return Long.compare(Long.parseLong(p), Long.parseLong(q));
            return p.compareTo(q);
        }
        return Integer.compare(a.size(), b.size());
    }

    static List<String> chunks(String s) {
        List<String> out = new ArrayList<>();
        Matcher m = Pattern.compile("\\\\d+|\\\\D+").matcher(s);
        while (m.find()) out.add(m.group());
        return out;
    }

    public static void main(String[] args) {
        String[] files = {"file10", "file2", "file1", "img12", "img3"};
        Arrays.sort(files, NaturalSort::compare);
        System.out.println(Arrays.toString(files));
        // [file1, file2, file10, img3, img12]
    }
}` }
];
