// segmented and Incremental sieve alg
import java.util.*;
public class Main
{
public static void main(String[] args) {
Scanner sc = new Scanner(System.in);
int l = sc.nextInt();
int h = sc.nextInt();
boolean b[] = new boolean[h+1];
for(int i=2;i*i<=h;i++)
{
   int sm = (l/i)*i;
   if(sm<l)
       sm+=i;
   for(int j=2*i;j<=h;j=j+i)
       b[j] = true;
}
for(int i=l;i<=h;i++)
{
   if(b[i]==false)
       System.out.println(i);
}

}
}
