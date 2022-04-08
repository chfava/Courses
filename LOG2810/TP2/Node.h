//
//   Node.h
//  
//
//  Created by Vincent Dandenault on 2016-11-16.
//
//
#include <iostream>
#include <vector>

#ifndef NODE_H
#define NODE_H


class Node {

public:
	Node();
	~Node();
	Node(std::string nom);


	void addNodeEnfants(Node* node);
	void deleteNode(Node* node);
	const std::vector<Node*> getNodesEnfants();
	const Node* getNodeParent();
	void setNodeParent(Node* parent);
	std::string getEtat();


private : 
	std::vector<Node*> nodeEnfants_;
	Node* nodeParent_;
	std::string etat_;


};
#endif 