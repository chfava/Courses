//////////////////////////////////////////////////////////////////////////////
///FICHIER: graph.h
///AUTEUR: Andreanne Laurin, Simon Barrette & Charles-Olivier Favreau
///DATE:18 octobre 2016
///DESCRIPTION: Contient la declaration de la classe graph, soit la classe la
// plus importante. Elle connait en fait tout le graph et c'est a partir de
// cette classe que le graphe est affiche, que le chemin le plus cours est
// trouvé, etc.
//////////////////////////////////////////////////////////////////////////////


#ifndef GRAPH_H
#define GRAPH_H

#include <vector>
#include "arc.h"
#include "sommet.h"
#include "car.h"

class Graph{
public:
    // Constructeur
	Graph();
    // Destructeur
	~Graph();
    // Ajoute un arc au vecteur d'arc
	void addArc(Arc* arc);
    // Ajoute un sommet au vecteur de sommet
	void addSommet(Sommet* sommet);
    
    // Trouve sur quel sommet le graphe se trouve
	void setPosition(Sommet* position);
    // Permet de dire au graphe sur quel sommet il se trouve
	Sommet* getPosition();
    // Trouve un sommet a partir de son identifiant (nom de station ex: A, B, C)
	Sommet* findSommet(std::string identifant);
    // Indique si un sommet se trouve dans la liste de sommet
	bool findSommet(Sommet* sommet, std::vector <Sommet*> &list);
    // Indique si un arc se trouve dans la liste d'arc
	bool findArc(Arc* arc, std::vector <Arc*> &list);
    // Fait les liaisons entre les sommets et les arcs
	void link(std::vector<Sommet*> &vectSommets, std::vector<Arc*> &vectArcs);
    // CreerGraphe lit le fichier texte puis créer les sommets et les arcs puis appel link
	void creerGraphe(const std::string fileName);
    // LireGraphe affiche le graphe selon les requis du tp
	void lireGraphe();
    // plusCourtChemin implemente l'algorithme de Djisktra
	std::vector<Sommet*> plusCourtChemin(std::string identifiantStart, std::string identifiantFinish);
    // ExtractionGraphe trouve tout les chemins possibles du départ a l'arrivée en fonction de l'autonomie
	bool extractionGraphe(Car car, std::string depart, std::string arrivee);
	


private:
    
	Sommet* position_;
    // Vecteur de tout les arcs du graphe principal
	std::vector<Arc*> listArc_;
    // Vecteur de tout les sommes du graphe principal
	std::vector<Sommet*> listSommet_;

    // Branche permet de connaître la sequence de sommet parcouru jusqu'à destination
	struct Branche{
		std::vector<Sommet*> vectSommets = {};
		int distance;
	};	
    
    // Branche Ext nous indique la sequence d'arcs et de sommet parcouru jusqu'à destination
	struct BrancheExt{
		std::vector<Sommet*> vectSommets = {};
		std::vector<Arc*> vectArcs = {};
		Car car;
		bool finished = false;
	};

    // Link permet de lié chaque pointeur sommet avec ses arcs sortant et entrant respectif, et vice-versa
	void link(std::string identifiant1, std::string identifiant2, int distance);
    // Permet de mettre le plus cours chemin en premier dans le vecteur pour l'algorithme de Djikstra
	void sortChemins(std::vector<Branche*> &vect);
    // Permet de mettre le plus cours arc en premier dans le vecteur pour l'algorithme de Djikstra
	void sortArc(std::vector<Arc*> &vect);
    //Vérifie si un automobile peut se rendre d'un sommet à un autre en fonction de son autonomie, du type de
    // station sur laquelle elle se trouve et de la longeur de l'arc
	bool isReachable(Car &car, Arc* arc);
    // Vérifie si tout les sommets on été parcouru.
	bool chaqueSommetParcouru();
	
};



#endif