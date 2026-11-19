/* Algorithm reference data for the tracker, mock exam and bug hunt. */
var ALGOS = [
{
  id: "bsearch", name: "Binary search", pattern: "Divide and conquer", time: "O(log n)", space: "O(1)",
  idea: "Keep a window [lo, hi] that must contain the target. Look at the middle. If it is too small, drop the left half. If too big, drop the right half.",
  code: `public class BinarySearch {

    static int search(int[] a, int target) {
        int lo = 0, hi = a.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] == target) return mid;
            if (a[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] a = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println(search(a, 23));
        System.out.println(search(a, 7));
    }
}`,
  keys: [
    { label: "hi starts at length - 1", re: /hi\s*=\s*\w+\.length\s*-\s*1/ },
    { label: "loop runs while lo <= hi", re: /while\s*\(\s*lo\s*<=\s*hi\s*\)/ },
    { label: "mid computed without overflow", re: /mid\s*=\s*lo\s*\+\s*\(\s*hi\s*-\s*lo\s*\)\s*\/\s*2|mid\s*=\s*\(\s*lo\s*\+\s*hi\s*\)\s*(>>>|\/)\s*(1|2)/ },
    { label: "lo = mid + 1 when too small", re: /lo\s*=\s*mid\s*\+\s*1/ },
    { label: "hi = mid - 1 when too big", re: /hi\s*=\s*mid\s*-\s*1/ },
    { label: "returns -1 when not found", re: /return\s+-\s*1/ }
  ],
  bug: { find: "if (a[mid] < target) lo = mid + 1;", replace: "if (a[mid] < target) lo = mid;", why: "lo = mid never moves the window when hi = lo + 1, so the loop runs forever. It must be mid + 1, because mid was already checked." }
},
{
  id: "kadane", name: "Kadane's maximum subarray", pattern: "Dynamic programming", time: "O(n)", space: "O(1)",
  idea: "Walk through the array keeping the best sum of a subarray that ends at the current index. Either extend the previous run or start fresh at this element.",
  code: `public class Kadane {

    static int maxSubarray(int[] a) {
        int cur = a[0], best = a[0];
        for (int i = 1; i < a.length; i++) {
            cur = Math.max(a[i], cur + a[i]);
            best = Math.max(best, cur);
        }
        return best;
    }

    public static void main(String[] args) {
        int[] a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(maxSubarray(a));
    }
}`,
  keys: [
    { label: "starts from a[0] or MIN_VALUE (handles all-negative input)", re: /=\s*\w+\[0\]|Integer\.MIN_VALUE/ },
    { label: "extends the run or restarts at a[i]", re: /Math\.max\([^;]*cur[^;]*\)|if\s*\(\s*cur\s*<\s*0\s*\)/ },
    { label: "keeps the best sum seen so far", re: /best\s*=\s*Math\.max|if\s*\(\s*cur\s*>\s*best\s*\)/ },
    { label: "returns best", re: /return\s+best/ }
  ],
  bug: { find: "int cur = a[0], best = a[0];", replace: "int cur = 0, best = 0;", why: "Starting both at 0 returns 0 for an all-negative array, but the answer should be the largest single element. Start from a[0]." }
},
{
  id: "bfs", name: "Breadth-first search", pattern: "Graph traversal", time: "O(V + E)", space: "O(V)",
  idea: "Visit nodes in rings around the start. A queue holds the frontier. Mark a node as seen when you add it, so it is never added twice.",
  code: `import java.util.*;

public class BFS {

    static List<Integer> bfs(List<List<Integer>> g, int start) {
        List<Integer> order = new ArrayList<>();
        boolean[] seen = new boolean[g.size()];
        Queue<Integer> q = new ArrayDeque<>();
        seen[start] = true;
        q.add(start);
        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int v : g.get(u)) {
                if (!seen[v]) {
                    seen[v] = true;
                    q.add(v);
                }
            }
        }
        return order;
    }

    public static void main(String[] args) {
        int n = 6;
        List<List<Integer>> g = new ArrayList<>();
        for (int i = 0; i < n; i++) g.add(new ArrayList<>());
        int[][] edges = {{0, 1}, {0, 2}, {1, 3}, {2, 3}, {3, 4}, {4, 5}};
        for (int[] e : edges) {
            g.get(e[0]).add(e[1]);
            g.get(e[1]).add(e[0]);
        }
        System.out.println(bfs(g, 0));
    }
}`,
  keys: [
    { label: "uses a queue", re: /Queue|ArrayDeque|LinkedList/ },
    { label: "keeps a visited array or set", re: /boolean\s*\[\]|visited|seen|Set\s*</i },
    { label: "loops while the queue is not empty", re: /while\s*\(\s*!\s*\w+\.isEmpty\(\)\s*\)/ },
    { label: "takes the next node with poll or remove", re: /\.poll\(|\.remove\(\)/ },
    { label: "loops over the neighbours", re: /for\s*\([^)]*:[^)]*\)|for\s*\(\s*int\s+\w+\s*=\s*0/ }
  ],
  bug: { find: "if (!seen[v]) {", replace: "if (seen[v]) {", why: "The condition is inverted. Nothing unseen is ever added, so the search stops after the start node. It should only add neighbours that are not yet seen." }
},
{
  id: "dijkstra", name: "Dijkstra's shortest path", pattern: "Graph, priority queue", time: "O((V + E) log V)", space: "O(V + E)",
  idea: "Keep the best known distance to every node. Repeatedly take the closest unfinished node from a min-heap and try to improve each neighbour through it. Skip stale heap entries.",
  code: `import java.util.*;

public class Dijkstra {

    static class Edge {
        int to, w;
        Edge(int to, int w) { this.to = to; this.w = w; }
    }

    static int[] shortestPaths(List<List<Edge>> graph, int src) {
        int n = graph.size();
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
        pq.offer(new int[]{src, 0});

        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int u = cur[0], d = cur[1];

            if (d > dist[u]) continue;

            for (Edge e : graph.get(u)) {
                int nd = d + e.w;
                if (nd < dist[e.to]) {
                    dist[e.to] = nd;
                    pq.offer(new int[]{e.to, nd});
                }
            }
        }
        return dist;
    }

    static void addEdge(List<List<Edge>> g, int a, int b, int w) {
        g.get(a).add(new Edge(b, w));
        g.get(b).add(new Edge(a, w));
    }

    public static void main(String[] args) {
        int n = 5;
        List<List<Edge>> g = new ArrayList<>();
        for (int i = 0; i < n; i++) g.add(new ArrayList<>());

        addEdge(g, 0, 1, 4);
        addEdge(g, 0, 2, 1);
        addEdge(g, 2, 1, 2);
        addEdge(g, 1, 3, 1);
        addEdge(g, 2, 3, 5);
        addEdge(g, 3, 4, 3);

        int[] dist = shortestPaths(g, 0);
        for (int i = 0; i < n; i++) {
            System.out.println("0 -> " + i + " = " + dist[i]);
        }
    }
}`,
  keys: [
    { label: "all distances start at infinity", re: /Integer\.MAX_VALUE|Long\.MAX_VALUE|INF/ },
    { label: "source distance is 0", re: /dist\[\s*\w+\s*\]\s*=\s*0/ },
    { label: "uses a PriorityQueue as the min-heap", re: /PriorityQueue/ },
    { label: "skips stale entries", re: /\w+\s*>\s*dist\[\s*\w+\s*\]/ },
    { label: "relaxes: new distance < dist[neighbour]", re: /<\s*dist\[/ },
    { label: "pushes the improved distance onto the heap", re: /(offer|add)\s*\(/ }
  ],
  bug: { find: "int nd = d + e.w;", replace: "int nd = e.w;", why: "The new distance must include the distance already travelled to u. Using only the edge weight compares the wrong numbers and gives wrong shortest paths." }
}
];
