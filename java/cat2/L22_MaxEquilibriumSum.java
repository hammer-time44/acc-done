import java.util.Scanner;
import java.io.*;
public class Main
{
    public static int equlibrium_sum(int a[],int n)
    {
        int i;
        int sum =0,max =0,prefix_sum=0;
        for( i=0;i<n;i++)
        {
            sum =sum+a[i];
        } for(i=0;i<n;i++)
        {
            prefix_sum +=a[i];
            if (prefix_sum == sum)
            {
                if(max<prefix_sum)
                {
                    max=prefix_sum;
                }
            }
            sum = sum - a[i];
        }
        return max;
    }
    public static void main (String[] args)
    {
        Scanner sw = new Scanner(System.in);
        System.out.println("Enter the size of the array");

        int n=sw.nextInt();
        int arr[] = new int[n];
        System.out.println("Enter the elements of the array");
        for(int i =0;i<n;i++) arr[i]=sw.nextInt();
        int result=equlibrium_sum(arr, n);
        if(result==0)
            System.out.println("None");
        else
            System.out.println("Maximum equilibrium sum :"+result);

    }
}
