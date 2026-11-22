public class NibbleSwap {
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
}
