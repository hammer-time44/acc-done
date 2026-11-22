/* Syllabus topics with Java reference code. L1-L13 are CAT-1, L14-L26 are CAT-2, L27+ are FAT. L7-L38 use the code from acc-codes.pdf. Optional extras per entry: `idea` and `keys` (regex checks for the mock exam). */
var ALGOS = [
{ id: "l1", lec: 1, name: "Java Introduction, Features, Structure, Data Types", cat: "CAT-1", pattern: "Theory",
  about: "Java is a compiled, object-oriented, platform-independent language: source becomes bytecode that runs on the JVM. Every program lives in a class and starts at main. Know the 8 primitives (byte, short, int, long, float, double, char, boolean).",
  logic: "Write once, run anywhere: javac makes bytecode, the JVM runs it. Remember sizes 1, 2, 4, 8 bytes for byte, short, int, long, and that int overflows past about 2.1 billion.",
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
  about: "Input comes from Scanner(System.in) and output from System.out.print/println. Operators cover arithmetic, relational, logical, bitwise and ternary.",
  logic: "Read with Scanner (nextInt, next, nextLine), then compute. Integer division truncates, % gives the remainder, and >> shifts right while & | ^ work on bits.",
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
  about: "Decisions use if / else if / else and switch. Repetition uses for, while and do-while, with break and continue to exit or skip.",
  logic: "Pick the loop by what you know: for when the count is known, while when only the stop condition is known, do-while when the body must run at least once.",
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
  about: "An algorithm is a finite, unambiguous list of steps that turns input into output. A good one is correct, terminates, and is efficient.",
  logic: "Define input, output and the steps, then check it on a small case by hand before coding.",
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
  about: "Time and space complexity measure how running time and memory grow with input size n, written in Big-O (O(1), O(log n), O(n), O(n log n), O(n\u00b2)).",
  logic: "Count the work in the deepest loop and drop constants and lower terms. One loop is O(n), nested loops are O(n\u00b2), halving each step is O(log n).",
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
  about: "Continues complexity analysis with loops that change by multiplication or division, recursion, and best, average and worst cases.",
  logic: "A loop where i doubles or halves runs log n times. For recursion, write the recurrence (for example T(n) = 2T(n/2) + n gives n log n).",
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
  about: "Sieve of Eratosthenes lists all primes up to n in O(n log log n) time using an O(n) boolean array.",
  logic: "Assume all numbers are prime. For each prime i with i*i <= n, mark i*i, i*i+i, ... as composite. What stays unmarked is prime.",
  code: `import java.util.Scanner;

public class SieveMain {
    public static void simpleSieve(int limit) {
        boolean[] prime = new boolean[limit + 1];
        for (int i = 2; i <= limit; i++) {
            prime[i] = true;
        }

        // Mark all the multiples of the prime numbers
        for (int p = 2; p * p <= limit; p++) {
            // If prime[p] is not changed, then it is a prime
            if (prime[p]) {
                // Update all multiples of p
                for (int i = p * p; i <= limit; i += p) {
                    prime[i] = false;
                }
            }
        }

        // Print all prime numbers
        System.out.println("Prime numbers up to " + limit + ":");
        for (int p = 2; p <= limit; p++) {
            if (prime[p]) {
                System.out.print(p + " ");
            }
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the limit to find prime numbers: ");
        int limit = scanner.nextInt();

        // Validate input
        if (limit >= 2) {
            simpleSieve(limit);
        } else {
            System.out.println("Please enter a number greater than or equal to 2.");
        }

        scanner.close();
    }
}` },
{ id: "l8", lec: 8, name: "Segmented & Incremental Sieve", cat: "CAT-1", pattern: "Theory",
  about: "Finds primes in a range [l, h] without a sieve over all of 1..h. Only primes up to \u221ah are needed to cross out composites in the range.",
  logic: "Every composite in [l, h] has a factor of at most \u221ah. For each i up to \u221ah, start at the first multiple of i that is at least l and mark every i-th number after it.",
  code: `import java.util.Scanner;

public class Segmented {
    static void SegSieve(int l, int h) {
        // Step 1: Create a boolean array to mark numbers as prime or not
        boolean[] prime = new boolean[h + 1];

        // Step 2: Segmented Sieve algorithm
        for (int p = 2; p * p <= h; p++) {
            // Find the smallest multiple of p in the range [l, h]
            int sm = (l / p) * p;
            if (sm < l) {
                sm += p; // Make sure sm is in the range [l, h]
            }

            // Mark all multiples of p as non-prime
            for (int i = sm; i <= h; i += p) {
                prime[i] = true;
            }
        }

        // Step 3: Print all prime numbers in the range [l, h]
        for (int i = l; i <= h; i++) {
            if (!prime[i] && i > 1) { // Prime numbers are those that are not marked as true, and not
                System.out.print(i + " ");
            }
        }
        System.out.println(); // Move to a new line after printing primes
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Get user input for the lower and upper bounds of the range
        System.out.print("Enter the lower bound (l): ");
        int l = scanner.nextInt();
        System.out.print("Enter the upper bound (h): ");
        int h = scanner.nextInt();

        // Call the SegSieve function to print primes in the range [l, h]
        SegSieve(l, h);

        scanner.close(); // Close the scanner
    }
}` },
{ id: "l9", lec: 9, name: "Euler's phi Algorithm", cat: "CAT-1", pattern: "Theory",
  about: "Euler's phi \u03c6(n) counts the numbers from 1 to n that are coprime to n. It runs in O(\u221an) using the prime factors of n.",
  logic: "Start with result = n. For each prime factor p of n, do result -= result / p (multiply by (1 - 1/p)). Divide p out fully, and handle a leftover prime factor above \u221an at the end.",
  code: `import java.util.*;
public class EulerPhiAlgorithm {

    // Returns the value of Euler's totient function phi(n)
    public static int phi(int n) {
        int result = n; // Initialize result as n

        // Check for all prime factors of n and subtract their multiples from result
        for (int p = 2; p * p <= n; p++) {
            if (n % p == 0) { // p is a prime factor of n
                while (n % p == 0) { // Remove all multiples of p from n
                    n /= p;
                }
                result -= result / p;
            }
        }
        // If n has a prime factor greater than sqrt(n), then add its contribution
        if (n > 1) {
            result -= result / n;
        }
        return result;
    }
    // Main method to test the program
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the value of n: ");
        int n = sc.nextInt();
        int phi_n = phi(n);
        System.out.println("phi(" + n + ") = " + phi_n);
        sc.close();
    }
}` },
{ id: "l10", lec: 10, name: "Strobogrammatic Number", cat: "CAT-1", pattern: "Theory",
  about: "A strobogrammatic number looks the same after rotating 180\u00b0. Valid digit pairs are 0-0, 1-1, 8-8, 6-9 and 9-6. Runs in O(n).",
  logic: "Two pointers from both ends: the left digit must be valid and its rotated partner must equal the right digit. The middle digit must map to itself.",
  code: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
public class Strobo {
    static boolean isStrobogrammatic(String num) {
        Map<Character, Character> map = new HashMap<Character, Character>();
        map.put('6', '9');
        map.put('9', '6');
        map.put('0', '0');
        map.put('1', '1');
        map.put('8', '8');
        int l = 0, r = num.length() - 1;
        while (l <= r) {
            if (!map.containsKey(num.charAt(l))) return false;
            if (map.get(num.charAt(l)) != num.charAt(r))
                return false;
            l++;
            r--;
        }
        return true;}
    public static void main(String args[])
    {
        Scanner sc =new Scanner(System.in);
        System.out.print("Give num :");
        String n= sc.next();
        System.out.println(isStrobogrammatic(n));

    }
}` },
{ id: "l11", lec: 11, name: "Remainder Theorem", cat: "CAT-1", pattern: "Theory",
  about: "Chinese Remainder Theorem finds x that satisfies x mod num[i] = rem[i] for every i. A solution is unique modulo the product of the moduli when they are pairwise coprime.",
  logic: "Brute force: try x = 1, 2, 3, ... and return the first x where every x % num[j] equals rem[j].",
  code: `import java.util.*;

class ChineseRemainderTheorem
{
    public static void main (String[] args)
    {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter Divisor");
        int size = sc.nextInt();
        int [] div = new int[size];
        for(int i=0; i<size; i++)
        {
            div[i] = sc.nextInt();
        }

        System.out.println("Enter Remainder");
        int rem[]=new int[size];
        for(int i=0; i<size; i++)
        {
            rem[i] = sc.nextInt();
        }

        ChineseRemainder c = new ChineseRemainder();
        System.out.println( c.calculate(size, div, rem));
    } }

class ChineseRemainder {
    int calculate(int size , int div[], int rem[])
    {
        int j , x = 1;
        while(true)
        {
            for( j=0;j<size;j++)
            {
                if( x % div[j] != rem[j] )
                    break;
            }
            if(j == size)
                return x;
            x++;} }}` },
{ id: "l12", lec: 12, name: "Toggle the switch & Alice Apple tree", cat: "CAT-1", pattern: "Theory",
  about: "Toggle the switch: n bulbs start off and person i flips every i-th bulb, so bulb k ends up toggled once per divisor. Alice's apple tree: the apples inside a square of side r grow like 2r(r+1)(2r+1), and the answer is the perimeter 8r.",
  logic: "Bulb k is on only if it has an odd number of divisors, which happens only for perfect squares. For the apple tree, find the smallest r whose total apples is at least the need, then print 8r (binary search on r or a simple loop).",
  code: `import java.util.*;

public class Toggle {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); // Read the number of switches
        boolean[] b = new boolean[n + 1]; // Array to represent the state of each switch

        // Iterate through each switch number
        for (int i = 1; i <= n; i++) {
            // Toggle all switches that are multiples of i
            for (int j = i; j <= n; j += i) {
                b[j] = !b[j]; // Toggle the state of switch j
            }
        }
        int openCount = 0; // To count the number of switches that are open
        int closedCount = 0; // To count the number of switches that are closed

        // Count the number of open and closed switches
        for (int i = 1; i <= n; i++) {
            if (b[i]) {
                openCount++;
            } else {
                closedCount++;
            }
        }

        // Output the results
        System.out.println("Number of switches open: " + openCount);
        System.out.println("Number of switches closed: " + closedCount);
    }
}

