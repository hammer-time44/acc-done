/* Syllabus topics with Java reference code. L1-L13 are CAT-1, L14-L26 are CAT-2. Optional extras per entry: `idea` and `keys` (regex checks for the mock exam). */
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
  about: "Finds primes in a range [l, h] without a sieve over all of 1..h. Only primes up to \u221ah are needed to cross out composites in the range.",
  logic: "Every composite in [l, h] has a factor of at most \u221ah. For each i up to \u221ah, start at the first multiple of i that is at least l and mark every i-th number after it.",
  code: `// segmented and Incremental sieve alg
import java.util.*;
public class Main
{
public static void main(String[] args) {
Scanner sc = new Scanner(System.in);
int l = sc.nextInt();
int h = sc.nextInt();
boolean b[] = new boolean[h+1];
for(int i=2;i*i<=h;i++)
{
   int sm = (l/i)*i;
   if(sm<l)
       sm+=i;
   for(int j=2*i;j<=h;j=j+i)
       b[j] = true;
}
for(int i=l;i<=h;i++)
{
   if(b[i]==false)
       System.out.println(i);
}

}
}` },
{ id: "l9", lec: 9, name: "Euler's phi Algorithm", cat: "CAT-1", pattern: "Theory",
  about: "Euler's phi \u03c6(n) counts the numbers from 1 to n that are coprime to n. It runs in O(\u221an) using the prime factors of n.",
  logic: "Start with result = n. For each prime factor p of n, do result -= result / p (multiply by (1 - 1/p)). Divide p out fully, and handle a leftover prime factor above \u221an at the end.",
  code: `// Java program to calculate
// Eule  r's Totient Function
import java.io.*;
class Main
{
static int phi(int n)
{

    int result = n;

    for (int p = 2; p * p <= n; ++p)
    {
        if (n % p == 0)

        {
            while (n % p == 0)
                n /= p;
            result -= result / p;
        }
    }
    if (n > 1)
        result -= result / n;
    return result;
}

// Driver Code
public static void main (String[] args)
{
    int n=48;

        System.out.println("phi(" + n +
                        ") = " + phi(n));
}
}` },
{ id: "l10", lec: 10, name: "Strobogrammatic Number", cat: "CAT-1", pattern: "Theory",
  about: "A strobogrammatic number looks the same after rotating 180\u00b0. Valid digit pairs are 0-0, 1-1, 8-8, 6-9 and 9-6. Runs in O(n).",
  logic: "Two pointers from both ends: the left digit must be valid and its rotated partner must equal the right digit. The middle digit must map to itself.",
  code: `//Strobogrammatic Number:
import java.util.*;
class Main {
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
        return true;
    }
    public static void main(String args[])
    {
        Scanner sc=new Scanner(System.in);
        String n="69";
        System.out.println(isStrobogrammatic(n));
    }
}` },
{ id: "l11", lec: 11, name: "Remainder Theorem", cat: "CAT-1", pattern: "Theory",
  about: "Chinese Remainder Theorem finds x that satisfies x mod num[i] = rem[i] for every i. A solution is unique modulo the product of the moduli when they are pairwise coprime.",
  logic: "Brute force: try x = 1, 2, 3, ... and return the first x where every x % num[j] equals rem[j].",
  code: `  // A Java program to demonstrate the working of Chinese remainder  Theorem
import java.io.*;
class Main {
    static int findMinX(int num[], int rem[], int k)
    {
        int x = 1; // Initialize result
        while (true)
        {
            int j;
            for (j=0; j<k; j++ ){
             if (x%num[j] != rem[j])
                break;
            }
            if (j == k)
            return x;
            x++;
        }
    }
    public static void main(String args[])
    {
        int num[] = {3,4,5};
        int rem[] = {2, 3, 1};
        int k = num.length;
        System.out.println("x is " + findMinX(num, rem, k));
    }
}` },
{ id: "l12", lec: 12, name: "Toggle the switch & Alice Apple tree", cat: "CAT-1", pattern: "Theory",
  about: "Toggle the switch: n bulbs start off and person i flips every i-th bulb, so bulb k ends up toggled once per divisor. Alice's apple tree: the apples inside a square of side r grow like 2r(r+1)(2r+1), and the answer is the perimeter 8r.",
  logic: "Bulb k is on only if it has an odd number of divisors, which happens only for perfect squares. For the apple tree, find the smallest r whose total apples is at least the need, then print 8r (binary search on r or a simple loop).",
  code: `import java.util.*;

// Alice apple tree
import java.util.*;
public class AliceLoop {
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
}

class AliceBinary {
    static long minimumPerimeter(long neededApples) {
        long left = 1;
        long right = 100000;
        while (left < right) {
            long r = (left + right) / 2;
            if (2 * r * (r + 1) * (2 * r + 1) >= neededApples) {
                right = r;
            } else {
                left = r + 1;
            }
        }
        return left * 8;
    }
    public static void main(String args[])
    {
        System.out.println(minimumPerimeter(1));
    }
}

//Toggle the switch
class Toggle {
public static void main(String[] args) {
Scanner sc=new Scanner(System.in);
int n=sc.nextInt();
//System.out.println((int)Math.sqrt(n));
  boolean b[] = new boolean[n+1];
  int i,j,c=0;
  for(i=2;i<=n;i++)
        {
          for(j=i;j<=n;j+=i)
          {
            if(b[j]==false)
              b[j] = true;
            else
              b[j] = false;
          } }
  for(i=1;i<=n;i++)
        {
          if(b[i]==false)
            c++;
        }
  System.out.println(c);

}
}` },
{ id: "l13", lec: 13, name: "Binary Palindrome", cat: "CAT-1", pattern: "Theory",
  about: "A binary palindrome is a number whose binary representation reads the same forwards and backwards (9 = 1001). Runs in O(log n).",
  logic: "Convert to a binary string and compare with two pointers, or build the bit-reversed number with (rev << 1) | (n & 1) and check that it equals n.",
  code: `class Main {
public static boolean isPalindrome(int N)
{
    // Converting N into binary representation
    String s = Integer.toBinaryString(N);

    // Checking if it is palindrome or not
    int i = 0, j = s.length() - 1;
    while (i < j) {
    if (s.charAt(i) != s.charAt(j)) {
        return false;
    }
    i++;
    j--;
    }
    return true;
}
public static void main(String[] args) {
    int x = 16;
    System.out.println(isPalindrome(x));
    x = 17;
    System.out.println(isPalindrome(x));
}
}` },
{ id: "l14", lec: 14, name: "Booth's Algorithm", cat: "CAT-2", pattern: "Theory",
  about: "Booth's algorithm multiplies signed binary numbers using add and shift steps. The simple shift-and-add form walks through the multiplier bits.",
  logic: "For each bit of the multiplier: if the bit is 1, add the shifted multiplicand to the product. Then shift the multiplicand left and the multiplier right.",
  code: `import java.util.Scanner;

//Booth's Algorithm
public class Main {
        public static void main(String[] args) {
            int multiplicand = 14;  // Q
            int multiplier = 6;     // M

            int product = 0;
            int multiplicandBits = Integer.toBinaryString(multiplicand).length();

            for (int i = 0; i < multiplicandBits; i++) {
                int currentBit = (multiplicand & 0b1);

                if (currentBit == 1) {
                    product += multiplier;
                }

                multiplier <<= 1;
                multiplicand >>>= 1;
            }

            System.out.println("Result: " + product);
    }
    }

// Booth: second version
public class BoothAlt {
    public static int multiply(int n1, int n2) {
        int m = n1;
        int r = n2;
        int A = n1;
        int S = -n1;
        int P = 0;
        int count = Integer.SIZE;
        System.out.print(count);
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
       // Scanner scan = new Scanner(System.in);
       // Booth b = new Booth();
        System.out.println("Enter two integer numbers -");
        int n1 = -5;
        int n2 = 12;
        int result = multiply(n1, n2);
        System.out.println("\\n\\nResult : " + n1 + " * " + n2 + " = " + result);
}
}` },
{ id: "l15", lec: 15, name: "Euclid's Algorithm", cat: "CAT-2", pattern: "Theory",
  about: "Euclid's algorithm finds gcd(a, b) in O(log min(a, b)) time.",
  logic: "gcd(a, b) = gcd(b % a, a), and gcd(0, b) = b. Replacing the larger number by the remainder never changes the gcd.",
  code: `// Java program to demonstrate Basic Euclidean Algorithm

import java.lang.*;
import java.util.*;

class Main {

    public static int gcd(int a, int b)
    {
        if (a == 0)
            return b;

        return gcd(b % a, a);
    }

    // Driver code
    public static void main(String[] args)
    {
        int a = 10, b = 15, g;
        g = gcd(a, b);
        System.out.println("GCD(" + a + " , " + b
                        + ") = " + g);
        a = 35;
        b = 10;
        g = gcd(a, b);
        System.out.println("GCD(" + a + " , " + b
                        + ") = " + g);
        a = 31;
        b = 2;
        g = gcd(a, b);
        System.out.println("GCD(" + a + " , " + b
                        + ") = " + g);
    }
}` },
{ id: "l16", lec: 16, name: "Karatsuba Algorithm", cat: "CAT-2", pattern: "Theory",
  about: "Karatsuba multiplies two n-digit numbers in about O(n^1.585) instead of O(n\u00b2) by using 3 recursive multiplications instead of 4.",
  logic: "Split x = a\u00b710^m + b and y = c\u00b710^m + d. Compute z0 = a\u00b7c, z2 = b\u00b7d and z1 = (a+b)(c+d). The middle term is z1 - z0 - z2, so result = z0\u00b710^2m + (z1 - z0 - z2)\u00b710^m + z2.",
  code: `// Karatsuba Alg
class Main {
    public static long mult(long x, long y) {
        if (x < 10 && y < 10) {
            return x * y;
        }
        int noOneLength = numLength(x);
        int noTwoLength = numLength(y);
        int maxNumLength
            = Math.max(noOneLength, noTwoLength);
        Integer halfMaxNumLength
            = (maxNumLength / 2) + (maxNumLength % 2);
        long maxNumLengthTen
            = (long)Math.pow(10, halfMaxNumLength);
        long a = x / maxNumLengthTen;
        long b = x % maxNumLengthTen;
        long c = y / maxNumLengthTen;
        long d = y % maxNumLengthTen;
        long z0 = mult(a, c);
        long z1 = mult(a + b, c + d);
        long z2 = mult(b, d);

long ans = (z0 * (long)Math.pow(10, halfMaxNumLength * 2) +
((z1 - z0 - z2) * (long)Math.pow(10, halfMaxNumLength) + z2));

        return ans;

    }
    public static int numLength(long n)
    {
        int noLen = 0;
        while (n > 0) {
            noLen++;
            n /= 10;
        }
        return noLen;
    }
    public static void main(String[] args)
    {
        System.out.println(mult(1234,5678));
    }
}` },
{ id: "l17", lec: 17, name: "Longest Sequence of 1 after flipping a bit", cat: "CAT-2", pattern: "Theory",
  about: "Finds the longest run of 1s after flipping at most k zeros (here the sliding window version, O(n)).",
  logic: "Sliding window: grow the right end, count zeros in the window, and while zeros exceed k move the left end forward. Track the maximum window length.",
  code: `// Java program to find length of
// longest subsegment of all 1's
// by changing at most k 0's
import java.io.*;

class Main {

static int longestSubSeg(int a[], int n,int k)
{
    int cnt0 = 0;
    int l = 0;
    int max_len = 0;

    // i decides current ending point
    for (int i = 0; i < n; i++) {
        if (a[i] == 0)
            cnt0++;

        // If there are more 0's move
        // left point for current ending
        // point.
        while (cnt0 > k) {
            if (a[l] == 0)
                cnt0--;
            l++;
        }

        max_len = Math.max(max_len, i - l + 1);
    }

    return max_len;
}

// Driver code
public static void main (String[] args)
{
    int a[] = { 1, 1, 0, 0, 1, 1, 1, 1, 1 };
    int k = 1;
    int n = a.length;
    System.out.println( longestSubSeg(a, n, k));

}
}` },
{ id: "l18", lec: 18, name: "Swap two nibbles in a byte", cat: "CAT-2", pattern: "Theory",
  about: "Swapping the two nibbles (4-bit halves) of a byte. For example 100 (0110 0100) becomes 70 (0100 0110). Runs in O(1).",
  logic: "Move the low nibble up and the high nibble down: ((x & 0x0F) << 4) | ((x & 0xF0) >> 4).",
  code: `class Main {

static int swapNibbles(int x)
{
    return ((x & 0x0F) << 4 | (x & 0xF0) >> 4);
}

// Driver code
public static void main(String arg[])
{
    int x = 100;
    System.out.print(swapNibbles(x));
}
}` },
{ id: "l19", lec: 19, name: "Block Swap Algorithm", cat: "CAT-2", pattern: "Theory",
  about: "Block swap rotates an array left by d positions in O(n) time and O(1) extra space, using only swaps.",
  logic: "Split into A (first d items) and B (the rest). If A is shorter, swap A with the last |A| items of B and continue with the rest of B. If B is shorter, mirror that. Stop when both blocks are equal and swap them.",
  code: `// Java code for above implementation
import java.io.*;

public class Main {
    static void leftRotate(int arr[], int d, int n)
    {
        int i, j;
        if (d == 0 || d == n)
            return;
        /* If number of elements to be rotated is more than
        * array size*/
        if (d > n)
            d = d % n;
        i = d;
        j = n - d;
        while (i != j) {
            if (i < j) /*A is shorter*/
            {
                swap(arr, d - i, d + j - i, i);
                j -= i;
            }

            else /*B is shorter*/
            {
                swap(arr, d - i, d, j);
                i -= j;
            }
            // printArray(arr, 7);
        }
        /*Finally, block swap A and B*/
        swap(arr, d - i, d, i);
    }

    /*UTILITY FUNCTIONS*/
    /* function to print an array */
    public static void printArray(int arr[], int size)
    {
        int i;
        for (i = 0; i < size; i++)
            System.out.print(arr[i] + " ");
        System.out.println();
    }

    /*This function swaps d elements
    starting at index fi with d elements
    starting at index si */
    public static void swap(int arr[], int fi, int si,
                            int d)
    {
        int i, temp;
        for (i = 0; i < d; i++) {
            temp = arr[fi + i];
            arr[fi + i] = arr[si + i];
            arr[si + i] = temp;
        }
    }

    // Driver Code
    public static void main(String[] args)
    {
        int arr[] = { 11, 12, 13, 14, 15 };
        leftRotate(arr, 2, 5);
        printArray(arr, 5);
    }
}` },
{ id: "l20", lec: 20, name: "Max product subarray", cat: "CAT-2", pattern: "Coding",
  about: "Maximum product subarray: the contiguous subarray with the largest product. Negatives can flip a minimum into a maximum, and a zero resets the product. O(n).",
  logic: "Keep a running product from the left and one from the right, restarting at 1 after a zero. The best answer is the largest value either product reaches.",
  code: `// Maximum product sub array
//method 2
class Solution {
    public int maxProduct(int[] nums) {

        int n = nums.length;
        int l=1,r=1;
        int ans=nums[0];

        for(int i=0;i<n;i++){

            //if any of l or r become 0 then update it to 1
            l = l==0 ? 1 : l;
            r = r==0 ? 1 : r;

            l *= nums[i];   //prefix product
            r *= nums[n-1-i];    //suffix product

            ans = Math.max(ans,Math.max(l,r));

        }

        return ans;
    }
}
    class Main
    {
        public static void main(String srg[])
        {
            Solution S= new Solution();
            int a[]={1,-2,-3,0,7,-8,-2};
            System.out.println(S.maxProduct(a));
        }
    }` },
{ id: "l21", lec: 21, name: "Maximum sum of hour glass in matrix", cat: "CAT-2", pattern: "Coding",
  about: "Hourglass sum: the 7 cells in a 3\u00d73 window shaped like an hourglass (top row, middle centre, bottom row). Find the maximum over all positions in O(R\u00b7C).",
  logic: "Slide a 3\u00d73 window over the matrix. For top-left (i, j) add three cells of row i, the centre (i+1, j+1) and three cells of row i+2. Track the maximum.",
  code: `//Hour glass
import java.io.*;

class Main {

static int R = 5;
static int C = 5;
static int findMaxSum(int [][]mat)
{
    if (R < 3 || C < 3){
        System.out.println("Not possible");
        System.exit(0);
    }
    int max_sum = Integer.MIN_VALUE;
    for (int i = 0; i < R - 2; i++)
    {
        for (int j = 0; j < C - 2; j++)
        {
            int sum = (mat[i][j] + mat[i][j + 1] +
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
        int [][]mat = {{1, 2, 3, 0, 0},
                    {0, 0, 0, 0, 0},
                    {2, 1, 4, 0, 0},
                    {0, 0, 0, 0, 0},
                    {1, 1, 0, 1, 0}};
        int res = findMaxSum(mat);
        System.out.println("Maximum sum of hour glass = "+ res);
    }

}` },
{ id: "l22", lec: 22, name: "Max Equilibrium Sum", cat: "CAT-2", pattern: "Coding",
  about: "Maximum equilibrium sum: among indexes where the sum of elements on the left equals the sum on the right, with the element itself counted in both, take the largest such sum.",
  logic: "For each index i, compute prefix sum up to i and suffix sum from i. If they are equal it is an equilibrium, and the answer is the largest one. A running prefix sum makes it O(n).",
  code: `// Maximum equilibrium sum

// equilibrium sum.
import java.io.*;

class GFG {

    // Function to find maximum
    // equilibrium sum.
    static int findMaxSum(int []arr, int n)
    {
        int res = Integer.MIN_VALUE;

        for (int i = 0; i < n; i++)
        {
            int prefix_sum = arr[i];

            for (int j = 0; j < i; j++)
                prefix_sum += arr[j];

            int suffix_sum = arr[i];

            for (int j = n - 1; j > i; j--)
                suffix_sum += arr[j];

            if (prefix_sum == suffix_sum)
                res = Math.max(res, prefix_sum);
        }

        return res;
    }

    // Driver Code
    public static void main (String[] args)
    {
        int arr[] = {-2, 5, 3, 1, 2, 6, -4, 2 };
        int n = arr.length;
        System.out.println(findMaxSum(arr, n));
    }
}` },
{ id: "l23", lec: 23, name: "Leaders in array", cat: "CAT-2", pattern: "Coding",
  about: "A leader is an element that is greater than every element to its right. The last element is always a leader. O(n).",
  logic: "Scan from the right while keeping the maximum seen so far. Whenever the current element beats that maximum, it is a leader.",
  code: `import java.io.*;
public class Main
{
    /* Java Function to print leaders in an array */
    static void printLeaders(int arr[], int size)
    {
        int max_from_right = arr[size-1];

        /* Rightmost element is always leader */
        System.out.print(max_from_right + " ");

        for (int i = size-2; i >= 0; i--)
        {
            if (max_from_right < arr[i])
            {
            max_from_right = arr[i];
            System.out.print(max_from_right + " ");
            }
        }
    }

    /* Driver program to test above functions */
    public static void main(String[] args)
    {

        int arr[] = new int[]{16, 17, 4, 3, 5, 2};
        int n = arr.length;
        printLeaders(arr, n);
    }
}` },
{ id: "l24", lec: 24, name: "Majority element", cat: "CAT-2", pattern: "Coding",
  about: "Majority element appears more than n/2 times. Boyer-Moore voting finds it in O(n) time and O(1) space.",
  logic: "Keep a candidate and a count. A matching element adds 1, a different one subtracts 1, and at zero the next element becomes the candidate. A second pass confirms the count exceeds n/2.",
  code: `// Java program to find Majority
// element in an array
class Main {
static int majorityElement(int[] arr) {
int n = arr.length;
int candidate = -1;
int count = 0;
// Find a candidate
for (int num : arr) {
if (count == 0) {
candidate = num;
count = 1;
} else if (num == candidate) {
count++;
} else {
count--;
}
}
// Validate the candidate
count = 0;
for (int num : arr) {
if (num == candidate) {
count++;
}
}
// If count is greater than n / 2, return the candidate; otherwise, return -1
if (count > n / 2) {
return candidate;
} else {
return -1;
}
}
public static void main(String[] args) {
int[] arr = {1, 1, 2, 1, 3, 5, 1};
System.out.println(majorityElement(arr));
}
}` },
{ id: "l25", lec: 25, name: "Lexicographically first palindromic string", cat: "CAT-2", pattern: "Coding",
  about: "The lexicographically first palindrome that can be made by rearranging the letters of a string. It exists only if at most one letter has an odd count.",
  logic: "Count letters. Build the left half from the alphabet in order using count/2 of each letter, put the odd letter (if any) in the middle, then mirror the left half to the right.",
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
  about: "Natural order is the default ordering of a type: numbers ascending, strings alphabetical. Java uses Comparable.compareTo, and Comparator.naturalOrder() applies it.",
  logic: "Sort with list.sort(Comparator.naturalOrder()). A class gets its own natural order by implementing compareTo and returning negative, zero or positive.",
  code: `// Java program to demonstrate
// Comparator.naturalOrder() method

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {
    public static void main(String... args)
    {

        List<String> stringList
            = Arrays.asList("Aman", "Kajal",
                            "Joyita", "Das");

        System.out.println("Before sorting:");
        stringList.forEach(System.out::println);

        stringList.sort(Comparator.naturalOrder());
        System.out.println("\\nAfter sorting:");
        stringList.forEach(System.out::println);
    }
}` },
{ id: "l27", lec: 27, name: "Quick, Selection Sort", cat: "FAT", pattern: "Coding",
  about: "Quick sort is divide and conquer with O(n log n) average time. Selection sort is simple but always O(n\u00b2).",
  logic: "Quick sort: pick a pivot, put smaller items to its left and larger to its right (partition), then recurse on both sides. Selection sort: repeatedly find the minimum of the unsorted part and swap it to the front.",
  code: `// Java implementation of QuickSort
import java.io.*;
class Main {
    static void swap(int[] arr, int i, int j)
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    static int partition(int[] arr, int low, int high)
    {
        int pivot = arr[high];
        int i = (low - 1);

        for (int j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return (i + 1);
    }
    static void quickSort(int[] arr, int low, int high)
    {
        if (low < high) {

            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    // To print sorted array
    public static void printArr(int[] arr)
    {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }

    // Driver Code
    public static void main(String[] args)
    {
        int[] arr = { 10,80,30,90,40,50,60 };
        int N = arr.length;

        // Function call
        quickSort(arr, 0, N - 1);
        System.out.println("Sorted array:");
        printArr(arr);
    }
}

// Java program for implementation of Selection Sort
class SelectionSort
{
    void sort (int arr[])
    {
        int n = arr.length;

        // One by one move boundary of unsorted subarray
        for (int i = 0; i < n-1; i++)
        {
            // Find the minimum element in unsorted array
            int min_idx = i;
            for (int j = i+1; j < n; j++){
                if (arr[j] < arr[min_idx])
                    min_idx = j;
            }
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }

    // Prints the array
    void printArray(int arr[ ])
    {
        int n = arr.length;
        for (int i=0; i<n; ++i)
            System.out.print(arr[i]+" ");
        System.out.println();
    }

    // Driver code to test above
    public static void main(String args[])
    {
        SelectionSort ob = new SelectionSort();
        int arr[] = {64,25,12,22,11};
        ob.sort(arr);
        System.out.println("Sorted array");
        ob.printArray(arr);
    }
}` },
{ id: "l28", lec: 28, name: "Weighted substring", cat: "FAT", pattern: "Coding",
  about: "Weighted substring: build the string whose weight equals k, where each letter has a growing weight (here values[i] = (i+2)\u00b7values[i-1] pattern computed in the code).",
  logic: "Greedy: repeatedly pick the largest letter weight that fits in the remaining k (binary search for the floor), subtract it, repeat until k is 0, then print the letters in reverse.",
  code: `// Weighted substring
import java.util.ArrayList;
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

        }
    }

    static void formedString(List<Character> s, int k) {
        int low = 0;
        int high = 25;
        while (k != 0) {
            int ind = findFloor(k, low, high);
            s.add((char) (ind + 'A'));
            k = k - values[ind];
            // System.out.println(k);
        }

        for (int i = s.size() - 1; i >= 0; i--)
            System.out.print(s.get(i));
    }

    static int findFloor(int k, int low, int high) {
        int ans = -1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (values[mid] <= k) {
                ans = mid;
                low = mid + 1;
            } else {
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
  code: `// Java program to bring hyphen in front of
// string using swapping technique
public class Main
{

    // Function to find spaces and move to beginning
    static void moveHyphenInFront(char str[])
    {
        // Traverse from end and swap spaces
        int i = str.length-1;
        for (int j = i; j >= 0; j--)
            if (str[j] != '_')
            {
                char c = str[i];
                str[i] = str[j];
                str[j] = c;
                i--;
            }
    }

    // Driver code
    public static void main(String[] args)
    {
        char str[] = "FACE_PREP".toCharArray();
        moveHyphenInFront(str);
        System.out.println(String.valueOf(str));
    }
}` },
{ id: "l30", lec: 30, name: "Manacher's Algorithm", cat: "FAT", pattern: "Coding",
  about: "Manacher's algorithm finds the longest palindromic substring in O(n), where the naive way is O(n\u00b2).",
  logic: "Insert # between characters so every palindrome has odd length. Keep the centre and right edge of the rightmost palindrome, start each radius from its mirror's radius, then expand only as far as needed.",
  code: `//Manacher Algorithm_Final
public class Main {
        public Main(String s) {
            char[] T = new char[s.length()*2 + 3];
            T[0] = '$';
            T[s.length()*2 + 2] = '@';
            for (int i = 0; i < s.length(); i++) {
                T[2*i + 1] = '#';
                T[2*i + 2] = s.charAt(i);
            }
            T[s.length()*2 + 1] = '#';
            int[]  P = new int[T.length];
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
            }System.out.println(length+" "+center);
            System.out.println(s.substring((center - 1 - length) / 2, (center - 1 + length) / 2));

    }
        public static void main(String[] args)
        {
            String s = "abcababacs" ;
            Main manacher = new Main(s);
        }
}` },
{ id: "l31", lec: 31, name: "Sorted Unique Permutation", cat: "FAT", pattern: "Coding",
  about: "Prints all distinct permutations of a string, even when letters repeat.",
  logic: "Fix a position, swap each candidate letter into it, and recurse. Skip a swap if the same letter already appeared between the fixed index and the current one, so duplicates are never repeated.",
  code: `// Java program to distinct permutations of the string
