import java.util.Scanner;
public class Hourglass {
    static int findMaxSum(int [][]mat,int R,int C)
    {
        int max_sum=0;
        int sum;

        if (R < 3 || C < 3){
            System.out.println("Not possible");
            System.exit(0);
        }
        for (int i = 0; i < R - 2; i++)
        {
            for (int j = 0; j < C - 2; j++)
            {
                sum = (mat[i][j] + mat[i][j + 1] +
                    mat[i][j + 2]) + (mat[i + 1][j + 1]) +
                    (mat[i + 2][j] + mat[i + 2][j + 1] +
                    mat[i + 2][j + 2]);
                max_sum = Math.max(max_sum, sum);
            }
        }
        return max_sum;
    }
    static public void main (String[] args)
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number of rows");

        int R = sc.nextInt();
        System.out.println("Enter the number of columns");
        int C= sc.nextInt();

        int [][]mat = new int[R][C];
        System.out.println("Enter the elements of the matrix");
        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                mat[i][j]= sc.nextInt();
            }
        }
        int res = findMaxSum(mat,R,C);
        System.out.println("Maximum sum of hour glass = "+ res);
    }

}
