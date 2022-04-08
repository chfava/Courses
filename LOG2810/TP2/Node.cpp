#include "Node.h"

using namespace std;

Node::Node()
{
	nodeParent_ = nullptr;
	vector<Node*> nodeEnfants_ = vector<Node*>();
	etat_ = "";
};

Node::Node(string nom)
{
	nodeParent_ = nullptr;
	etat_ = nom;
};

Node::~Node()
{
	for (int i = 0; i < nodeEnfants_.size() ; i++)
	{
	delete nodeEnfants_[i];
	}
		//nodeEnfants_.clear();
};

void Node::addNodeEnfants(Node* node)
{
	nodeEnfants_.push_back(node);
};
void Node::deleteNode(Node* node)
{
	for (int i = 0; i < nodeEnfants_.size(); i++){
		if (nodeEnfants_[i] == node)
		{
			nodeEnfants_.erase(nodeEnfants_.begin()+i);
		}
	}
};
const std::vector<Node*> Node::getNodesEnfants()
{
	return nodeEnfants_;
};
const Node* Node::getNodeParent()
{
	return nodeParent_;
};
void Node::setNodeParent(Node* parent)
{
	nodeParent_ = parent;
}

string Node::getEtat() {
	return etat_;
}