import java.util.Scanner;
public class Main {

// Re turns true if str[curr] does not matches with any of the
// characters after str[start]
    static boolean shouldSwap(char str[], int start, int curr) {
        for (int i = start; i < curr; i++) {
            if (str[i] == str[curr]) {
                return false;
            }
        }
        return true;
    }

// Prints all distinct permutations in str[0..n-1]
    static void findPermutations(char str[], int fi) {
        if (fi == str.length) {
            System.out.println(str);
            return;
        }
        for (int i = fi; i < str.length; i++) {
            // Proceed further for str[i] only if it
            // doesn't match with any of the characters
            // after str[index]
            boolean check = shouldSwap(str, fi, i);
            if (check) {
                swap(str, fi, i);
                findPermutations(str, fi + 1);
                swap(str, fi, i);
            }
          }
    }
    static void swap(char[] str, int i, int fi) {
        char c = str[i];
        str[i] = str[fi];
        str[fi] = c;
    }

    // Driver code
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        String str=sc.next();
        char s[] = str.toCharArray();
        int n = s.length;
        System.out.println("The permutations of the given string are");
        findPermutations(s, 0);
    }

}` },
{ id: "l32", lec: 32, name: "Maneuvering", cat: "FAT", pattern: "Coding",
  about: "Maneuvering: count the paths from the top-left to the bottom-right of an m\u00d7n grid moving only right or down.",
  logic: "Paths to a cell = paths from above + paths from the left, and the first row and column have 1 path. Or use the formula C(m+n-2, n-1).",
  code: `import java.io.*;

