// Java program to bring hyphen in front of
// string using swapping technique
public class Main
{

    // Function to find spaces and move to beginning
    static void moveHyphenInFront(char str[])
    {
        // Traverse from end and swap spaces
        int i = str.length-1;
        for (int j = i; j >= 0; j--)
            if (str[j] != '_')
            {
                char c = str[i];
                str[i] = str[j];
                str[j] = c;
                i--;
            }
    }

    // Driver code
    public static void main(String[] args)
    {
        char str[] = "FACE_PREP".toCharArray();
        moveHyphenInFront(str);
        System.out.println(String.valueOf(str));
    }
}
