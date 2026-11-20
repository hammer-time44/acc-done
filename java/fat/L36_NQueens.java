//N QUEEN

import java.util.Arrays;
import java.util.Scanner;
public class Main
{
// Function to check if two queens threaten each other or not
private static boolean isSafe(char mat[][], int r, int c,int N)
{
// return false if two queens share the same column

for (int i = 0; i < r; i++)
{
if (mat[i][c] == '1')
 {
return false;
}
}
// return false if two queens share the same `\` diagonal
for (int i = r, j = c; i >= 0 && j >= 0; i--, j--)
{
if (mat[i][j] == '1') {
return false;
}
}
// return false if two queens share the same `/` diagonal
for (int i = r, j = c; i >= 0 && j < N; i--, j++)
{
if (mat[i][j] == '1') {
return false;
}
}
return true;
}
private static void printSolution(char mat[][],int N)
{
for (int i = 0; i < N; i++)
{
    for (int j = 0; j < N;j++)
System.out.print(mat[i][j]+" ");
System.out.println();
}
System.out.println();
}
private static void nQueen(char mat[][], int r,int N)
{
if (r == N)
{
printSolution(mat,N);

return;
}
for (int i = 0; i < N; i++)
{
if (isSafe(mat, r, i,N))
{
mat[r][i] = '1';
nQueen(mat, r + 1,N);
mat[r][i] = '0';
}
}
}
public static void main(String[] args)
{
Scanner ip=new Scanner(System.in);
int N=ip.nextInt();
char[][] mat = new char[N][N];
for (int i = 0; i < N; i++)
{
Arrays.fill(mat[i],'0');
}
nQueen(mat, 0,N);
}
}
