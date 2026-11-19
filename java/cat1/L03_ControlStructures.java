public class ControlStructures {

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
}
