import java.util.*;
import java.util.regex.*;

public class NaturalSort {

    // Split into digit and non-digit chunks, compare chunk by chunk
    static int compare(String x, String y) {
        List<String> a = chunks(x), b = chunks(y);
        for (int i = 0; i < Math.min(a.size(), b.size()); i++) {
            String p = a.get(i), q = b.get(i);
            if (p.equals(q)) continue;
            if (Character.isDigit(p.charAt(0)) && Character.isDigit(q.charAt(0)))
                return Long.compare(Long.parseLong(p), Long.parseLong(q));
            return p.compareTo(q);
        }
        return Integer.compare(a.size(), b.size());
    }

    static List<String> chunks(String s) {
        List<String> out = new ArrayList<>();
        Matcher m = Pattern.compile("\\d+|\\D+").matcher(s);
        while (m.find()) out.add(m.group());
        return out;
    }

    public static void main(String[] args) {
        String[] files = {"file10", "file2", "file1", "img12", "img3"};
        Arrays.sort(files, NaturalSort::compare);
        System.out.println(Arrays.toString(files));
        // [file1, file2, file10, img3, img12]
    }
}
