import java.util.*;

public class Strobogrammatic {

    static boolean isStrobogrammatic(String s) {
        Map<Character, Character> m = Map.of('0', '0', '1', '1', '8', '8', '6', '9', '9', '6');
        int i = 0, j = s.length() - 1;
        while (i <= j) {
            Character t = m.get(s.charAt(i));
            if (t == null || t != s.charAt(j)) return false;
            i++;
            j--;
        }
        return true;
    }

    // All strobogrammatic numbers with n digits
    static List<String> generate(int n) { return build(n, n); }

    static List<String> build(int n, int total) {
        if (n == 0) return new ArrayList<>(List.of(""));
        if (n == 1) return new ArrayList<>(List.of("0", "1", "8"));
        List<String> inner = build(n - 2, total), out = new ArrayList<>();
        for (String s : inner) {
            if (n != total) out.add("0" + s + "0");
            out.add("1" + s + "1");
            out.add("6" + s + "9");
            out.add("8" + s + "8");
            out.add("9" + s + "6");
        }
        return out;
    }

    public static void main(String[] args) {
        System.out.println(isStrobogrammatic("69"));
        System.out.println(isStrobogrammatic("962"));
        System.out.println(generate(2));
        System.out.println(generate(3));
    }
}
