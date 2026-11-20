// Java program to distinct permutations of the string
import java.util.Scanner;
public class Main {

// Re turns true if str[curr] does not matches with any of the
// characters after str[start]
    static boolean shouldSwap(char str[], int start, int curr) {
        for (int i = start; i < curr; i++) {
            if (str[i] == str[curr]) {
                return false;
            }
        }
        return true;
    }

// Prints all distinct permutations in str[0..n-1]
    static void findPermutations(char str[], int fi) {
        if (fi == str.length) {
            System.out.println(str);
            return;
        }
        for (int i = fi; i < str.length; i++) {
            // Proceed further for str[i] only if it
            // doesn't match with any of the characters
            // after str[index]
            boolean check = shouldSwap(str, fi, i);
            if (check) {
                swap(str, fi, i);
                findPermutations(str, fi + 1);
                swap(str, fi, i);
            }
          }
    }
    static void swap(char[] str, int i, int fi) {
        char c = str[i];
        str[i] = str[fi];
        str[fi] = c;
    }

    // Driver code
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        String str=sc.next();
        char s[] = str.toCharArray();
        int n = s.length;
        System.out.println("The permutations of the given string are");
        findPermutations(s, 0);
    }

}
