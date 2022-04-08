import java.util.ArrayList;
import java.util.List;

public class Main {
	
	public static void main(String[] args) {
		// Exerice 1: A completer : création du graphe -- done
		Graph g = new Graph();

		//Ajout des Nodes
		ArrayList<Node> nodesToAdd = new ArrayList<Node>();
		Node nodeA = new Node(1, "A", 0, 0);
		Node nodeB = new Node(2, "B", 0, 0);
		Node nodeC = new Node(3, "C", 0, 0);
		Node nodeD = new Node(4, "D", 0, 0);
		Node nodeE = new Node(5, "E", 0, 0);
		Node nodeF = new Node(6, "F", 0, 0);
		Node nodeG = new Node(1, "G", 0, 0);
		nodesToAdd.add(nodeA);
		nodesToAdd.add(nodeB);
		nodesToAdd.add(nodeC);
		nodesToAdd.add(nodeD);
		nodesToAdd.add(nodeE);
		nodesToAdd.add(nodeF);
		nodesToAdd.add(nodeG);

		g.setNodes(nodesToAdd);

		//Ajout des Edges
		ArrayList<Edge>edgesToAdd = new ArrayList<Edge>();
		Edge edgeAB = new Edge(nodeA, nodeB, 2);
		Edge edgeAC = new Edge(nodeA, nodeC, 1);
		Edge edgeBC = new Edge(nodeB, nodeC, 2);
		Edge edgeBD = new Edge(nodeB, nodeD, 1);
		Edge edgeBE = new Edge(nodeB, nodeE, 1);
		Edge edgeCD = new Edge(nodeC, nodeD, 4);
		Edge edgeCE = new Edge(nodeC, nodeE, 3);
		Edge edgeCF = new Edge(nodeC, nodeF, 5);
		Edge edgeDF = new Edge(nodeD, nodeF, 6);
		Edge edgeDG = new Edge(nodeD, nodeG, 5);
		Edge edgeEF = new Edge(nodeE, nodeF, 1);
		Edge edgeFG = new Edge(nodeF, nodeG, 2);
		edgesToAdd.add(edgeAB);
		edgesToAdd.add(edgeAC);
		edgesToAdd.add(edgeBC);
		edgesToAdd.add(edgeBD);
		edgesToAdd.add(edgeBE);
		edgesToAdd.add(edgeCD);
		edgesToAdd.add(edgeCE);
		edgesToAdd.add(edgeCF);
		edgesToAdd.add(edgeDF);
		edgesToAdd.add(edgeDG);
		edgesToAdd.add(edgeEF);
		edgesToAdd.add(edgeFG);

		/*
		Edge edgeBA = new Edge(nodeB, nodeA, 2);
		Edge edgeCA = new Edge(nodeC, nodeA, 1);
		Edge edgeCB = new Edge(nodeC, nodeB, 2);
		Edge edgeDB = new Edge(nodeD, nodeB, 1);
		Edge edgeEB = new Edge(nodeE, nodeB, 1);
		Edge edgeDC = new Edge(nodeD, nodeC, 4);
		Edge edgeEC = new Edge(nodeE, nodeC, 3);
		Edge edgeFC = new Edge(nodeC, nodeC, 5);
		Edge edgeFD = new Edge(nodeF, nodeD, 6);
		Edge edgeGD = new Edge(nodeG, nodeD, 5);
		Edge edgeFE = new Edge(nodeF, nodeE, 1);
		Edge edgeGF = new Edge(nodeG, nodeF, 2);
		edgesToAdd.add(edgeBA);
		edgesToAdd.add(edgeCA);
		edgesToAdd.add(edgeCB);
		edgesToAdd.add(edgeDB);
		edgesToAdd.add(edgeEB);
		edgesToAdd.add(edgeDC);
		edgesToAdd.add(edgeEC);
		edgesToAdd.add(edgeFC);
		edgesToAdd.add(edgeFD);
		edgesToAdd.add(edgeGD);
		edgesToAdd.add(edgeFE);
		edgesToAdd.add(edgeGF);
		*/

		g.setEdges(edgesToAdd);


		
		
		// Exerice 2: A completer : création du graphe
		
		Dijkstra d = new Dijkstra(g);

		
		d.findPath(nodeA,nodeG);
		// Exercice 3
		System.out.printf(d.afficherCourtChemin(nodeA,nodeG));
		d.afficherTable();


	
	}
}
