public class MajorityElement {

    // Boyer-Moore voting: O(n) time, O(1) space
    static int majority(int[] a) {
        int candidate = 0, count = 0;
        for (int x : a) {
            if (count == 0) candidate = x;
            count += (x == candidate) ? 1 : -1;
        }
        // verify: the candidate may not be a real majority
        int occurrences = 0;
        for (int x : a) if (x == candidate) occurrences++;
        return occurrences * 2 > a.length ? candidate : -1;
    }

    public static void main(String[] args) {
        System.out.println(majority(new int[]{3, 3, 4, 2, 4, 4, 2, 4, 4}));  // 4
        System.out.println(majority(new int[]{3, 3, 4, 2, 4, 4, 2, 4}));     // -1
        System.out.println(majority(new int[]{1}));                          // 1
    }
}
