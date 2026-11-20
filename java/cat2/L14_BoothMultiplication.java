import java.util.Scanner;

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
        System.out.println("\n\nResult : " + n1 + " * " + n2 + " = " + result);
}
}
