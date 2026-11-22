import java.util.*;

public class Main2 {
    static int node;
    static int[][] graph;
    static int[] path;

    static void displayCycle() {
        for (int i = 0; i < node; i++)
            System.out.print(path[i] + " ");
        System.out.println(path[0]);
    }

    static boolean isValid(int v, int k) {
        if (graph[path[k - 1]][v] == 0)
            return false;
        for (int i = 0; i < k; i++)
            if (path[i] == v)
                return false;
        return true;
    }

    static boolean cycleFound(int k) {
        if (k == node)
            return graph[path[k - 1]][path[0]] == 1;
        for (int v = 1; v < node; v++) {
            if (isValid(v, k)) {
                path[k] = v;
                if (cycleFound(k + 1))
                    return true;
                path[k] = -1;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of nodes: ");
        node = sc.nextInt();
        graph = new int[node][node];
        path = new int[node];
        System.out.println("Enter adjacency matrix:");
        for (int i = 0; i < node; i++)
            for (int j = 0; j < node; j++)
                graph[i][j] = sc.nextInt();

        path[0] = 0;
        for (int i = 1; i < node; i++)
            path[i] = -1;

        if (cycleFound(1))
            displayCycle();
        else
            System.out.println("No Hamiltonian Cycle found.");
    }
}
