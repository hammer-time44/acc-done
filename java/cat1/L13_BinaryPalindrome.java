public class BinaryPalindrome {

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
}
