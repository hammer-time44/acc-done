public class BoothMultiplication {

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
}
