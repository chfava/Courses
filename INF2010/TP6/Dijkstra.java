import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.Set;
import java.util.Iterator;


public class Dijkstra {

	private Graph graph;
	private Map<Node, Edge> dijkstraTable[];
	private Stack<Edge> path;


	public Dijkstra (Graph g) {
		this.graph = g;
	}

	public void findPath (Node s, Node d) {
		// A complÃ©ter
		dijkstraTable = new HashMap[graph.getNodes().size()];
		for (int i = 0; i< dijkstraTable.length; i++){
			dijkstraTable[i] = new HashMap<Node, Edge>();
		}
		path = new Stack<Edge>();
		int index = 0;
		boolean dFound = false;
		Node nodePosition = s;
		Edge LastShortest;

		//////////////////////////////////////////////////////////////////////////////////////////////

		for (int i = 0 ; i < graph.getEdgesGoingFrom(nodePosition).size(); i++)
		{
			Node source = graph.getEdgesGoingFrom(nodePosition).get(i).getSource();
			Node destination = graph.getEdgesGoingFrom(nodePosition).get(i).getDestination();
			int distance = graph.getEdgesGoingFrom(nodePosition).get(i).getDistance();
			Edge edge = new Edge(source,destination, distance);

			dijkstraTable[index].put(edge.getDestination(),edge);
		}

		LastShortest = null;
		for (Node Key : dijkstraTable[index].keySet())
		{
			if ( LastShortest == null || dijkstraTable[index].get(Key).getDistance() < LastShortest.getDistance())
			{
					LastShortest = dijkstraTable[index].get(Key);
			}
		}
		if(LastShortest.getDestination() == nodePosition)
			nodePosition = LastShortest.getSource();
		else if(LastShortest.getSource() == nodePosition)
			nodePosition = LastShortest.getDestination();

		path.push(LastShortest);
		index++;

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		while (!dFound) {
				for (int i = 0; i < graph.getEdgesGoingFrom(nodePosition).size(); i++)
				{

					Node source = graph.getEdgesGoingFrom(nodePosition).get(i).getSource();
					Node destination = graph.getEdgesGoingFrom(nodePosition).get(i).getDestination();
					int distance = graph.getEdgesGoingFrom(nodePosition).get(i).getDistance() + LastShortest.getDistance();
					Edge edge = new Edge(source, destination, distance);
					dijkstraTable[index].put(edge.getDestination(), edge);


				}
			for (int i = 0; i < graph.getEdgesGoingTo(nodePosition).size(); i++)
			{
				Node source = graph.getEdgesGoingTo(nodePosition).get(i).getSource();
				Node destination = graph.getEdgesGoingTo(nodePosition).get(i).getDestination();
				int distance = graph.getEdgesGoingTo(nodePosition).get(i).getDistance() + LastShortest.getDistance();
				Edge edge = new Edge(source, destination, distance);
				dijkstraTable[index].put(edge.getSource(), edge);

			}

			LastShortest = this.getMinimum(dijkstraTable[index], LastShortest);
			path.push(LastShortest);
			if(LastShortest.getDestination() == nodePosition)
				nodePosition = LastShortest.getSource();
			else if(LastShortest.getSource() == nodePosition)
				nodePosition = LastShortest.getDestination();
			
			if (nodePosition == d)
				dFound = true;
			index++;
		}
	}

	private Edge getMinimum(Map<Node, Edge> map, Edge lastShortest) { //Retourne le Node destination avec le Edge.distance le plus petit
		Edge min = null;
		for (Node Key : map.keySet()) {
			if ( min == null || map.get(Key).getDistance() < min.getDistance())
			{
				if(map.get(Key).getDestination() != lastShortest.getDestination() && map.get(Key).getSource() != lastShortest.getSource()) {
					min = map.get(Key);
				}
			}
		}
		return min;
	}

	private Edge getMinimum (Edge e1, Edge e2) {
		// A completer
		if (e1.getDistance() < e2.getDistance())
			return e1;
		else
			return e2;
	}

	public String afficherCourtChemin (Node source, Node destination) {
		// A completer
		this.findPath(source, destination);
		String pathString = "";
		pathString += source.getName();
		pathString += "  -  ";
		
		for(int i = 0; i < path.size(); i++){
			pathString += path.get(i).getDestination().getName();
			if (i < path.size() -1)
				pathString += "  -  ";
		}

		return pathString;
	}

	public void afficherTable () {
		String espace = "	     	    ";
		String espace1 = "	";

		System.out.printf("\n");
		System.out.printf("\n");

		System.out.printf("Iterations :");
		for (int i =0; i < this.graph.getNodes().size(); i++)
		{
			System.out.printf("	" + this.graph.getNodes().get(i).getName());
		}
		System.out.printf("\n");
		System.out.printf("______________________________________________");
		System.out.printf("\n");
		System.out.printf(espace);
		Set<Map.Entry<Node, Edge>> entrySet = dijkstraTable[0].entrySet();
		for (Map.Entry<Node, Edge> entry : entrySet)
		{
			System.out.printf("0" + entry.getValue().getSource().getName());
			break;
		}
		System.out.printf("\n");



		for (int i = 0; i < dijkstraTable.length; i++) {
			Set<Map.Entry<Node, Edge>> entrySet1 = dijkstraTable[i].entrySet();
			System.out.printf(espace);
			System.out.printf(espace1);
			for (Map.Entry<Node, Edge> entry : entrySet1) {
				System.out.printf(entry.getValue().getDistance() + entry.getValue().getSource().getName()
						/*+entry.getValue().getDistance() + entry.getValue().getDestination().getName()*/ +  "  ");
			}
			espace1 += "	";
			System.out.printf("\n");
		}

	}
}

