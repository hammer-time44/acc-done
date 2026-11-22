import java.util.*;

public class Toggle {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); // Read the number of switches
        boolean[] b = new boolean[n + 1]; // Array to represent the state of each switch

        // Iterate through each switch number
        for (int i = 1; i <= n; i++) {
            // Toggle all switches that are multiples of i
            for (int j = i; j <= n; j += i) {
                b[j] = !b[j]; // Toggle the state of switch j
            }
        }
        int openCount = 0; // To count the number of switches that are open
        int closedCount = 0; // To count the number of switches that are closed

        // Count the number of open and closed switches
        for (int i = 1; i <= n; i++) {
            if (b[i]) {
                openCount++;
            } else {
                closedCount++;
            }
        }

        // Output the results
        System.out.println("Number of switches open: " + openCount);
        System.out.println("Number of switches closed: " + closedCount);
    }
}

class AliceAppleTree {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int apple=sc.nextInt();
        int cnt=0,sum=0;
        while(sum<apple){
            cnt++;
            sum+=(12*cnt*cnt);

        }
        System.out.println((8*(cnt)));
    }
}
