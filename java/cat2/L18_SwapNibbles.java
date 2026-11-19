public class SwapNibbles {

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
}
