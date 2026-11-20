import java.util.*;

// Alice apple tree
import java.util.*;
public class AliceLoop {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int apple=sc.nextInt();
        int cnt=0,sum=0;
        while(sum<apple){
            cnt++;
            sum+=(12*cnt*cnt);

        }
        System.out.println((8*(cnt)));
    }
}

class AliceBinary {
    static long minimumPerimeter(long neededApples) {
        long left = 1;
        long right = 100000;
        while (left < right) {
            long r = (left + right) / 2;
            if (2 * r * (r + 1) * (2 * r + 1) >= neededApples) {
                right = r;
            } else {
                left = r + 1;
            }
        }
        return left * 8;
    }
    public static void main(String args[])
    {
        System.out.println(minimumPerimeter(1));
    }
}

//Toggle the switch
class Toggle {
public static void main(String[] args) {
Scanner sc=new Scanner(System.in);
int n=sc.nextInt();
//System.out.println((int)Math.sqrt(n));
  boolean b[] = new boolean[n+1];
  int i,j,c=0;
  for(i=2;i<=n;i++)
        {
          for(j=i;j<=n;j+=i)
          {
            if(b[j]==false)
              b[j] = true;
            else
              b[j] = false;
          } }
  for(i=1;i<=n;i++)
        {
          if(b[i]==false)
            c++;
        }
  System.out.println(c);

}
}
