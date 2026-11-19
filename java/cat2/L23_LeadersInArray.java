import java.util.*;

public class LeadersInArray {

    // A leader is >= every element to its right.
    static List<Integer> leaders(int[] a) {
        LinkedList<Integer> out = new LinkedList<>();
        int max = Integer.MIN_VALUE;
        for (int i = a.length - 1; i >= 0; i--) {
            if (a[i] >= max) {
                out.addFirst(a[i]);
                max = a[i];
            }
        }
        return out;
    }

    public static void main(String[] args) {
        System.out.println(leaders(new int[]{16, 17, 4, 3, 5, 2}));   // [17, 5, 2]
        System.out.println(leaders(new int[]{1, 2, 3, 4, 0}));        // [4, 0]
        System.out.println(leaders(new int[]{7, 7, 7}));              // [7, 7, 7]
    }
}
