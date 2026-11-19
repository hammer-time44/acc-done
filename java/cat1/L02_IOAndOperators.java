import java.util.Scanner;

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
}