class AliceAppleTree {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int apple=sc.nextInt();
        int cnt=0,sum=0;
        while(sum<apple){
            cnt++;
            sum+=(12*cnt*cnt);

        }
        System.out.println((8*(cnt)));
    }
}` },
{ id: "l13", lec: 13, name: "Binary Palindrome", cat: "CAT-1", pattern: "Theory",
  about: "A binary palindrome is a number whose binary representation reads the same forwards and backwards (9 = 1001). Runs in O(log n).",
  logic: "Convert to a binary string and compare with two pointers, or build the bit-reversed number with (rev << 1) | (n & 1) and check that it equals n.",
  code: `import java.util.*;
public class BinaryPalindromeChecker {
    public static boolean isBinaryPalindrome(int x) {
        int reversed = 0;
        int original = x;
        while (x > 0) {
            reversed <<= 1;        // Left shift by 1 bit
            reversed |= (x & 1);   // Add the least significant bit of 'x' to'reversed'
            x >>= 1;            // Right shift by 1 bit
        }
        return reversed == original;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        if (isBinaryPalindrome(x)) {
            System.out.println(x + " has a binary palindrome representation.");
        } else {
            System.out.println(x + " does not have a binary palindrome representation.");
        }
    }
}` },
{ id: "l14", lec: 14, name: "Booth's Algorithm", cat: "CAT-2", pattern: "Theory",
  about: "Booth's algorithm multiplies signed binary numbers using add and shift steps. The simple shift-and-add form walks through the multiplier bits.",
  logic: "For each bit of the multiplier: if the bit is 1, add the shifted multiplicand to the product. Then shift the multiplicand left and the multiplier right.",
  code: `import java.util.Scanner;
public class Booth {
    public int multiply(int n1, int n2) {
        int m = n1;
        int r = n2;
        int A = n1;
        int S = -n1;
        int P = 0;
        int count = Integer.SIZE;
        while (count > 0) {
            if ((r & 1) == 1) {
                P += A;
                S += m;
            }
            A <<= 1;
            S <<= 1;
            count--;
            r >>= 1;
        }
        return P;
    }
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        Booth b = new Booth();
        System.out.println("Enter two integer numbers -");
        int n1 = scan.nextInt();
        int n2 = scan.nextInt();
        int result = b.multiply(n1, n2);
        System.out.println("\\n\\nResult : " + n1 + " * " + n2 + " = " + result);
    }
}` },
{ id: "l15", lec: 15, name: "Euclid's Algorithm", cat: "CAT-2", pattern: "Theory",
  about: "Euclid's algorithm finds gcd(a, b) in O(log min(a, b)) time.",
  logic: "gcd(a, b) = gcd(b % a, a), and gcd(0, b) = b. Replacing the larger number by the remainder never changes the gcd.",
  code: `import java.util.Scanner;

public class Main {

