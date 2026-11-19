public class JavaBasics {

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
}