// Program 1: recursion
//Maneuvering
public class Main {
// Returns count of possible paths to reach
// cell at row number m and column number n
// from the topmost leftmost cell (cell at 1, 1)
static int numberOfPaths(int m, int n)
{
// If either given row number is first or
// given column number is first
if (m == 1 || n == 1)
return 1;
// If diagonal movements are allowed then
// the last addition is required.
return numberOfPaths(m - 1, n) + numberOfPaths(m, n - 1);
// + numberOfPaths(m-1, n-1);
}
public static void main(String args[])
{
System.out.println(numberOfPaths(3, 3));
}
}

// Program 2: combinatorics
// Java program to count all possible paths from
// top left to top bottom using combinatorics

class GFG {

    static int numberOfPaths(int m, int n)
    {
        // We have to calculate m+n-2 C n-1 here
        // which will be (m+n-2)! / (n-1)! (m-1)!
        int path = 1;
        for (int i = n; i < (m + n - 1); i++) {
            path *= i;
            path /= (i - n + 1);
        }
        return path;
    }

    // Driver code
    public static void main(String[] args)
    {
        System.out.println(numberOfPaths(3, 3));
    }
}

// This code is contributed by Code_Mech.` },
{ id: "l33", lec: 33, name: "Combination", cat: "FAT", pattern: "Coding",
  about: "Combination: print every way to choose r items out of n (nCr = n! / (r!(n-r)!)), in order and without repeats.",
  logic: "Recursion with a start index: fill data[index] with each element from start to the end, then recurse with start = i+1 and index+1. When index equals r, print.",
  code: `/* Combination-> ncr=n!/r!(n-r)!;

Input:
5
1 2 3 4 5
3
Output:
1 2 3
1 2 4
1 2 5
1 3 5
1 3 5
1 4 5
2 3 4
2 3 5
2 4 5
3 4 5

Program  */

import java.util.*;

public class Main
{
    public static void combination(int arr[],int data[],int start,int end,int index,int r)
    {

        if (index==r)
        {
            for(int i=0;i<r;i++)
            {
                System.out.print(data[i]+" ");
            }
            System.out.println(" ");
            return;
        }

        for(int i=start;i<=end;i++)
        {
            data[index]=arr[i];
            combination(arr,data,i+1,end,index+1,r);
        }
    }

    public static void main(String[] args) {
        Scanner input=new Scanner(System.in);
        int n=input.nextInt();
        int arr[]=new int [n];
        for(int i=0;i<n;i++)
        {
            arr[i]=input.nextInt();

        }
        int r=input.nextInt();
        int data[]=new int[r];
        combination(arr,data,0,n-1,0,r);

    }
}` },
{ id: "l34", lec: 34, name: "Josephus trap", cat: "FAT", pattern: "Coding",
  about: "Josephus problem: n people stand in a circle and every k-th is eliminated. Find the position of the survivor.",
  logic: "Recurrence J(1) = 1 and J(n) = (J(n-1) + k - 1) mod n + 1. Run it iteratively from 1 up to n to avoid recursion.",
  code: `// Java code to Implement Josephus Problem
import java.io.*;

class GFG {
public static int Josephus(int N, int k) {

    // Initialize variables i and ans with 1 and 0 respectively.
    int i = 1, ans = 0;

    // Run a while loop till i <= N
    while (i <= N) {

    // Update the Value of ans and Increment i by 1
    ans = (ans + k) % i;
    i++;
    }

    // Return required answer
    return ans + 1;
}

// main function
public static void main (String[] args) {

    int N = 14, k = 2;
    int ans = Josephus(N, k);
    System.out.println(ans);
}
}

// This code is presented by Akash Mangal

// Java code for Josephus Problem using recursion

class JosephusRecursion {

    static int josephus(int n, int k)
    {
        if (n == 1)
            return 1;
        else
            /* The position returned by josephus(n - 1, k)
            is adjusted because the recursive call
            josephus(n - 1, k) considers the original
            position k%n + 1 as position 1 */
            return (josephus(n - 1, k) + k - 1) % n + 1;
    }

    // Driver Program to test above function
    public static void main(String[] args)
    {
        int n = 14;
        int k = 2;
        System.out.println("The chosen place is "
                        + josephus(n, k));
    }
}

// This code is contributed by Prerna Saini` },
{ id: "l35", lec: 35, name: "Maze Solving", cat: "FAT", pattern: "Coding",
  about: "Rat in a maze: find a path from the top-left to the bottom-right through cells marked 1 using backtracking.",
  logic: "From a cell mark it as part of the path, try to move right then down, and if neither works unmark it (backtrack) and return false. Stop when the goal is reached.",
  code: `/* Java program to solve Rat in
a Maze problem using backtracking */

class RatMaze {
    static int N;
    void printSolution(int sol[][])
    {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(
                    " " + sol[i][j] + " ");
            System.out.println();
        }
    }
    boolean isSafe(
        int maze[][], int x, int y)
    {
        return (x >= 0 && x < N && y >= 0
                && y < N && maze[x][y] == 1);
    }
    boolean solveMaze(int maze[][])
    {
        int sol[][] = new int[N][N];
        if (solveMazeUtil(maze, 0, 0, sol) == false) {
            System.out.print("Solution doesn't exist");
            return false;
        }
        printSolution(sol);
        return true;
    }
    boolean solveMazeUtil(int maze[][], int x, int y,
                    int sol[][])
    {

        if (x == N - 1 && y == N - 1
            && maze[x][y] == 1) {
            sol[x][y] = 1;
            return true;
        }

        if (isSafe(maze, x, y) == true) {
            // Check if the current block is already part of solution path.
            if (sol[x][y] == 1)
                return false;

            // mark x, y as part of solution path
            sol[x][y] = 1;

            /* Move forward in x direction */
            if (solveMazeUtil(maze, x + 1, y, sol))
                return true;

            /* If moving in x direction doesn't give
            solution then Move down in y direction */
            if (solveMazeUtil(maze, x, y + 1, sol))
                return true;

            /* If none of the above movements works then
            BACKTRACK: unmark x, y as part of solution
            path */
            sol[x][y] = 0;
            return false;
        }

        return false;
    }
}
public class Main{
    public static void main(String args[])
    {
        RatMaze rat = new RatMaze();
        int maze[][] = {{ 1, 0, 0 ,0},
                        { 1, 1, 0, 0 },
                        { 0, 1, 1, 0 },
                        { 1, 1, 1, 1 } };

        rat.N = maze.length;
        rat.solveMaze(maze);
    }
}` },
{ id: "l36", lec: 36, name: "N Queens", cat: "FAT", pattern: "Coding",
  about: "N Queens: place N queens on an N\u00d7N board so that none attack each other, using backtracking.",
  logic: "Place one queen per row. For each column check the column and both diagonals above, and if it is safe place the queen and go to the next row. Unplace it afterwards to try other columns.",
  code: `//N QUEEN

import java.util.Arrays;
import java.util.Scanner;
public class Main
{
// Function to check if two queens threaten each other or not
private static boolean isSafe(char mat[][], int r, int c,int N)
{
// return false if two queens share the same column

for (int i = 0; i < r; i++)
{
if (mat[i][c] == '1')
 {
return false;
}
}
// return false if two queens share the same \`\\\` diagonal
for (int i = r, j = c; i >= 0 && j >= 0; i--, j--)
{
if (mat[i][j] == '1') {
return false;
}
}
// return false if two queens share the same \`/\` diagonal
for (int i = r, j = c; i >= 0 && j < N; i--, j++)
{
if (mat[i][j] == '1') {
return false;
}
}
return true;
}
private static void printSolution(char mat[][],int N)
{
for (int i = 0; i < N; i++)
{
    for (int j = 0; j < N;j++)
System.out.print(mat[i][j]+" ");
System.out.println();
}
System.out.println();
}
private static void nQueen(char mat[][], int r,int N)
{
if (r == N)
{
printSolution(mat,N);

return;
}
for (int i = 0; i < N; i++)
{
if (isSafe(mat, r, i,N))
{
mat[r][i] = '1';
nQueen(mat, r + 1,N);
mat[r][i] = '0';
}
}
}
public static void main(String[] args)
{
Scanner ip=new Scanner(System.in);
int N=ip.nextInt();
char[][] mat = new char[N][N];
for (int i = 0; i < N; i++)
{
Arrays.fill(mat[i],'0');
}
nQueen(mat, 0,N);
}
}` },
{ id: "l37", lec: 37, name: "Warnsdorff's Algorithm", cat: "FAT", pattern: "Coding",
  about: "Warnsdorff's rule finds a knight's tour: a path that visits every square of the board exactly once.",
  logic: "From the current square always move to the unvisited square that has the fewest onward moves. Backtrack if it dead-ends.",
  code: `import java.util.Arrays;
public class Main {
    private static final int BOARD_SIZE = 8;
    private static final int[] ROW_MOVES = {2, 1, -1, -2, -2, -1, 1, 2};
    private static final int[] COL_MOVES = {1, 2, 2, 1, -1, -2, -2, -1};
    private static boolean isSafe(int[][] board, int row, int col) {
        return (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && board[row][col] == -1);
    }
    private static int countNeighbours(int[][] board, int row, int col) {
        int count = 0;
        for (int i = 0; i < 8; i++) {
            int newRow = row + ROW_MOVES[i];
            int newCol = col + COL_MOVES[i];
            if (isSafe(board, newRow, newCol)) {
                count++;
            }
        }
        return count;
    }
    private static boolean knightTour(int[][] board, int row, int col, int move) {
        if (move == BOARD_SIZE * BOARD_SIZE) {
            return true; // All squares have been visited
        }

        int minNeighbours = Integer.MAX_VALUE;
        int minIndex = -1;

        for (int i = 0; i < 8; i++) {
            int newRow = row + ROW_MOVES[i];
            int newCol = col + COL_MOVES[i];
            if (isSafe(board, newRow, newCol)) {
                int numNeighbours = countNeighbours(board, newRow, newCol);
                if (numNeighbours < minNeighbours) {
                    minNeighbours = numNeighbours;
                    minIndex = i;
                }
            }
        }

        if (minIndex != -1) {
            int newRow = row + ROW_MOVES[minIndex];
            int newCol = col + COL_MOVES[minIndex];
            board[newRow][newCol] = move;
            if (knightTour(board, newRow, newCol, move + 1)) {
                return true;
            } else {
                board[newRow][newCol] = -1; // Backtrack
            }
        }

        return false;
    }

    public static void main(String[] args) {
        int[][] board = new int[BOARD_SIZE][BOARD_SIZE];
        for (int i = 0; i < BOARD_SIZE; i++) {
            Arrays.fill(board[i], -1); // Initialize board with -1 (unvisited)
        }

        int startRow = 0;
        int startCol = 0;

        board[startRow][startCol] = 0; // Mark the starting square as visited

        if (knightTour(board, startRow, startCol, 1)) {
            System.out.println("Knight's Tour:");
            for (int i = 0; i < BOARD_SIZE; i++) {
                for (int j = 0; j < BOARD_SIZE; j++) {
                    System.out.printf("%2d ", board[i][j]);
                }
                System.out.println();
            }
        } else {
            System.out.println("No Knight's Tour found.");
 }
}
}` },
{ id: "l38", lec: 38, name: "Hamiltonian Cycle", cat: "FAT", pattern: "Coding",
  about: "A Hamiltonian cycle visits every vertex exactly once and returns to the start. Finding one is NP-complete, so backtracking is used.",
  logic: "Start at vertex 0. At each position try each vertex that is adjacent to the previous one and not yet used. At the end there must be an edge back to vertex 0.",
  code: `/* Java program for solution of Hamiltonian Cycle problem
using backtracking */
class HamiltonianCycle
{
    final int V = 5;
    int path[];

    /* A utility function to check if the vertex v can be
    added at index 'pos'in the Hamiltonian Cycle
    constructed so far (stored in 'path[]') */
    boolean isSafe(int v, int graph[][], int path[], int pos)
    {
        /* Check if this vertex is an adjacent vertex of
        the previously added vertex. */
        if (graph[path[pos - 1]][v] == 0)
            return false;

        /* Check if the vertex has already been included.
        This step can be optimized by creating an array
        of size V */
        for (int i = 0; i < pos; i++)
            if (path[i] == v)
                return false;

        return true;
    }

    /* A recursive utility function to solve hamiltonian
    cycle problem */
    boolean hamCycleUtil(int graph[][], int path[], int pos)
    {
        /* base case: If all vertices are included in
        Hamiltonian Cycle */
        if (pos == V)
        {
            // And if there is an edge from the last included
            // vertex to the first vertex
            if (graph[path[pos - 1]][path[0]] == 1)
                return true;
            else
                return false;
        }

        // Try different vertices as a next candidate in
        // Hamiltonian Cycle. We don't try for 0 as we
        // included 0 as starting point in hamCycle()
        for (int v = 1; v < V; v++)
        {
            /* Check if this vertex can be added to Hamiltonian
            Cycle */
            if (isSafe(v, graph, path, pos))
            {
                path[pos] = v;

                /* recur to construct rest of the path */
                if (hamCycleUtil(graph, path, pos + 1) == true)
                    return true;

                /* If adding vertex v doesn't lead to a solution,
                then remove it */
                path[pos] = -1;
            }
        }

        /* If no vertex can be added to Hamiltonian Cycle
        constructed so far, then return false */
        return false;
    }

    /* This function solves the Hamiltonian Cycle problem using
    Backtracking. It mainly uses hamCycleUtil() to solve the
    problem. It returns false if there is no Hamiltonian Cycle
    possible, otherwise return true and prints the path.
    Please note that there may be more than one solutions,
    this function prints one of the feasible solutions. */
    int hamCycle(int graph[][])
    {
        path = new int[V];
        for (int i = 0; i < V; i++)
            path[i] = -1;

        /* Let us put vertex 0 as the first vertex in the path.
        If there is a Hamiltonian Cycle, then the path can be
        started from any point of the cycle as the graph is
        undirected */
        path[0] = 0;
        if (hamCycleUtil(graph, path, 1) == false)
        {
            System.out.println("\\nSolution does not exist");
            return 0;
        }

        printSolution(path);
        return 1;
    }

    /* A utility function to print solution */
    void printSolution(int path[])
    {
        System.out.println("Solution Exists: Following" +
                        " is one Hamiltonian Cycle");
        for (int i = 0; i < V; i++)
            System.out.print(" " + path[i] + " ");

        // Let us print the first vertex again to show the
        // complete cycle
        System.out.println(" " + path[0] + " ");
    }

    // driver program to test above function
    public static void main(String args[])
    {
        HamiltonianCycle hamiltonian =
                                new HamiltonianCycle();
        /* Let us create the following graph
        (0)--(1)--(2)
            | / \\ |
            | / \\ |
            | /     \\ |
        (3)-------(4) */
        int graph1[][] = {{0, 1, 0, 1, 0},
            {1, 0, 1, 1, 1},
            {0, 1, 0, 0, 1},
            {1, 1, 0, 0, 1},
            {0, 1, 1, 1, 0},
        };

        // Print the solution
        hamiltonian.hamCycle(graph1);

        /* Let us create the following graph
        (0)--(1)--(2)
            | / \\ |
            | / \\ |
            | /     \\ |
        (3)     (4) */
        int graph2[][] = {{0, 1, 0, 1, 0},
            {1, 0, 1, 1, 1},
            {0, 1, 0, 0, 1},
            {1, 1, 0, 0, 0},
            {0, 1, 1, 0, 0},
        };

        // Print the solution
        hamiltonian.hamCycle(graph2);
    }
}
// This code is contributed by Abhishek Shankhadhar` },
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