    public static int findgcd(int a, int b) {
        if (a == 0) {
            return b;
        }
        return findgcd(b % a, a); // Recursively call with the new pair
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Get user input for two numbers
        System.out.print("Enter first number: ");
        int a = sc.nextInt();

        System.out.print("Enter second number: ");
        int b = sc.nextInt();

        // Find GCD using the findgcd method
        int g = findgcd(a, b);

        // Print the result
        System.out.println("GCD(" + a + "," + b + ") = " + g);

        sc.close(); // Close the scanner resource
    }
}` },
{ id: "l16", lec: 16, name: "Karatsuba Algorithm", cat: "CAT-2", pattern: "Theory",
  about: "Karatsuba multiplies two n-digit numbers in about O(n^1.585) instead of O(n\u00b2) by using 3 recursive multiplications instead of 4.",
  logic: "Split x = a\u00b710^m + b and y = c\u00b710^m + d. Compute z0 = a\u00b7c, z2 = b\u00b7d and z1 = (a+b)(c+d). The middle term is z1 - z0 - z2, so result = z0\u00b710^2m + (z1 - z0 - z2)\u00b710^m + z2.",
  code: `import java.util.Scanner;

public class KaratsubaMultiplication {
    public static long karatsubaMultiply(long x, long y) {
        if (x < 10 || y < 10) {
            return x * y;
        }
        int n = Math.max(Long.toString(x).length(), Long.toString(y).length());
        int half = (n + 1) / 2;

        long a = x / (long) Math.pow(10, half);
        long b = x % (long) Math.pow(10, half);
        long c = y / (long) Math.pow(10, half);
        long d = y % (long) Math.pow(10, half);

        long ac = karatsubaMultiply(a, c);
        long bd = karatsubaMultiply(b, d);
        long adbc = karatsubaMultiply(a + b, c + d) - ac - bd;

        return (long) (ac * Math.pow(10, 2 * half) + adbc * Math.pow(10, half) + bd);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the first number: ");
        long x = scanner.nextLong();

        System.out.print("Enter the second number: ");
        long y = scanner.nextLong();

        long product = karatsubaMultiply(x, y);
        System.out.println("Product: " + product);

        scanner.close();
    }
}` },
{ id: "l17", lec: 17, name: "Longest Sequence of 1 after flipping a bit", cat: "CAT-2", pattern: "Theory",
  about: "Finds the longest run of 1s after flipping at most k zeros (here the sliding window version, O(n)).",
  logic: "Sliding window: grow the right end, count zeros in the window, and while zeros exceed k move the left end forward. Track the maximum window length.",
  code: `import java.util.Scanner; // Import Scanner class for user input

public class Longafterflip {
    // Method to find the longest sequence of consecutive 1s after flipping one bit
    public static int longestConsecutiveOnes(int n) {
        // Convert the integer to its binary string representation
        String binary = Integer.toBinaryString(n);

        // Variables to track the maximum sequence length and intermediate lengths
        int maxLength = 0;
        int currentLength = 0;
        int previousLength = 0;

        // Iterate through each bit in the binary string
        for (char bit : binary.toCharArray()) {
            if (bit == '1') {
                // Increase the count of consecutive 1s
                currentLength++;
            } else {
                // Update maxLength by considering a possible flip
                maxLength = Math.max(maxLength, currentLength + previousLength + 1);

                // Store the current sequence length and reset it
                previousLength = currentLength;
                currentLength = 0;
            }
        }
        // Final update to maxLength after the loop ends
        maxLength = Math.max(maxLength, currentLength + previousLength + 1);
        return maxLength;
    }

    public static void main(String[] args) {
        // Create a Scanner object to take user input
        Scanner scanner = new Scanner(System.in);

        // Prompt user for an integer input
        System.out.print("Enter an integer: ");
        int n = scanner.nextInt();

        // Compute and display the longest consecutive ones after flipping one bit
        System.out.println("Longest consecutive ones after one flip: " +
            longestConsecutiveOnes(n));
        // Close the scanner to prevent resource leak
        scanner.close();
    }
}` },
{ id: "l18", lec: 18, name: "Swap two nibbles in a byte", cat: "CAT-2", pattern: "Theory",
  about: "Swapping the two nibbles (4-bit halves) of a byte. For example 100 (0110 0100) becomes 70 (0100 0110). Runs in O(1).",
  logic: "Move the low nibble up and the high nibble down: ((x & 0x0F) << 4) | ((x & 0xF0) >> 4).",
  code: `public class NibbleSwap {
    // Method to swap the nibbles of a given byte
    public static byte swapNibbles(byte b) {
        // Extract the upper nibble (higher 4 bits) by masking with 0xF0 and shifting right by 4
        byte upperNibble = (byte) ((b & 0xF0) >>> 4);

        // Extract the lower nibble (lower 4 bits) by masking with 0x0F
        byte lowerNibble = (byte) (b & 0x0F);

        // Swap the nibbles by shifting the lower nibble to the upper position and vice versa
        byte swappedByte = (byte) ((lowerNibble << 4) | upperNibble);

        // Return the swapped byte
        return swappedByte;
    }

    public static void main(String[] args) {
        // Define a byte value 0xAB (1010 1011 in binary)
        byte byteValue = (byte) 0xAB;

        // Call the swapNibbles method to swap the nibbles of the byte
        byte swappedByte = swapNibbles(byteValue);

        // Print the original byte value in binary format (mask with 0xFF to ensure correct representation)
        System.out.println("Original byte: " + Integer.toBinaryString(byteValue & 0xFF));

        // Print the swapped byte value in binary format
        System.out.println("Swapped byte: " + Integer.toBinaryString(swappedByte & 0xFF));
    }
}` },
{ id: "l19", lec: 19, name: "Block Swap Algorithm", cat: "CAT-2", pattern: "Theory",
  about: "Block swap rotates an array left by d positions in O(n) time and O(1) extra space, using only swaps.",
  logic: "Split into A (first d items) and B (the rest). If A is shorter, swap A with the last |A| items of B and continue with the rest of B. If B is shorter, mirror that. Stop when both blocks are equal and swap them.",
  code: `import java.util.Scanner;
public class Main {
    static void leftRotate(int arr[], int d, int n) {
        if (d == 0 || d == n)
            return;
        if (d > n)
            d = d % n;

        int i = d, j = n - d;
        while (i != j) {
            if (i < j) {
                swap(arr, d - i, d + j - i, i);
                j -= i;
            } else {
                swap(arr, d - i, d, j);
                i -= j;
            }
        }
        swap(arr, d - i, d, i);
    }

