public class LongestOnesAfterFlip {

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
}
