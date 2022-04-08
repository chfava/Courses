import java.util.ArrayList;
import java.util.List;


public class Graph {

	private List<Node> nodes; // Noeuds
	private List<Edge> edges; // Les arcs
	
	public Graph() {
		// A compléter -- done
		nodes = new ArrayList<Node>();
		edges = new ArrayList<Edge>();
	}
	
	public List<Edge> getEdgesGoingFrom(Node source) {
		// A complèter -- done
		ArrayList<Edge> newEdges = new ArrayList<Edge>();
		for (int i =0; i < edges.size(); i++)
		{
			if (edges.get(i).getSource() == source)
			{
				newEdges.add(edges.get(i));
			}
		}
		return newEdges;

	}
	public List<Edge> getEdgesGoingTo(Node dest) {
		// A complèter -- done

		ArrayList<Edge>newEdges = new ArrayList<Edge>();

		for (int i = 0; i < edges.size(); i++){
			if (edges.get(i).getDestination() == dest)
				newEdges.add(edges.get(i));
		}
		return newEdges;
		
	}
	
	// Accesseurs 
	public List<Node> getNodes() {
		return nodes;
	}
	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}
	public List<Edge> getEdges() {
		return edges;
	}
	public void setEdges(List<Edge> edges) {
		this.edges = edges;
	}
	
}