    public static void printArray(int arr[], int size) {
        for (int i = 0; i < size; i++)
            System.out.print(arr[i] + " ");
        System.out.println();
    }

    public static void swap(int arr[], int fi, int si, int d) {
        for (int i = 0; i < d; i++) {
            int temp = arr[fi + i];
            arr[fi + i] = arr[si + i];
            arr[si + i] = temp;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input array size
        System.out.print("Enter the size of the array: ");
        int n = scanner.nextInt();

        // Input array elements
        int[] arr = new int[n];
        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // Input rotation value
        System.out.print("Enter the number of positions to rotate: ");
        int d = scanner.nextInt();

        // Perform rotation and print the result
        leftRotate(arr, d, n);
        System.out.println("Array after rotation:");
        printArray(arr, n);

        scanner.close();
    }
}` },
{ id: "l20", lec: 20, name: "Max product subarray", cat: "CAT-2", pattern: "Coding",
  about: "Maximum product subarray: the contiguous subarray with the largest product. Negatives can flip a minimum into a maximum, and a zero resets the product. O(n).",
  logic: "Keep a running product from the left and one from the right, restarting at 1 after a zero. The best answer is the largest value either product reaches.",
  code: `import java.util.Scanner;

class Main {
    // Function to find the maximum product subarray
    static int maxSubarrayProduct(int arr[]) {
        int n = arr.length;

        // Initialize variables to keep track of the max, min, and overall max product
        int maxProduct = arr[0];
        int minProduct = arr[0];
        int result = arr[0];

        // Traverse the array from the 2nd element onward
        for (int i = 1; i < n; i++) {
            // If the current element is negative, swap the max and min
            if (arr[i] < 0) {
                int temp = maxProduct;
                maxProduct = minProduct;
                minProduct = temp;
            }

            // Update maxProduct and minProduct
            maxProduct = Math.max(arr[i], maxProduct * arr[i]);
            minProduct = Math.min(arr[i], minProduct * arr[i]);

            // Update the result with the maximum product so far
            result = Math.max(result, maxProduct);
        }

        return result;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input the size of the array
        System.out.print("Enter the number of elements in the array: ");
        int n = scanner.nextInt();

        // Input the array elements
        int[] arr = new int[n];
        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // Calculate and print the maximum subarray product
        int result = maxSubarrayProduct(arr);
        System.out.println("Maximum subarray product is = " + result);

        scanner.close();
    }
}` },
{ id: "l21", lec: 21, name: "Maximum sum of hour glass in matrix", cat: "CAT-2", pattern: "Coding",
  about: "Hourglass sum: the 7 cells in a 3\u00d73 window shaped like an hourglass (top row, middle centre, bottom row). Find the maximum over all positions in O(R\u00b7C).",
  logic: "Slide a 3\u00d73 window over the matrix. For top-left (i, j) add three cells of row i, the centre (i+1, j+1) and three cells of row i+2. Track the maximum.",
  code: `import java.util.Scanner;
public class Hourglass {
    static int findMaxSum(int [][]mat,int R,int C)
    {
        int max_sum=0;
        int sum;

        if (R < 3 || C < 3){
            System.out.println("Not possible");
            System.exit(0);
        }
        for (int i = 0; i < R - 2; i++)
        {
            for (int j = 0; j < C - 2; j++)
            {
                sum = (mat[i][j] + mat[i][j + 1] +
                    mat[i][j + 2]) + (mat[i + 1][j + 1]) +
                    (mat[i + 2][j] + mat[i + 2][j + 1] +
                    mat[i + 2][j + 2]);
                max_sum = Math.max(max_sum, sum);
            }
        }
        return max_sum;
    }
    static public void main (String[] args)
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number of rows");

        int R = sc.nextInt();
        System.out.println("Enter the number of columns");
        int C= sc.nextInt();

        int [][]mat = new int[R][C];
        System.out.println("Enter the elements of the matrix");
        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                mat[i][j]= sc.nextInt();
            }
        }
        int res = findMaxSum(mat,R,C);
        System.out.println("Maximum sum of hour glass = "+ res);
    }

}` },
{ id: "l22", lec: 22, name: "Max Equilibrium Sum", cat: "CAT-2", pattern: "Coding",
  about: "Maximum equilibrium sum: among indexes where the sum of elements on the left equals the sum on the right, with the element itself counted in both, take the largest such sum.",
  logic: "For each index i, compute prefix sum up to i and suffix sum from i. If they are equal it is an equilibrium, and the answer is the largest one. A running prefix sum makes it O(n).",
  code: `import java.util.Scanner;
import java.io.*;
public class Main
{
    public static int equlibrium_sum(int a[],int n)
    {
        int i;
        int sum =0,max =0,prefix_sum=0;
        for( i=0;i<n;i++)
        {
            sum =sum+a[i];
        } for(i=0;i<n;i++)
        {
            prefix_sum +=a[i];
            if (prefix_sum == sum)
            {
                if(max<prefix_sum)
                {
                    max=prefix_sum;
                }
            }
            sum = sum - a[i];
        }
        return max;
    }
    public static void main (String[] args)
    {
        Scanner sw = new Scanner(System.in);
        System.out.println("Enter the size of the array");

        int n=sw.nextInt();
        int arr[] = new int[n];
        System.out.println("Enter the elements of the array");
        for(int i =0;i<n;i++) arr[i]=sw.nextInt();
        int result=equlibrium_sum(arr, n);
        if(result==0)
            System.out.println("None");
        else
            System.out.println("Maximum equilibrium sum :"+result);

    }
}` },
{ id: "l23", lec: 23, name: "Leaders in array", cat: "CAT-2", pattern: "Coding",
  about: "A leader is an element that is greater than every element to its right. The last element is always a leader. O(n).",
  logic: "Scan from the right while keeping the maximum seen so far. Whenever the current element beats that maximum, it is a leader.",
  code: `import java.io.*;
public class LeadersInArray {
    /*Java Function to print leaders in an array */
    void printLeaders(int arr[], int size)
    {
        for (int i = 0; i < size; i++) {
            int j;
            for (j = i + 1; j < size; j++) {
                if (arr[i] <= arr[j])
                    break;
            }
            if (j == size) // the loop didn't break
                System.out.print(arr[i] + " ");
        }
    }

    /* Driver program to test above functions */
    public static void main(String[] args)
    {
        LeadersInArray lead = new LeadersInArray();
        int arr[] = new int[] { 16, 17, 4, 3, 5, 2 };
        int n = arr.length;
        lead.printLeaders(arr, n);
    }
}` },
{ id: "l24", lec: 24, name: "Majority element", cat: "CAT-2", pattern: "Coding",
  about: "Majority element appears more than n/2 times. Boyer-Moore voting finds it in O(n) time and O(1) space.",
  logic: "Keep a candidate and a count. A matching element adds 1, a different one subtracts 1, and at zero the next element becomes the candidate. A second pass confirms the count exceeds n/2.",
  code: `import java.util.Scanner;

