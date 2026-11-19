public class TimeSpace1 {

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
}
