public class FirstPalindrome {

    // Rearrange s into the lexicographically smallest palindrome, or "-1".
    static String firstPalindrome(String s) {
        int[] cnt = new int[26];
        for (char ch : s.toCharArray()) cnt[ch - 'a']++;

        int odd = -1;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] % 2 == 1) {
                if (odd != -1) return "-1";       // two odd letters: impossible
                odd = i;
            }
        }

        StringBuilder half = new StringBuilder();
        for (int i = 0; i < 26; i++)
            for (int k = 0; k < cnt[i] / 2; k++) half.append((char) ('a' + i));

        StringBuilder res = new StringBuilder(half);
        if (odd != -1) res.append((char) ('a' + odd));
        res.append(half.reverse());
        return res.toString();
    }

    public static void main(String[] args) {
        System.out.println(firstPalindrome("aabb"));    // abba
        System.out.println(firstPalindrome("bbaaa"));   // ababa
        System.out.println(firstPalindrome("abc"));     // -1
        System.out.println(firstPalindrome("racecar")); // acrerca
    }
}