public class MajorityElementFinder {

    // Function to find the majority element
    public static int findMajorityElement(int[] arr, int n) {
        // Phase 1: Find the candidate for the majority element
        int candidate = -1; // Use a valid placeholder for int
        int count = 0;

        for (int i = 0; i < n; i++) {
            if (count == 0) {
                candidate = arr[i];
                count = 1;
            } else if (candidate == arr[i]) {
                count++;
            } else {
                count--;
            }
        }

        // Phase 2: Verify if the candidate is the majority element
        count = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] == candidate) {
                count++;
            }
        }

        // Return the candidate if it is the majority element, otherwise return -1
        return (count > n / 2) ? candidate : -1; // Returning -1 if no majority found
    }

    public static void main(String[] args) {
        // Create a scanner object to take input from the user
        Scanner scanner = new Scanner(System.in);

        // Taking input for the size of the array
        System.out.print("Enter the number of elements in the array: ");
        int n = scanner.nextInt();

        // Initialize the array with the input size
        int[] arr = new int[n];

        // Taking array input from the user
        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // Finding and printing the majority element
        int result = findMajorityElement(arr, n);
        if (result != -1) {
            System.out.println("The majority element is: " + result);
        } else {
            System.out.println("There is no majority element.");
        }

        // Close the scanner
        scanner.close();
    }
}` },
{ id: "l25", lec: 25, name: "Lexicographically first palindromic string", cat: "CAT-2", pattern: "Coding",
  about: "The lexicographically first palindrome that can be made by rearranging the letters of a string. It exists only if at most one letter has an odd count.",
  logic: "Count letters. Build the left half from the alphabet in order using count/2 of each letter, put the odd letter (if any) in the middle, then mirror the left half to the right.",
  code: `class Main{

    static char MAX_CHAR = 26;

    // Function to count frequency of each char in the
    // string. freq[0] for 'a',...., freq[25] for 'z'
    static void countFreq(String str, int freq[], int len)
    {
        for (int i = 0; i < len; i++)
        {
            freq[str.charAt(i) - 'a']++;
        }
    }

    // Cases to check whether a palindr0mic
    // string can be formed or not
    static boolean canMakePalindrome(int freq[], int len)
    {
        // count_odd to count no of
        // chars with odd frequency
        int count_odd = 0;
        for (int i = 0; i < MAX_CHAR; i++)
        {
            if (freq[i] % 2 != 0)
            {
                count_odd++;
            }
        }

        // For even length string
        // no odd freq character
        if (len % 2 == 0)
        {
            if (count_odd > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        // For odd length string
        // one odd freq character
        if (count_odd != 1)
        {
            return false;
        }

        return true;
    }

    // Function to find odd freq char and
    // reducing its freq by 1returns "" if odd freq
    // char is not present
    static String findOddAndRemoveItsFreq(int freq[])
    {
        String odd_str = "";
        for (int i = 0; i < MAX_CHAR; i++)
        {
            if (freq[i] % 2 != 0)
            {
                freq[i]--;
                odd_str = odd_str + (char) (i + 'a');
                return odd_str;
            }
        }
        return odd_str;
    }

    // To find lexicographically first palindromic
    // string.
    static String findPalindromicString(String str)
    {
        int len = str.length();
        int freq[] = new int[MAX_CHAR];
        countFreq(str, freq, len);

        if (!canMakePalindrome(freq, len))
        {
            return "No Palindromic String";
        }

        // Assigning odd freq character if present
        // else empty string.
        String odd_str = findOddAndRemoveItsFreq(freq);

        String front_str = "", rear_str = " ";

        // Traverse characters in increasing order
        for (int i = 0; i < MAX_CHAR; i++)
        {
            String temp = "";
            if (freq[i] != 0)
            {
                char ch = (char) (i + 'a');

                // Divide all occurrences into two
                // halves. Note that odd character
                // is removed by findOddAndRemoveItsFreq()
                for (int j = 1; j <= freq[i] / 2; j++)
                {
                    temp = temp + ch;
                }

                // creating front string
                front_str = front_str + temp;

                // creating rear string
                rear_str = temp + rear_str;
            }
        }

        // Final palindromic string which is
        // lexicographically first
        return (front_str + odd_str + rear_str);
    }

    // Driver program
    public static void main(String[] args)
    {
        String str = "malayalam";
        System.out.println(findPalindromicString(str));
    }
}` },
{ id: "l26", lec: 26, name: "Natural Sort order", cat: "CAT-2", pattern: "Coding",
  about: "Natural order is the default ordering of a type: numbers ascending, strings alphabetical. Java uses Comparable.compareTo, and Comparator.naturalOrder() applies it.",
  logic: "Sort with list.sort(Comparator.naturalOrder()). A class gets its own natural order by implementing compareTo and returning negative, zero or positive.",
  code: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        ArrayList<Student> al = new ArrayList<Student>();
        int r, a;
        String sname;
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            r = sc.nextInt();
            sname = sc.next();
            a = sc.nextInt();
            al.add(new Student(r, sname, a));
        }
        System.out.println("Sorting by Name");
        Collections.sort(al, new NameComparator());
        for (Student st : al) {
            System.out.println(st.rollno + " " + st.name + " " + st.age);
        }
        System.out.println("Sorting by age");
        Collections.sort(al, new AgeComparator());
        for (Student st : al) {
            System.out.println(st.rollno + " " + st.name + " " + st.age);
        }
    }
}

class Student {
    int rollno;
    String name;
    int age;

    Student(int rollno, String name, int age) {
        this.rollno = rollno;
        this.name = name;
        this.age = age;
    }
}

class NameComparator implements Comparator<Student> {
    public int compare(Student s1, Student s2) {
        return s1.name.compareTo(s2.name);
    }
}

class AgeComparator implements Comparator<Student> {
    public int compare(Student s1, Student s2) {
        if (s1.age == s2.age)
            return 0;
        else if (s1.age > s2.age)
            return 1;
        else
            return -1;
    }
}` },
{ id: "l27", lec: 27, name: "Quick, Selection Sort", cat: "FAT", pattern: "Coding",
  about: "Quick sort is divide and conquer with O(n log n) average time. Selection sort is simple but always O(n\u00b2).",
  logic: "Quick sort: pick a pivot, put smaller items to its left and larger to its right (partition), then recurse on both sides. Selection sort: repeatedly find the minimum of the unsorted part and swap it to the front.",
  code: `public class QuickSort {
    public static void main(String[] args) {
        int[] arr = {8, 3, 1, 7, 0, 10, 2};
        quickSort(arr, 0, arr.length - 1);
        System.out.println("Sorted array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array
            int partitionIndex = partition(arr, low, high);
            // Recursively sort the sub-arrays
            quickSort(arr, low, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, high);
        }
    }
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}

class SelectionSort {
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        System.out.println("Sorted array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }
}` },
{ id: "l28", lec: 28, name: "Weighted substring", cat: "FAT", pattern: "Coding",
  about: "Weighted substring: build the string whose weight equals k, where each letter has a growing weight (here values[i] = (i+2)\u00b7values[i-1] pattern computed in the code).",
  logic: "Greedy: repeatedly pick the largest letter weight that fits in the remaining k (binary search for the floor), subtract it, repeat until k is 0, then print the letters in reverse.",
  code: `import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
public class Main {
    static int[] values = new int[26];
    public static void main(String[] args) {
        insertValues();
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        List<Character> s = new ArrayList<>();
        formedString(s, n);
    }
    static void insertValues() {
        values[0] = 1;
        int prev = 1;
        for (int i = 1; i < 26; i++) {
            values[i] = (i + 1) * prev + prev;
            prev = values[i];
            // System.out.println(prev);
        }
    }
    static void formedString(List<Character> s, int k)
    {
        int low = 0;
        int high = 25;
        while (k != 0) {
            int ind = findFloor(k, low, high);
            s.add((char) (ind + 'A'));
            k = k - values[ind];
            // System.out.println(k);
        }
        for (int i = s.size() - 1; i >= 0; i--){
            System.out.print(s.get(i));
        }
    }
    static int findFloor(int k, int low, int high)
    {
        int ans = -1;
        while (low <= high)
        {
            int mid = (low + high) / 2;
            if (values[mid] <= k)
            {
                ans = mid;
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        // System.out.println(ans);
        return ans;
    }
}` },
{ id: "l29", lec: 29, name: "Move hyphen to beginning", cat: "FAT", pattern: "Coding",
  about: "Moves all hyphens (here underscores) to the start of a string in place, keeping the order of the other characters. O(n).",
  logic: "Scan from the right with a write pointer i at the end. Every non-hyphen character is swapped into position i and i moves left, so hyphens collect at the front.",
  code: `public class MoveHyphenToBeginning {
    public static void main(String[] args) {
        String originalString = "face-prep";
        String transformedString = moveHyphenToBeginning(originalString);
        System.out.println(transformedString);
    }

    public static String moveHyphenToBeginning(String string) {
        if (string.contains("-")) {
            int hyphenIndex = string.indexOf("-");
            return "-" + string.substring(0, hyphenIndex) + string.substring(hyphenIndex + 1);
        } else {
            return string;
        }
    }
}` },
{ id: "l30", lec: 30, name: "Manacher's Algorithm", cat: "FAT", pattern: "Coding",
  about: "Manacher's algorithm finds the longest palindromic substring in O(n), where the naive way is O(n\u00b2).",
  logic: "Insert # between characters so every palindrome has odd length. Keep the centre and right edge of the rightmost palindrome, start each radius from its mirror's radius, then expand only as far as needed.",
  code: `import java.util.Scanner;
public class Main {
    public static void Long_palin(String s) {
        char[] T = new char[s.length()*2 + 3];
        T[0] = '$';
        T[s.length()*2 + 2] = '@';
        for (int i = 0; i < s.length(); i++) {
            T[2*i + 1] = '#';
            T[2*i + 2] = s.charAt(i);
        }
        T[s.length()*2 + 1] = '#';
        int[] P = new int[T.length];
        int center = 0, right = 0;
        for (int i = 1; i < T.length-1; i++) {
            int mirr = 2*center - i;

            if (i < right)
                P[i] = Math.min(right - i, P[mirr]);

            while (T[i + (1 + P[i])] == T[i - (1 + P[i])])
                P[i]++;

            if (i + P[i] > right) {
                center = i;
                right = i + P[i];
            }
        }

        int length = 0;
        center = 0;
        for (int i = 1; i < P.length-1; i++) {
            if (P[i] > length) {
                length = P[i];
                center = i;
            }
        }
        //System.out.println(length+" "+center);
        System.out.println(s.substring((center - 1 - length) / 2, (center - 1 + length) / 2));

    }
    public static void main(String[] args)
    {
        Scanner sc=new Scanner(System.in);
        String s =sc.next();
        Long_palin(s);
    }
}` },
{ id: "l31", lec: 31, name: "Sorted Unique Permutation", cat: "FAT", pattern: "Coding",
  about: "Prints all distinct permutations of a string, even when letters repeat.",
  logic: "Fix a position, swap each candidate letter into it, and recurse. Skip a swap if the same letter already appeared between the fixed index and the current one, so duplicates are never repeated.",
  code: `import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
public class Permutations {
    public static void main(String[] args) {
        String input = "BAC";
        distinctPermutations(input);
    }
    public static void distinctPermutations(String input) {
        char[] chars = input.toCharArray();
        Arrays.sort(chars);
        input = new String(chars);
        permute(input.toCharArray(), 0);
    }
    public static void permute(char[] chars, int index) {
        if (index == chars.length - 1) {
            System.out.println(String.valueOf(chars));
            return;
        }
        Set<Character> used = new HashSet<>();
        for (int i = index; i < chars.length; i++) {
            if (used.contains(chars[i]))
                continue;
            used.add(chars[i]);
            swap(chars, index, i);
            permute(chars, index + 1);
            swap(chars, index, i);
        }
    }
    public static void swap(char[] chars, int i, int j) {
        char temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
    }
}` },
{ id: "l32", lec: 32, name: "Maneuvering", cat: "FAT", pattern: "Coding",
  about: "Maneuvering: count the paths from the top-left to the bottom-right of an m\u00d7n grid moving only right or down.",
  logic: "Paths to a cell = paths from above + paths from the left, and the first row and column have 1 path. Or use the formula C(m+n-2, n-1).",
  code: `class Main {
    static int numberOfPaths(int m, int n){
        if (m == 1 || n == 1)
            return 1;
        return numberOfPaths(m-1,n)+numberOfPaths(m,n-1);
        // + numberOfPaths(m-1, n-1);
    }

    public static void main(String args[])
    {
        System.out.println(numberOfPaths(3, 3));
    }
}` },
{ id: "l33", lec: 33, name: "Combination", cat: "FAT", pattern: "Coding",
  about: "Combination: print every way to choose r items out of n (nCr = n! / (r!(n-r)!)), in order and without repeats.",
  logic: "Recursion with a start index: fill data[index] with each element from start to the end, then recurse with start = i+1 and index+1. When index equals r, print.",
  code: `import java.util.*;

public class CombinationExample {
    static int fact(int number) {
        int f = 1;
        int j = 1;
        while (j <= number) {
            f = f * j;
            j++;
        }
        return f;
    }

    public static void main(String args[]) {
        Scanner scanner = new Scanner(System.in);

        // Get the size of the list
        System.out.print("Enter the number of elements in the list: ");
        int n = scanner.nextInt();

        // Get the list of numbers from the user
        List<Integer> numbers = new ArrayList<>();
        System.out.println("Enter the numbers for the list:");
        for (int i = 0; i < n; i++) {
            System.out.print("Enter number " + (i + 1) + ": ");
            numbers.add(scanner.nextInt());
        }

        // Display the list
        System.out.println("Your numbers list: " + numbers);
        // Get the value of r from the user
        System.out.print("Enter the value of r: ");
        int r = scanner.nextInt();

        // Validate and calculate the combination value
        if (r > n) {
            System.out.println("The value of r cannot be greater than the size of the list.");
        } else {
            int result = fact(n) / (fact(r) * fact(n - r));
            System.out.println("The combination value for the numbers list is: " + result);
        }

        scanner.close();
    }
}` },
{ id: "l34", lec: 34, name: "Josephus trap", cat: "FAT", pattern: "Coding",
  about: "Josephus problem: n people stand in a circle and every k-th is eliminated. Find the position of the survivor.",
  logic: "Recurrence J(1) = 1 and J(n) = (J(n-1) + k - 1) mod n + 1. Run it iteratively from 1 up to n to avoid recursion.",
  code: `import java.io.*;
class Main {
    static int josephus(int n, int k){
        if (n == 1)
            return 1;
        else
            return (josephus(n - 1, k) + k - 1) % n + 1;
    }

    public static void main(String[] args){
        int n = 5;
        int k = 1;
        System.out.println("The chosen place is "
        + josephus(n, k));
    }
}` },
{ id: "l35", lec: 35, name: "Maze Solving", cat: "FAT", pattern: "Coding",
  about: "Rat in a maze: find a path from the top-left to the bottom-right through cells marked 1 using backtracking.",
  logic: "From a cell mark it as part of the path, try to move right then down, and if neither works unmark it (backtrack) and return false. Stop when the goal is reached.",
  code: `public class RatMaze {
    final int N = 4; // Define the size of the maze
    // Print the solution path (if found)
    void printSolution(int sol[][]) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(" " + sol[i][j] + " ");
            System.out.println();
        }
    }

    // Check if maze[x][y] is a valid move (inside bounds and not blocked)
    boolean isSafe(int maze[][], int x, int y) {
        return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);
    }

    // Solve the maze and return true if there's a solution, false otherwise
    boolean solveMaze(int maze[][]) {
        int sol[][] = new int[N][N]; // Create a solution matrix initialized to 0

        // If solveMazeUtil returns false, there's no solution
        if (!solveMazeUtil(maze, 0, 0, sol)) {
            System.out.print("Solution doesn't exist");
            return false;
        }

        printSolution(sol); // Print the solution matrix
        return true;
    }
    // Utility function to solve the maze using backtracking
    boolean solveMazeUtil(int maze[][], int x, int y, int sol[][]) {
        // If we've reached the destination (bottom-right corner), mark it as part of the solution
        if (x == N - 1 && y == N - 1) {
            sol[x][y] = 1;
            return true;
        }

        // Check if the current position is safe
        if (isSafe(maze, x, y)) {
            // Mark the current cell as part of the solution path
            sol[x][y] = 1;

            // Move forward in the x direction (down)
            if (solveMazeUtil(maze, x + 1, y, sol))
                return true;

            // If moving down didn't work, try moving right
            if (solveMazeUtil(maze, x, y + 1, sol))
                return true;

            // If neither move works, backtrack: unmark this cell
            sol[x][y] = 0;
            return false;
        }

        return false; // If not a valid move, return false
    }

    public static void main(String[] args) {
        RatMaze ratMaze = new RatMaze();
        int maze[][] = {
            { 1, 0, 0, 0 },
                { 1, 1, 0, 1 },
                { 0, 1, 0, 0 },
                { 1, 1, 1, 1 }
        };

        ratMaze.solveMaze(maze); // Solve the maze and print the solution
    }
}` },
{ id: "l36", lec: 36, name: "N Queens", cat: "FAT", pattern: "Coding",
  about: "N Queens: place N queens on an N\u00d7N board so that none attack each other, using backtracking.",
  logic: "Place one queen per row. For each column check the column and both diagonals above, and if it is safe place the queen and go to the next row. Unplace it afterwards to try other columns.",
  code: `public class NQueenProblem {
    final int N = 4;
    void printSolution(int board[][]){
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(" " + board[i][j]
                + " ");
            System.out.println();         }
    }
    boolean isSafe(int board[][], int row, int col){
        int i, j;
        for (i = 0; i < col; i++)
            if (board[row][i] == 1)
                return false;
        for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] == 1)
                return false;
        for (i = row, j = col; j >= 0 && i < N; i++, j--)
            if (board[i][j] == 1)
                return false;
        return true;
    }
    boolean solveNQUtil(int board[][], int col){
        if (col >= N)
            return true;
        for (int i = 0; i < N; i++) {
            if (isSafe(board, i, col)) {
                board[i][col] = 1;
                if (solveNQUtil(board, col + 1) == true)
                    return true;
                board[i][col] = 0; // BACKTRACK
            }      }
        return false;
    }
    boolean solveNQ()
    {
        int board[][] = { { 0, 0, 0, 0 },
                { 0, 0, 0, 0 },
                { 0, 0, 0, 0 },
                { 0, 0, 0, 0 } };
        if (solveNQUtil(board, 0) == false) {
            System.out.print("Solution does not exist");
            return false;
        }
        printSolution(board);
        return true;
    }

    public static void main(String args[]){
        NQueenProblem Queen = new NQueenProblem();
        Queen.solveNQ();
}}` },
{ id: "l37", lec: 37, name: "Warnsdorff's Algorithm", cat: "FAT", pattern: "Coding",
  about: "Warnsdorff's rule finds a knight's tour: a path that visits every square of the board exactly once.",
  logic: "From the current square always move to the unvisited square that has the fewest onward moves. Backtrack if it dead-ends.",
  code: `import java.io.*;
import java.util.*;
public class Main {
    static int n=8;
    static int x[]={2,1,-1,-2,-2,-1,1,2};
    static int y[]={1,2,2,1,-1,-2,-2,-1};
    public static boolean tour( int [][] arr, int count, int r, int c)
    {
        if(count==(n*n))
        {
            return true;
        }
        for( int i=0;i<n;i++)
        {
            int x1=x[i]+r;
            int y1=y[i]+c;
            if(x1>=0 && y1>=0 && x1<n && y1<n && arr[x1][y1]==0)
            {
                arr[x1][y1]=count;
                if(tour(arr,count+1,x1,y1))
                    return true;
                arr[x1][y1]=0;
            }
        }
        return false;

    }
    static void print(int[][]arr)
    {
        for( int i=0;i<n;i++)
        {
            for( int j=0;j<n;j++)
            {
                System.out.print(arr[i][j]+" ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n=8;
        int arr[][]=new int[n][n];
        arr[0][0]=1;
        if( tour(arr,2,0,0))
            print(arr);
    }
}` },
{ id: "l38", lec: 38, name: "Hamiltonian Cycle", cat: "FAT", pattern: "Coding",
  about: "A Hamiltonian cycle visits every vertex exactly once and returns to the start. Finding one is NP-complete, so backtracking is used.",
  logic: "Start at vertex 0. At each position try each vertex that is adjacent to the previous one and not yet used. At the end there must be an edge back to vertex 0.",
  code: `import java.util.*;

public class Main2 {
    static int node;
    static int[][] graph;
    static int[] path;

    static void displayCycle() {
        for (int i = 0; i < node; i++)
            System.out.print(path[i] + " ");
        System.out.println(path[0]);
    }

    static boolean isValid(int v, int k) {
        if (graph[path[k - 1]][v] == 0)
            return false;
        for (int i = 0; i < k; i++)
            if (path[i] == v)
                return false;
        return true;
    }

    static boolean cycleFound(int k) {
        if (k == node)
            return graph[path[k - 1]][path[0]] == 1;
        for (int v = 1; v < node; v++) {
            if (isValid(v, k)) {
                path[k] = v;
                if (cycleFound(k + 1))
                    return true;
                path[k] = -1;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of nodes: ");
        node = sc.nextInt();
        graph = new int[node][node];
        path = new int[node];
        System.out.println("Enter adjacency matrix:");
        for (int i = 0; i < node; i++)
            for (int j = 0; j < node; j++)
                graph[i][j] = sc.nextInt();

        path[0] = 0;
        for (int i = 1; i < node; i++)
            path[i] = -1;

        if (cycleFound(1))
            displayCycle();
        else
            System.out.println("No Hamiltonian Cycle found.");
    }
}` },
{ id: "l39", lec: 39, name: "Kruskal's Algorithm", cat: "FAT", pattern: "Coding",
  about: "Kruskal's algorithm builds a minimum spanning tree of a weighted graph in O(E log E).",
  logic: "Sort edges by weight and add each edge if it joins two different components (check with union-find). Stop after V-1 edges.",
  code: `public class KruskalSAlgorithm {

    // TODO: add the Java solution for Kruskal's Algorithm
    public static void main(String[] args) {
        System.out.println("Kruskal's Algorithm: code coming soon");
    }
}` },
{ id: "l40", lec: 40, name: "Activity Selection Problem", cat: "FAT", pattern: "Coding",
  about: "Activity selection picks the maximum number of non-overlapping activities. It is a classic greedy problem, O(n log n) with sorting.",
  logic: "Sort activities by finish time. Take the first, then take every next activity whose start time is at or after the last chosen finish time.",
  code: `public class ActivitySelectionProblem {

    // TODO: add the Java solution for Activity Selection Problem
    public static void main(String[] args) {
        System.out.println("Activity Selection Problem: code coming soon");
    }
}` },
{ id: "l41", lec: 41, name: "Graph Coloring", cat: "FAT", pattern: "Coding",
  about: "Graph colouring assigns colours to vertices so that no two adjacent vertices share one, using at most m colours (backtracking).",
  logic: "Colour vertices one by one. Try each colour from 1 to m that no neighbour uses, recurse to the next vertex, and undo the colour if it leads nowhere.",
  code: `public class GraphColoring {

    // TODO: add the Java solution for Graph Coloring
    public static void main(String[] args) {
        System.out.println("Graph Coloring: code coming soon");
    }
}` },
{ id: "l42", lec: 42, name: "Huffman Coding", cat: "FAT", pattern: "Coding",
  about: "Huffman coding builds a prefix-free variable-length code that compresses data optimally, in O(n log n).",
  logic: "Put every symbol in a min-heap by frequency. Repeatedly merge the two smallest into one node, then read codes from the tree (left = 0, right = 1). Frequent symbols get short codes.",
  code: `public class HuffmanCoding {

    // TODO: add the Java solution for Huffman Coding
    public static void main(String[] args) {
        System.out.println("Huffman Coding: code coming soon");
    }
}` },
{ id: "l43", lec: 43, name: "Networking", cat: "FAT", pattern: "Coding",
  about: "Networking topics cover how computers communicate: layers (OSI/TCP-IP), addressing, routing and protocols.",
  logic: "Remember the layer stack from physical up to application and what each layer does (for example IP routes packets, TCP gives reliable delivery).",
  code: `public class Networking {

    // TODO: add the Java solution for Networking
    public static void main(String[] args) {
        System.out.println("Networking: code coming soon");
    }
}` },
{ id: "l44", lec: 44, name: "Security", cat: "FAT", pattern: "Coding",
  about: "Security topics cover keeping data confidential, intact and available: threats, authentication and basic attacks and defences.",
  logic: "Anchor on the CIA triad: confidentiality, integrity, availability. Each attack or defence maps to protecting one of these.",
  code: `public class Security {

    // TODO: add the Java solution for Security
    public static void main(String[] args) {
        System.out.println("Security: code coming soon");
    }
}` },
{ id: "l45", lec: 45, name: "Cryption Techniques", cat: "FAT", pattern: "Coding",
  about: "Cryption techniques cover encryption and decryption: symmetric (same key, such as AES), asymmetric (key pair, such as RSA) and simple ciphers.",
  logic: "Plain text goes through a cipher with a key to give cipher text and back. Example: the Caesar cipher shifts each letter by k, and decryption shifts by -k.",
  code: `public class CryptionTechniques {

    // TODO: add the Java solution for Cryption Techniques
    public static void main(String[] args) {
        System.out.println("Cryption Techniques: code coming soon");
    }
}` }
];
